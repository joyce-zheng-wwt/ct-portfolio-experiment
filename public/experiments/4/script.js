// ── PAGE ROUTING ─────────────────────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === name);
  });
  // show present toggle only on work page
  const pt = document.getElementById('presentToggle');
  pt.classList.toggle('visible', name === 'work');
  // canvas only makes sense on home
  document.getElementById('hero-canvas').style.display = name === 'home' ? '' : 'none';
  window.scrollTo(0, 0);
}

// Wire all [data-page] links
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el && el.dataset.page) showPage(el.dataset.page);
});

// ── NAV SCROLL ────────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
});

// ── THREE.JS GLASS CUBE ───────────────────────────────────────────────────────
const canvas = document.getElementById('hero-canvas');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 6);

const ambient = new THREE.AmbientLight(0xffffff, 0.3); scene.add(ambient);
const key = new THREE.DirectionalLight(0xffffff, 3); key.position.set(3,5,4); scene.add(key);
const rim = new THREE.DirectionalLight(0xcccccc, 1.5); rim.position.set(-4,1,-3); scene.add(rim);
const fill = new THREE.PointLight(0xffffff, 1, 20); fill.position.set(0,-3,3); scene.add(fill);

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128,{
  format:THREE.RGBFormat, generateMipmaps:true, minFilter:THREE.LinearMipmapLinearFilter
});
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
scene.add(cubeCamera);

const geo = new THREE.BoxGeometry(2,2,2);
const glassMat = new THREE.MeshPhysicalMaterial({
  color:0xffffff, metalness:0.1, roughness:0.0, reflectivity:1.0,
  envMap:cubeRenderTarget.texture, envMapIntensity:3.0,
  clearcoat:1.0, clearcoatRoughness:0.0,
  transparent:true, opacity:0.18, side:THREE.DoubleSide
});
const cube = new THREE.Mesh(geo, glassMat);
cube.position.set(2.8, 0.2, 0);
scene.add(cube);

const edgesGeo = new THREE.EdgesGeometry(geo);
const edgesMat = new THREE.LineBasicMaterial({color:0xffffff, opacity:0.12, transparent:true});
cube.add(new THREE.LineSegments(edgesGeo, edgesMat));

const partCount = 180;
const partGeo = new THREE.BufferGeometry();
const positions = new Float32Array(partCount * 3);
const partSpeeds = [];
for (let i=0; i<partCount; i++) {
  positions[i*3]   = (Math.random()-0.5)*14;
  positions[i*3+1] = (Math.random()-0.5)*14;
  positions[i*3+2] = (Math.random()-0.5)*6-2;
  partSpeeds.push({x:(Math.random()-0.5)*0.002, y:(Math.random()-0.5)*0.002});
}
partGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
const partMat = new THREE.PointsMaterial({color:0xffffff,size:0.018,transparent:true,opacity:0.35,sizeAttenuation:true});
const particles = new THREE.Points(partGeo, partMat);
scene.add(particles);

let mouseX=0, mouseY=0, targetX=0, targetY=0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX/window.innerWidth - 0.5)*2;
  mouseY = -(e.clientY/window.innerHeight - 0.5)*2;
});
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let time=0;
const clock = new THREE.Clock();
(function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta(); time += delta;
  targetX += (mouseX-targetX)*0.04;
  targetY += (mouseY-targetY)*0.04;
  cube.rotation.x = time*0.14 + targetY*0.4;
  cube.rotation.y = time*0.22 + targetX*0.6;
  cube.position.y = 0.2 + Math.sin(time*0.6)*0.15;
  const pos = particles.geometry.attributes.position.array;
  for (let i=0; i<partCount; i++) {
    pos[i*3]   += partSpeeds[i].x;
    pos[i*3+1] += partSpeeds[i].y;
    if (Math.abs(pos[i*3])   > 7) partSpeeds[i].x *= -1;
    if (Math.abs(pos[i*3+1]) > 7) partSpeeds[i].y *= -1;
  }
  particles.geometry.attributes.position.needsUpdate = true;
  particles.rotation.y = time*0.03;
  camera.position.x += (targetX*0.3 - camera.position.x)*0.02;
  camera.position.y += (targetY*0.2 - camera.position.y)*0.02;
  camera.lookAt(scene.position);
  cube.visible = false;
  cubeCamera.position.copy(cube.position);
  cubeCamera.update(renderer, scene);
  cube.visible = true;
  renderer.render(scene, camera);
})();

