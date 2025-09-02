document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.pink-navbar-link');
    const bubble = document.querySelector('.navbar-bubble');
    const pageMap = {
        'Resume': 'pages/resume.html',
        'Education': 'pages/education.html',
        'More!': 'pages/more.html'
    };
    
    const homeContent = `
        <div class="profile-card">
        <div class="cute-symbols">✨ 🌸 🌸 🌸 ✨ </div>
        <img src="img/Profile_Pic.JPG" alt="Profile Picture">
        <button class="name-btn"><span class="icon">👑</span> Rhiannon Pickard</button>
        <br>
        <p class="epic-title">Web Developer</p>
        <p>My name is Rhiannon Pickard, a business major exploring Accounting aswell as the medical field through my CMA schooling. I enjoy learning new things, solving problems creatively, and staying active in my community.</p>
        <div class="socials">
            <a href="https://www.linkedin.com/in/rhiannon-pickard/" title="LinkedIn">LinkedIn</a>
            <a href="https://github.com/rhiannonpickard" title="GitHub">GitHub</a>
            <a href="https://www.instagram.com/rio.herself" title="Insta">Insta</a>
        </div>
    </div>
    `;
    
    // Function to move bubble to active link
    function moveBubble(activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.pink-navbar-list').getBoundingClientRect();
        
        const leftOffset = linkRect.left - navRect.left;
        const width = linkRect.width;
        const height = linkRect.height;
        
        bubble.style.left = leftOffset + 'px';
        bubble.style.width = width + 'px';
        bubble.style.height = height + 'px';
    }
    
    // Initialize bubble position on page load
    const activeLink = document.querySelector('.pink-navbar-link.active');
    if (activeLink) {
        // Small delay to ensure proper positioning after page load
        setTimeout(() => moveBubble(activeLink), 100);
    }
    
    // Function to animate page transition
    function animatePageTransition(newContent) {
        const currentCard = document.querySelector('.profile-card');
        
        // Add slide-up animation to current card
        currentCard.classList.add('slide-up');
        
        // Wait for slide-up animation to complete, then replace content
        setTimeout(() => {
            // Replace the content
            currentCard.outerHTML = newContent;
            
            // Get the new card and add slide-in animation
            const newCard = document.querySelector('.profile-card');
            newCard.classList.add('slide-in');
            
            // Clean up animation class after animation completes
            setTimeout(() => {
                newCard.classList.remove('slide-in');
            }, 500);
        }, 400); // Match the slide-up animation duration
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Animate bubble to new position
            moveBubble(this);
            
            const linkText = this.textContent.trim().replace(/^[^\s]*\s/, ''); // Remove emoji and get text
            
            if (linkText === 'Home') {
                animatePageTransition(homeContent);
            } else {
                const page = pageMap[linkText];
                if (page) {
                    fetch(page)
                        .then(res => res.text())
                        .then(html => {
                            animatePageTransition(html);
                        });
                }
            }
        });
    });
    
    // Handle window resize to reposition bubble
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.pink-navbar-link.active');
        if (activeLink) {
            moveBubble(activeLink);
        }
    });
});
