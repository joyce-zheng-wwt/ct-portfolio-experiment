// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top = my - 4 + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top = ry - 18 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── CANVAS BG ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], frame = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particle class
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.life = Math.random();
    this.size = Math.random() * 1.2 + 0.3;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.life += 0.003;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H || this.life > 1) this.reset();
  }
  draw() {
    const a = Math.sin(this.life * Math.PI) * 0.5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(33,6,117,${a})`;
    ctx.fill();
  }
}

for (let i = 0; i < 90; i++) particles.push(new Particle());

function drawGrid() {
  ctx.strokeStyle = 'rgba(33,6,117,0.04)';
  ctx.lineWidth = 0.5;
  const step = 80;
  for (let x = 0; x < W; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function drawConnections() {
  ctx.lineWidth = 0.4;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        const a = (1 - d / 120) * 0.1;
        ctx.strokeStyle = `rgba(33,6,117,${a})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  drawGrid();
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  frame++;
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ── CHAT ──
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chatPopup').classList.toggle('open', chatOpen);
  if (chatOpen) document.getElementById('chatInput').focus();
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage('user', msg);
  input.value = '';

  // Typing indicator
  const typingId = appendTyping();

  // Simulated AI responses (replace with real Claude API call)
  const responses = [
    "We specialize in building at the intersection of AI and creative production — tooling, interfaces, and systems that make complex work feel effortless.",
    "Our process begins with understanding the underlying problem deeply before committing to a solution. We prototype early and often.",
    "We've built everything from real-time AI pipelines to design systems powering multiple product surfaces. What aspect interests you most?",
    "Our team bridges visual design, software engineering, and applied AI — which means we can take an idea from concept to production without handoff friction.",
    "That's a great question. We'd love to explore that further — drop us a line at studio@example.com to start a conversation."
  ];

  setTimeout(() => {
    removeTyping(typingId);
    const r = responses[Math.floor(Math.random() * responses.length)];
    appendMessage('ai', r);
  }, 1400 + Math.random() * 600);
}

function appendMessage(role, text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg ${role === 'user' ? 'user' : ''}`;
  div.innerHTML = `
    <div class="msg-avatar">${role === 'user' ? 'YOU' : 'AI'}</div>
    <div class="msg-bubble">${text}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendTyping() {
  const msgs = document.getElementById('chatMessages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'msg';
  div.id = id;
  div.innerHTML = `<div class="msg-avatar">AI</div><div class="chat-typing"><span></span><span></span><span></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
