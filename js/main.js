document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality for nominee cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nominees = document.querySelectorAll('.nominee-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide nominees based on filter
                nominees.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category').includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const nomineeContainer = document.querySelector('.grid-container');
            const cardsArray = Array.from(nominees);
            
            if (sortValue === 'newest') {
                // Sort by "newest" - we'll just use DOM order in this case
                cardsArray.sort((a, b) => {
                    return Array.from(nominees).indexOf(a) - Array.from(nominees).indexOf(b);
                });
            } else if (sortValue === 'votes') {
                // Sort by votes (highest first)
                cardsArray.sort((a, b) => {
                    const aVotes = parseInt(a.querySelector('.stat-value').innerText.replace(',', ''));
                    const bVotes = parseInt(b.querySelector('.stat-value').innerText.replace(',', ''));
                    return bVotes - aVotes;
                });
            } else if (sortValue === 'alphabetical') {
                // Sort alphabetically by name
                cardsArray.sort((a, b) => {
                    const aName = a.querySelector('.card-title').innerText;
                    const bName = b.querySelector('.card-title').innerText;
                    return aName.localeCompare(bName);
                });
            }
            
            // Update the DOM with sorted cards
            cardsArray.forEach(card => {
                nomineeContainer.appendChild(card);
            });
        });
    }
    
    // Voting functionality
    const voteButtons = document.querySelectorAll('.btn-vote, [class*="vote-for"]');
    voteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the nominee name from the closest card or detail section
            let nomineeName;
            if (this.closest('.nominee-card')) {
                nomineeName = this.closest('.nominee-card').querySelector('.card-title').innerText;
            } else {
                nomineeName = document.querySelector('.nominee-title').innerText.split(' ')[0];
            }
            
            // Show a confirmation message
            alert(`Thank you for voting for ${nomineeName}! Your vote has been counted.`);
            
            // Disable the button to prevent multiple votes
            this.disabled = true;
            this.classList.add('voted');
            this.innerHTML = '<i class="fas fa-check"></i> Voted';
        });
    });
    
    // Add hover effects to nominee cards
    nominees.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.card-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.card-overlay').style.opacity = '0';
        });
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Lightbox functionality for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                // Append elements to the DOM
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(closeBtn);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);
                
                // Show lightbox
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close lightbox when clicking the close button or outside the image
                closeBtn.addEventListener('click', function() {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        lightbox.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(lightbox);
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Load more button functionality
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real application, this would load more nominees from a server
            // For this demo, we'll just show a message
            this.innerHTML = 'Loading...';
            
            setTimeout(() => {
                this.innerHTML = 'No more nominees to load';
                this.disabled = true;
            }, 1500);
        });
    }
});