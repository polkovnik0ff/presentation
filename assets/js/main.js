const TOTAL = 8;
let cur = 0;
const slides = document.querySelectorAll('.slide');
const dotsEl = document.getElementById('dots');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bar = document.getElementById('progressBar');
const labels = ['Титул','Тендеры','Блог ЦУМ','Чат-бот','Аудиты','Контент','Отчётность','GitHub Pages'];
const visited = new Set([0]);

// Build dots
for(let i=0;i<TOTAL;i++){
  const d = document.createElement('button');
  d.className = 'dot' + (i===0?' active visited':'');
  d.title = labels[i];
  d.addEventListener('click', (()=>{const idx=i;return()=>goTo(idx)})());
  dotsEl.appendChild(d);
}

function updateUI(){
  counter.textContent = (cur+1)+' / '+TOTAL;
  prevBtn.disabled = cur===0;
  nextBtn.disabled = cur===TOTAL-1;
  bar.style.width = ((cur+1)/TOTAL*100)+'%';
  const dots = dotsEl.querySelectorAll('.dot');
  dots.forEach((d,i)=>{
    d.className = 'dot'+(i===cur?' active':'')+(visited.has(i)?' visited':'');
  });
}

function goTo(n){
  if(n===cur) return;
  slides[cur].classList.remove('active');
  cur = Math.max(0, Math.min(TOTAL-1, n));
  visited.add(cur);
  slides[cur].classList.add('active');
  updateUI();
}

function go(dir){ goTo(cur+dir); }

document.addEventListener('keydown', e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowDown') go(1);
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')  go(-1);
});

updateUI();
