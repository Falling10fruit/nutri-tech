// Initialize carousel explicitly
document.addEventListener('DOMContentLoaded', function() {
    try {
        const carouselElement = document.querySelector('#heroCarousel');
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: 5000,
                wrap: true,
                touch: true
            });
        } else {
            console.error('Carousel element #heroCarousel not found');
        }
    } catch (e) {
        console.error('Error initializing carousel:', e);
    }
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const contactMessage = document.getElementById('contactMessage');
    contactMessage.classList.remove('d-none', 'alert-danger');
    contactMessage.classList.add('alert-success');
    contactMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
    this.reset();
});

// Health quiz submission
document.getElementById('healthQuizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const goal = document.getElementById('healthGoal').value;
    const diet = document.getElementById('dietPreference').value;
    const quizResult = document.getElementById('quizResult');
    const quizResultText = document.getElementById('quizResultText');
    let recommendation = '';
    if (goal === 'weight-loss') {
        recommendation = 'Try our <a href="nutrition-tracking/">Smart Nutrition Tracking</a> to monitor calories and get low-calorie recipe suggestions.';
    } else if (goal === 'muscle-gain') {
        recommendation = 'Use our <a href="nutrition-tracking/">Smart Nutrition Tracking</a> for high-protein meals and <a href="wearable-integration/">Wearable Integration</a> to track workouts.';
    } else if (goal === 'general-wellness') {
        recommendation = 'Explore our <a href="healthy-recipes/">Healthy Recipes</a> for balanced meals and <a href="wearable-integration/">Wearable Integration</a> for holistic tracking.';
    }
    if (diet) {
        recommendation += ` We recommend filtering for ${diet} recipes in our <a href="healthy-recipes/">Healthy Recipes</a> section.`;
    }
    quizResultText.innerHTML = recommendation;
    quizResult.classList.remove('d-none');
    this.reset();
});