/**
 * HEMANSHU SURYAWANSHI — HIGH-END PORTFOLIO CONTROLLER
 * Faithful Recreation of Sean Currlin's Aesthetics, Flow, & 3D Spatial Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeroThreeScene();
    initRotatingHeadline();
    initAudioController();
    initCommandPalette();
    initCardSpotlight();
    initContactForm();
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
   2. THREE.JS ISOMETRIC DEVELOPER ROOM
   ========================================================================== */
function initHeroThreeScene() {
    const canvas = document.getElementById('hero-canvas');
    const container = document.getElementById('hero-3d-container');
    if (!canvas || !container || typeof THREE === 'undefined') {
        console.warn('Three.js canvas or library not available.');
        return;
    }

    const scene = new THREE.Scene();

    // Camera setup (Isometric perspective)
    const camera = new THREE.PerspectiveCamera(
        34,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );
    camera.position.set(0, 0, 11);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Room Group
    const roomGroup = new THREE.Group();
    roomGroup.position.set(0, -1.8, 0);
    roomGroup.rotation.set(0, -Math.PI / 4, 0);
    const isMobile = window.innerWidth < 768;
    const initialScale = isMobile ? 0.72 : 0.95;
    roomGroup.scale.set(initialScale, initialScale, initialScale);
    scene.add(roomGroup);

    // Lighting (Matching Sean Currlin's setup)
    const ambientLight = new THREE.AmbientLight(0x1a1a40, 0.6);
    scene.add(ambientLight);

    const spotLightWhite = new THREE.SpotLight(0xffffff, 2.8);
    spotLightWhite.position.set(2, 5, 6);
    spotLightWhite.angle = 0.28;
    spotLightWhite.penumbra = 0.3;
    scene.add(spotLightWhite);

    const spotLightPurple = new THREE.SpotLight(0x9d4edd, 2.0);
    spotLightPurple.position.set(4, 5, 4);
    spotLightPurple.angle = 0.35;
    spotLightPurple.penumbra = 0.3;
    scene.add(spotLightPurple);

    const pointLightPurple = new THREE.PointLight(0x7209b7, 1.4, 15);
    pointLightPurple.position.set(0, 1, 0);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0x4cc9f0, 1.4, 15);
    pointLightCyan.position.set(1, 2, -2);
    scene.add(pointLightCyan);

    // Star Constellation Particle Field
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 16;
        positions[i + 1] = Math.random() * 8 - 1;
        positions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x839cb5,
        size: 0.05,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starField);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    let roomTexture = null;
    textureLoader.load(
        '/assets/mat1-DJEvMkYT.png',
        (tex) => {
            tex.flipY = false;
            tex.encoding = THREE.sRGBEncoding;
            roomTexture = tex;
            applyTexture();
        },
        undefined,
        (err) => console.warn('Texture load fallback:', err)
    );

    let loadedRoomModel = null;
    function applyTexture() {
        if (!loadedRoomModel || !roomTexture) return;
        loadedRoomModel.traverse((child) => {
            if (child.isMesh && child.material) {
                if (child.name.includes('body1') || child.name.includes('room')) {
                    child.material.map = roomTexture;
                    child.material.needsUpdate = true;
                }
            }
        });
    }

    // GLTFLoader for Room Model
    if (typeof THREE.GLTFLoader !== 'undefined') {
        const loader = new THREE.GLTFLoader();
        loader.load(
            '/assets/optimized-room-DdWv8WrH.glb',
            (gltf) => {
                loadedRoomModel = gltf.scene;
                loadedRoomModel.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        // Boost monitor & lamp luminescence
                        if (child.name.includes('comp') || child.name.includes('emis') || child.name.includes('monitor')) {
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0x00f0ff,
                                emissive: 0x0070f3,
                                emissiveIntensity: 1.5,
                                roughness: 0.2
                            });
                        }
                    }
                });
                roomGroup.add(loadedRoomModel);
                applyTexture();
            },
            undefined,
            (err) => {
                console.warn('GLB load error, using high-tech fallback room:', err);
                createProceduralRoomFallback(roomGroup);
            }
        );
    } else {
        createProceduralRoomFallback(roomGroup);
    }

    // Interactive mouse damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = -Math.PI / 4;
    let targetRotationX = 0;

    window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX = normX * 0.22;
        mouseY = normY * 0.12;
    });

    // Touch Support for Mobile
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const normX = (touch.clientX / window.innerWidth) * 2 - 1;
            mouseX = normX * 0.18;
        }
    }, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Parallax damping
        targetRotationY = -Math.PI / 4 + mouseX;
        targetRotationX = mouseY;
        roomGroup.rotation.y += (targetRotationY - roomGroup.rotation.y) * 0.05;
        roomGroup.rotation.x += (targetRotationX - roomGroup.rotation.x) * 0.05;

        // Subtle gentle breathing float
        roomGroup.position.y = -1.8 + Math.sin(elapsedTime * 1.2) * 0.04;

        // Stars gentle rotation
        starField.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
    }
    animate();

    // Window Resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

        const mobileNow = window.innerWidth < 768;
        const currentScale = mobileNow ? 0.72 : 0.95;
        roomGroup.scale.set(currentScale, currentScale, currentScale);
    });
}

