const searchButton = document.getElementById("searchButton");
const notFound = document.getElementById("notFound");
const searchArea = document.getElementById("searchArea");
const header = document.getElementById("header");
const mealItemsContainer = document.getElementById("mealItemsContainer");
const emptyInputPopup = document.getElementById("emptyInputPopup");
const mealItemDetails = document.getElementById("mealItemDetails");


//Call Api And Get Meal Data From Api By Clicked In Search Button
const getMealList = () => {
    //Get Input Value
    let searchInputMeal = document.getElementById('searchBox').value.trim();
    //If Your Try To Search By A Meal Name
    if (searchInputMeal.length > 0) {
        //Call Api
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputMeal}`)
            .then(res => res.json())
            .then(data => displayMealList(data));
    }
    //If Your Try To Search With Out Input A Meal Name
    else {
        emptyInputPopup.style.display = "block";
        notFound.style.display = "none";
        mealItemsContainer.style.visibility = "hidden";
    }
}


//Search Button Event Handler
searchButton.addEventListener("click", getMealList);


// Display Meal Data
const displayMealList = data => {

    let mealItem = "";
    // If there are Meal items
    if (data.meals) {

        data.meals.forEach(meal => {

            mealItem += `           
            <div class="meal-item" onclick="getSingleMaleItem('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="" class="meal-item-image">
            <h3>${meal.strMeal}</h2>
            </div>
            `;

            notFound.style.display = "none";
            emptyInputPopup.style.display = "none";
            mealItemsContainer.style.visibility = "visible";

        });
    }
    //If Meal items are not available
    else {

        const notFound = document.getElementById("notFound");
        notFound.style.display = "block";
        emptyInputPopup.style.display = "none";

    }
    mealItemsContainer.innerHTML = mealItem;
}


//Get Single Male Items Details
const getSingleMaleItem = mealId => {
    // Call Api
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displaySingleMaleItemDetails(data.meals[0]))
}


// display single male item
const displaySingleMaleItemDetails = singleItem => {

    mealItemDetails.style.display = "block";
    searchArea.style.visibility = "hidden";
    mealItemsContainer.style.visibility = "hidden";

    //creat ingredients array
    const ingredients = [];
    for (let i = 0; i <= 20; i++) {
        if (singleItem[`strIngredient${i}`]) {
            ingredients.push(
                `${singleItem[`strIngredient${i}`]}-${singleItem[`strMeasure${i}`]}`
            );
        }
    }

    // wark with single images pop  up area dom
    mealItemDetails.innerHTML = `
        <div class="mealItemDetails-image">
        <img src="${singleItem.strMealThumb}" alt="">
        </div>
        <div class="mealItemDetailsInfo">
            <h1>${singleItem.strMeal}</h1>
            <h3>Ingredients</h3>
            <ul>
             ${ingredients.map((ing) => `<li><i class="fas fa-check-square"></i> ${ing}</li>`).join("")}                
            </ul>
            <button id="coloseButton" onclick = closeMealItemDetails() >Close</button>
        </div>
        <div id="closeIcon" onclick = closeMealItemDetails()>
            <i class="fas fa-times"></i>
        </div>
    `;
}


//Close Male Single Item Details
const closeMealItemDetails = () => {
    searchArea.style.visibility = "visible";
    mealItemDetails.style.display = "none";
    mealItemsContainer.style.visibility = "visible";
}
