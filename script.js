// script.js - simple spin-the-wheel that picks color + style
console.log('script.js loaded');
const wheel = document.getElementById('wheel');
const display = document.getElementById('display');
const spinBtn = document.getElementById('spin');
const detail = document.getElementById('detail');
const historyEl = document.getElementById('history');
const statusEl = document.getElementById('status');

// Options
const colors = ['red','white','blue','yellow','orange','purple','gray','green','pink'];
const styles = ['plain','print','pattern'];

let history = [];

function pickRandom(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function spin(){
  // set status
  if (statusEl) statusEl.textContent = 'Status: spinning...';
  // visual rotation (random degrees for fun)
  const spins = Math.floor(Math.random()*6) + 4; // 4..9 full spins
  const extra = Math.floor(Math.random()*360);
  const deg = spins*360 + extra;
  wheel.style.transform = `rotate(${deg}deg)`;

  // pick a result
  const color = pickRandom(colors);
  const style = pickRandom(styles);
  const result = { color, style, when: new Date().toLocaleString() };

  // update display after animation (match transition time in CSS ~1s)
  setTimeout(()=>{
    display.textContent = `${color.toUpperCase()} (${style})`;
    display.style.background = color;
    display.style.color = (color === 'white' || color === 'yellow') ? '#222' : '#fff';
    detail.textContent = `Result: ${color} — ${style}`;

    history.unshift(result);
    if(history.length>7) history.pop();
    historyEl.innerHTML = history.map(h => `${h.when}: ${h.color} (${h.style})`).join('<br>');
    if (statusEl) statusEl.textContent = 'Status: ready';
  }, 1000);
}

spinBtn.addEventListener('click', spin);

// small init
display.textContent = '—';