/**
 * High-tech procedural developer setup fallback if GLB is loading or unsupported
 */
function createProceduralRoomFallback(group) {
    const deskGeo = new THREE.BoxGeometry(4, 0.15, 2.2);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x181822, roughness: 0.4 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, 0, 0);
    group.add(desk);

    // Dual Monitors
    const monGeo = new THREE.BoxGeometry(1.6, 0.9, 0.05);
    const screenMat = new THREE.MeshStandardMaterial({
        color: 0x050510,
        emissive: 0x0070f3,
        emissiveIntensity: 0.8
    });
    
    const monitor1 = new THREE.Mesh(monGeo, screenMat);
    monitor1.position.set(-0.9, 0.8, -0.6);
    monitor1.rotation.y = 0.15;
    group.add(monitor1);

    const monitor2 = new THREE.Mesh(monGeo, screenMat);
    monitor2.position.set(0.9, 0.8, -0.6);
    monitor2.rotation.y = -0.15;
    group.add(monitor2);
}

/* ==========================================================================
   3. ROTATING HEADLINE WORD
   ========================================================================== */
function initRotatingHeadline() {
    const wordEl = document.getElementById('rotating-word');
    if (!wordEl) return;

    const words = ['Ideas', 'Systems', 'Architectures', 'Intelligence', 'Products'];
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
   4. LO-FI AUDIO CONTROLLER & EQUALIZER
   ========================================================================== */
function initAudioController() {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('sound-toggle-btn');
    if (!audio || !toggleBtn) return;

    audio.volume = 0.35;
    let isPlaying = false;

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            toggleBtn.classList.remove('is-playing');
        } else {
            audio.play().then(() => {
                isPlaying = true;
                toggleBtn.classList.add('is-playing');
            }).catch((err) => {
                console.log('Audio autoplay policy restriction:', err);
            });
        }
    });

    window.addEventListener('toggleAudioGlobal', () => {
        toggleBtn.click();
    });
}

/* ==========================================================================
   5. COMMAND PALETTE (CMD+K / CTRL+K)
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

    // Global Keydown
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

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Search Filtering
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
            } else if (action === 'toggle-audio') {
                window.dispatchEvent(new CustomEvent('toggleAudioGlobal'));
            } else if (action === 'download-resume') {
                const link = document.createElement('a');
                link.href = 'Hemanshu_Resume.pdf';
                link.download = 'Hemanshu_Resume.pdf';
                link.click();
            } else if (action === 'copy-email') {
                navigator.clipboard.writeText('hemanshusuryawanshi007@gmail.com');
                showNotification('Email copied to clipboard!');
            } else if (action === 'open-github') {
                window.open('https://github.com/hemanshusuryawanshi', '_blank');
            }
        });
    });
}

/* ==========================================================================
   6. CARD SPOTLIGHT HOVER EFFECT
   ========================================================================== */
function initCardSpotlight() {
    const cards = document.querySelectorAll('.bento-card, .timeline-card');
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
   7. CONTACT FORM SUBMISSION & FEEDBACK
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            if (statusMsg) {
                statusMsg.textContent = 'Please fill out all fields.';
                statusMsg.className = 'form-status-msg error';
            }
            return;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        // Simulated instant delivery
        setTimeout(() => {
            if (statusMsg) {
                statusMsg.textContent = 'Thank you, Hemanshu will reach out to you shortly!';
                statusMsg.className = 'form-status-msg success';
            }
            form.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Message Sent ✓</span>';
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                }, 4000);
            }
        }, 600);
    });
}

/* ==========================================================================
   8. SMOOTH SCROLL FOR ANCHOR LINKS
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

function showNotification(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0070f3;
        color: #ffffff;
        font-family: var(--font-sans);
        font-size: 0.88rem;
        font-weight: 600;
        padding: 10px 18px;
        border-radius: 9999px;
        box-shadow: 0 8px 24px rgba(0, 112, 243, 0.4);
        z-index: 100000;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
