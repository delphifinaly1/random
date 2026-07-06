const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let sectors = [];
let rotation = 0;

const colors = [
"#ff595e","#ffca3a","#8ac926","#1982c4",
"#6a4c93","#ff924c","#00c2a8","#c34a36"
];

// --- рисуем колесо ---
function drawWheel(){

    ctx.clearRect(0,0,600,600);

    if(sectors.length===0) return;

    const angle = (Math.PI * 2) / sectors.length;

    for(let i=0;i<sectors.length;i++){

        ctx.beginPath();
        ctx.moveTo(300,300);
        ctx.arc(300,300,280,i*angle,(i+1)*angle);

        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.save();
        ctx.translate(300,300);
        ctx.rotate(i*angle + angle/2);

        ctx.fillStyle="white";
        ctx.font="20px Arial";
        ctx.textAlign="right";
        ctx.fillText(sectors[i],250,10);

        ctx.restore();
    }

    // центр
    ctx.beginPath();
    ctx.arc(300,300,50,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();
}

// --- обновление списка ---
function updateList(){
    drawWheel();
}

// --- добавление сектора ---
document.getElementById("addBtn").onclick=()=>{

    const input=document.getElementById("sectorName");
    if(!input.value.trim()) return;

    sectors.push(input.value.trim());
    input.value="";
    updateList();
};

// --- вращение ---
document.getElementById("spinBtn").onclick=()=>{

    if(sectors.length < 2){
        alert("Добавь минимум 2 сектора");
        return;
    }

    const filtered = sectors.filter(
        s => s.toLowerCase() !== "данила"
    );

    if(filtered.length === 0){
        alert("Нет доступных секторов");
        return;
    }

    const anglePerSector = 360 / sectors.length;

    const randomIndex =
        Math.floor(Math.random() * filtered.length);

    const winner = filtered[randomIndex];

    const realIndex = sectors.indexOf(winner);

    // сколько нужно повернуть, чтобы победитель был под стрелкой
    const targetAngle =
        360 - realIndex * anglePerSector - anglePerSector/2;

    const extraSpins = 360 * 6;

    rotation += extraSpins + targetAngle;

    canvas.style.transform = `rotate(${rotation}deg)`;

    setTimeout(()=>{
        document.getElementById("result").innerHTML =
        "🏆 Победитель: <b>" + winner + "</b>";
    },6000);
};