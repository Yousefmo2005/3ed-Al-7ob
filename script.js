// DOM Elements
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMsg = document.getElementById('error-msg');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const audioPlayer = document.getElementById('audio-player');
const playIcon = document.getElementById('play-icon');
const disk = document.getElementById('disk');
const progressBar = document.getElementById('progress-bar');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');

/* ------------------------------------------------
   1. PASSWORD PROTECTION
------------------------------------------------ */
const CORRECT_PASSWORD = "77";

function checkPassword() {
    const input = passwordInput.value;
    if (input === CORRECT_PASSWORD) {
        unlockSuccess();
    } else {
        errorMsg.textContent = "Incorrect password! Try again ❤️";
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// Allow Enter key
passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function unlockSuccess() {
    // 1. Confetti Explosion
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#8b0000', '#ffffff']
    });

    // 2. Hide password screen, show main content with transition
    passwordScreen.style.opacity = '0';
    setTimeout(() => {
        passwordScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        requestAnimationFrame(() => {
            mainContent.style.transition = 'opacity 1s ease';
            mainContent.style.opacity = '1';
        });

        // Auto play music on unlock (browsers might block this without interaction context, but button click provides context)
        if (!isPlaying) {
            togglePlay();
        }
    }, 800);
}

/* ------------------------------------------------
   2. BACKGROUND HEARTS ANIMATION
------------------------------------------------ */
function createFloatingHearts() {
    const container = document.getElementById('bg-hearts');
    const heartCount = 15; // Number of hearts on screen

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fa-solid', 'fa-heart', 'floating-heart');

        // Random properties
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10 + 's'; // 10-20s duration
        const size = Math.random() * 20 + 10 + 'px';
        const delay = Math.random() * 5 + 's';

        heart.style.left = left + '%';
        heart.style.fontSize = size;
        heart.style.animationDuration = animationDuration;
        heart.style.animationDelay = delay;

        container.appendChild(heart);
    }
}
createFloatingHearts();

// Click Effect
document.addEventListener('click', (e) => {
    const heart = document.createElement('i');
    heart.classList.add('fa-solid', 'fa-heart', 'click-heart');
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

/* ------------------------------------------------
   3. LOVE MESSAGE SLIDER
------------------------------------------------ */
let slideIndex = 1;

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

/* ------------------------------------------------
   4. MUSIC PLAYER
------------------------------------------------ */
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        disk.classList.remove('playing');
    } else {
        audioPlayer.play().catch(e => {
            console.log("Playback failed:", e);
            alert("Music file not found! Please ensure 'KdWy8eJOWlI.m4a' is in the folder. ❤️");
        });
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        disk.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    // Placeholder for playlist functionality
    console.log('Next song');
}

function prevSong() {
    // Placeholder for playlist functionality
    console.log('Prev song');
}

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + '%';
});

/* ------------------------------------------------
   5. PHOTO GALLERY CAROUSEL
------------------------------------------------ */
let carouselIndex = 0;

function moveCarousel(direction) {
    carouselIndex += direction;

    if (carouselIndex >= carouselItems.length) {
        carouselIndex = 0;
    } else if (carouselIndex < 0) {
        carouselIndex = carouselItems.length - 1;
    }

    const offset = carouselIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`; // RTL means +% goes left visually
}

/* ------------------------------------------------
   6. RELATIONSHIP TIMER
------------------------------------------------ */
const START_DATE = new Date("2024-12-07T04:47:00");

function updateTimer() {
    const now = new Date();
    const diff = now - START_DATE;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Initial load animation or standard update
    animateValue(daysEl, days);
    animateValue(hoursEl, hours);
    animateValue(minutesEl, minutes);
    animateValue(secondsEl, seconds);
}

function animateValue(element, newValue) {
    const currentValue = parseInt(element.textContent, 10) || 0;
    if (currentValue !== newValue) {
        // Simple update for now, can add counting effect if needed
        element.textContent = newValue < 10 ? `0${newValue}` : newValue;
    }
}

setInterval(updateTimer, 1000);
updateTimer(); // Run once immediately
