document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const mealTypeSelect = document.getElementById('meal-type');
    const dietSelect = document.getElementById('diet');
    const recipesContainer = document.getElementById('recipes');
    
    // Edamam API credentials (replace with your own)
    const APP_ID = 'YOUR_APP_ID';
    const APP_KEY = 'YOUR_APP_KEY';
    
    searchBtn.addEventListener('click', searchRecipes);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });
    
    function searchRecipes() {
        const query = searchInput.value.trim();
        const mealType = mealTypeSelect.value;
        const diet = dietSelect.value;
        
        if (!query) {
            showError('Please enter a search term');
            return;
        }
        
        showLoading();
        
        // Build API URL with parameters
        let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&to=12`;
        
        if (mealType) url += `&mealType=${mealType}`;
        if (diet) url += `&health=${diet}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayRecipes(data.hits);
            })
            .catch(error => {
                showError('Failed to fetch recipes. Please try again.');
                console.error('Error:', error);
            });
    }
    
    function displayRecipes(recipes) {
        recipesContainer.innerHTML = '';
        
        if (recipes.length === 0) {
            showError('No recipes found. Try a different search.');
            return;
        }
        
        recipes.forEach(recipe => {
            const recipeData = recipe.recipe;
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            
            // Get diet labels (remove duplicates and empty values)
            const dietLabels = [...new Set(recipeData.healthLabels
                .filter(label => label.toLowerCase() !== recipeData.dietLabels[0]?.toLowerCase()))];
            
            recipeCard.innerHTML = `
                <img src="${recipeData.image}" alt="${recipeData.label}" class="recipe-img">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipeData.label}</h3>
                    <div class="recipe-info">
                        <span>${Math.round(recipeData.calories)} calories</span>
                        <span>${recipeData.ingredients.length} ingredients</span>
                    </div>
                    <div class="diet-labels">
                        ${recipeData.dietLabels.map(label => 
                            `<span class="recipe-diet">${label}</span>`).join('')}
                        ${dietLabels.slice(0, 3).map(label => 
                            `<span class="recipe-diet">${label}</span>`).join('')}
                    </div>
                    <a href="${recipeData.url}" target="_blank" class="view-recipe">View Recipe</a>
                </div>
            `;
            
            recipesContainer.appendChild(recipeCard);
        });
    }
    
    function showLoading() {
        recipesContainer.innerHTML = `
            <div class="loading">
                <p>Loading recipes...</p>
            </div>
        `;
    }
    
    function showError(message) {
        recipesContainer.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    }
});