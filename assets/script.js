var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-query');
var resultsList = document.querySelector('#results');
// var searchButton = document.querySelector('.search-btn');
var saveBtn = document.createElement('button');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  var searchValue = searchInput.value.trim();
  if (searchValue === '') return;

  var appId = 'f63380fe';
  var appKey = '90aaa4d2875a09ca3d7df6d0944c9096';
  var url = `https://api.edamam.com/search?q=${searchValue}&app_id=${appId}&app_key=${appKey}&from=0&to=4`;

  try {
    var response = await fetch(url);
    if (!response.ok) {
      throw new Error('API responded with an error:', response.status);
    }
    var data = await response.json();
    localStorage.setItem('recipesData', JSON.stringify(data));
    location.href = `Page2.html?q=${searchValue}`;
  } catch (error) {
    console.error('Error:', error);
  }
});



function displayRecipes(recipesData) {
  var container = document.getElementById('left');
  var cardContainer = document.createElement('div');
  cardContainer.classList.add('container-2');

  var heading = document.createElement('h2');
  heading.style.fontSize = '24px';
  heading.style.fontWeight = 'bold';
  heading.textContent = 'Check out these recipes';

  cardContainer.appendChild(heading);

  recipesData.forEach((hit) => {
    var recipe = hit.recipe;

    var card = document.createElement('div');
    card.classList.add('card-1', 'card-styles');

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

    cardContainer.appendChild(card);
  });

  container.appendChild(cardContainer);
}

// function displaySavedRecipes() {
//   var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

//   savedRecipes.forEach(function (savedRecipe) {
//     var card = document.createElement('div');
//     card.classList.add('card');
//     resultsList.appendChild(card);
//   });
// }

function generatePlaceholderRecipes() {
  var placeholderRecipes = [
    {
      label: 'Chicken Vesuvio',
      source: 'Serious Eats',
      image: 'assets/chicken vesuvio.jpg',
      ingredients: [
        "1/2 cup olive oil",
        "5 cloves garlic, peeled",
        "2 large russet potatoes, peeled and cut into chunks",
        "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
        "3/4 cup white wine",
        "3/4 cup chicken stock",
        "3 tablespoons chopped parsley",
        "1 tablespoon dried oregano",
        "Salt and pepper",
        "1 cup frozen peas, thawed"
      ]
    },
    {
      label: 'Curried Chicken Pot Pie Recipe',
      source: 'Serious Eats',
      image: 'assets/Curried Chicken Pot Pie Recipe.jpg',
      ingredients: [
        "1 tablespoon butter",
        "1 onion, finely chopped",
        "2 carrots, finely chopped",
        "8 chicken thighs (about 2 pounds) cut into 2 inch pieces",
        "2 tablespoons curry powder",
        "2 tablespoons flour",
        "2 cups chicken stock",
        "Kosher salt and cracked black pepper",
        "Kosher salt and cracked black pepper",
        "2 tablespoons cream (optional)",
        "1 pound puff pastry (thawed if frozen)",
        "1 egg, beaten"
      ]
    },
    {
      label: 'Steak Pizza with Blue Cheese',
      source: 'Honest Cooking',
      image: 'assets/Steak Pizza with Blue Cheese.jpg',
      ingredients: [
        "Dough for one 12″- to 13″ pizza, parbaked at 475 for 6 minutes, or one prepared pizza crust",
        "1 large onion, sliced thin",
        "2 tablespoons olive oil, divided",
        "Salt and pepper to taste",
        "Salt and pepper to taste",
        "Pinch sugar",
        "8 oz. thinly sliced mushrooms",
        "2 teaspoons worcestershire sauce",
        "10 ounces leftover grilled steak, sliced thinly across the grain",
        "1 cup shredded monterey jack cheese",
        "12 cherry tomatoes (or two regular tomatoes), thinly sliced and drained on paper towels (i used red and yellow tomatoes)",
        "¼ cup blue cheese crumbles"
      ]
    },
    {
      label: 'chili colorado',
      source: 'Serious Eats',
      image: 'assets/chili colorado.jpg',
      ingredients: [
        "3 pounds boneless chuck roast, trimmed and cut into 1-inch chunks",
        "1 teaspoon salt",
        "¾ teaspoon ground pepper",
        "1 tablespoon corn oil or canola oil, divided",
        "4 cloves garlic, minced",
        "3 cups water",
        "2 cups low-sodium beef broth",
        "6 tablespoons New Mexican red chile powder or regular chili powde",
        "1½ teaspoons ground cumin",
        "1½ teaspoons dried oregano, preferably Mexican",
        "3 cups diced potatoes ( ½-inch; about 1 pound)",
        "3 cups corn kernels (fresh or frozen, thawed)",
        "2 cups thinly sliced green cabbage",
        "1 cup sliced radishes",
        "½ cup chopped white onion",
        "½ cup chopped fresh cilantro",
        "Warm flour tortillas for serving (optional)"
      ]
    },

  ];

  return placeholderRecipes;
}

