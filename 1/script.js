// ═══════════════════════════════════════
//  CURSOR
// ═══════════════════════════════════════
const cursorEl=document.getElementById('cursor'),ringEl=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function moveCursor(){
  cursorEl.style.left=mx+'px';cursorEl.style.top=my+'px';
  rx+=(mx-rx)*.13;ry+=(my-ry)*.13;
  ringEl.style.left=rx+'px';ringEl.style.top=ry+'px';
  requestAnimationFrame(moveCursor);
})();

// ═══════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);}});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

// ═══════════════════════════════════════
//  SECTION TRACKER  →  drives DNA color
// ═══════════════════════════════════════
const SECTIONS=[
  {el:document.getElementById('hero-section'), key:'hero',    c1:[200,245,61],  c2:[74,124,255]},
  {el:document.getElementById('work'),         key:'work',    c1:[200,245,61],  c2:[74,124,255]},
  {el:document.getElementById('capabilities'), key:'cap',     c1:[74,124,255],  c2:[122,162,255]},
  {el:document.getElementById('philosophy'),   key:'phil',    c1:[232,145,58],  c2:[255,192,112]},
  {el:document.getElementById('contact'),      key:'contact', c1:[200,245,61],  c2:[74,124,255]},
];
const dots=document.querySelectorAll('.mode-dot');
window.DNA_STATE={c1:[200,245,61],c2:[74,124,255]};

const secObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const idx=SECTIONS.findIndex(s=>s.el===entry.target);
    if(idx<0) return;
    dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
    window.DNA_STATE.c1=[...SECTIONS[idx].c1];
    window.DNA_STATE.c2=[...SECTIONS[idx].c2];
  });
},{threshold:0.4});
SECTIONS.forEach(s=>{if(s.el)secObs.observe(s.el);});

