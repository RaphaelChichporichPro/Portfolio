document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TYPING EFFECT (Machine à écrire) ---
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        // J'ai mis à jour les mots selon ton CV
        const words = ["Développeur", "Étudiant", "Passionné"];
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
    // --- 3. GESTION DU MODE CLAIR / SOMBRE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme');

    // Vérifier si l'utilisateur a déjà activé le mode clair lors d'une visite précédente
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fas', 'far'); // Change l'icône en soleil vide ou lune selon tes préférences
        themeIcon.classList.replace('fa-sun', 'fa-moon'); 
    }

    // Écouter le clic sur le bouton
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // On vérifie si on est en mode clair maintenant
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fas', 'far');
                themeIcon.classList.replace('fa-sun', 'fa-moon'); // Icône Lune pour repasser au mode sombre
            } else {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('far', 'fas');
                themeIcon.classList.replace('fa-moon', 'fa-sun'); // Icône Soleil pour repasser au mode clair
            }
            
            // Petit effet d'animation au clic
            themeToggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => themeToggleBtn.style.transform = 'scale(1)', 200);
        });
    }
});