// ══════════════════════════════════════════════════
//  CURSOR
// ══════════════════════════════════════════════════
const curEl=document.getElementById('cur'),ringEl=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function loop(){curEl.style.left=mx+'px';curEl.style.top=my+'px';rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ringEl.style.left=rx+'px';ringEl.style.top=ry+'px';requestAnimationFrame(loop);})();

// ══════════════════════════════════════════════════
//  SCROLL REVEAL
// ══════════════════════════════════════════════════
const ro=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target);}});},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// ══════════════════════════════════════════════════
//  THREE.JS — CRYSTAL DNA
// ══════════════════════════════════════════════════
(function(){
  const canvas=document.getElementById('dna-canvas');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.5;

  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x03030a,0.018);

  const camera=new THREE.PerspectiveCamera(44,innerWidth/innerHeight,0.1,200);
  camera.position.set(0,0,20);

  // ── STARFIELD ──
  (function(){
    const n=2000,geo=new THREE.BufferGeometry();
    const pos=new Float32Array(n*3),col=new Float32Array(n*3);
    const pal=[[.6,.45,1],[.3,.6,1],[.5,.9,.9],[1,1,1],[.7,.55,1]];
    for(let i=0;i<n;i++){
      pos[i*3]=(Math.random()-.5)*220;pos[i*3+1]=(Math.random()-.5)*220;pos[i*3+2]=(Math.random()-.5)*110-30;
      const c=pal[Math.floor(Math.random()*pal.length)],b=.15+Math.random()*.85;
      col[i*3]=c[0]*b;col[i*3+1]=c[1]*b;col[i*3+2]=c[2]*b;
    }
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color',new THREE.BufferAttribute(col,3));
    scene.add(new THREE.Points(geo,new THREE.PointsMaterial({size:.07,vertexColors:true,transparent:true,opacity:.8,sizeAttenuation:true})));
  })();

  // ── LIGHTS ──
  scene.add(new THREE.AmbientLight(0x110022,0.5));
  const vL=new THREE.PointLight(0x9b6dff,8,28);vL.position.set(-5,3,5);scene.add(vL);
  const bL=new THREE.PointLight(0x4a9fff,6,24);bL.position.set(5,-2,4);scene.add(bL);
  const aL=new THREE.PointLight(0x00e5cc,3,18);aL.position.set(0,-5,3);scene.add(aL);
  const gL=new THREE.PointLight(0xffd97a,2,14);gL.position.set(2,6,-3);scene.add(gL);

  // ── CRYSTAL SHADER MATERIAL (applied to ALL DNA geometry) ──
  function makeCrystalMat(){
    return new THREE.ShaderMaterial({
      uniforms:{
        uTime:{value:0},
        uMouse:{value:new THREE.Vector2(.5,.5)},
        uColorA:{value:new THREE.Color(0x9b6dff)},
        uColorB:{value:new THREE.Color(0x4a9fff)},
      },
      vertexShader:`
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vViewDir;
        varying vec2 vUv;
        void main(){
          vUv=uv;
          vNormal=normalize(normalMatrix*normal);
          vec4 wp=modelMatrix*vec4(position,1.0);
          vWorldPos=wp.xyz;
          vViewDir=normalize(cameraPosition-wp.xyz);
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }
      `,
      fragmentShader:`
        varying vec3 vNormal;
        varying vec3 vWorldPos;
        varying vec3 vViewDir;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec3 uColorA;
        uniform vec3 uColorB;

        vec3 palette(float t){
          // violet→cobalt→aqua→gold iridescence
          vec3 a=vec3(.5,.5,.5);
          vec3 b=vec3(.5,.5,.5);
          vec3 c=vec3(1.,1.,.8);
          vec3 d=vec3(.30,.45,.65);
          return clamp(a+b*cos(6.2831*(c*t+d)),0.,1.);
        }

        void main(){
          // Fresnel — strong edge glow
          float fresnel=pow(1.0-abs(dot(vNormal,vViewDir)),2.2);

          // Face hue from normal orientation
          float faceT=dot(vNormal,vec3(.577,.577,.577))*.5+.5;

          // Time + mouse driven hue shift
          float shift=uTime*.035+uMouse.x*.25+faceT;
          vec3 faceCol=palette(shift);

          // Iridescent layer from world position
          float irid=sin(vWorldPos.y*1.4+uTime*.55)*.5+.5;
          vec3 iridCol=palette(shift+irid*.38);

          // Animated light direction (orbiting)
          vec3 lDir=normalize(vec3(sin(uTime*.3)*2.,2.5,1.8));
          float diff=max(0.,dot(vNormal,lDir));
          float spec=pow(max(0.,dot(reflect(-lDir,vNormal),vViewDir)),22.);

          // Subsurface scatter — light bleeding through
          float sss=pow(max(0.,dot(-vNormal,lDir)),1.4)*.55;
          vec3 sssCol=vec3(.5,.28,.95)*sss;

          // Caustic scatter — bright flickers on surface
          float cx=sin(vWorldPos.x*3.2+uTime*.75);
          float cz=sin(vWorldPos.z*3.2+uTime*.5);
          float caustic=pow(abs(cx*cz),.8)*.28;

          // Compose
          vec3 col=faceCol*(.15+diff*.55);
          col+=iridCol*.22;
          col+=vec3(1.)*spec*.85;
          col+=sssCol;
          col+=palette(shift+.5)*fresnel*.75;
          col+=vec3(.75,.65,1.)*caustic;

          // Tone / gamma
          col=pow(max(col,0.),vec3(.80));
          col=clamp(col,0.,1.);

          // Semi-transparent: faces toward viewer more transparent (crystal look)
          float camFace=abs(dot(vNormal,vViewDir));
          float alpha=mix(.55,.92,1.-camFace*.5)+fresnel*.1;
          alpha=clamp(alpha,.45,1.);

          gl_FragColor=vec4(col,alpha);
        }
      `,
      transparent:true,
      side:THREE.DoubleSide,
      depthWrite:false,
      blending:THREE.NormalBlending,
    });
  }

  // Shared uniforms reference so we can update one uTime for all
  const allMats=[];

  // ── BUILD PROCEDURAL CRYSTAL DNA ──
  const PAIRS=34, H=18, R=2.3, TWIST=Math.PI*3;
  const group=new THREE.Group();
  // Position helix to the RIGHT, leaving left for hero text
  group.position.x=5;

  function helixP(t,strand){
    const y=(t-.5)*H;
    const a=t*TWIST+(strand===2?Math.PI:0);
    return new THREE.Vector3(Math.cos(a)*R,y,Math.sin(a)*R);
  }

  // BACKBONE TUBES — crystal material
  function makeTube(strand){
    const pts=[];
    for(let i=0;i<=100;i++) pts.push(helixP(i/100,strand));
    const geo=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),180,0.09,8,false);
    const mat=makeCrystalMat();
    allMats.push(mat);
    return new THREE.Mesh(geo,mat);
  }
  const tube1=makeTube(1); group.add(tube1);
  const tube2=makeTube(2); group.add(tube2);

  // NODE SPHERES — crystal material, store for deformation
  const nodeData=[];
  const nGeoA=new THREE.SphereGeometry(.2,14,14);
  const nGeoB=new THREE.SphereGeometry(.16,12,12);

  // BRIDGES — crystal material
  const bridgeData=[];
  const bGeo=new THREE.CylinderGeometry(.042,.042,1,7);

  for(let i=0;i<PAIRS;i++){
    const t=i/(PAIRS-1);
    const p1=helixP(t,1),p2=helixP(t,2);

    // Node 1
    const m1=makeCrystalMat(); allMats.push(m1);
    const n1=new THREE.Mesh(nGeoA,m1);
    n1.position.copy(p1); group.add(n1);
    nodeData.push({mesh:n1,mat:m1,base:p1.clone(),strand:1});

    // Node 2
    const m2=makeCrystalMat(); allMats.push(m2);
    const n2=new THREE.Mesh(nGeoB,m2);
    n2.position.copy(p2); group.add(n2);
    nodeData.push({mesh:n2,mat:m2,base:p2.clone(),strand:2});

    // Bridge
    const bm=makeCrystalMat(); allMats.push(bm);
    const br=new THREE.Mesh(bGeo,bm);
    const mid=p1.clone().lerp(p2,.5);
    br.position.copy(mid);
    br.scale.y=p1.distanceTo(p2);
    br.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),p2.clone().sub(p1).normalize());
    group.add(br);
    bridgeData.push({mesh:br,i});
  }

  scene.add(group);

  // Try loading real GLB and apply crystal shader to it
  const gs=document.createElement('script');
  gs.src='https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
  gs.onload=()=>{
    new THREE.GLTFLoader().load('/mnt/user-data/uploads/dna.glb',gltf=>{
      // Clear procedural group
      scene.remove(group);
      allMats.length=0;
      nodeData.length=0;
      bridgeData.length=0;

      const m=gltf.scene;
      // Fit to same space
      const box=new THREE.Box3().setFromObject(m);
      const c=box.getCenter(new THREE.Vector3()),s=box.getSize(new THREE.Vector3());
      const sc=H/Math.max(s.x,s.y,s.z);
      m.scale.setScalar(sc);
      m.position.sub(c.multiplyScalar(sc));
      m.position.x+=5;
      // Apply crystal shader to every mesh in the GLB
      m.traverse(ch=>{
        if(ch.isMesh){
          const mat=makeCrystalMat();
          allMats.push(mat);
          ch.material=mat;
        }
      });
      scene.add(m);
      window._glb=m;
    },undefined,()=>{});
  };
  document.head.appendChild(gs);

  // ── CAUSTIC PARTICLE HALO around helix ──
  (function(){
    const n=180,geo=new THREE.BufferGeometry();
    const pos=new Float32Array(n*3);
    for(let i=0;i<n;i++){
      const t=Math.random(),strand=Math.random()>.5?1:2;
      const base=helixP(t,strand);
      const jit=.6;
      pos[i*3]=base.x+(Math.random()-.5)*jit+5;
      pos[i*3+1]=base.y+(Math.random()-.5)*jit;
      pos[i*3+2]=base.z+(Math.random()-.5)*jit;
    }
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    scene.add(new THREE.Points(geo,new THREE.PointsMaterial({
      size:.045,color:0xbb99ff,transparent:true,opacity:.55,
      blending:THREE.AdditiveBlending,sizeAttenuation:true
    })));
  })();

  // ── INTERACTION ──
  const mouse=new THREE.Vector2(.5,.5);
  let tmx=.5,tmy=.5;
  document.addEventListener('mousemove',e=>{tmx=e.clientX/innerWidth;tmy=e.clientY/innerHeight;});

  const shockwaves=[];
  const mPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
  const ray=new THREE.Raycaster();
  document.getElementById('hit-layer').addEventListener('click',e=>{
    ray.setFromCamera({x:(e.clientX/innerWidth)*2-1,y:-(e.clientY/innerHeight)*2+1},camera);
    const pt=new THREE.Vector3();
    ray.ray.intersectPlane(mPlane,pt);
    shockwaves.push({t:0,origin:pt.clone()});
  });

  let lastMove=Date.now();
  document.addEventListener('mousemove',()=>{lastMove=Date.now();});
  let scrollY=0;
  window.addEventListener('scroll',()=>{scrollY=window.scrollY;});

  // ── ANIMATE ──
  let clk=0;
  const tmp=new THREE.Vector3();
  function lerp(a,b,t){return a+(b-a)*t;}
  function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

  (function animate(){
    requestAnimationFrame(animate);
    clk+=.005;

    mouse.x+=(tmx-mouse.x)*.07;
    mouse.y+=(tmy-mouse.y)*.07;

    const scrollT=clamp(scrollY/innerHeight,0,1);
    const idle=Date.now()-lastMove>2000;

    // Update ALL crystal material uniforms
    allMats.forEach(mat=>{
      mat.uniforms.uTime.value=clk;
      mat.uniforms.uMouse.value.set(mouse.x,mouse.y);
    });

    // Also update GLB if loaded
    if(window._glb){
      window._glb.rotation.y+=.005;
      window._glb.rotation.x=lerp(window._glb.rotation.x,(mouse.y-.5)*.2,.05);
    }

    // DNA group rotation
    group.rotation.y+=.005;
    group.rotation.x=lerp(group.rotation.x,(mouse.y-.5)*.2,.05);

    // Scroll: camera pulls back and model zooms as portal
    camera.position.z=lerp(20,26,scrollT);
    camera.position.x=lerp((mouse.x-.5)*.8,0,scrollT);
    camera.position.y=lerp(-(mouse.y-.5)*.5,0,scrollT);
    camera.lookAt(5,0,0);

    // Shockwave tick
    for(let i=shockwaves.length-1;i>=0;i--){
      shockwaves[i].t+=.035;
      if(shockwaves[i].t>1.1)shockwaves.splice(i,1);
    }

    // Node deformation (mouse repulsion + shockwave)
    const REPEL_R=3.5,REPEL_F=1.4;
    const SHOCK_R=5.5,SHOCK_F=1.2;
    const BREATH=idle?.35:.06;

    // Mouse in group-local
    tmp.set((mouse.x-.5)*14,(-(mouse.y-.5))*10,0).sub(group.position);

    for(const nd of nodeData){
      const base=nd.base;
      // Breathing
      const phase=clk*.95+base.y*.4;
      const bl=Math.sqrt(base.x*base.x+base.z*base.z)||1;
      const br=BREATH*Math.sin(phase);
      let px=base.x+(base.x/bl)*br;
      let py=base.y;
      let pz=base.z+(base.z/bl)*br;
      // Repulsion
      const dx=px-tmp.x,dy=py-tmp.y,dz=pz-tmp.z;
      const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
      let glow=0;
      if(d<REPEL_R&&d>.01){
        const f=(1-d/REPEL_R)*REPEL_F;
        px+=(dx/d)*f;py+=(dy/d)*f*.4;pz+=(dz/d)*f;
        glow=1-d/REPEL_R;
      }
      // Shockwaves
      for(const sw of shockwaves){
        const sl=sw.origin.clone().sub(group.position);
        const sdx=px-sl.x,sdy=py-sl.y,sdz=pz-sl.z;
        const sd=Math.sqrt(sdx*sdx+sdy*sdy+sdz*sdz);
        const ring=sw.t*SHOCK_R,w=1.0;
        const prox=1-Math.abs(sd-ring)/w;
        if(prox>0&&sd>.01){
          const amp=prox*SHOCK_F*(1-sw.t);
          px+=(sdx/sd)*amp;py+=(sdy/sd)*amp*.5;pz+=(sdz/sd)*amp;
          glow=Math.max(glow,prox*(1-sw.t));
        }
      }
      nd.mesh.position.set(px,py,pz);
      // Scale pop on glow
      const ts=1+glow*.4;
      nd.mesh.scale.x=lerp(nd.mesh.scale.x,ts,.12);
      nd.mesh.scale.y=nd.mesh.scale.z=nd.mesh.scale.x;
    }

    // Update bridges
    for(let k=0;k<bridgeData.length;k++){
      const n1=nodeData[k*2],n2=nodeData[k*2+1];
      if(!n1||!n2)continue;
      const p1=n1.mesh.position,p2=n2.mesh.position;
      const br=bridgeData[k].mesh;
      br.position.copy(p1.clone().lerp(p2,.5));
      br.scale.y=p1.distanceTo(p2);
      const dir=p2.clone().sub(p1).normalize();
      if(dir.length()>.001)br.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
    }

    // Orbit lights
    vL.position.x=Math.sin(clk*.48)*7;vL.position.z=Math.cos(clk*.48)*5+3;
    bL.position.x=Math.cos(clk*.38)*7;bL.position.z=Math.sin(clk*.38)*5+3;
    aL.position.y=Math.sin(clk*.55)*5-3;
    gL.position.x=Math.sin(clk*.3)*4;gL.position.y=Math.cos(clk*.25)*5+2;

    renderer.render(scene,camera);
  })();

  window.addEventListener('resize',()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });
})();
