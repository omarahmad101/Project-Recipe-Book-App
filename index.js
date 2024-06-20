const API_KEY = "8c0d15c9c41b496dbcdb267bf188b2a9";
const recipelistEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipelistEl.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");

        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";

        const recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        const recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `
            <strong>Ingredients:</strong> ${recipe.extendedIngredients.map(ingredient => ingredient.original).join(', ')}
        `;

        const recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;  // Corrected this line to use `recipeLinkEl`
        recipeLinkEl.innerText = "View Recipe";

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);  // Corrected this line to append `recipeLinkEl`
        recipelistEl.appendChild(recipeItemEl);
    });
}

async function getRecipes() {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=15&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.recipes;
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();