function displayPlaceholderRecipes() {
  var placeholderRecipes = generatePlaceholderRecipes();

  placeholderRecipes.forEach(function (recipe) {
    var card = document.createElement('div');
    card.classList.add('card');

    var cardImage = document.createElement('div');
    var figure = document.createElement('figure');
    figure.classList.add('image', 'is-4by3');

    var image = document.createElement('img');
    image.src = recipe.image;

    figure.appendChild(image);
    cardImage.appendChild(figure);

    var cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    var title = document.createElement('p');
    title.classList.add('title', 'is-4');
    title.textContent = recipe.label;

    var subtitle = document.createElement('p');
    subtitle.classList.add('subtitle');
    subtitle.textContent = `by ${recipe.source}`;

    var ingredients = document.createElement('ul');
    ingredients.classList.add('content');

    recipe.ingredients.forEach(function (ingredient) {
      var li = document.createElement('li');
      li.textContent = ingredient;
      ingredients.appendChild(li);
    });

    cardContent.appendChild(title);
    cardContent.appendChild(subtitle);
    cardContent.appendChild(ingredients);

    card.appendChild(cardImage);
    card.appendChild(cardContent);

    resultsList.appendChild(card);
  });
}
console.log(window.location.pathname)
//when home page loads display placeholderRecipes
if (window.location.pathname.includes('/index.html')) {
  window.addEventListener('load', displayPlaceholderRecipes);
}


// window.addEventListener('DOMContentLoaded', function () {
//   console.log('this code ran')
//   var data = JSON.parse(localStorage.getItem('recipesData'));
//   displayRecipes(data.hits);

// });

// if (window.location.pathname === '/Page2.html') {
//   window.addEventListener('load', displaySavedRecipes);

// }







//API KEY for EDAMAM--90aaa4d2875a09ca3d7df6d0944c9096

//API Key for YouTube Data API --AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g
//2nd API key for Youtube Data API without restrictions-- AIzaSyCJyk_a9TL9uuWCXT4vZuZ4krxovy3kh0Q




$(".saveBtn").on("click", function () {
  var parent = $(this).parent().parent()
  var inputValue = parent.html()
  var key = parent.attr("id");
  localStorage.setItem(key, inputValue);
  console.log(localStorage.getItem(key));
});

$("textarea").each(function () {
  var key = $(this).parent().attr("id");
  var savedValue = localStorage.getItem(key);
  if (savedValue) {
    $(this).val(savedValue);
  }
});






function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(function () { console.log("Sign-in successful"); },
      function (err) { console.error("Error signing in", err); });




}
function loadClient() {
  gapi.client.setApiKey("AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")

    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });

}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.channels.list({})

    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
      function (err) { console.error("Execute error", err); });
}


// fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&type=video&key=AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g`)

//     .then(res =>{
//       return res.json();
//     })
//     .then(data=>{
//       data.items.forEach((curr)=>{
//         console.log(curr)
//       })
//     })
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