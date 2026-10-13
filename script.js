/* ============================================
   HEMANSHU SURYAWANSHI — PORTFOLIO SCRIPT
   High-End Design Engineering Engine
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio core initialized");
    
    // Register GSAP plugins safely
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* =========================================
       1. NEURAL HERO CANVAS (RETINA SCALED)
       ========================================= */
    const initNeuralHeroCanvas = () => {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        
        const initCanvas = () => {
            width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
            height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            ctx.scale(dpr, dpr);
            
            particles = [];
            const count = Math.min(80, Math.floor((width * height) / 14000));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    radius: Math.random() * 2 + 1
                });
            }
        };
        
        initCanvas();
        window.addEventListener('resize', initCanvas);
        
        let mouseCanvasX = -1000;
        let mouseCanvasY = -1000;
        
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseCanvasX = e.clientX - rect.left;
            mouseCanvasY = e.clientY - rect.top;
        });
        
        let heroAnimationId = null;
        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
                ctx.fill();
            });
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(16, 185, 129, ${0.18 - dist / 700})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                
                const dx = mouseCanvasX - particles[i].x;
                const dy = mouseCanvasY - particles[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(16, 185, 129, ${0.28 - dist / 500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseCanvasX, mouseCanvasY);
                    ctx.stroke();
                }
            }

            heroAnimationId = requestAnimationFrame(animateCanvas);
        };
        
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!heroAnimationId) animateCanvas();
            } else {
                if (heroAnimationId) {
                    cancelAnimationFrame(heroAnimationId);
                    heroAnimationId = null;
                }
            }
        });
        
        heroObserver.observe(canvas);
    };
    initNeuralHeroCanvas();

    /* =========================================
       2. PRELOADER & HERO REVEAL (WITH FAILSAFE)
       ========================================= */
    const preloaderEl = document.querySelector('.preloader');
    let preloaderDismissed = false;

    const dismissPreloader = () => {
        if (preloaderDismissed || !preloaderEl) return;
        preloaderDismissed = true;
        preloaderEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        preloaderEl.style.opacity = '0';
        preloaderEl.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            preloaderEl.style.display = 'none';
        }, 600);
    };

    // Failsafe timeout: never leave users locked out on slow networks or CDN errors
    const preloaderTimeout = setTimeout(dismissPreloader, 2500);

    if (typeof gsap !== 'undefined') {
        const tlPreloader = gsap.timeline({
            onComplete: () => {
                clearTimeout(preloaderTimeout);
                dismissPreloader();
            }
        });
        
        const preloaderLine = document.querySelector('.preloader__line');
        if (preloaderLine) {
            setTimeout(() => preloaderLine.classList.add('animate'), 80);
        }

        const counterEl = document.querySelector('.preloader__counter');
        const counter = { value: 0 };
        
        if (counterEl) {
            tlPreloader.to(counter, {
                value: 100,
                duration: 1.2,
                ease: "power2.inOut",
                onUpdate: () => {
                    counterEl.textContent = Math.round(counter.value) + "%";
                }
            }, 0);
        }
        
        tlPreloader.to(".preloader__text span", {
            y: "0%",
            duration: 0.8,
            ease: "expo.out"
        }, "-=0.4")
        .to(".preloader", {
            y: "-100%",
            duration: 1.1,
            ease: "power4.inOut"
        })
        .from(".nav", {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out"
        }, "-=0.6")
        .from(".hero__label", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "expo.out"
        }, "-=0.6")
        .to(".hero__name .line > span", {
            y: "0%",
            stagger: 0.12,
            duration: 1.0,
            ease: "expo.out"
        }, "-=0.6")
        .from(".hero__subtitle span", {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.8,
            ease: "expo.out"
        }, "-=0.6")
        .from(".hero__scroll", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4");
    } else {
        setTimeout(dismissPreloader, 600);
    }

    /* =========================================
       3. CUSTOM CURSOR (TOUCH-AWARE)
       ========================================= */
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
    const cursorDot = document.querySelector('.cursor__dot');
    const cursorRing = document.querySelector('.cursor__ring');
    
    if (!isTouchDevice && cursorDot && cursorRing && typeof gsap !== 'undefined') {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            gsap.set(cursorDot, { x: mouseX, y: mouseY });
        });
        
        gsap.ticker.add(() => {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            gsap.set(cursorRing, { x: ringX, y: ringY });
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .gallery__masonry-item, .tech-token');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    /* =========================================
       4. CYPHER DIALER NAME EFFECT
       ========================================= */
    const cypherName = document.getElementById('cypherName');
    if (cypherName && typeof gsap !== 'undefined') {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const originalText = cypherName.innerText.trim();
        
        cypherName.innerHTML = "";
        originalText.split("").forEach(char => {
            const container = document.createElement("span");
            container.className = "dial-container";
            
            const prop = document.createElement("span");
            prop.className = "prop";
            prop.innerText = char;
            container.appendChild(prop);
            
            const dial = document.createElement("span");
            dial.className = "dial";
            
            const columnLetters = [char];
            for (let i = 0; i < 10; i++) {
                columnLetters.push(letters[Math.floor(Math.random() * letters.length)]);
            }
            columnLetters.push(char);
            
            columnLetters.forEach(letter => {
                const letterSpan = document.createElement("span");
                letterSpan.innerText = letter;
                dial.appendChild(letterSpan);
            });
            
            container.appendChild(dial);
            cypherName.appendChild(container);
            
            let isAnimating = false;
            const triggerSpin = () => {
                if (isAnimating) return;
                isAnimating = true;
                
                dial.classList.remove("resolved");
                const targetY = -(columnLetters.length - 1);
                gsap.set(dial, { y: `${targetY}em` });
                
                gsap.to(dial, {
                    y: "0em",
                    duration: 1.2,
                    ease: "power3.inOut",
                    onComplete: () => {
                        isAnimating = false;
                        dial.classList.add("resolved");
                        setTimeout(() => dial.classList.remove("resolved"), 1500);
                    }
                });
            };

            container.addEventListener("mouseenter", triggerSpin);
            container.addEventListener("click", triggerSpin);
        });
    }

    /* =========================================
       5. SCROLL REVEALS & PROJECT CARDS
       ========================================= */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        document.querySelectorAll('.reveal').forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                },
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out"
            });
        });

        document.querySelectorAll('.reveal-line').forEach(el => {
            const spans = el.querySelectorAll('span');
            gsap.to(spans, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                },
                y: "0%",
                duration: 0.9,
                stagger: 0.1,
                ease: "expo.out"
            });
        });

        document.querySelectorAll('.project-card').forEach(proj => {
            gsap.fromTo(proj, 
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: proj,
                        start: "top 85%",
                    }
                }
            );
        });
    }

    /* =========================================
       6. LIGHTBOX & MODALS
       ========================================= */
    const masonryItems = document.querySelectorAll('.gallery__masonry-item img');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');

    if (lightboxModal && masonryItems.length > 0) {
        const openLightbox = (src) => {
            if (lightboxImage) lightboxImage.src = src;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { if (lightboxImage) lightboxImage.src = ''; }, 350);
        };

        masonryItems.forEach(img => {
            const parent = img.parentElement;
            if (parent) {
                parent.setAttribute('tabindex', '0');
                parent.setAttribute('role', 'button');
                parent.setAttribute('aria-label', 'Open image in lightbox');
                parent.addEventListener('click', () => openLightbox(img.src));
                parent.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(img.src);
                    }
                });
            }
        });

        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxOverlay?.addEventListener('click', closeLightbox);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (lightboxModal.classList.contains('active')) closeLightbox();
            }
        });
    }

    // Mobile Navigation Drawer
    const menuBtn = document.querySelector('.nav__menu-btn');
    const navLinks = document.querySelector('.nav__links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Resume Modal
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const resumeModalOverlay = document.getElementById('resumeModalOverlay');

    if (openResumeBtn && resumeModal) {
        const openResume = (e) => {
            e?.preventDefault();
            const iframe = resumeModal.querySelector('iframe');
            if (iframe && !iframe.src) {
                iframe.src = iframe.getAttribute('data-src');
            }
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeResume = () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        openResumeBtn.addEventListener('click', openResume);
        closeResumeBtn?.addEventListener('click', closeResume);
        resumeModalOverlay?.addEventListener('click', closeResume);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeResume();
            }
        });

        // Magnetic Button Effect on Desktop
        if (!isTouchDevice && typeof gsap !== 'undefined') {
            openResumeBtn.addEventListener('mousemove', (e) => {
                const rect = openResumeBtn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(openResumeBtn, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: "power2.out" });
            });

            openResumeBtn.addEventListener('mouseleave', () => {
                gsap.to(openResumeBtn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
            });
        }
    }

    /* =========================================
       7. 3D WEBGL BACKGROUND (DECOUPLED)
       ========================================= */
    const initThreeBg = () => {
        const bgCanvas = document.getElementById('bg-canvas');
        if (!bgCanvas || typeof THREE === 'undefined') return;

        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 25;

            const renderer = new THREE.WebGLRenderer({
                canvas: bgCanvas,
                alpha: true,
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            const geometryGroup = new THREE.Group();

            const geoBig = new THREE.IcosahedronGeometry(12, 1);
            const matBig = new THREE.MeshBasicMaterial({
                color: 0x10b981,
                wireframe: true,
                transparent: true,
                opacity: 0.14
            });
            const sphereBig = new THREE.Mesh(geoBig, matBig);
            geometryGroup.add(sphereBig);

            const geoSmall = new THREE.IcosahedronGeometry(7, 2);
            const matSmall = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                wireframe: true,
                transparent: true,
                opacity: 0.04
            });
            const sphereSmall = new THREE.Mesh(geoSmall, matSmall);
            geometryGroup.add(sphereSmall);

            scene.add(geometryGroup);

            const particlesGeo = new THREE.BufferGeometry();
            const particlesCount = 600;
            const posArray = new Float32Array(particlesCount * 3);

            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 90;
            }
            particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMat = new THREE.PointsMaterial({
                size: 0.1,
                color: 0x10b981,
                transparent: true,
                opacity: 0.25
            });
            
            const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
            scene.add(particlesMesh);

            // GSAP Scroll Sync
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.to(geometryGroup.rotation, {
                    y: Math.PI * 2,
                    x: Math.PI,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1
                    }
                });

                gsap.to(particlesMesh.rotation, {
                    y: -Math.PI,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2
                    }
                });
            }

            const clock = new THREE.Clock();
            let targetX = 0;
            let targetY = 0;
            let windowHalfX = window.innerWidth / 2;
            let windowHalfY = window.innerHeight / 2;

            window.addEventListener('mousemove', (event) => {
                targetX = (event.clientX - windowHalfX) * 0.0008;
                targetY = (event.clientY - windowHalfY) * 0.0008;
            });

            let threeAnimId = null;
            const animate = () => {
                threeAnimId = requestAnimationFrame(animate);
                const elapsedTime = clock.getElapsedTime();

                geometryGroup.rotation.y = elapsedTime * 0.04;
                sphereBig.rotation.x = elapsedTime * 0.02;
                sphereSmall.rotation.y = -elapsedTime * 0.03;

                camera.position.x += (targetX * 8 - camera.position.x) * 0.05;
                camera.position.y += (-targetY * 8 - camera.position.y) * 0.05;
                camera.lookAt(scene.position);
                
                particlesMesh.position.y = Math.sin(elapsedTime * 0.2) * 1.5;
                renderer.render(scene, camera);
            };

            animate();

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    if (threeAnimId) cancelAnimationFrame(threeAnimId);
                    threeAnimId = null;
                } else {
                    if (!threeAnimId) animate();
                }
            });

            window.addEventListener('resize', () => {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        } catch (err) {
            console.warn("Three.js background initialization skipped:", err);
        }
    };
    initThreeBg();

    /* =========================================
       8. 3D CONSTELLATION JOURNEY (DECOUPLED)
       ========================================= */
    const initConstellation = () => {
        const constellationSpace = document.getElementById('constellationSpace');
        const constellationWrapper = document.getElementById('constellationWrapper');
        const starNodes = document.querySelectorAll('.star-node');

        if (!constellationSpace || !constellationWrapper || starNodes.length === 0 || typeof gsap === 'undefined') return;

        // Populate deep stars
        for (let i = 0; i < 160; i++) {
            const star = document.createElement('div');
            const x = (Math.random() - 0.5) * 3500;
            const y = (Math.random() - 0.5) * 3500;
            const z = (Math.random() * -5500); 
            const size = Math.random() * 2 + 1;
            
            star.style.cssText = `
                position: absolute;
                left: 50%; top: 50%;
                width: ${size}px; height: ${size}px;
                background: #ffffff;
                border-radius: 50%;
                transform: translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px);
                opacity: ${Math.random() * 0.6 + 0.15};
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.7);
                pointer-events: none;
                transform-style: preserve-3d;
            `;
            constellationSpace.insertBefore(star, constellationSpace.firstChild);
        }

        // Draw 3D guider lines with responsive resize support
        const getPx = (valStr) => {
            if (!valStr) return 0;
            if (valStr.includes('vw')) return (parseFloat(valStr) / 100) * window.innerWidth;
            if (valStr.includes('vh')) return (parseFloat(valStr) / 100) * window.innerHeight;
            return parseFloat(valStr) || 0;
        };

        const renderGuiderLines = () => {
            constellationSpace.querySelectorAll('.guider-line').forEach(l => l.remove());

            for (let i = 0; i < starNodes.length - 1; i++) {
                const node1 = starNodes[i];
                const node2 = starNodes[i + 1];
                
                const x1 = getPx(node1.style.getPropertyValue('--x'));
                const y1 = getPx(node1.style.getPropertyValue('--y'));
                const z1 = getPx(node1.style.getPropertyValue('--z'));
                
                const x2 = getPx(node2.style.getPropertyValue('--x'));
                const y2 = getPx(node2.style.getPropertyValue('--y'));
                const z2 = getPx(node2.style.getPropertyValue('--z'));
                
                const dx = x2 - x1;
                const dy = y2 - y1;
                const dz = z2 - z1; 
                
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const rotY = Math.atan2(-dz, dx) * (180 / Math.PI);
                const xzDist = Math.sqrt(dx * dx + dz * dz);
                const rotZ = Math.atan2(dy, xzDist) * (180 / Math.PI);
                
                const line = document.createElement('div');
                line.className = 'guider-line';
                line.style.width = `${distance}px`;
                line.style.transform = `translate3d(${x1}px, calc(-50% + ${y1}px), ${z1}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
                
                constellationSpace.appendChild(line);
            }
        };

        renderGuiderLines();
        window.addEventListener('resize', renderGuiderLines);

        // Timeline Scrub
        gsap.timeline({
            scrollTrigger: {
                trigger: constellationWrapper,
                start: "top top",
                end: "+=2200",
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        }).to(constellationSpace, {
            z: 4200,
            ease: "none"
        });

        // Throttled shooting stars (only while section is in viewport)
        let starInterval = null;
        const startShootingStars = () => {
            if (starInterval) return;
            starInterval = setInterval(() => {
                if (document.hidden) return;
                const star = document.createElement('div');
                star.className = 'shooting-star';
                const sy = (Math.random() - 0.5) * 1800;
                const sz = Math.random() * -3000;
                star.style.cssText = `
                    left: 0; top: 50%;
                    width: 140px;
                    transform: translate3d(-1000px, calc(-50% + ${sy}px), ${sz}px) rotateZ(15deg);
                    transition: transform 1.5s linear, opacity 1.5s ease;
                `;
                constellationSpace.appendChild(star);
                
                setTimeout(() => {
                    star.style.opacity = '1';
                    star.style.transform = `translate3d(3000px, calc(-50% + ${sy + 700}px), ${sz}px) rotateZ(15deg)`;
                }, 50);
                
                setTimeout(() => star.remove(), 1600);
            }, 4000);
        };

        const stopShootingStars = () => {
            if (starInterval) {
                clearInterval(starInterval);
                starInterval = null;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startShootingStars();
            } else {
                stopShootingStars();
            }
        });
        observer.observe(constellationWrapper);
    };
    initConstellation();

    /* =========================================
       9. MATTER.JS PHYSICS TECH ARSENAL (DECOUPLED)
       ========================================= */
    const initPhysics = () => {
        const physicsContainer = document.getElementById('physics-stack-container');
        if (!physicsContainer || typeof Matter === 'undefined') return;

        const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
        const engine = Engine.create();
        
        let width = physicsContainer.clientWidth;
        let height = physicsContainer.clientHeight;
        
        const wallOptions = { isStatic: true, render: { visible: false } };
        let ground = Bodies.rectangle(width / 2, height + 250, width + 500, 500, wallOptions);
        let leftWall = Bodies.rectangle(-250, height / 2, 500, height * 10, wallOptions);
        let rightWall = Bodies.rectangle(width + 250, height / 2, 500, height * 10, wallOptions);
        let ceiling = Bodies.rectangle(width / 2, -250, width + 500, 500, wallOptions);

        Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        const tokens = document.querySelectorAll('.tech-token');
        const bodies = [];
        
        const tokenData = Array.from(tokens).map(token => {
            token.style.display = 'flex';
            const w = token.offsetWidth || 120;
            const h = token.offsetHeight || 44;
            token.style.display = '';
            return { el: token, w, h };
        });
        
        tokenData.forEach((data, index) => {
            const x = Math.random() * (width - data.w - 40) + (data.w / 2 + 20);
            const y = (index % 4) * 60 + 50; 
            
            const body = Bodies.rectangle(x, y, data.w, data.h, {
                chamfer: { radius: data.h / 2 },
                restitution: 0.1,
                friction: 0.12,
                density: 0.001,
                isBullet: true
            });
            
            body.domElement = data.el;
            body.w = data.w;
            body.h = data.h;
            bodies.push(body);
        });
        
        Composite.add(engine.world, bodies);

        const mouse = Mouse.create(physicsContainer);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        
        Composite.add(engine.world, mouseConstraint);

        // Prevent Matter.js from blocking window touch scroll on mobile
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            mouseConstraint.mouse.element.removeEventListener("touchstart", mouseConstraint.mouse.mousedown);
            mouseConstraint.mouse.element.removeEventListener("touchmove", mouseConstraint.mouse.mousemove);
            mouseConstraint.mouse.element.removeEventListener("touchend", mouseConstraint.mouse.mouseup);
        }

        const runner = Runner.create();
        
        Matter.Events.on(engine, 'afterUpdate', () => {
            for (let i = 0; i < bodies.length; i++) {
                const body = bodies[i];
                if (body.domElement) {
                    body.domElement.style.transform = `translate(${body.position.x - body.w / 2}px, ${body.position.y - body.h / 2}px) rotate(${body.angle}rad)`;
                }
            }
        });

        // Mouse glowing effects
        Matter.Events.on(mouseConstraint, "mousemove", (event) => {
            const found = Matter.Query.point(bodies, event.mouse.position);
            bodies.forEach(b => {
                if (b.domElement) b.domElement.classList.remove('hovered');
            });
            if (found.length > 0 && found[0].domElement) {
                found[0].domElement.classList.add('hovered');
            }
        });

        Matter.Events.on(mouseConstraint, "mousedown", () => {
            if (mouseConstraint.body && mouseConstraint.body.domElement) {
                mouseConstraint.body.domElement.classList.add('dragging');
            }
        });

        Matter.Events.on(mouseConstraint, "mouseup", () => {
            bodies.forEach(b => {
                if (b.domElement) b.domElement.classList.remove('dragging');
            });
        });

        physicsContainer.addEventListener('mouseleave', () => {
            if (mouseConstraint.body) {
                mouseConstraint.constraint.bodyB = null;
                mouseConstraint.body = null;
                mouseConstraint.mouse.button = -1;
            }
            bodies.forEach(b => {
                if (b.domElement) b.domElement.classList.remove('dragging', 'hovered');
            });
        });

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                Runner.start(runner, engine);
            } else {
                Runner.stop(runner);
            }
        });
        observer.observe(physicsContainer);

        // Filter Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const filter = e.currentTarget.getAttribute('data-filter');
                tokens.forEach(token => {
                    const category = token.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        token.classList.remove('dimmed');
                    } else {
                        token.classList.add('dimmed');
                    }
                });
            });
        });

        window.addEventListener('resize', () => {
            width = physicsContainer.clientWidth;
            height = physicsContainer.clientHeight;
            
            Matter.Body.setPosition(ground, { x: width / 2, y: height + 250 });
            Matter.Body.setPosition(ceiling, { x: width / 2, y: -250 });
            Matter.Body.setPosition(rightWall, { x: width + 250, y: height / 2 });
            Matter.Body.setPosition(leftWall, { x: -250, y: height / 2 });
        });
    };
    initPhysics();

    /* =========================================
       10. SPOTLIGHT CARDS
       ========================================= */
    const spotlightCards = document.querySelectorAll('.spotlight-card, .project-card, .lifestyle__card');
    spotlightCards.forEach(card => {
        card.classList.add('spotlight-card');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* =========================================
       11. TOAST NOTIFICATIONS
       ========================================= */
    const showToast = (message) => {
        const toast = document.getElementById('toastNotification');
        const toastMsg = document.getElementById('toastMessage');
        if (!toast) return;
        
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('active');
        
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 2800);
    };

    const copyEmail = () => {
        const email = 'hemanshusuryawanshi007@gmail.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email)
                .then(() => showToast('Email copied to clipboard!'))
                .catch(() => fallbackCopy(email));
        } else {
            fallbackCopy(email);
        }
    };

    const fallbackCopy = (text) => {
        const input = document.createElement('input');
        input.value = text;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try {
            document.execCommand('copy');
            showToast('Email copied to clipboard!');
        } catch (err) {
            showToast(text);
        }
        document.body.removeChild(input);
    };

    /* =========================================
       12. INTERACTIVE TERMINAL CLI
       ========================================= */
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');

    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    };

    const executeTerminalCmd = (rawCmd) => {
        const cmd = rawCmd.trim().toLowerCase();

        if (cmd === 'help') {
            return `Available commands:
  <span class="json-key">status</span>   - Show current engineering specifications & role
  <span class="json-key">skills</span>   - List primary technical stack & infrastructure
  <span class="json-key">projects</span> - Display highlighted production projects
  <span class="json-key">contact</span>  - Output direct contact channels & email
  <span class="json-key">resume</span>   - Open PDF resume viewer
  <span class="json-key">whoami</span>   - Show identity of current session
  <span class="json-key">clear</span>    - Clear terminal history screen`;
        }

        if (cmd === 'status' || cmd === 'hemanshu status' || cmd === 'hemanshu status --verbose' || cmd === 'status --verbose' || cmd === 'hemanshu') {
            return `{
  <span class="json-key">"engineer"</span>: <span class="json-str">"Hemanshu Suryawanshi"</span>,
  <span class="json-key">"degree"</span>: <span class="json-str">"B.Tech AIML (Class of 2027)"</span>,
  <span class="json-key">"location"</span>: <span class="json-str">"Pune, MH, India"</span>,
  <span class="json-key">"focus"</span>: <span class="json-str">"AI Models, Serverless Pipelines & System Optimization"</span>,
  <span class="json-key">"latency"</span>: <span class="json-str">"Sub-50ms AWS Lambda cold starts"</span>,
  <span class="json-key">"status"</span>: <span class="json-str">"Ready for high-impact AI/Cloud roles"</span>
}`;
        }

        if (cmd === 'skills' || cmd === 'stack' || cmd === 'cat skills.json') {
            return `[Cloud & AWS]   - S3, Lambda, ECS Fargate, IAM, CloudWatch, RDS
[AI & ML]       - TensorFlow, Scikit-Learn, Python, FastAPI, Whisper TTS
[DevOps & Web]  - Docker, GitHub Actions, Nginx, PostgreSQL, Git`;
        }

        if (cmd === 'projects' || cmd === 'ls projects') {
            return `1. Serverless Image Resizer (AWS Event-Driven)
2. CyberGuard (ML Malicious URL Detection)
3. NOVA Assistant (Voice AI Engine with 43 features)
4. Task Manager (AWS ECS Fargate Docker Pipeline)
5. Bus Booking Application (AWS EC2 + RDS MySQL)`;
        }

        if (cmd === 'contact' || cmd === 'email') {
            return `Email    : hemanshusuryawanshi007@gmail.com
GitHub   : github.com/hemanshusuryawanshi
LinkedIn : linkedin.com/in/hemanshu-suryawanshi`;
        }

        if (cmd === 'resume') {
            document.getElementById('openResumeBtn')?.click();
            return `Opening resume modal...`;
        }

        if (cmd === 'whoami') {
            return `guest@hemanshu.dev (Role: Recruiter / Engineer / Explorer)`;
        }

        if (cmd === 'ls') {
            return `about.json   skills.json   projects.txt   resume.pdf   contact.sh`;
        }

        if (cmd === 'cat about.json') {
            return `{
  <span class="json-key">"name"</span>: <span class="json-str">"Hemanshu Suryawanshi"</span>,
  <span class="json-key">"role"</span>: <span class="json-str">"AI / ML Engineer & Photographer"</span>,
  <span class="json-key">"location"</span>: <span class="json-str">"Pune, India"</span>
}`;
        }

        if (cmd === 'clear') {
            if (terminalBody) {
                const lines = terminalBody.querySelectorAll('.term-line, .term-output');
                lines.forEach(l => {
                    if (!l.classList.contains('term-prompt-line')) l.remove();
                });
            }
            return null;
        }

        return `<span style="color:#ef4444">zsh: command not found: ${escapeHTML(rawCmd)}. Type 'help' for options.</span>`;
    };

    if (terminalInput && terminalBody) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim();
                if (!cmd) return;
                
                const cmdLine = document.createElement('div');
                cmdLine.className = 'term-line';
                cmdLine.innerHTML = `<span class="term-prompt">guest@hemanshu.dev:~$</span> <span class="term-cmd">${escapeHTML(cmd)}</span>`;
                
                const promptLine = terminalInput.closest('.term-prompt-line');
                terminalBody.insertBefore(cmdLine, promptLine);

                const output = executeTerminalCmd(cmd);
                if (output) {
                    const outLine = document.createElement('div');
                    outLine.className = 'term-output';
                    outLine.innerHTML = output;
                    terminalBody.insertBefore(outLine, promptLine);
                }

                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    /* =========================================
       13. COMMAND PALETTE (CMD + K) KEYBOARD NAV
       ========================================= */
    const cmdkModal = document.getElementById('cmdkModal');
    const openCmdkBtn = document.getElementById('openCmdkBtn');
    const cmdkBackdrop = document.getElementById('cmdkBackdrop');
    const cmdkSearch = document.getElementById('cmdkSearch');
    const cmdkItems = document.querySelectorAll('.cmdk-item');
    let currentCmdkIndex = 0;

    const getVisibleCmdkItems = () => {
        return Array.from(cmdkItems).filter(item => item.style.display !== 'none');
    };

    const updateActiveCmdkItem = (index) => {
        const visible = getVisibleCmdkItems();
        if (visible.length === 0) return;
        
        currentCmdkIndex = Math.max(0, Math.min(index, visible.length - 1));
        cmdkItems.forEach(i => {
            i.classList.remove('active');
            i.removeAttribute('aria-selected');
        });
        
        visible[currentCmdkIndex].classList.add('active');
        visible[currentCmdkIndex].setAttribute('aria-selected', 'true');
        visible[currentCmdkIndex].scrollIntoView({ block: 'nearest' });
    };

    const filterCmdkItems = (query) => {
        cmdkItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        updateActiveCmdkItem(0);
    };

    const openCmdk = () => {
        if (!cmdkModal) return;
        cmdkModal.classList.add('active');
        if (cmdkSearch) {
            cmdkSearch.value = '';
            filterCmdkItems('');
            setTimeout(() => cmdkSearch.focus(), 60);
        }
    };

    const closeCmdk = () => {
        if (!cmdkModal) return;
        cmdkModal.classList.remove('active');
    };

    openCmdkBtn?.addEventListener('click', openCmdk);
    cmdkBackdrop?.addEventListener('click', closeCmdk);

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdkModal?.classList.contains('active')) {
                closeCmdk();
            } else {
                openCmdk();
            }
            return;
        }

        if (cmdkModal?.classList.contains('active')) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeCmdk();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const visible = getVisibleCmdkItems();
                if (visible.length > 0) {
                    updateActiveCmdkItem((currentCmdkIndex + 1) % visible.length);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const visible = getVisibleCmdkItems();
                if (visible.length > 0) {
                    updateActiveCmdkItem((currentCmdkIndex - 1 + visible.length) % visible.length);
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const visible = getVisibleCmdkItems();
                if (visible[currentCmdkIndex]) {
                    visible[currentCmdkIndex].click();
                }
            }
        }
    });

    cmdkSearch?.addEventListener('input', (e) => {
        filterCmdkItems(e.target.value.toLowerCase().trim());
    });

    cmdkItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');

            closeCmdk();

            if (action === 'nav' && target) {
                const sec = document.querySelector(target);
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'resume') {
                document.getElementById('openResumeBtn')?.click();
            } else if (action === 'copy-email') {
                copyEmail();
            } else if (action === 'terminal-focus') {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => terminalInput?.focus(), 600);
            }
        });
    });

    /* =========================================
       14. CLICK SPARKS (REACT BITS INSPIRED)
       ========================================= */
    const initClickSparks = () => {
        const canvas = document.getElementById('sparkCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        let sparks = [];
        const colors = ['#10b981', '#34d399', '#f4f4f5', '#a7f3d0'];

        const createSparks = (x, y) => {
            const count = 12;
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 2;
                sparks.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * 2.4 + 1.2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1,
                    decay: Math.random() * 0.035 + 0.02
                });
            }
            if (!animating) {
                animating = true;
                requestAnimationFrame(renderSparks);
            }
        };

        let animating = false;
        const renderSparks = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x += s.vx;
                s.y += s.vy;
                s.vx *= 0.94;
                s.vy = s.vy * 0.94 + 0.12;
                s.alpha -= s.decay;

                if (s.alpha <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = Math.max(0, s.alpha);
                ctx.shadowBlur = 6;
                ctx.shadowColor = s.color;
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            if (sparks.length > 0) {
                requestAnimationFrame(renderSparks);
            } else {
                animating = false;
            }
        };

        window.addEventListener('pointerdown', (e) => {
            // Don't spawn sparks when dragging physics bodies or typing
            if (e.target.closest('#physics-stack-container, input, textarea')) return;
            createSparks(e.clientX, e.clientY);
        });
    };
    initClickSparks();

    /* =========================================
       15. DECRYPTED TEXT SCRAMBLE (REACT BITS INSPIRED)
       ========================================= */
    const initDecryptedText = () => {
        const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}—=+*^?#';
        const targets = document.querySelectorAll('.hero__label span, .section__title');

        targets.forEach(el => {
            const originalText = el.innerText.trim();
            el.setAttribute('data-original-text', originalText);

            const scramble = () => {
                let iteration = 0;
                clearInterval(el._scrambleInterval);

                el._scrambleInterval = setInterval(() => {
                    el.innerText = originalText
                        .split('')
                        .map((letter, index) => {
                            if (letter === ' ' || letter === '\n') return letter;
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return glyphs[Math.floor(Math.random() * glyphs.length)];
                        })
                        .join('');

                    if (iteration >= originalText.length) {
                        clearInterval(el._scrambleInterval);
                        el.innerText = originalText;
                    }
                    iteration += 1 / 3;
                }, 25);
            };

            el.addEventListener('mouseenter', scramble);

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 85%",
                    once: true,
                    onEnter: scramble
                });
            }
        });
    };
    initDecryptedText();

    /* =========================================
       16. FLOATING ACTION DOCK (21ST.DEV INSPIRED)
       ========================================= */
    const initFloatingDock = () => {
        const dock = document.querySelector('.floating-dock');
        if (!dock) return;

        document.getElementById('dockTerminalBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => terminalInput?.focus(), 600);
        });

        document.getElementById('dockResumeBtn')?.addEventListener('click', () => {
            document.getElementById('openResumeBtn')?.click();
        });

        document.getElementById('dockCmdkBtn')?.addEventListener('click', () => {
            openCmdk();
        });

        document.getElementById('dockCopyEmailBtn')?.addEventListener('click', () => {
            copyEmail();
        });

        // Auto-hide dock when near bottom footer to avoid overlap
        window.addEventListener('scroll', () => {
            const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
            if (scrollBottom < 100) {
                dock.style.opacity = '0';
                dock.style.pointerEvents = 'none';
            } else {
                dock.style.opacity = '1';
                dock.style.pointerEvents = 'auto';
            }
        });
    };
    initFloatingDock();

});
