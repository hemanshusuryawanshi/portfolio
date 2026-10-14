/**
 * HEMANSHU SURYAWANSHI — HIGH-END PORTFOLIO CONTROLLER
 * Full-Stack Developer & AI Systems Engineer
 * 3D Spatial Canvas, Holographic Identity Studio, Spotify Station & Dynamic Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeroThreeScene();
    initRotatingHeadline();
    initHoloIdentityStudio();
    initSpotifyDrawer();
    initBryanTimeline();
    initHalftoneGallery();
    initCommandPalette();
    initCardSpotlight();
    initContactInteractivity();
    initSmoothScroll();
});

/* ==========================================================================
   1. PRELOADER INTRO SEQUENCE
   ========================================================================== */
function initPreloader() {
    const introEl = document.getElementById('landing-intro');
    const skipBtn = document.getElementById('skip-intro-btn');
    if (!introEl) return;

    const hideIntro = () => {
        introEl.classList.add('is-hidden');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            introEl.style.display = 'none';
        }, 850);
    };

    if (skipBtn) {
        skipBtn.addEventListener('click', hideIntro);
    }

    // Auto dismiss after 2.8s
    setTimeout(hideIntro, 2800);
}

/* ==========================================================================
   2. ROTATING HEADLINE WORD ENGINE
   ========================================================================== */
function initRotatingHeadline() {
    const wordEl = document.getElementById('rotating-word');
    if (!wordEl) return;

    const words = ['Systems', 'AI Models', 'Cloud Pipelines', 'Solutions'];
    let currentIndex = 0;

    setInterval(() => {
        wordEl.classList.add('is-changing');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            wordEl.textContent = words[currentIndex];
            wordEl.classList.remove('is-changing');
        }, 400);
    }, 2800);
}

/* ==========================================================================
   3. THREE.JS 3D SPATIAL NEBULA & CONSTELLATION BACKDROP
   ========================================================================== */
function initHeroThreeScene() {
    const canvas = document.getElementById('hero-canvas');
    const container = document.getElementById('hero-3d-container');
    if (!canvas || !container || typeof THREE === 'undefined') {
        console.warn('Three.js canvas or library not available.');
        return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Spatial Group
    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    // Dynamic Star Constellation Particle Field
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // Sky Blue
    const color2 = new THREE.Color(0xa855f7); // Purple
    const color3 = new THREE.Color(0x1db954); // Spotify Green

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 22;
        positions[i + 1] = (Math.random() - 0.5) * 16;
        positions[i + 2] = (Math.random() - 0.5) * 18;

        const mixedColor = Math.random() > 0.6 ? color1 : (Math.random() > 0.5 ? color2 : color3);
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(particleGeometry, particleMaterial);
    spaceGroup.add(starField);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        targetX = normX * 0.45;
        targetY = normY * 0.25;
    });

    // Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        spaceGroup.rotation.y = elapsedTime * 0.05 + mouseX;
        spaceGroup.rotation.x = mouseY * 0.8;

        renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

/* ==========================================================================
   4. HOLOGRAPHIC IDENTITY STUDIO & MULTI-STREAM MATRIX
   ========================================================================== */
