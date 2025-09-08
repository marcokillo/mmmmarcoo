const CORRECT = "1357";
let input = "";
const overlay = document.getElementById("overlay");
const hotspot = document.getElementById("hotspot");
const dots = document.querySelectorAll(".dot");
const msg = document.getElementById("msg");
const panel = document.getElementById("panel");

let activated = false; // فقط بعد از کلیک فعال میشه

function render(){
  dots.forEach((d,i)=> d.classList.toggle("filled", i<input.length));
}
function reset(){ 
  input=""; 
  render(); 
  msg.style.display="none"; 
}
function check(){
  if(input===CORRECT){
    msg.style.display="block";
  } else {
    panel.classList.add("shake");
    setTimeout(()=> panel.classList.remove("shake"), 300);
    input=""; render();
  }
}

// کلیک → فعال‌سازی
hotspot.addEventListener("click", ()=>{
  activated = true;
});

// هاور فقط وقتی کلیک قبلاً انجام شده
hotspot.addEventListener("mouseenter", ()=>{
  if(activated){
    overlay.classList.add("show");
    reset();
  }
});

// بستن با کلیک بیرون
overlay.addEventListener("click",(e)=>{
  if(e.target===overlay){ 
    overlay.classList.remove("show"); 
    activated = false; 
  }
});

// بستن با دکمه
document.getElementById("close").addEventListener("click",()=>{
  overlay.classList.remove("show");
  activated = false;
});

// صفحه کلید
document.querySelectorAll(".key").forEach(k=>{
  k.addEventListener("click",()=>{
    if(k.id==="clear"){ 
      input=input.slice(0,-1); 
      render(); 
      return; 
    }
    if(input.length>=4) return;
    input += k.dataset.k;
    render();
    if(input.length===4){ check(); }
  });
});
