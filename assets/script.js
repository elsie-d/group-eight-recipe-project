var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-query');
var resultsList = document.querySelector('#results');
var searchButton = document.querySelector('.search-btn');
var saveBtn = document.createElement('button');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  var searchValue = searchInput.value.trim();
  if (searchValue === '') return;

  var appId = 'f63380fe&'
  var appKey = '90aaa4d2875a09ca3d7df6d0944c9096'

  var url = `https://api.edamam.com/search?q=${searchValue}&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096&from=0&to=10`
  try { 
    var response = await fetch(url);
    if (!response.ok) {
      throw new Error('API responded with an error:', response.status);
    }
    var data = await response.json();
      displayRecipes(data.hits)
  } catch (error) { 
    console.error('Error:', error);

  }
});

function generatePlaceholderRecipe() {
  var placeholderRecipe = {
    label: 'Chicken Vesuvio',
    source: 'Serious Eats',
    image: 'https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjENL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGW6v%2Fle1%2BwUaTcCou5cAPPWNQ54CWRCkDNGRoVQpFm%2FAiAYfZ1B6sIG0pZzIEdswmXpNAtvqoLmx7sablUG%2BOVjUyrCBQj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDE4NzAxNzE1MDk4NiIMK5ADm7ub1lVC86SPKpYFrGME25DqivR95nbRdZb46q0Rv6V0yxzoEohVJ%2FDItM0p55P0ogHsxQaRKsiMmbKUvScqoaSwVEKRYEwmJwNSdp7ddNzxb112jIZFus39VhszA136Tf5cD%2Fkgz9p7ozXY1Umt%2BN%2FFe%2FN4yTBPqYASGUWaQ87jWNGE8NL2gwyhpy22cl9am7gL0UY5%2FkISOivttvRVYe52d4xC8apr%2BhsCGjo2nVaqRxQF84zfjXR2W2KT%2FGkvAb2zTuOl%2Bxs8sVWuka%2Ffqrum5YGi0IN1h9tY67dccrnl1dVgC5X34ZVh1Tq2khd2A9hj%2FNRTUKSd3FE53C7lXTdTwAMKZRZFMCucflvF2iRvS735LepCHZK2Nj1UPoMBo91I6AjqyOJVfp1x074N51d9zx1NY1OG1ysqS4kCjPVcLFrXM86INRvqT3ll1K0I0Kdt4uniMxEElLO9YNqHwCCsY2%2FZe17EzCsiAZ83u%2FXOHbnHoaKZ1vyufnyk1UMfliiQbtJULTdBfNY470AMhPkGcg7W%2BQEJydc8Dy6poawH%2F3fOhUW0IkoUJTCoyxqRfWE%2BKAQ8qfMl1JygV%2FxKqHvNMTpqH8L1DY%2BS6j5JzHej2u6igT3TC7MOpBQ9oJ1C8PplhvGyOkVpQw05f%2FXF%2FOm52EUoBvYBE%2BaQvY84d3MfWlfjw0lD46t8T1YzebA8gboWZdzK7UqFkx3MzeznBqu6dBv8U6uWWHXQ6FAjtLD7rwNctXcACdWpKCz4QUWQhZGkuWV4sla7HzxlSxzGB7CIjplnE4qsmx0F8%2FMx4nnFkXNyBLEVoYLwwvCPJNnnJWp5cFxiXp0KUq0%2B%2Fj8nHRO%2B4vwhM7LVRN99236KzDrp0%2BHgrF3H0Ey4C7xYTHuptAkw%2FNuGqgY6sgFpSIG3YJd8gecsGZNcGssryFRudXcWyDNGDG9aL0gI0v43IHB3UD%2BXUan1aeoAKFxJDAte09AOEfcRGKNcyLcXqDPkqpJZPFYpFovmKOst1CBt6L7iVmohtzb%2BMs4LCzpN37VU82Br1A1%2BkcPtLhIV3kNpOrnjSss%2B6oe0QEGzC0I%2FBd%2F0Tk1LDcISSDKBhAGXzhK%2FAQRtL70eTZzJRnSbqUmI%2BjB%2FZK4974P94L8Z%2Fitl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231101T030208Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFG4OQZWZV%2F20231101%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2fbdd18ee641a8053c3fefefbb84fc87aa140db9673a09505b2df3d56e991348',
    ingredients: [[
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
    ]]
  };

  return placeholderRecipe;
}

