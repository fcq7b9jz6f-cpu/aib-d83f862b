import './scene.js';

// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP ScrollTrigger Integration
gsap.registerPlugin(ScrollTrigger);

// Animate header on scroll
gsap.from('.header', {
    yPercent: -100,
    paused: false,
    duration: 0.5,
    ease: 'power2.inOut',
    scrollTrigger: {
        start: '50 top',
        toggleActions: 'play none none reverse'
    }
});

// Fade in sections
document.querySelectorAll('section').forEach((section) => {
    gsap.fromTo(section, 
        { autoAlpha: 0, y: 50 }, 
        {
            autoAlpha: 1, 
            y: 0, 
            duration: 1, 
            ease: 'expo.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
});
