/* ---------------- Config ---------------- */
const PHOTOS = [
  "IMG_4477.jpeg",
  "IMG_5506.jpeg",
  "IMG_6231.jpeg",
  "IMG_6244.jpeg",
  "IMG_6371.jpeg",
  "image000000.jpeg"
];

/* ---------------- Gallery ---------------- */
const gallery = document.getElementById('gallery');
if (gallery) {
  PHOTOS.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Family memory";
    gallery.appendChild(img);
  });
}

/* ---------------- Sticky Notes (localStorage) ---------------- */
const wall = document.getElementById('wall');
const emptyState = document.getElementById('emptyState');
const KEY = 'verena_notes_v1';
const COLORS = ['#fffd8c','#ffd1e6','#c7f4ff','#c8ffcf','#ead6ff']; // pastel
const ROT = ['-2deg','-1deg','1deg','2deg','-3deg','3deg'];

function renderNotes(){
  const notes = JSON.parse(localStorage.getItem(KEY) || '[]');
  wall.innerHTML = '';
  if (!notes.length){
    wall.appendChild(emptyState);
    emptyState.style.display='block';
    return;
  }
  emptyState.style.display='none';
  notes.forEach(n=>{
    const d=document.createElement('div');
    d.className='note small';
    d.style.background = n.color;
    d.style.setProperty('--rot', n.rot);
    d.innerHTML = `<div>${escapeHtml(n.text)}</div><div class="by">— ${escapeHtml(n.by)}</div>`;
    wall.appendChild(d);
  });
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]))}
renderNotes();

const form = document.getElementById('noteForm');
if (form) {
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const by = document.getElementById('who').value.trim();
    const text = document.getElementById('what').value.trim();
    if(!by||!text) return;
    const notes=JSON.parse(localStorage.getItem(KEY)||'[]');
    notes.unshift({
      by,text,ts:Date.now(),
      color: COLORS[Math.floor(Math.random()*COLORS.length)],
      rot: ROT[Math.floor(Math.random()*ROT.length)]
    });
    localStorage.setItem(KEY, JSON.stringify(notes));
    e.target.reset();
    renderNotes();
    confetti(60);
  });
}

/* ---------------- Verena Pop Quiz ---------------- */
const verenaQuiz = document.getElementById('verenaQuiz');
if (verenaQuiz) {
  verenaQuiz.addEventListener('submit', e=>{
    e.preventDefault();
    const answers = {
      q1: "a", // Germany
      q2: "a", // Latte
      q3: "d", // Solving puzzles
      q4: "a", // Lying on the beach
      q5: "a", // Summer
      q6: "c"  // Fish
    };
    let correct = 0;
    for (let q in answers) {
      const val = (new FormData(verenaQuiz)).get(q);
      if (val === answers[q]) correct++;
    }
    const out=document.getElementById('verenaQuizResult');
    out.textContent = `You got ${correct} / ${Object.keys(answers).length} correct!`;
    if (correct === Object.keys(answers).length) {
      out.textContent += " 🎉 Perfect score!";
      confetti(100);
    }
  });
}

/* ---------------- 1987 Trivia ---------------- */
const quiz = document.getElementById('quiz');
if (quiz) {
  quiz.addEventListener('submit',e=>{
    e.preventDefault();
    const pick=(new FormData(e.target)).get('q1');
    const out=document.getElementById('quizResult');
    if(!pick){ out.textContent='Pick one.'; return; }
    if(pick==='egypt'){ out.textContent='Correct — “Walk Like an Egyptian” was #1 for 1987.'; confetti(80); }
    else{ out.textContent='Close! Year-end #1 was “Walk Like an Egyptian.”'; }
  });
}

/* ---------------- Balloons ---------------- */
function launchBalloons(n=8){
  const palette=['#ff8bd1','#6ad5ff','#ffe66d','#8cff98','#caa7ff'];
  for(let i=0;i<n;i++){
    const b=document.createElement('div');
    b.className='balloon';
    b.style.left = Math.random()*100+'vw';
    b.style.setProperty('--balloon', palette[Math.floor(Math.random()*palette.length)]);
    const dur= 9000 + Math.random()*7000;
    b.style.animation=`floatUp ${dur}ms linear`;
    document.body.appendChild(b);
    setTimeout(()=>b.remove(), dur+500);
  }
}
launchBalloons(10);
setInterval(()=>launchBalloons(3), 5000);

/* ---------------- Confetti ---------------- */
function confetti(count=80){
  const colors=['#ff8bd1','#6ad5ff','#ffe66d','#8cff98','#caa7ff'];
  for(let i=0;i<count;i++){
    const d=document.createElement('div');
    d.className='confetti';
    d.style.left=Math.random()*100+'vw';
    d.style.background=colors[Math.floor(Math.random()*colors.length)];
    d.style.transform=`rotate(${Math.random()*360}deg)`;
    document.body.appendChild(d);
    const dx=(Math.random()*2-1)*60;
    const dy=window.innerHeight+40;
    d.animate([{transform:`translate(0,0) rotate(0deg)`},{transform:`translate(${dx}px,${dy}px) rotate(720deg)`}],
              {duration:4000+Math.random()*3000,iterations:1});
    setTimeout(()=>d.remove(), 5200);
  }
}

/* ---------------- Shooting stars ---------------- */
function shootingStar(){
  const s=document.createElement('div');
  s.className='shoot';
  s.style.top = Math.random()*40+'vh';
  s.style.left= Math.random()*20-10+'vw';
  const dur= 1600 + Math.random()*1200;
  s.style.animation=`shoot ${dur}ms linear forwards`;
  document.body.appendChild(s);
  setTimeout(()=>s.remove(), dur+50);
}
setInterval(shootingStar, 1500);
