document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TYPING EFFECT (Machine à écrire) ---
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        // J'ai mis à jour les mots selon ton CV
        const words = ["Développeur", "Étudiant", "Passionné", "Curieux"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause à la fin du mot
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- 2. SCROLL REVEAL (Apparition au défilement) ---
    const revealElements = document.querySelectorAll('.card, .timeline-item, h2, p, .btn-group');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('hidden'); // Ajoute la classe qui cache l'élément
        revealObserver.observe(el);
    });
});