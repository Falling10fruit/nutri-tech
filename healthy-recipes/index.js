// Recipe search and rating system
const recipes = [
    { name: 'Vegan Quinoa Salad', diet: 'vegan', description: 'A fresh salad with quinoa, avocado, and veggies.', image: 'https://live.staticflickr.com/65535/54507567830_79e6f2e82c_o_d.jpg', ratings: [], averageRating: 0, userRating: 0 },
    { name: 'Keto Chicken Stir-Fry', diet: 'keto', description: 'Low-carb stir-fry with chicken and broccoli.', image: 'https://live.staticflickr.com/65535/54507217641_a7db495914_o_d.jpg', ratings: [], averageRating: 0, userRating: 0 },
    { name: 'Gluten-Free Pancakes', diet: 'gluten-free', description: 'Fluffy pancakes made with almond flour.', image: 'https://live.staticflickr.com/65535/54507217726_220b3fb0e5_o_d.jpg', ratings: [], averageRating: 0, userRating: 0 },
    { name: 'Vegan Smoothie Bowl', diet: 'vegan', description: 'A nutrient-packed smoothie bowl with berries.', image: 'https://live.staticflickr.com/65535/54507567795_771f0aa7b2_o_d.jpg', ratings: [], averageRating: 0, userRating: 0 }
];

const savedRatings = JSON.parse(localStorage.getItem('recipeRatings')) || {};
recipes.forEach(recipe => {
    if (savedRatings[recipe.name]) {
        recipe.ratings = savedRatings[recipe.name].ratings;
        recipe.averageRating = savedRatings[recipe.name].averageRating;
        recipe.userRating = savedRatings[recipe.name].userRating || 0;
    }
});

function updateAverageRating(recipe) {
    console.log(`Updating rating for ${recipe.name}`);
    const total = recipe.ratings.reduce((sum, rating) => sum + rating, 0);
    recipe.averageRating = recipe.ratings.length ? (total / recipe.ratings.length).toFixed(1) : 0;
    savedRatings[recipe.name] = { 
        ratings: recipe.ratings, 
        averageRating: recipe.averageRating, 
        userRating: recipe.userRating 
    };
    localStorage.setItem('recipeRatings', JSON.stringify(savedRatings));
    console.log(`Saved ratings:`, savedRatings);
}

function showRatingMessage(recipeName, rating) {
    const ratingMessage = document.getElementById('ratingMessage');
    ratingMessage.textContent = `Thank you for rating ${recipeName} ${rating} star${rating > 1 ? 's' : ''}!`;
    ratingMessage.style.display = 'block';
    setTimeout(() => {
        ratingMessage.style.display = 'none';
    }, 3000);
}

function renderRecipes(filteredRecipes) {
    console.log('Rendering recipes:', filteredRecipes);
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';
    filteredRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card recipe-card">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-text">${recipe.description}</p>
                    <p class="text-muted">Diet: ${recipe.diet}</p>
                    <p>Average Rating: ${recipe.averageRating} (${recipe.ratings.length} votes)</p>
                    <div class="star-rating" data-recipe="${recipe.name}" title="Rate from 1 to 5 stars">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                    </div>
                </div>
            </div>
        `;
        recipeList.appendChild(card);
    });

    // Attach event listeners to stars
    document.querySelectorAll('.star-rating').forEach(ratingContainer => {
        const recipeName = ratingContainer.dataset.recipe;
        const recipe = recipes.find(r => r.name === recipeName);
        const stars = ratingContainer.querySelectorAll('.star');

        // Apply initial user rating
        if (recipe.userRating > 0) {
            stars.forEach((star, index) => {
                if (index < recipe.userRating) {
                    star.classList.add('filled');
                }
            });
        }

        // Hover effect
        ratingContainer.addEventListener('mouseover', function(e) {
            if (e.target.classList.contains('star')) {
                const value = parseInt(e.target.dataset.value);
                stars.forEach((star, index) => {
                    if (index < value) {
                        star.classList.add('filled');
                    } else {
                        star.classList.remove('filled');
                    }
                });
            }
        });

        // Reset on mouseout
        ratingContainer.addEventListener('mouseout', function() {
            stars.forEach((star, index) => {
                if (recipe.userRating > 0 && index < recipe.userRating) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });
        });

        // Click handler
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.value);
                console.log(`Star clicked: ${recipeName}, Rating: ${rating}`);
                recipe.ratings.push(rating);
                recipe.userRating = rating; // Store user's latest rating
                updateAverageRating(recipe);
                showRatingMessage(recipeName, rating);
                renderRecipes(recipes); // Re-render to update ratings
            });
        });
    });
}

document.getElementById('recipeSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const diet = document.getElementById('dietFilter').value;
    console.log(`Search query: ${query}, Diet: ${diet}`);

    // Filter recipes
    const filteredRecipes = recipes.filter(recipe => {
        const matchesQuery = query === '' || recipe.name.toLowerCase().includes(query) || recipe.description.toLowerCase().includes(query);
        const matchesDiet = diet === '' || recipe.diet === diet;
        return matchesQuery && matchesDiet;
    });

    renderRecipes(filteredRecipes);
});

// Initial render
renderRecipes(recipes);