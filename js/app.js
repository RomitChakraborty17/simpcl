const display = document.getElementById('display');
let currentValue = 0;
let currentOp = '';
let startNumber = true;

function trimDouble(v) {
  return Number.isInteger(v) ? String(v) : String(v);
}

function compute(a,b,op){
  switch(op){
    case '+': return a+b;
    case '-': return a-b;
    case '*': return a*b;
    case '/': if(b===0) throw new Error('Division by zero'); return a/b;
    default: return b;
  }
}

function onButton(text){
  if(text==='C'){
    currentValue=0; currentOp=''; display.value='0'; startNumber=true; return;
  }
  if(text==='±'){
    if(display.value==='0') return; display.value = display.value.startsWith('-') ? display.value.slice(1) : '-'+display.value; return;
  }
  if(text==='%'){
    let v = parseFloat(display.value||'0'); display.value = trimDouble(v/100); startNumber=true; return;
  }
  if(['+','-','*','/'].includes(text)){
    let d = parseFloat(display.value||'0');
    if(currentOp==='') currentValue=d; else { currentValue = compute(currentValue,d,currentOp); display.value = trimDouble(currentValue); }
    currentOp=text; startNumber=true; return;
  }
  if(text==='='){
    if(currentOp==='') return; let d = parseFloat(display.value||'0'); let r = compute(currentValue,d,currentOp); display.value = trimDouble(r); currentValue=r; startNumber=true; currentOp=''; return;
  }
  if(text==='.'){
    if(startNumber){ display.value='0.'; startNumber=false; return;} if(!display.value.includes('.')) display.value += '.'; return;
  }
  // digit
  if(startNumber){ display.value = text; startNumber=false; } else { display.value = display.value==='0'?text:display.value+text; }
}

document.querySelectorAll('.buttons button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const action = btn.getAttribute('data-action');
    if(action==='operator') onButton(btn.textContent.trim());
    else if(action==='equals') onButton('=');
    else if(action==='clear') onButton('C');
    else if(action==='decimal') onButton('.');
    else if(action==='negate') onButton('±');
    else if(action==='percent') onButton('%');
    else onButton(btn.textContent.trim());
  });
});