searchButton.addEventListener("click", searchRecipes)



function displayPlaceholderRecipe() {
  var placeholderRecipe = generatePlaceholderRecipe();

  var card = document.createElement('div');
  card.classList.add('card');

  var cardImage = document.createElement('div');
  var figure = document.createElement('figure');
  figure.classList.add('image', 'is-4by3');

  var image = document.createElement('img');
  image.src = placeholderRecipe.image;

  figure.appendChild(image);
  cardImage.appendChild(figure);

  var cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  var title = document.createElement('p');
  title.classList.add('title', 'is-4');
  title.textContent = placeholderRecipe.label;

  var subtitle = document.createElement('p');
  subtitle.classList.add('subtitle');
  subtitle.textContent = `by ${placeholderRecipe.source}`;

  var ingredients = document.createElement('ul');
  ingredients.classList.add('content');

  placeholderRecipe.ingredients.forEach(function(ingredient) {
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
}

window.addEventListener('load', displayPlaceholderRecipe);

function displayRecipes(hits) {
  resultsList.innerHTML = '';

  hits.forEach((hit) => {
    var recipe = hit.recipe;

    var card = document.createElement('div');
    card.classList.add('card');

    var cardImage = document.createElement('div');
    var figure = document.createElement('figure'); // Add this line
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

    recipe.ingredients.forEach((ingredient) => {
      var li = document.createElement('li');
      li.textContent = ingredient.text;
      ingredients.appendChild(li);
    });



    var saveBtn = document.createElement('button');
    saveBtn.classList.add('saveBtn');
    saveBtn.textContent = 'Save';

    saveBtn.addEventListener('click', function() {
      var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
      savedRecipes.push(recipe);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    });


    
    window.addEventListener('load', displaySavedRecipes);

    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      resultsList.innerHTML = ''; 
    });
    

    cardContent.appendChild(title);
    cardContent.appendChild(subtitle);
    cardContent.appendChild(ingredients);
    cardContent.appendChild(saveBtn);

    card.appendChild(cardImage);
    card.appendChild(cardContent);

    resultsList.appendChild(card);
  });
}

function displaySavedRecipes() {
  var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  savedRecipes.forEach(function(savedRecipe) {
    var card = document.createElement('div');
    card.classList.add('card');

    var cardImage = document.createElement('div');
    var figure = document.createElement('figure');
    figure.classList.add('image', 'is-4by3');

    var image = document.createElement('img');
    image.src = savedRecipe.image;

    figure.appendChild(image);
    cardImage.appendChild(figure);

    var cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    var title = document.createElement('p');
    title.classList.add('title', 'is-4');
    title.textContent = savedRecipe.label;

    var subtitle = document.createElement('p');
    subtitle.classList.add('subtitle');
    subtitle.textContent = `by ${savedRecipe.source}`;

    var ingredients = document.createElement('ul');
    ingredients.classList.add('content');

    savedRecipe.ingredients.forEach(function(ingredient) {
      var li = document.createElement('li');
      li.textContent = ingredient.text;
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

window.addEventListener('load', displaySavedRecipes);

function displaySavedRecipes() {
  var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  savedRecipes.forEach(function(savedRecipe) {
    var card = document.createElement('div');
    card.classList.add('card');
    resultsList.appendChild(card);
  });
}
window.addEventListener('load', displaySavedRecipes);

//API KEY for EDAMAM--90aaa4d2875a09ca3d7df6d0944c9096

//API Key for YouTube Data API --AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g
//2nd API key for Youtube Data API without restrictions-- AIzaSyCJyk_a9TL9uuWCXT4vZuZ4krxovy3kh0Q

 
function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });




}
function loadClient() {
  gapi.client.setApiKey("AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")

      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });

}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.channels.list({})

      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUNbngWUqL2eqRw12yAwcICg&key=AIzaSyCJyk_a9TL9uuWCXT4vZuZ4krxovy3kh0Q')
    .then(res =>{
      return res.json();
    })
    .then(data=>{
      data.items.forEach((curr)=>{
        console.log(curr)
      })
    })


    

    



















































































