// ── TICKER ────────────────────────────────────────────────────────────────────
const tickItems = ['AI-Native Engineering','·','Creative Development','·','Design Systems','·','Rapid Prototyping','·','LLM Integration','·','Agent Architecture','·','Three.js / WebGL','·','Platform Tooling','·','UX Research','·','Component Systems','·'];
const track = document.getElementById('ticker');
[...tickItems,...tickItems,...tickItems,...tickItems].forEach(t => {
  const el = document.createElement('span');
  el.className = 'ticker-item';
  el.textContent = t;
  track.appendChild(el);
});

// ── WORK DATA ─────────────────────────────────────────────────────────────────
const works = [
  {id:1,filter:'ai',year:'2024',tag:'AI Tooling',title:'Intelligent Document Processing Pipeline',desc:'An agentic pipeline that extracts, classifies, and acts on unstructured content at enterprise scale. Built on a multi-step LLM architecture with human-in-the-loop review surfaces embedded directly into the workflow.',details:[{label:'Client',val:'Fortune 500 — Financial Services'},{label:'Timeline',val:'14 weeks'},{label:'Role',val:'Architecture + UX Lead'}],tech:['Claude API','LangGraph','React','Node.js','PostgreSQL'],img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop'},
  {id:2,filter:'creative',year:'2024',tag:'Creative Development',title:'Generative Design System at Scale',desc:'A token-driven component system that uses AI to generate on-brand, WCAG-compliant design variations. Reduced time-to-theme from three weeks to under two hours for a team of forty-plus engineers.',details:[{label:'Client',val:'B2B SaaS Platform'},{label:'Timeline',val:'20 weeks'},{label:'Role',val:'Design System Architect'}],tech:['Figma API','Style Dictionary','Storybook','GPT-4o','CI/CD'],img:'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop'},
  {id:3,filter:'platform',year:'2024',tag:'Platform',title:'Internal AI Co-pilot',desc:'A team-facing assistant trained on institutional knowledge — SOPs, past projects, and internal tooling documentation. Shipped from zero to production in six weeks, now used daily by over two hundred staff.',details:[{label:'Client',val:'Internal / WWT'},{label:'Timeline',val:'6 weeks'},{label:'Role',val:'Full-Stack + Prompt Engineering'}],tech:['Claude','RAG','Pinecone','Next.js','AWS'],img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format&fit=crop'},
  {id:4,filter:'research',year:'2023',tag:'Research + Prototyping',title:'Behavioral UX Research Framework',desc:'A research-to-prototype system compressing three weeks of synthesis into repeatable two-day sprint artifacts. Includes AI-assisted affinity mapping, insight generation, and auto-generated prototype scaffolding.',details:[{label:'Client',val:'Healthcare SaaS'},{label:'Timeline',val:'8 weeks'},{label:'Role',val:'UX Research Lead'}],tech:['Dovetail','Claude API','Figma','GSAP','Notion'],img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop'},
  {id:5,filter:'creative',year:'2024',tag:'Creative Development',title:'Real-Time Data Visualization Suite',desc:'A WebGL-based dashboard for live operational telemetry. Three.js powers the primary 3D network graph; D3 handles supplementary time-series rendering. Sub-100ms render latency on datasets exceeding 50k nodes.',details:[{label:'Client',val:'Telecom / Network Ops'},{label:'Timeline',val:'12 weeks'},{label:'Role',val:'Creative Technologist'}],tech:['Three.js','D3.js','WebSockets','React','InfluxDB'],img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop'},
  {id:6,filter:'ai',year:'2025',tag:'AI Tooling',title:'Multimodal Content Intelligence',desc:'An end-to-end pipeline ingesting video, audio, and document assets — transcribing, summarizing, and surfacing semantic search across a library of ten thousand-plus assets with sub-second retrieval.',details:[{label:'Client',val:'Media & Entertainment'},{label:'Timeline',val:'18 weeks'},{label:'Role',val:'AI Engineering + UX'}],tech:['Whisper','Claude','FAISS','FastAPI','React','S3'],img:'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=900&q=80&auto=format&fit=crop'},
];

// ── BUILD WORK GRID ───────────────────────────────────────────────────────────
const grid = document.getElementById('workGrid');
works.forEach((w, i) => {
  const card = document.createElement('div');
  card.className = 'work-card';
  card.dataset.filter = w.filter;
  card.style.animationDelay = `${i*0.1}s`;
  card.innerHTML = `
    <div class="card-thumb">
      <img src="${w.img}" alt="${w.title}" loading="lazy"/>
      <div class="card-thumb-overlay"></div>
    </div>
    <div class="card-body">
      <div class="card-top"><span class="card-tag">${w.tag}</span><span class="card-year">${w.year}</span></div>
      <h2 class="card-title">${w.title}</h2>
      <p class="card-desc">${w.desc.slice(0,120)}…</p>
    </div>
    <span class="card-arrow">↗</span>`;
  card.addEventListener('click', () => openPresentation(i));
  grid.appendChild(card);
});

// ── FILTERS ───────────────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.work-card').forEach(c => {
      c.style.display = (f==='all' || c.dataset.filter===f) ? '' : 'none';
    });
  });
});

