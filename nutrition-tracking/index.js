// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Nutrition analysis and meal log
const mealLog = JSON.parse(localStorage.getItem('mealLog')) || [];
const renderMealLog = () => {
    const mealLogList = document.getElementById('mealLogList');
    mealLogList.innerHTML = '';
    mealLog.forEach((meal, index) => {
        const logItem = document.createElement('div');
        logItem.className = 'meal-log-item d-flex justify-content-between align-items-center';
        logItem.innerHTML = `
            <div>
                <strong>${meal.description}</strong><br>
                Calories: ${meal.calories} kcal, Protein: ${meal.protein}g, Carbs: ${meal.carbs}g, Fat: ${meal.fat}g
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteMeal(${index})">Delete</button>
        `;
        mealLogList.appendChild(logItem);
    });
};

const deleteMeal = (index) => {
    mealLog.splice(index, 1);
    localStorage.setItem('mealLog', JSON.stringify(mealLog));
    renderMealLog();
};

document.getElementById('nutritionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('mealDescription').value.trim();
    const resultText = document.getElementById('resultText');
    const analysisResult = document.getElementById('analysisResult');
    const noMatchMessage = document.getElementById('noMatchMessage');

    // Validate input
    if (!description) {
        console.log('Empty meal description');
        noMatchMessage.style.display = 'block';
        analysisResult.style.display = 'none';
        return;
    } else {
        noMatchMessage.style.display = 'none';
    }

    // Generate random nutritional values
    const calories = Math.floor(Math.random() * (500 - 100 + 1)) + 100; // 100–500 kcal
    const protein = Math.floor(Math.random() * (40 - 5 + 1)) + 5;     // 5–40 g
    const carbs = Math.floor(Math.random() * (60 - 10 + 1)) + 10;     // 10–60 g
    const fat = Math.floor(Math.random() * (20 - 5 + 1)) + 5;         // 5–20 g

    console.log(`Analyzing meal: ${description}`);
    console.log(`Generated: Calories=${calories}, Protein=${protein}, Carbs=${carbs}, Fat=${fat}`);

    const mealData = { description, calories, protein, carbs, fat };
    mealLog.push(mealData);
    localStorage.setItem('mealLog', JSON.stringify(mealLog));

    resultText.innerHTML = `
        Calories: ${calories} kcal<br>
        Protein: ${protein}g<br>
        Carbohydrates: ${carbs}g<br>
        Fat: ${fat}g<br>
        <small>This is a simplified demo with random values. Actual analysis uses AI for precision.</small>
    `;
    analysisResult.style.display = 'block';
    renderMealLog();
    this.reset();
});

// Initial render of meal log
renderMealLog();