function initHoloIdentityStudio() {
    const holoCard = document.getElementById('holo-card');
    const glare = document.getElementById('holo-glare');
    const streamButtons = document.querySelectorAll('.stream-btn');
    const streamContents = document.querySelectorAll('.stream-content');

    // 3D Card Tilt with Mouse
    if (holoCard) {
        holoCard.addEventListener('mousemove', (e) => {
            const rect = holoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -9;
            const rotateY = ((x - centerX) / centerX) * 9;

            holoCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;

            if (glare) {
                holoCard.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
                holoCard.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
            }
        });

        holoCard.addEventListener('mouseleave', () => {
            holoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    }

    // Stream Mode Tabs Switcher
    streamButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const streamKey = btn.dataset.stream;

            streamButtons.forEach((b) => {
                b.classList.remove('is-active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-selected', 'true');

            streamContents.forEach((c) => {
                c.classList.remove('active');
            });

            const activeContent = document.getElementById(`stream-${streamKey}`);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    // Interactive Button 1: Test Neural Inference
    const btnTestInference = document.getElementById('btn-test-inference');
    if (btnTestInference) {
        btnTestInference.addEventListener('click', () => {
            btnTestInference.disabled = true;
            btnTestInference.innerHTML = '<span>Processing payload...</span>';
            setTimeout(() => {
                const sampleLat = Math.floor(Math.random() * 15 + 24); // 24-38ms
                showNotification(`⚡ CyberGuard: URL payload verified as CLEAN (Inference: ${sampleLat}ms, Confidence: 99.1%)`);
                btnTestInference.disabled = false;
                btnTestInference.innerHTML = '<span class="btn-icon">⚡</span><span>Run Simulated Inference Test</span>';
            }, 650);
        });
    }

    // Interactive Button 2: Ping AWS Mumbai Hub
    const btnPingCloud = document.getElementById('btn-ping-cloud');
    if (btnPingCloud) {
        btnPingCloud.addEventListener('click', () => {
            btnPingCloud.disabled = true;
            btnPingCloud.innerHTML = '<span>Pinging AWS ap-south-1...</span>';
            setTimeout(() => {
                const samplePing = Math.floor(Math.random() * 10 + 28); // 28-37ms
                showNotification(`☁️ AWS Mumbai (ap-south-1): ${samplePing}ms • S3/Lambda Status: 100% HEALTHY`);
                btnPingCloud.disabled = false;
                btnPingCloud.innerHTML = '<span class="btn-icon">🌐</span><span>Ping AWS Mumbai Hub</span>';
            }, 550);
        });
    }

    // Interactive Button 3: Creative Lens Photo Cycler
    const btnNextPhoto = document.getElementById('btn-next-photo');
    const photoImg = document.getElementById('active-photo-preview');
    const photoTitleLbl = document.getElementById('photo-title-lbl');
    const photoCounterLbl = document.getElementById('photo-counter-lbl');

    const photos = [
        { src: '/gallery/image-2.webp', title: 'Pune Nightscapes & Light Trails' },
        { src: '/gallery/image-4.webp', title: 'Heritage Urban Architecture' },
        { src: '/gallery/image-5.webp', title: 'Misty Monsoon Serenity' },
        { src: '/gallery/image-7.webp', title: 'Campus Reflection Symmetry' },
        { src: '/gallery/image-9.webp', title: 'Royal Enfield Café Racer Craft' }
    ];
    let photoIndex = 0;

    if (btnNextPhoto && photoImg) {
        btnNextPhoto.addEventListener('click', () => {
            photoIndex = (photoIndex + 1) % photos.length;
            photoImg.style.opacity = '0';
            setTimeout(() => {
                photoImg.src = photos[photoIndex].src;
                if (photoTitleLbl) photoTitleLbl.textContent = photos[photoIndex].title;
                if (photoCounterLbl) photoCounterLbl.textContent = `${photoIndex + 1} / ${photos.length}`;
                photoImg.style.opacity = '1';
            }, 200);
            showNotification(`📸 Photo ${photoIndex + 1}: ${photos[photoIndex].title}`);
        });
    }

    // Interactive Button 4: Cricket Team Rally Pulse
    const btnCricketPulse = document.getElementById('btn-cricket-pulse');
    if (btnCricketPulse) {
        btnCricketPulse.addEventListener('click', () => {
            showNotification('🏏 "Under pressure, execution separates good from elite." — Hemanshu');
        });
    }
}

/* ==========================================================================
   5. DEDICATED SPOTIFY WIDGET, DIRECT AUDIO PLAYER & FLOATING DRAWER
   ========================================================================== */
function initSpotifyDrawer() {
    const toggleBtn = document.getElementById('spotify-toggle-btn');
    const drawer = document.getElementById('spotify-drawer');
    const closeBtn = document.getElementById('spotify-close-btn');

    // Direct HTML5 Audio Player Elements
    const audio = document.getElementById('portfolio-audio');
    const playBtn = document.getElementById('dap-play-btn');
    const playIcon = document.getElementById('dap-play-icon');
    const pauseIcon = document.getElementById('dap-pause-icon');
    const prevBtn = document.getElementById('dap-prev-btn');
    const nextBtn = document.getElementById('dap-next-btn');
    const titleEl = document.getElementById('dap-title');
    const artistEl = document.getElementById('dap-artist');
    const currTimeEl = document.getElementById('dap-curr-time');
    const totalTimeEl = document.getElementById('dap-total-time');
    const scrubber = document.getElementById('dap-scrubber');
    const dapContainer = document.querySelector('.direct-audio-player');

    const playlist = [
        {
            title: 'Voyage — Chill Lofi Beats',
            artist: "Hemanshu's Focus Selection",
            src: '/assets/voyage-DAKl0EEC.mp3'
        },
        {
            title: 'Green Hill Zone — Ambient Lofi',
            artist: 'Retro Chill Beats • Hemanshu',
            src: '/assets/green-hill-zone-lofi-BLqkUlV_.mp3'
        }
    ];

    let currentTrackIdx = 0;
    let isPlaying = false;

    function loadTrack(idx) {
        currentTrackIdx = (idx + playlist.length) % playlist.length;
        const track = playlist[currentTrackIdx];
        if (titleEl) titleEl.textContent = track.title;
        if (artistEl) artistEl.textContent = track.artist;
        if (audio) {
            audio.src = track.src;
            audio.load();
        }
    }

    function formatTime(secs) {
        if (isNaN(secs)) return '0:00';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function playAudio() {
        if (!audio) return;
        audio.play().then(() => {
            isPlaying = true;
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            if (dapContainer) dapContainer.classList.add('is-playing');
            if (toggleBtn) toggleBtn.classList.add('is-active');
        }).catch(err => {
            console.warn('Audio play request notice:', err);
        });
    }

    function pauseAudio() {
        if (!audio) return;
        audio.pause();
        isPlaying = false;
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (dapContainer) dapContainer.classList.remove('is-playing');
    }

    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadTrack(currentTrackIdx - 1);
            if (isPlaying) playAudio();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadTrack(currentTrackIdx + 1);
            if (isPlaying) playAudio();
        });
    }

    if (audio) {
        audio.addEventListener('timeupdate', () => {
            if (!isNaN(audio.duration) && audio.duration > 0) {
                const percent = (audio.currentTime / audio.duration) * 100;
                if (scrubber) scrubber.value = percent;
                if (currTimeEl) currTimeEl.textContent = formatTime(audio.currentTime);
                if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            if (totalTimeEl && !isNaN(audio.duration)) {
                totalTimeEl.textContent = formatTime(audio.duration);
            }
        });

        audio.addEventListener('ended', () => {
            loadTrack(currentTrackIdx + 1);
            playAudio();
        });
    }

    if (scrubber && audio) {
        scrubber.addEventListener('input', () => {
            if (!isNaN(audio.duration)) {
                audio.currentTime = (scrubber.value / 100) * audio.duration;
            }
        });
    }

    if (!toggleBtn || !drawer) return;

    const openDrawer = () => {
        drawer.removeAttribute('hidden');
        toggleBtn.classList.add('is-active');
    };

    const closeDrawer = () => {
        drawer.setAttribute('hidden', '');
        if (!isPlaying) {
            toggleBtn.classList.remove('is-active');
        }
    };

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (drawer.hasAttribute('hidden')) {
            openDrawer();
        } else {
            closeDrawer();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDrawer();
        });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && !drawer.hasAttribute('hidden')) {
            closeDrawer();
        }
    });

    // Global Event Listener
    window.addEventListener('toggleSpotifyGlobal', () => {
        if (drawer.hasAttribute('hidden')) {
            openDrawer();
        } else {
            closeDrawer();
        }
    });
}

