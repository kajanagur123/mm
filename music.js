// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const songTitle = document.getElementById('songTitle');
    const progress = document.getElementById('progress');
    const songItems = document.querySelectorAll('.song-item');

    let currentSong = 0;
    let isPlaying = false;
    let progressInterval;

    const songs = [
        { title: 'Twinkle Twinkle Little Star', duration: 30 },
        { title: 'You Are My Sunshine', duration: 45 },
        { title: 'Happy Birthday Song', duration: 25 },
        { title: 'Brahms Lullaby', duration: 60 }
    ];

    // Initialize player
    function initPlayer() {
        updateSongDisplay();
        updateActiveItem();
    }

    // Update song display
    function updateSongDisplay() {
        if (songTitle) {
            songTitle.textContent = songs[currentSong].title;
        }
    }

    // Update active song item
    function updateActiveItem() {
        songItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSong);
        });
    }

    // Play/Pause functionality
    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (playPauseBtn) {
            playPauseBtn.textContent = isPlaying ? '⏸️' : '▶️';
        }

        if (isPlaying) {
            startProgress();
            // Add visual feedback
            playPauseBtn?.classList.add('playing');
        } else {
            stopProgress();
            playPauseBtn?.classList.remove('playing');
        }
    }

    // Progress bar animation
    function startProgress() {
        let currentTime = 0;
        const duration = songs[currentSong].duration;
        
        progressInterval = setInterval(() => {
            currentTime += 0.1;
            const progressPercent = (currentTime / duration) * 100;
            
            if (progress) {
                progress.style.width = progressPercent + '%';
            }
            
            if (currentTime >= duration) {
                nextSong();
            }
        }, 100);
    }

    function stopProgress() {
        clearInterval(progressInterval);
    }

    function resetProgress() {
        if (progress) {
            progress.style.width = '0%';
        }
    }

    // Navigation functions
    function nextSong() {
        currentSong = (currentSong + 1) % songs.length;
        changeSong();
    }

    function prevSong() {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        changeSong();
    }

    function changeSong() {
        stopProgress();
        resetProgress();
        updateSongDisplay();
        updateActiveItem();
        
        if (isPlaying) {
            startProgress();
        }
    }

    // Event listeners
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSong);
    }

    // Song item click handlers
    songItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSong = index;
            changeSong();
            if (!isPlaying) {
                togglePlayPause();
            }
        });
    });

    // Initialize the player
    initPlayer();

    // Add hover effects
    songItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS for playing animation
const musicStyle = document.createElement('style');
musicStyle.textContent = `
    .control-btn.playing {
        animation: pulse 1s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .song-item {
        cursor: pointer;
        user-select: none;
    }
    
    .song-item:active {
        transform: scale(0.98);
    }
`;
document.head.appendChild(musicStyle);