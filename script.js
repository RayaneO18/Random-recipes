document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner l'élément du bouton
  const circleButton = document.querySelector(".circle-button");
  const resultContainer = document.querySelector(".result-container");

  circleButton.addEventListener("click", async function () {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) {
        throw new Error("La requête vers l'API a échoué.");
      }

      const data = await response.json();

      const meal = data.meals[0];
      console.log(meal);

      if (meal) {
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;
        const mealCountry = meal.strArea;
        const mealYoutube = meal.strYoutube;
        const mealInstructions = meal.strInstructions;

        const image = document.createElement("img");
        image.src = mealImage;

        const name = document.createElement("h2");
        name.textContent = mealName;

        const country = document.createElement("p");
        country.textContent = `Pays : ${mealCountry}`;

        const youtubeLink = document.querySelector(".link");
        youtubeLink.textContent = "Lien YouTube";
        youtubeLink.style.opacity = 1;
        youtubeLink.addEventListener("click", () => {
          youtubeLink.href = mealYoutube;
        });

        const instructions = document.createElement("ins");
        instructions.textContent = `Instructions: ${mealInstructions}`;

        // Création d'une liste pour les ingrédients
        const ingredientsList = document.createElement("ul");
        let i = 1;
        while (meal[`strIngredient${i}`]) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          const ingredientItem = document.createElement("li");
          ingredientItem.textContent = `${measure} ${ingredient}`;
          ingredientsList.appendChild(ingredientItem);
          i++;
        }

        resultContainer.innerHTML = "";

        resultContainer.appendChild(image);
        resultContainer.appendChild(name);
        resultContainer.appendChild(country);
        resultContainer.appendChild(youtubeLink);
        resultContainer.appendChild(ingredientsList);
        resultContainer.appendChild(instructions);
      } else {
        console.error("Aucun plat trouvé.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  });
});
