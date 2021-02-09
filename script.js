const mealContainer = document.getElementById("mealContainer");
const emptyInputMassege = document.getElementById("emptyInputMassege");
const nothingFoundMassege = document.getElementById("nothingFound");
const mealItemDetails = document.getElementById("mealItemDetails");
const searchArea = document.getElementById("searchArea");

//Call Api And Get Meals data From Api By Clicked In Search Button
const searchMeals = () => {
    //Get Input Value  
    const searchText = document.getElementById("searchBox").value.trim();
    //If User Search By A Meal Name
    if (searchText.length > 0) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayMeals(data));
    }
    //If User Try To Search By Nothing
    else {
        emptyInputMassege.style.display = "block";
        mealContainer.style.visibility = "hidden";
        nothingFoundMassege.style.display = "none";
    }
}

//Display Meals Data
const displayMeals = (meals) => {
    //If there are Meal items   
    if (meals.meals) {
        mealContainer.innerHTML = "";
        meals.meals.forEach(meal => {
            //work with dom
            const mealDiv = document.createElement("div");
            mealDiv.className = "meal";
            mealDiv.innerHTML = `
                <div onclick = "getSingleMaleDetails('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="" class="meal-image">
                    <h3>${meal.strMeal}</h2>
                </div>
            `;
            mealContainer.appendChild(mealDiv);

            mealContainer.style.visibility = "visible";
            nothingFoundMassege.style.display = "none";
            emptyInputMassege.style.display = "none";
        });
    }
    //If Meal items are not available
    else {
        mealContainer.style.visibility = "hidden";
        nothingFoundMassege.style.display = "block";
        emptyInputMassege.style.display = "none";
    }
}

//Get Single Male Items Details
const getSingleMaleDetails = mealId => {
    // Call Api
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]));
}

// display single male item Details
const displayMealDetails = male => {
    mealItemDetails.style.display = "block";
    searchArea.style.visibility = "hidden";
    mealContainer.style.visibility = "hidden";
    //creat ingredients array
    const ingredients = [];
    for (let i = 0; i <= 20; i++) {
        if (male[`strIngredient${i}`]) {
            ingredients.push(
                `${male[`strIngredient${i}`]}-${male[`strMeasure${i}`]}`
            );
        }
    }

    // wark with single male item Details dom
    mealItemDetails.innerHTML = `
        <div class="mealItemDetails-image">
        <img src="${male.strMealThumb}" alt="">
        </div>
        <div class="mealItemDetailsInfo">
            <h1>${male.strMeal}</h1>
            <h3>Ingredients</h3>
            <ul>
             ${ingredients.map((ing) => `<li><i class="fas fa-check-square"></i> ${ing}</li>`).join("")}                
            </ul>
            <button id="coloseButton" onclick = closeMealDetails() >Close</button>
        </div>
        <div id="closeIcon" onclick = closeMealDetails()>
            <i class="fas fa-times"></i>
        </div>
    `;
}

//Close Male Single Item Details
const closeMealDetails = () => {
    searchArea.style.visibility = "visible";
    mealItemDetails.style.display = "none";
    mealContainer.style.visibility = "visible";
}