/* ==========================================================================
   6. ENGAGING CONTACT SECTION & LIVE PUNE CLOCK
   ========================================================================== */
function initContactInteractivity() {
    // 1. Live Pune Time Clock (IST • Asia/Kolkata)
    const clockEl = document.getElementById('pune-clock');
    if (clockEl) {
        const updateClock = () => {
            const now = new Date();
            const timeStr = new Intl.DateTimeFormat('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).format(now);
            clockEl.textContent = `${timeStr} IST • Live`;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 2. 1-Click Copy Email Pill
    const copyEmailCard = document.getElementById('btn-copy-email');
    const copyBadgePill = document.getElementById('copy-badge-pill');
    if (copyEmailCard) {
        copyEmailCard.addEventListener('click', () => {
            navigator.clipboard.writeText('hemanshusuryawanshi007@gmail.com').then(() => {
                if (copyBadgePill) {
                    copyBadgePill.textContent = 'Copied! ✓';
                    copyBadgePill.style.background = '#22c55e';
                    copyBadgePill.style.color = '#ffffff';
                    setTimeout(() => {
                        copyBadgePill.textContent = 'Copy 📋';
                        copyBadgePill.style.background = '';
                        copyBadgePill.style.color = '';
                    }, 2500);
                }
                showNotification('📋 Email copied to clipboard: hemanshusuryawanshi007@gmail.com');
            }).catch(() => {
                showNotification('hemanshusuryawanshi007@gmail.com');
            });
        });
    }

    // 3. Interactive Topic Chips (Auto-Fill Message)
    const topicChips = document.querySelectorAll('.topic-chip');
    const messageInput = document.getElementById('contact-message');

    const topicTemplates = {
        'AI / ML System': "Hi Hemanshu, I came across your work in AI systems and want to discuss building an intelligent application with machine learning inference...",
        'AWS Cloud Architecture': "Hi Hemanshu, I'd like to consult with you on designing a scalable, serverless cloud architecture on AWS...",
        'Internship / Role': "Hi Hemanshu, we were impressed by your engineering portfolio and want to connect with you regarding an engineering opportunity...",
        'Photography Project': "Hey Hemanshu, love your street and architectural photography in Pune! Wanted to chat about a visual collaboration...",
        'Tech Coffee Chat': "Hey Hemanshu! Would love to grab a virtual coffee and chat about AI, distributed systems, and tech!"
    };

    topicChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            topicChips.forEach((c) => c.classList.remove('is-selected'));
            chip.classList.add('is-selected');

            const topic = chip.dataset.topic;
            if (messageInput && topicTemplates[topic]) {
                messageInput.value = topicTemplates[topic];
                messageInput.focus();
                messageInput.setSelectionRange(messageInput.value.length, messageInput.value.length);
                showNotification(`Topic Selected: ${topic} ⚡`);
            }
        });
    });

    // 4. Contact Form Submission
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                if (statusMsg) {
                    statusMsg.textContent = 'Please fill out all fields before dispatching.';
                    statusMsg.className = 'form-status-msg error';
                }
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Dispatching Transmission...</span>';
            }

            setTimeout(() => {
                if (statusMsg) {
                    statusMsg.textContent = '🚀 Transmission received! Hemanshu will reach out to you shortly.';
                    statusMsg.className = 'form-status-msg success';
                }
                form.reset();
                topicChips.forEach((c) => c.classList.remove('is-selected'));

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Transmission Sent ✓</span>';
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Dispatch Transmission</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                    }, 4000);
                }
            }, 750);
        });
    }
}