// ═══════════════════════════════════════
//  THREE.JS  —  INTERACTIVE DNA
// ═══════════════════════════════════════
(function(){
  const canvas=document.getElementById('dna-canvas');
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.3;

  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x050507,0.02);

  const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,0.1,200);
  camera.position.set(0,0,20);

  // LIGHTS
  scene.add(new THREE.AmbientLight(0xffffff,0.3));
  const mainL=new THREE.DirectionalLight(0xffffff,1.0);
  mainL.position.set(5,10,8);scene.add(mainL);
  const acidL=new THREE.PointLight(0xc8f53d,5,35);
  acidL.position.set(-6,4,6);scene.add(acidL);
  const blueL=new THREE.PointLight(0x4a7cff,4,30);
  blueL.position.set(8,-3,5);scene.add(blueL);
  const rimL=new THREE.DirectionalLight(0xc8f53d,0.5);
  rimL.position.set(-8,-5,-4);scene.add(rimL);

  // BUILD PROCEDURAL HELIX
  const PAIRS=36, HEIGHT=18, RADIUS=2.3, TWIST=Math.PI*3;

  const mat1=new THREE.MeshStandardMaterial({color:0xc8f53d,metalness:0.2,roughness:0.42,emissive:0x1a2200,emissiveIntensity:0.5});
  const mat2=new THREE.MeshStandardMaterial({color:0x4a7cff,metalness:0.2,roughness:0.42,emissive:0x000a22,emissiveIntensity:0.5});
  const matB=new THREE.MeshStandardMaterial({color:0x55554e,metalness:0.55,roughness:0.28});

  const group=new THREE.Group();
  group.position.x=4.8;

  // Helper: get a helix position in group-local space
  function helixPos(t,strand){
    const y=(t-.5)*HEIGHT;
    const a=t*TWIST+(strand===2?Math.PI:0);
    return new THREE.Vector3(Math.cos(a)*RADIUS,y,Math.sin(a)*RADIUS);
  }

  // Backbone tubes
  function buildTube(strand,mat){
    const pts=[];
    for(let i=0;i<=100;i++) pts.push(helixPos(i/100,strand));
    const geo=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),160,0.10,7,false);
    group.add(new THREE.Mesh(geo,mat));
  }
  buildTube(1,mat1);buildTube(2,mat2);

  // Base-pair nodes + bridges — stored for runtime deformation
  const nodeData=[]; // {mesh, mat, base:Vector3, strand}
  const bridgeData=[]; // {mesh, i}

  const nGeoA=new THREE.SphereGeometry(0.21,14,14);
  const nGeoB=new THREE.SphereGeometry(0.17,12,12);
  const bGeo =new THREE.CylinderGeometry(0.048,0.048,1,6);

  for(let i=0;i<PAIRS;i++){
    const t=i/(PAIRS-1);
    const p1=helixPos(t,1), p2=helixPos(t,2);

    // Node 1
    const m1=new THREE.MeshStandardMaterial({color:0xd9ff50,metalness:0.2,roughness:0.3,emissive:0x2a3500,emissiveIntensity:0.7});
    const n1=new THREE.Mesh(nGeoA,m1);
    n1.position.copy(p1);group.add(n1);
    nodeData.push({mesh:n1,mat:m1,base:p1.clone(),strand:1,idx:i});

    // Node 2
    const m2=new THREE.MeshStandardMaterial({color:0x7aa2ff,metalness:0.2,roughness:0.3,emissive:0x001240,emissiveIntensity:0.6});
    const n2=new THREE.Mesh(nGeoB,m2);
    n2.position.copy(p2);group.add(n2);
    nodeData.push({mesh:n2,mat:m2,base:p2.clone(),strand:2,idx:i});

    // Bridge
    const bm=new THREE.Mesh(bGeo,matB);
    const mid=p1.clone().lerp(p2,.5);
    bm.position.copy(mid);
    bm.scale.y=p1.distanceTo(p2);
    bm.lookAt(p2.clone().add(new THREE.Vector3(100,0,0)));
    bm.rotateX(Math.PI/2);
    group.add(bm);
    bridgeData.push({mesh:bm,i});
  }

  scene.add(group);

  // Try real GLB
  const gs=document.createElement('script');
  gs.src='https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
  gs.onload=()=>{
    new THREE.GLTFLoader().load('/mnt/user-data/uploads/dna.glb',gltf=>{
      const m=gltf.scene;
      const box=new THREE.Box3().setFromObject(m);
      const c=box.getCenter(new THREE.Vector3()),s=box.getSize(new THREE.Vector3());
      const sc=11/Math.max(s.x,s.y,s.z);
      m.scale.setScalar(sc);
      m.position.sub(c.multiplyScalar(sc));
      m.position.x+=4.8;
      m.traverse(ch=>{if(ch.isMesh){ch.material=mat1.clone();}});
      scene.remove(group);
      scene.add(m);
      window._glbModel=m;
    },undefined,()=>{});
  };
  document.head.appendChild(gs);

  // ── INTERACTION INPUTS ──
  // Mouse → world pos on z=0 plane
  const mouse3D=new THREE.Vector3();
  const ray=new THREE.Raycaster();
  const mPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0);
  document.addEventListener('mousemove',e=>{
    ray.setFromCamera({x:(e.clientX/innerWidth)*2-1,y:-(e.clientY/innerHeight)*2+1},camera);
    ray.ray.intersectPlane(mPlane,mouse3D);
  });

  // Click → shockwaves
  const shockwaves=[];
  document.getElementById('interaction-layer').addEventListener('click',e=>{
    const pt=new THREE.Vector3();
    ray.setFromCamera({x:(e.clientX/innerWidth)*2-1,y:-(e.clientY/innerHeight)*2+1},camera);
    ray.ray.intersectPlane(mPlane,pt);
    shockwaves.push({t:0,origin:pt.clone()});
  });

  // Idle detection
  let lastMove=Date.now();
  document.addEventListener('mousemove',()=>{lastMove=Date.now();});

  // Scroll
  let scrollY=0;
  window.addEventListener('scroll',()=>{scrollY=window.scrollY;});

  // Color state
  const cc1={r:200,g:245,b:61},cc2={r:74,g:124,b:255};

  // ── RENDER LOOP ──
  let clock=0;
  const tmp=new THREE.Vector3();

  function lerp(a,b,t){return a+(b-a)*t;}
  function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
  function composeHex(r,g,b){return(Math.round(r)<<16)|(Math.round(g)<<8)|Math.round(b);}

  (function animate(){
    requestAnimationFrame(animate);
    clock+=0.004;

    const idle=(Date.now()-lastMove)>2000;
    const scrollT=clamp(scrollY/innerHeight,0,1);

    // Smooth color mutation from section tracker
    const tc1=window.DNA_STATE.c1, tc2=window.DNA_STATE.c2;
    cc1.r=lerp(cc1.r,tc1[0],.022); cc1.g=lerp(cc1.g,tc1[1],.022); cc1.b=lerp(cc1.b,tc1[2],.022);
    cc2.r=lerp(cc2.r,tc2[0],.022); cc2.g=lerp(cc2.g,tc2[1],.022); cc2.b=lerp(cc2.b,tc2[2],.022);

    const h1=composeHex(cc1.r,cc1.g,cc1.b);
    const h2=composeHex(cc2.r,cc2.g,cc2.b);
    mat1.color.setHex(h1); mat2.color.setHex(h2);
    acidL.color.setHex(h1); blueL.color.setHex(h2);

    // Scroll → camera pull back
    camera.position.z=lerp(20,26,scrollT);
    camera.position.y=lerp(0,-1.5,scrollT);

    // Auto rotate + parallax tilt
    group.rotation.y+=idle?0.0035:0.006;
    const tRX=((my/innerHeight)-.5)*.22;
    group.rotation.x+=(tRX-group.rotation.x)*.05;

    // Shockwave progress
    for(let i=shockwaves.length-1;i>=0;i--){
      shockwaves[i].t+=0.038;
      if(shockwaves[i].t>1.05) shockwaves.splice(i,1);
    }

    // ── Node deformation ──
    const REPEL_R=3.8, REPEL_F=1.5;
    const SHOCK_R=5.5, SHOCK_F=1.3;
    const BREATH_AMP=idle?0.38:0.07;

    // Mouse in group-local space
    tmp.copy(mouse3D).sub(group.position);

    for(const nd of nodeData){
      const base=nd.base;

      // 1. Idle breath: radial pulse travelling up the helix
      const phase=clock*1.1+base.y*.45;
      const br=BREATH_AMP*Math.sin(phase);
      const bl=Math.sqrt(base.x*base.x+base.z*base.z)||1;
      let px=base.x+(base.x/bl)*br;
      let py=base.y;
      let pz=base.z+(base.z/bl)*br;

      // 2. Mouse repulsion field
      const dx=px-tmp.x, dy=py-tmp.y, dz=pz-tmp.z;
      const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
      let glowFactor=0;
      if(d<REPEL_R&&d>.01){
        const f=(1-d/REPEL_R)*REPEL_F;
        px+=(dx/d)*f; py+=(dy/d)*f*.4; pz+=(dz/d)*f;
        glowFactor=(1-d/REPEL_R);
      }

      // 3. Shockwave rings
      for(const sw of shockwaves){
        const sl=sw.origin.clone().sub(group.position);
        const sdx=px-sl.x,sdy=py-sl.y,sdz=pz-sl.z;
        const sd=Math.sqrt(sdx*sdx+sdy*sdy+sdz*sdz);
        const ring=sw.t*SHOCK_R, width=1.1;
        const prox=1-Math.abs(sd-ring)/width;
        if(prox>0&&sd>.01){
          const amp=prox*SHOCK_F*(1-sw.t);
          px+=(sdx/sd)*amp; py+=(sdy/sd)*amp*.5; pz+=(sdz/sd)*amp;
          glowFactor=Math.max(glowFactor,prox*(1-sw.t));
        }
      }

      nd.mesh.position.set(px,py,pz);

      // Emissive glow + scale pop
      const targetEmissive=0.4+glowFactor*1.6;
      const targetScale=1+glowFactor*.35;
      nd.mat.emissiveIntensity+=(targetEmissive-nd.mat.emissiveIntensity)*.12;
      nd.mesh.scale.x+=(targetScale-nd.mesh.scale.x)*.12;
      nd.mesh.scale.y=nd.mesh.scale.z=nd.mesh.scale.x;

      // Tint individual node colors toward section palette
      nd.mat.color.setHex(nd.strand===1?h1:h2);
    }

    // Update bridges to follow deformed nodes
    for(let k=0;k<bridgeData.length;k++){
      const idx2=k*2; // nodeData has pairs interleaved: [n1_0, n2_0, n1_1, n2_1, ...]
      const n1=nodeData[idx2], n2=nodeData[idx2+1];
      if(!n1||!n2) continue;
      const p1=n1.mesh.position, p2=n2.mesh.position;
      const mid=p1.clone().lerp(p2,.5);
      const bm=bridgeData[k].mesh;
      bm.position.copy(mid);
      bm.scale.y=p1.distanceTo(p2);
      // Re-orient: point along bridge axis
      const dir=p2.clone().sub(p1).normalize();
      const axis=new THREE.Vector3(0,1,0);
      bm.quaternion.setFromUnitVectors(axis,dir);
    }

    // Orbit lights for ambient shimmer
    acidL.position.x=Math.sin(clock*.65)*10;
    acidL.position.y=Math.cos(clock*.48)*5;
    blueL.position.x=Math.cos(clock*.58)*9;
    blueL.position.y=Math.sin(clock*.77)*5;

    // GLB model: just rotate + color
    if(window._glbModel){
      window._glbModel.rotation.y+=0.006;
      window._glbModel.traverse(c=>{
        if(c.isMesh){c.material.color.setHex(h1); c.material.emissive.setHex(h1>>2);}
      });
    }

    renderer.render(scene,camera);
  })();

  window.addEventListener('resize',()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });
})();