// ── BUILD PRESENTATION ────────────────────────────────────────────────────────
let currentSlide = -1;
const totalSlides = works.length;
const slidesEl   = document.getElementById('presSlides');
const sidebarEl  = document.getElementById('presSidebar');
const currentLabel = document.getElementById('presCurrentLabel');
const totalLabel   = document.getElementById('presTotalLabel');
const progressFill = document.getElementById('presProgressFill');
const prevBtn = document.getElementById('presPrev');
const nextBtn = document.getElementById('presNext');
const presHint = document.getElementById('presHint');

works.forEach((w, i) => {
  const slide = document.createElement('div');
  slide.className = 'pres-slide';
  slide.innerHTML = `
    <div class="slide-visual"><img src="${w.img}" alt="${w.title}"/><div class="slide-visual-overlay"></div></div>
    <div class="slide-content">
      <div>
        <p class="slide-eyebrow">Project ${String(i+1).padStart(2,'0')} / ${String(totalSlides).padStart(2,'0')}</p>
        <span class="slide-tag">${w.tag}</span>
        <h2 class="slide-title">${w.title}</h2>
        <p class="slide-desc">${w.desc}</p>
        <div class="slide-details">${w.details.map(d=>`<div class="slide-detail-row"><span class="slide-detail-label">${d.label}</span><span class="slide-detail-val">${d.val}</span></div>`).join('')}</div>
      </div>
      <div class="slide-tech">${w.tech.map(t=>`<span class="slide-tech-tag">${t}</span>`).join('')}</div>
    </div>`;
  slidesEl.appendChild(slide);

  const thumb = document.createElement('div');
  thumb.className = 'pres-thumb';
  thumb.innerHTML = `<img src="${w.img}" alt="${w.title}"/><div class="pres-thumb-label">${w.title}</div>`;
  thumb.addEventListener('click', () => goToSlide(i));
  sidebarEl.appendChild(thumb);
});

totalLabel.textContent = String(totalSlides).padStart(2,'0');

function goToSlide(idx) {
  const slides = slidesEl.querySelectorAll('.pres-slide');
  const thumbs = sidebarEl.querySelectorAll('.pres-thumb');
  if (currentSlide >= 0 && slides[currentSlide]) {
    const leaving = slides[currentSlide];
    leaving.classList.remove('active');
    leaving.classList.add('prev');
    setTimeout(() => leaving.classList.remove('prev'), 600);
  }
  currentSlide = Math.max(0, Math.min(idx, totalSlides-1));
  slides[currentSlide].classList.add('active');
  thumbs.forEach((t,i) => t.classList.toggle('active', i===currentSlide));
  thumbs[currentSlide].scrollIntoView({behavior:'smooth',block:'nearest'});
  currentLabel.textContent = String(currentSlide+1).padStart(2,'0');
  progressFill.style.width = `${((currentSlide+1)/totalSlides)*100}%`;
  prevBtn.disabled = currentSlide===0;
  nextBtn.disabled = currentSlide===totalSlides-1;
}

function openPresentation(startIdx=0) {
  document.body.classList.add('present-mode');
  document.getElementById('presentToggle').classList.add('active');
  currentSlide = -1;
  goToSlide(startIdx);
  setTimeout(() => { presHint.style.opacity='0'; }, 4000);
}

function closePresentation() {
  document.body.classList.remove('present-mode');
  document.getElementById('presentToggle').classList.remove('active');
  presHint.style.opacity='1';
}

document.getElementById('presentToggle').addEventListener('click', () => {
  document.body.classList.contains('present-mode') ? closePresentation() : openPresentation(0);
});
document.getElementById('presClose').addEventListener('click', closePresentation);
prevBtn.addEventListener('click', () => goToSlide(currentSlide-1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide+1));
document.addEventListener('keydown', e => {
  if (!document.body.classList.contains('present-mode')) return;
  if (e.key==='ArrowRight'||e.key==='ArrowDown') goToSlide(currentSlide+1);
  if (e.key==='ArrowLeft' ||e.key==='ArrowUp')   goToSlide(currentSlide-1);
  if (e.key==='Escape') closePresentation();
});