/* ==========================================================================
   7. COMMAND PALETTE (CMD+K / CTRL+K)
   ========================================================================== */
function initCommandPalette() {
    const modal = document.getElementById('cmd-k-modal');
    const triggerBtn = document.getElementById('cmd-k-btn');
    const input = document.getElementById('cmdk-search');
    const items = document.querySelectorAll('.cmdk-item');
    if (!modal) return;

    const openModal = () => {
        modal.removeAttribute('hidden');
        if (input) {
            input.value = '';
            input.focus();
        }
        filterItems('');
    };

    const closeModal = () => {
        modal.setAttribute('hidden', '');
    };

    if (triggerBtn) {
        triggerBtn.addEventListener('click', openModal);
    }

    // Global Keydown (⌘K or Ctrl+K)
    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (modal.hasAttribute('hidden')) {
                openModal();
            } else {
                closeModal();
            }
        } else if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (input) {
        input.addEventListener('input', (e) => {
            filterItems(e.target.value.toLowerCase().trim());
        });
    }

    function filterItems(query) {
        items.forEach((item) => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Item Actions
    items.forEach((item) => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            const target = item.dataset.target;
            closeModal();

            if (action === 'goto' && target) {
                const sec = document.querySelector(target);
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'toggle-spotify') {
                window.dispatchEvent(new CustomEvent('toggleSpotifyGlobal'));
            } else if (action === 'download-resume') {
                const link = document.createElement('a');
                link.href = 'Hemanshu_Resume.pdf';
                link.download = 'Hemanshu_Resume.pdf';
                link.click();
            } else if (action === 'copy-email') {
                navigator.clipboard.writeText('hemanshusuryawanshi007@gmail.com');
                showNotification('📋 Email copied to clipboard!');
            } else if (action === 'open-github') {
                window.open('https://github.com/hemanshusuryawanshi', '_blank');
            }
        });
    });
}

