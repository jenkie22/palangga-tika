
function createHearts() {
    const container = document.querySelector('body');
    const colors = ['#ff6b6b', '#e83e8c', '#f06292', '#ff94c2', '#ffb3c1'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');
        
        const size = Math.random() * 30 + 10;
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        heart.style.fontSize = `${size}px`;
        heart.style.color = colors[colorIndex];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 5 + 3}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(heart);
    }
}

function setupReasonAdder() {
    const addReasonButton = document.getElementById('add-reason');
    const reasonsList = document.getElementById('reasons-list');
    
    addReasonButton.addEventListener('click', function() {
        const newReason = prompt('Add another reason why you love them:');
        if (newReason && newReason.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = newReason;
            reasonsList.appendChild(li);
            
            saveReasons();
        }
    });
    
    function loadReasons() {
        const savedReasons = localStorage.getItem('love-reasons');
        if (savedReasons) {
            const reasons = JSON.parse(savedReasons);
            const defaultCount = 5; 
            
            reasons.forEach((reason, index) => {
                if (index >= defaultCount) {
                    const li = document.createElement('li');
                    li.textContent = reason;
                    reasonsList.appendChild(li);
                }
            });
        }
    }
    
    function saveReasons() {
        const items = reasonsList.querySelectorAll('li');
        const reasons = Array.from(items).map(item => item.textContent);
        localStorage.setItem('love-reasons', JSON.stringify(reasons));
    }
    
    loadReasons();
}

function setupSurprise() {
    const surpriseButton = document.getElementById('surprise-button');
    const surpriseMessage = document.getElementById('surprise-message');
    
    surpriseButton.addEventListener('click', function() {
        surpriseMessage.style.display = 'block';
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤';
                heart.classList.add('heart');
                
                const size = Math.random() * 30 + 15;
                const color = `hsl(${Math.random() * 40 + 340}, 80%, 60%)`;
                
                heart.style.fontSize = `${size}px`;
                heart.style.color = color;
                heart.style.left = `50%`;
                heart.style.top = `50%`;
                heart.style.position = 'fixed';
                heart.style.zIndex = '100';
                
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 100 + 50;
                const xVel = Math.cos(angle) * velocity;
                const yVel = Math.sin(angle) * velocity;
                
                document.body.appendChild(heart);
                
                let posX = window.innerWidth / 2;
                let posY = window.innerHeight / 2;
                let opacity = 1;
                
                const interval = setInterval(() => {
                    posX += xVel / 15;
                    posY += yVel / 15;
                    opacity -= 0.01;
                    
                    heart.style.transform = `translate(${posX - posX}px, ${posY - posY}px)`;
                    heart.style.opacity = opacity;
                    
                    if (opacity <= 0) {
                        clearInterval(interval);
                        heart.remove();
                    }
                }, 50);
            }, i * 100);
        }
    });
}

function setupMusicPlayer() {
    const playButton = document.getElementById('play-button');
    const audio = document.getElementById('love-song');
    const progressFill = document.getElementById('progress-fill');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }
    
    audio.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audio.duration);
    });
    
    audio.addEventListener('timeupdate', updateProgress);
    
    progressBar.addEventListener('click', function(e) {
        const clickPosition = (e.offsetX / progressBar.offsetWidth);
        audio.currentTime = clickPosition * audio.duration;
    });
    
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playButton.textContent = '⏸';
        } else {
            audio.pause();
            playButton.textContent = '▶';
        }
    });
    
    audio.addEventListener('ended', function() {
        playButton.textContent = '▶';
        progressFill.style.width = '0%';
        audio.currentTime = 0;
    });
}

function setupPhotos() {
    const photos = document.querySelectorAll('.photo-placeholder');
    
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            alert('To add real photos, you can replace these placeholder divs with actual <img> tags pointing to your photos.');
        });
    });
}

window.addEventListener('DOMContentLoaded', function() {
    createHearts();
    setupReasonAdder();
    setupSurprise();
    setupMusicPlayer();
    setupPhotos();
});