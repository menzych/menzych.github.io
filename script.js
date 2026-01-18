const overlay = document.getElementById('enter-overlay');
const mainContent = document.getElementById('main-content');

const playAudio = () => {
    const audio = new Audio('assets/music/music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play().catch(() => {});
};

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    setTimeout(() => {
        mainContent.classList.remove('hidden');
        playAudio();
        typeWriter();
    }, 500);
});

const textElement = document.getElementById('typewriter');
const phrases = [
    "developer",
    "visuals",
    "coding"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }
    setTimeout(typeWriter, typeSpeed);
}

function switchView(viewName) {
    const homeView = document.getElementById('home-view');
    const aboutView = document.getElementById('about-view');

    if (viewName === 'about') {
        homeView.classList.remove('active-view');
        homeView.classList.add('hidden-view');

        setTimeout(() => {
            aboutView.classList.remove('hidden-view');
            aboutView.classList.add('active-view');
        }, 100);
    } else {
        aboutView.classList.remove('active-view');
        aboutView.classList.add('hidden-view');

        setTimeout(() => {
            homeView.classList.remove('hidden-view');
            homeView.classList.add('active-view');
        }, 100);
    }
}

const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

function initStars() {
    stars = [];
    const starCount = Math.floor((width * height) / 5000);
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.4 + 0.1,
            opacity: Math.random() * 0.8 + 0.2
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
            star.speed = Math.random() * 0.4 + 0.1;
        }
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', resize);
resize();
animateStars();