const myModule=(()=>{"use strict";let e=[],t=["C","D","H","S"],l=["A","J","Q","K"],a=[];document.querySelector("#btnNew");let r=document.querySelector("#btnAsk"),d=document.querySelector("#btnStop"),n=document.querySelectorAll(".divCards"),s=document.querySelectorAll("small"),o=()=>{e=[];for(let a=2;a<=10;a++)for(let r of t)e.push(a+r);for(let d of t)for(let n of l)e.push(n+d);return _.shuffle(e)},i=(t=2)=>{e=o(),a=[];for(let l=0;l<t;l++)a.push(0);s.forEach(e=>e.innerText=0),n.forEach(e=>e.innerHTML=""),r.disabled=!1,d.disabled=!1},c=()=>e.length?e.pop():console.warn("Mazo vac\xedo"),u=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},$=(e,t)=>(a[t]+=u(e),s[t].innerText=a[t],a[t]),b=(e,t)=>{let l=document.createElement("img");l.src=`assets/cards/${e}.png`,l.classList.add("card"),n[t].append(l)},f=()=>{let[e,t]=a;setTimeout(()=>{t===e?alert("Nadie gana"):e>21?alert("Computadora gana"):t>21?alert("Jugador Gana"):alert("Computadora gana")},100)},g=e=>{let t=0;do{let l=c();t=$(l,a.length-1),b(l,a.length-1)}while(t<e&&e<=21);f()};return r.addEventListener("click",()=>{let e=c(),t=$(e,0);b(e,0),t>21?(console.warn("Perdiste"),r.disabled=!0,d.disabled=!0,g(t)):21===t&&(console.warn("21, genial"),r.disabled=!0,d.disabled=!0,g(t))}),d.addEventListener("click",()=>{r.disabled=!0,d.disabled=!0,g(a[0])}),{newGame:i}})();