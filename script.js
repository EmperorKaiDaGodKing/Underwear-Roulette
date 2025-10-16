// script.js - enhanced spin-the-wheel for underwear picks
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
const patterns = ['stars', 'stripes', 'checker-plaid', 'random'];
const printVariations = ['cartoon-prints', 'nerdy-prints', 'sexy-prints'];

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

  // Pick style: sometimes only plain, sometimes combo
  let style = pickRandom(styles);
  let color = pickRandom(colors);
  let pattern = null;
  let printType = null;
  let resultDesc = '';

  if (style === 'plain') {
    // Just pick a color, bold/plain
    resultDesc = `${color.toUpperCase()} (plain)`;
  } else if (style === 'pattern') {
    // Pick pattern name
    pattern = pickRandom(patterns);
    resultDesc = `${color.toUpperCase()} with ${pattern} pattern`;
  } else if (style === 'print') {
    // Pick print variation
    printType = pickRandom(printVariations);
    resultDesc = `${color.toUpperCase()} with ${printType}`;
  }

  // Sometimes, force a plain independent color pick for extra "bold"
  if (Math.random() < 0.15) { // 15% chance
    style = 'plain';
    pattern = null;
    printType = null;
    resultDesc = `${color.toUpperCase()} (plain-bold)`;
  }

  const result = {
    color,
    style,
    pattern,
    printType,
    when: new Date().toLocaleString(),
    desc: resultDesc
  };

  // update display after animation (match transition time in CSS ~1s)
  setTimeout(()=>{
    display.textContent = result.desc;
    display.style.background = color;
    display.style.color = (color === 'white' || color === 'yellow') ? '#222' : '#fff';
    detail.textContent = `Result: ${result.desc}`;

    history.unshift(result);
    if(history.length>7) history.pop();
    historyEl.innerHTML = history.map(h => `${h.when}: ${h.desc}`).join('<br>');
    if (statusEl) statusEl.textContent = 'Status: ready';
  }, 1000);
}

spinBtn.addEventListener('click', spin);

// small init
display.textContent = 'â';