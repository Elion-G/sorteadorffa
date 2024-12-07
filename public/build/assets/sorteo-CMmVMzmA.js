let o=[],h=[],g,m=Array.from({length:642},(e,t)=>t+1),i=0,f=5e3;function p(){const e=Math.floor(Math.random()*m.length);return m.splice(e,1)[0]}window.addEventListener("DOMContentLoaded",()=>{$.ajax({url:"/get-total-sorteo",type:"GET",timeout:-1,success:function(e){e&&Array.isArray(e.sorteables)&&Array.isArray(e.total)?(o=[...e.total],h=[...e.sorteables]):alert("Formato de datos inesperado o datos incompletos.")},error:function(e,t,n){console.error("Error en la solicitud:",n)}}),window.addEventListener("keydown",e=>{var t=document.getElementById("main-ruleta");document.getElementById("main-premios");var n=document.getElementById("main-sorteado"),s=document.getElementById("main-fondo-principal");(e.code==="ArrowRight"||e.code==="ArrowLeft"||e.code==="Space")&&(e.preventDefault(),t.classList.contains("d-none")&&h.length!==0&&(s.classList.add("d-none"),n.classList.add("d-none"),t.classList.remove("d-none"),y()))})});function y(){if(o.length===0||m.length===0)return;const e=document.querySelector("#ruleta-premios"),t=document.querySelector("#ruleta-numeros"),n=()=>{g=setInterval(()=>{o[i];const r=Math.floor(Math.random()*642)+1,a=[131274,127061,121642,111209,129528,123326,111211,122723,105607,123969,128570];function d(){const l=Math.floor(Math.random()*a.length);return a[l]}e.innerHTML=`
                <img src="${"/images/"+d()+".jpg"}" alt="Giro">
                <div>GIRANDO...</div>
            `,t.innerHTML=`
                <h1>${r}</h1>
            `,i=(i+1)%o.length},110)},s=()=>{clearInterval(g);const r=o[i],a=p(),d=[131274,127061,121642,111209,129528,123326,111211,122723,105607,123969,128570];function l(){const u=Math.floor(Math.random()*d.length);return d[u]}e.innerHTML=`
            <img src="${"/images/"+l()+".jpg"}" alt="Imagen de ${r.descripcion}">
            <div>${r.descripcion}</div>
        `,t.innerHTML=`
            <h1>${a}</h1>
        `},c=()=>{n(),setTimeout(()=>{s(),f=2e3,setTimeout(()=>{c()},5e3)},f)};c()}
