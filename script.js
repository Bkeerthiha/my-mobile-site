// --- 1. THE HEART ENGINE ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Fixed: Added resize handler to keep hearts full-screen
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let hearts = [];
class Heart {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 77, 109, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fill();
    }
    update() {
        this.y -= this.speed;
        if (this.y < -20) this.reset();
    }
}

function initHearts() { 
    for (let i = 0; i < 50; i++) hearts.push(new Heart()); 
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(animate);
}

initHearts();
animate();

// --- 2. THE LOGIC ---
function checkPassword() {
    // .trim() handles accidental spaces at the end of the name
    const input = document.getElementById('password-input').value.trim();
    
    // UPDATED: Using lowercase for comparison to ensure it works
    const myPassword = "gowrishankar"; 
    const lovedOneName = "GowriShankar"; 

    if (input.toLowerCase() === myPassword) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('proposal-container').style.display = 'block';
        
        // Sets the name in the proposal text
        document.getElementById('loved-one-name').innerText = lovedOneName;
        
        setGreeting();
    } else {
        alert("Incorrect key! Hint: " + lovedOneName);
    }
}

function setGreeting() {
    const hours = new Date().getHours();
    const greet = document.getElementById('greeting');
    if (hours < 12) greet.innerText = "Good Morning, My Love";
    else if (hours < 18) greet.innerText = "Good Afternoon, My Love";
    else greet.innerText = "Good Evening, Soulmate";
}

function celebrate() {
    alert("❤️ My heart is yours forever! ❤️");
}