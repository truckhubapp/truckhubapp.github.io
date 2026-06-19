const liveRows=[
["09:42","Львів → Київ","Тент 20 т","Пошук перевізника","search"],
["09:51","Стрий → Львів","Бус 1,5 т","Завантаження","load"],
["10:03","Львів → Варшава","Автобус","У рейсі","run"],
["10:18","Самбір → Львів","Легкове авто","Завершено","done"],
["10:25","Тернопіль → Прага","Мікроавтобус","Пошук перевізника","search"],
["10:31","Луцьк → Львів","Тент 22 т","У рейсі","run"],
["10:38","Дрогобич → Київ","Цистерна","Завантаження","load"],
["10:41","Львів → Одеса","Рефрижератор","Пошук перевізника","search"],
["10:47","Ужгород → Кошице","Бус","У рейсі","run"],
["10:52","Київ → Харків","Фура 20 т","Пошук перевізника","search"]];
let expanded=false,soundOn=false;
function updateClock(){const el=document.querySelector("[data-clock]");if(el)el.textContent=new Date().toLocaleTimeString("uk-UA",{hour:"2-digit",minute:"2-digit",second:"2-digit"});}
setInterval(updateClock,1000);updateClock();
function renderBoard(){const box=document.querySelector("[data-live-board]");if(!box)return;box.innerHTML=liveRows.map((r,i)=>`<div class="live-row ${!expanded&&i>4?"hidden":""}"><div class="muted">${r[0]}</div><div class="route">${r[1]}</div><div class="muted">${r[2]}</div><div class="status ${r[4]}">${r[3]}</div></div>`).join("");const btn=document.querySelector("[data-toggle-board]");if(btn)btn.textContent=expanded?"Згорнути":"Показати більше";}
function toggleBoard(){expanded=!expanded;renderBoard();}
function toggleSound(){soundOn=!soundOn;const btn=document.querySelector("[data-sound]");if(btn)btn.textContent=soundOn?"🔊 Звук увімкнено":"🔇 Звук вимкнено";if(soundOn){try{const ctx=new (window.AudioContext||window.webkitAudioContext)();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.type="sine";osc.frequency.value=660;gain.gain.value=.035;osc.connect(gain);gain.connect(ctx.destination);osc.start();setTimeout(()=>{osc.stop();ctx.close();},120);}catch(e){}}}
renderBoard();
