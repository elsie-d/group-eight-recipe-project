

// QUERY PARAMS
var queryString = window.location.search;
var urlParam = new URLSearchParams(queryString);
var searchTerm = urlParam.get('q')

//APIs

var ytAPIURL =  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=cook${searchTerm}&type=video&key=AIzaSyDV2KFS-UBjCpIsSV30L20bxzQbs8tr5WI` 


//back up YT API Key -->1) AIzaSyCmemNtsJzdm23Gvqln6QInMVz45a0oQ_Q     2) ---AIzaSyDV2KFS-UBjCpIsSV30L20bxzQbs8tr5WI 3)AIzaSyDYyNNGAC_vcZDPsWFnBAZeA0UwH-CCucI   4)AIzaSyBKk5pC8fs4f-Rm5zZcXt4o7PEr3Nn1dys

// EVENT LISTENER -- PULL RECIPIES BASED ON QUERY

window.addEventListener("load", (event) => {
  // event.preventDefault();
   
    edamamLoad();
    videosLoad();
    console.log("page is fully loaded");


  });




/// YOUTUBE API FETCHING

function videosLoad() {
fetch(ytAPIURL)
.then (function (response){
    return response.json();
}) 

// GET DATA
.then(function (data){
    var { items } = data
    console.log(items);

// CREATE AND APPEND VIDEO CARDS    
    items.forEach(function(items){
        var card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
        <div class="column">
            <div class="card  "> 
                <header class="card-header">
                    <p class="card-header-title">
                        ${items.snippet.title}
                    </p>
                    <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>
                <div class="card-content">
                    <div class="content">
                        <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${items.id.videoId}"   allowfullscreen="allowfullscreen">
                        </iframe>
                        <br /><br />
                        <p></p>
                    </div>
                </div>
                <footer class="card-footer">
                <a href="https://www.youtube.com/watch?v=${items.id.videoId}" class="card-footer-item saveBtn">Watch on YouTube</a>

                </footer>

            </div>
        </div>
        `  
        document.getElementById('videos').appendChild(card)

    })
    
})}



// alberts edamam funcionality

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-query');
var resultsList = document.querySelector('#results');
var searchButton = document.querySelector('.search-btn');
var saveBtn = document.createElement('button');

var edUrl = `https://api.edamam.com/search?q=${searchTerm}&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096&from=0&to=4`
function edamamLoad() {
  fetch(edUrl)

  .then (function (response){
      return response.json();
  }) 
  
  // GET DATA
  .then(function (data){
    displayRecipes(data.hits)})
  }
















function loadRecipesFromLocalStorage() {
  var savedRecipesString = localStorage.getItem('savedRecipes');
  var savedRecipes = JSON.parse(savedRecipesString);

  var container = document.getElementById('loaded-recipes');
  container.innerHTML = ''; // Clear the container before rendering

  if (savedRecipes) {
    savedRecipes.forEach((savedRecipe) => {
      var card = document.createElement('div');
      card.classList.add('card');

      var header = document.createElement('header');
      header.classList.add('card-header');

      var headerTitle = document.createElement('p');
      headerTitle.classList.add('card-header-title');
      headerTitle.textContent = savedRecipe.label;

      var content = document.createElement('div');
      content.classList.add('card-content');

      var innerContent = document.createElement('div');
      innerContent.classList.add('content');

      var ingredients = document.createElement('ul');
      ingredients.classList.add('content');

      savedRecipe.ingredients.forEach((ingredient) => {
        var li = document.createElement('li');
        li.textContent = ingredient;
        ingredients.appendChild(li);
      });

      innerContent.appendChild(ingredients);
      content.appendChild(innerContent);

      card.appendChild(header);
      card.appendChild(content);

      container.appendChild(card);
    });
  }
}

function displayRecipes(hits) {
  var container = document.getElementById('ed-recipes');
  var heading = document.createElement('h2');

  container.innerHTML = ''; // Clear the container before rendering

  hits.forEach((hit) => {
    var recipe = hit.recipe;

    var cardCol = document.createElement('div');
    cardCol.classList.add('column');

    var card = document.createElement('div');
    card.classList.add('card');

    var header = document.createElement('header');
    header.classList.add('card-header');

    var headerTitle = document.createElement('p');
    headerTitle.classList.add('card-header-title');
    headerTitle.textContent = recipe.label;

    var headerIcon = document.createElement('button');
    headerIcon.classList.add('card-header-icon');
    headerIcon.setAttribute('aria-label', 'more options');

    var icon = document.createElement('span');
    icon.classList.add('icon');

    var angleDownIcon = document.createElement('i');
    angleDownIcon.classList.add('fas', 'fa-angle-down');
    angleDownIcon.setAttribute('aria-hidden', 'true');

    icon.appendChild(angleDownIcon);
    headerIcon.appendChild(icon);

    header.appendChild(headerTitle);
    header.appendChild(headerIcon);

    var content = document.createElement('div');
    content.classList.add('card-content');

    var innerContent = document.createElement('div');
    innerContent.classList.add('content');

    var ingredients = document.createElement('ul');
    ingredients.classList.add('content');

    recipe.ingredients.forEach((ingredient) => {
      var li = document.createElement('li');
      li.textContent = ingredient.text;
      ingredients.appendChild(li);
    });

    innerContent.appendChild(ingredients);
    content.appendChild(innerContent);

    var footer = document.createElement('footer');
    footer.classList.add('card-footer');

    var saveBtn = document.createElement('a');
    saveBtn.classList.add('card-footer-item', 'saveBtn');
    saveBtn.href = '#';
    saveBtn.textContent = 'Save';

    footer.appendChild(saveBtn);

    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);

    container.appendChild(cardCol);
    cardCol.appendChild(card);

    saveBtn.addEventListener('click', function() {
      saveRecipesToLocalStorage([hit]);
      loadRecipesFromLocalStorage(); // Render the saved information
    });
  });
}

function saveRecipesToLocalStorage(hits) {
  var savedRecipesString = localStorage.getItem('savedRecipes');
  var savedRecipes = savedRecipesString ? JSON.parse(savedRecipesString) : [];

  var recipe = hits[0].recipe;

  var savedRecipe = {
    label: recipe.label,
    ingredients: recipe.ingredients.map(ingredient => ingredient.text)
  };

  savedRecipes.push(savedRecipe);

  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
}

// Load the saved recipes when the page loads
window.addEventListener('load', function() {
  loadRecipesFromLocalStorage();
});

// Adjust the number of card columns to 4
function adjustCardColumns() {
  var container = document.getElementById('loaded-recipes');
  var cards = container.getElementsByClassName('card');

  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.add('column');
  }
}

// Call the adjustCardColumns function after loading the saved recipes
adjustCardColumns();


 function displaySavedRecipes() {
   var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

   savedRecipes.forEach(function (savedRecipe) {
    var card = document.createElement('div');
    card.classList.add('card');
     resultsList.appendChild(card);
   });
 }

 window.addEventListener('DOMContentLoaded', function () {
   console.log('this code ran')
   var data = JSON.parse(localStorage.getItem('recipesData'));
   displayRecipes(data.hits);
  
 });

 if (window.location.pathname === '/Page2.html') {
  window.addEventListener('load', displaySavedRecipes);

 }

 document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});




