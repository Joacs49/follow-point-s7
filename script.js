const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const enemigo = {
    x: 50,
    y: 50,
    radius: 15,
    color: '#e74c3c', 
    velocidad: 1.5
};

const objetivo = {
    x: 500,
    y: 300,
    radius: 10,
    color: '#2ecc71' 
};

function dibujarCirculo(objeto) {
    ctx.beginPath();
    ctx.arc(objeto.x, objeto.y, objeto.radius, 0, Math.PI * 2);
    ctx.fillStyle = objeto.color;
    ctx.fill();
    ctx.closePath();
}

function moverIA(entidad, destino) {
    const dx = destino.x - entidad.x;
    const dy = destino.y - entidad.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia > 1) {
        entidad.x += (dx / distancia) * entidad.velocidad;
        entidad.y += (dy / distancia) * entidad.velocidad;
    }
}

function actualizar() {
    moverIA(enemigo, objetivo); 
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dibujarCirculo(objetivo);

    dibujarCirculo(enemigo);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    objetivo.x = x;
    objetivo.y = y;
});

function loop() {
    actualizar();
    dibujar();
    requestAnimationFrame(loop);
}

loop();