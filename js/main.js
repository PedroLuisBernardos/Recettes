document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.json')
        .then(response => response.json())
        .then(data => {
            const recipes = data.recipes;
            const currentPage = window.location.pathname;

            if (currentPage.includes('index.html')) {
                updateMenu(recipes);
            } else if (currentPage.includes('recipe-template.html')) {
                const urlParams = new URLSearchParams(window.location.search);
                const recipeTitle = urlParams.get('recipe');
                displayRecipe(recipes, recipeTitle);
            }
        });

    // Function to update the menu dynamically with categories
    function updateMenu(recipes) {
        const navMenu = document.querySelector('nav ul');
        const categories = [...new Set(recipes.map(recipe => recipe.category))];

        categories.forEach(category => {
            const menuItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = `#${category.toLowerCase()}`;
            anchor.textContent = category;
            menuItem.appendChild(anchor);
            navMenu.appendChild(menuItem);
        });
    }

    // Function to display a specific recipe
    function displayRecipe(recipes, title) {
        const recipe = recipes.find(recipe => recipe.title === title);

        if (recipe) {
            document.getElementById('recipe-title').textContent = recipe.title;

            // Smooth load ingredients
            const ingredientsList = document.getElementById('ingredients-list');
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                li.style.opacity = 0;
                ingredientsList.appendChild(li);
                setTimeout(() => {
                    li.style.opacity = 1;
                    li.style.transition = 'opacity 0.5s ease-in-out';
                }, 100);
            });

            // Smooth load steps
            const stepsList = document.getElementById('steps-list');
            recipe.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                li.style.opacity = 0;
                stepsList.appendChild(li);
                setTimeout(() => {
                    li.style.opacity = 1;
                    li.style.transition = 'opacity 0.5s ease-in-out';
                }, 200);
            });
        }
    }
});