/* ==========================================================================
   8. CARD SPOTLIGHT HOVER EFFECT
   ========================================================================== */
function initCardSpotlight() {
    const cards = document.querySelectorAll('.bento-card, .timeline-card, .contact-info-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   9. SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ==========================================================================
   10. CELEBRATORY TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showNotification(msg) {
    const existingToasts = document.querySelectorAll('.portfolio-toast');
    existingToasts.forEach((t) => t.remove());

    const toast = document.createElement('div');
    toast.className = 'portfolio-toast';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 28px;
        background: #111827;
        color: #ffffff;
        font-family: var(--font-sans);
        font-size: 0.88rem;
        font-weight: 600;
        padding: 12px 22px;
        border-radius: 9999px;
        border: 1px solid rgba(59, 130, 246, 0.4);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.3);
        z-index: 100000;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/* ==========================================================================
   11. BRYAN GARAGE INTERACTIVE TIMELINE CONTROLLER (EDUCATION & JOURNEY)
   ========================================================================== */
function initBryanTimeline() {
    const scrollContainer = document.getElementById('tl-scroll-container');
    const popover = document.getElementById('tl-floating-popover');
    const trackEl = document.getElementById('tl-track');
    const prevBtn = document.getElementById('tl-prev-btn');
    const nextBtn = document.getElementById('tl-next-btn');

    if (!scrollContainer || !popover || !trackEl) return;

    // 1. Mouse Drag-to-Scroll on Timeline
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    scrollContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('a, button')) return;
        isDown = true;
        scrollContainer.classList.add('is-dragging');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.classList.remove('is-dragging');
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.classList.remove('is-dragging');
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // 2. Mouse Wheel to Horizontal Scroll
    scrollContainer.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            scrollContainer.scrollLeft += e.deltaY * 0.9;
        }
    }, { passive: true });

    // 3. Milestone Data Store with Authentic Rich Media
    const milestoneData = {
        'btech-aiml': {
            title: 'B.Tech in Artificial Intelligence & Machine Learning',
            inst: 'Symbiosis SCSIT / R.C. Patel Institute of Technology • Pune, MH',
            date: '2023 — 2027 (Expected)',
            status: 'Ongoing • Core Degree',
            badge: 'GPA: 7.2 / 10',
            description: 'Comprehensive coursework covering Machine Learning, Computer Vision, Neural Networks, Distributed Systems, and Serverless Cloud Architectures.',
            media: {
                type: 'video',
                src: '/assets/neu-trimmed-BusknyAv.mp4'
            },
            stats: [
                { label: 'Neural & ML', val: '94%' },
                { label: 'Cloud Systems', val: '92%' },
                { label: 'Distributed AI', val: '90%' }
            ],
            tags: ['Python', 'FastAPI', 'PyTorch', 'AWS Boto3', 'Computer Vision']
        },
        'aws-python': {
            title: 'Certificate in AWS with Python',
            inst: 'Symbiosis Skill University • Pune, Maharashtra',
            date: '2024 — 2025',
            status: 'Cloud Specialization',
            badge: 'Project Heavy',
            description: 'Deep engineering in serverless architectures, Docker containerization, AWS ECS Fargate, S3 automated pipelines, DynamoDB & RDS persistence, and CloudWatch telemetry.',
            media: {
                type: 'video',
                src: '/assets/imagine-redux-CthsR9LM.mp4'
            },
            stats: [
                { label: 'AWS Services', val: '12+' },
                { label: 'Pipelines Built', val: '8' },
                { label: 'Uptime Reliability', val: '99.9%' }
            ],
            tags: ['AWS Lambda', 'ECS Fargate', 'DynamoDB', 'EventBridge', 'Docker']
        },
        'fetch-ai': {
            title: 'Head of Design & Media Team',
            inst: 'Fetch.ai Student Community / AI Chapter',
            date: 'Jan 2024 — Present',
            status: 'Active Leadership Role',
            badge: 'Campus Leadership',
            description: 'Directing visual identity, workshop media production, hackathon outreach, and developer community evangelism across engineering cohorts.',
            media: {
                type: 'video',
                src: '/assets/propcard-compressed-BN0QPArA.mp4'
            },
            stats: [
                { label: 'Workshops Led', val: '6+' },
                { label: 'Community Reach', val: '500+' },
                { label: 'Engagement', val: '+140%' }
            ],
            tags: ['Leadership', 'Media Direction', 'Technical Outreach', 'AI Community']
        },
        'r3sys-java': {
            title: 'Enterprise Java Systems Training',
            inst: 'R3Sys Technical Institute',
            date: '2025',
            status: 'Training Certification',
            badge: 'Core Systems',
            description: 'Mastered Object-Oriented Design Patterns, Multithreading, Enterprise JDBC, and Multi-tier distributed software architectures.',
            media: {
                type: 'img',
                src: '/images/project-distributed.jpg'
            },
            stats: [
                { label: 'OOP Patterns', val: 'Design' },
                { label: 'Architecture', val: 'Multi-Tier' },
                { label: 'Core Java', val: 'Certified' }
            ],
            tags: ['Java 17', 'OOP Patterns', 'Multithreading', 'JDBC', 'Software Design']
        },
        'hsc-science': {
            title: 'Higher Secondary Certificate (HSC) — Science',
            inst: 'Pratap College • Maharashtra State Board',
            date: '2022 — 2023',
            status: 'Graduated',
            badge: 'Score: 71%',
            description: 'Coursework across Physics, Chemistry, Mathematics, and Computer Science fundamentals, cultivating analytical and algorithmic problem-solving.',
            media: {
                type: 'img',
                src: '/gallery/image-4.webp'
            },
            stats: [
                { label: 'Physics & Math', val: 'Core' },
                { label: 'CS Foundation', val: 'Algorithms' },
                { label: 'Total Score', val: '71%' }
            ],
            tags: ['Mathematics', 'Computer Science', 'Physics', 'Logic Synthesis']
        },
        'ssc-board': {
            title: 'Secondary School Certificate (Class 10th - SSC)',
            inst: 'Maharashtra State Board',
            date: '2021',
            status: 'Graduated with Distinction',
            badge: 'Score: 81% Distinction',
            description: 'Graduated with high distinction across Mathematics, Science, and Analytical Computing.',
            media: {
                type: 'img',
                src: '/gallery/image-7.webp'
            },
            stats: [
                { label: 'Mathematics', val: 'High Distinction' },
                { label: 'Science', val: 'Distinction' },
                { label: 'Overall', val: '81%' }
            ],
            tags: ['Foundational Science', 'Mathematics', 'Analytical Computing']
        },
        'foundation': {
            title: 'Multidisciplinary Engineering Foundation',
            inst: 'Core Systems · Distributed Architecture · Visual Design',
            date: '2021 — 2027 Ongoing',
            status: 'Holistic Technical Synthesis',
            badge: 'Engineering Core',
            description: 'Deep foundations synthesizing serverless cloud infrastructure on AWS, neural artificial intelligence pipelines, and high-performance front-end interaction.',
            media: {
                type: 'video',
                src: '/assets/imagine-redux-CthsR9LM.mp4'
            },
            stats: [
                { label: 'Cloud & AI', val: 'Production' },
                { label: 'Architecture', val: 'Distributed' },
                { label: 'Frontend', val: 'Interactive' }
            ],
            tags: ['AWS Pipelines', 'Three.js Spatial', 'PyTorch ML', 'Docker', 'Event-Driven']
        }
    };

    function updatePopover(key, barEl) {
        const data = milestoneData[key];
        if (!data || !popover) return;

        let mediaHtml = '';
        if (data.media) {
            if (data.media.type === 'video') {
                mediaHtml = `
                    <div class="tl-popover-media">
                        <video autoplay muted loop playsinline src="${data.media.src}"></video>
                        <div class="tl-popover-media-overlay"></div>
                    </div>
                `;
            } else {
                mediaHtml = `
                    <div class="tl-popover-media">
                        <img src="${data.media.src}" alt="${data.title}">
                        <div class="tl-popover-media-overlay"></div>
                    </div>
                `;
            }
        }

        popover.innerHTML = `
            ${mediaHtml}
            <div class="tl-popover-inner">
                <div class="tl-popover-header">
                    <div class="tl-popover-title-row">
                        <span class="tl-popover-badge">${data.badge}</span>
                        <span class="tl-popover-date">${data.date}</span>
                    </div>
                    <h4 class="tl-popover-title">${data.title}</h4>
                    <p class="tl-popover-inst">${data.inst}</p>
                </div>

                <p class="tl-popover-desc">${data.description}</p>

                <div class="tl-popover-stats">
                    ${data.stats.map(s => `
                        <div class="tl-stat-item">
                            <span class="tl-stat-label">${s.label}</span>
                            <span class="tl-stat-val">${s.val}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="tl-popover-tags">
                    ${data.tags.map(t => `<span class="tl-tag-pill">${t}</span>`).join('')}
                </div>
            </div>
        `;

        if (trackEl && barEl) {
            const leftOffset = barEl.offsetLeft + (barEl.offsetWidth / 2) - 190;
            const clampedOffset = Math.max(30, Math.min(leftOffset, trackEl.offsetWidth - 400));
            popover.style.left = `${clampedOffset}px`;
            
            // Position above or pinned at top
            if (barEl.offsetTop > 320) {
                popover.style.top = '36px';
            } else {
                popover.style.top = '36px';
            }

            popover.classList.add('is-visible');
        }
    }

    // Auto-Close Management (Closes when cursor leaves box or popover range)
    let closeTimer = null;

    const allMilestoneElements = [
        ...document.querySelectorAll('.tl-bar'),
        ...document.querySelectorAll('.tl-umbrella-bar'),
        ...document.querySelectorAll('.tl-foundation-bar')
    ];

    function closePopover() {
        popover.classList.remove('is-visible');
        allMilestoneElements.forEach(el => el.classList.remove('is-active'));
    }

    function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            closePopover();
        }, 130);
    }

    function cancelClose() {
        clearTimeout(closeTimer);
    }

    allMilestoneElements.forEach(bar => {
        const key = bar.dataset.milestone;

        bar.addEventListener('mouseenter', () => {
            cancelClose();
            allMilestoneElements.forEach(b => b.classList.remove('is-active'));
            bar.classList.add('is-active');
            updatePopover(key, bar);
        });

        bar.addEventListener('mouseleave', () => {
            scheduleClose();
        });

        bar.addEventListener('click', (e) => {
            e.stopPropagation();
            cancelClose();
            allMilestoneElements.forEach(b => b.classList.remove('is-active'));
            bar.classList.add('is-active');
            updatePopover(key, bar);
        });
    });

    // Popover hover management
    popover.addEventListener('mouseenter', cancelClose);
    popover.addEventListener('mouseleave', scheduleClose);

    // Track mouseleave: close immediately
    trackEl.addEventListener('mouseleave', () => {
        closePopover();
    });

    scrollContainer.addEventListener('mouseleave', () => {
        closePopover();
    });

    // Prev / Next Controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -360, behavior: 'smooth' });
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 360, behavior: 'smooth' });
        });
    }

    // Initial scroll position: center around 2024-2026 milestones
    setTimeout(() => {
        scrollContainer.scrollTo({ left: 420, behavior: 'smooth' });
    }, 700);
}

/* ==========================================================================
   12. HALFTONE DITHER MATRIX PHOTOGRAPHY GALLERY ("HOVER TO DEVELOP")
   ========================================================================== */
function initHalftoneGallery() {
    const track = document.getElementById('ps-track');
    const frames = document.querySelectorAll('.ps-frame');

    if (!track || frames.length === 0) return;

    // 1. Mouse Drag-to-Scroll on Gallery Filmstrip
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('is-dragging');
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('is-dragging');
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    // 2. Mouse Wheel to Horizontal Scroll
    track.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            track.scrollLeft += e.deltaY * 0.9;
        }
    }, { passive: true });

    // 3. Render Halftone Dot Screen Matrix on each frame's canvas
    frames.forEach((frame) => {
        const img = frame.querySelector('.ps-img');
        const canvas = frame.querySelector('.ps-canvas');
        if (!img || !canvas) return;

        function renderHalftone() {
            const width = 320;
            const height = 213;
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Offscreen canvas for downsampled pixel luminance reading
            const offscreen = document.createElement('canvas');
            const sampleW = 160;
            const sampleH = 106;
            offscreen.width = sampleW;
            offscreen.height = sampleH;
            const offCtx = offscreen.getContext('2d');
            if (!offCtx) return;

            try {
                offCtx.drawImage(img, 0, 0, sampleW, sampleH);
                const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;

                // Canvas dark background fill
                ctx.fillStyle = '#08080c';
                ctx.fillRect(0, 0, width, height);

                const cellSize = 5; // Dot grid pitch
                const cols = Math.floor(width / cellSize);
                const rows = Math.floor(height / cellSize);

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const centerX = c * cellSize + cellSize / 2;
                        const centerY = r * cellSize + cellSize / 2;

                        const sampleX = Math.floor((c / cols) * sampleW);
                        const sampleY = Math.floor((r / rows) * sampleH);
                        const idx = (sampleY * sampleW + sampleX) * 4;

                        const red = imgData[idx];
                        const green = imgData[idx + 1];
                        const blue = imgData[idx + 2];

                        // Rec. 709 Luminance
                        const lum = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

                        if (lum > 0.07) {
                            const radius = Math.max(0.65, (cellSize / 2 - 0.45) * Math.pow(lum, 0.78));
                            const alpha = 0.38 + 0.62 * lum;
                            ctx.fillStyle = `rgba(240, 240, 252, ${alpha})`;
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            } catch (err) {
                console.warn('Halftone matrix rendering notice:', err);
            }
        }

        if (img.complete && img.naturalWidth > 0) {
            renderHalftone();
        } else {
            img.addEventListener('load', renderHalftone);
        }
    });
}


