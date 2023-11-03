var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-query');
var resultsList = document.querySelector('#results');
var saveBtn = document.createElement('button');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  var searchValue = searchInput.value.trim();
  if (searchValue === '') return;

  var appId = 'f63380fe';
  var appKey = '90aaa4d2875a09ca3d7df6d0944c9096';
  var url = `https://api.edamam.com/search?q=${searchValue}&app_id=${appId}&app_key=${appKey}&from=0&to=10`;

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

function displaySavedRecipes() {
  var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

  savedRecipes.forEach(function (savedRecipe) {
    var card = document.createElement('div');
    card.classList.add('card');
    resultsList.appendChild(card);
  });
}

function generatePlaceholderRecipes() {
  var placeholderRecipes = [
    {
      label: 'Chicken Vesuvio',
      source: 'Serious Eats',
      image: 'https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIEMdiZrxrtVpcYr9ifFsm3HKI9wTO7Bzk2rXb43f8gxWAiAVnxhggRaxkhJMbaV01bsvoMqNPYKzLg4rCRHRToF%2F2Sq5BQg4EAAaDDE4NzAxNzE1MDk4NiIMhBA2hcVqJF0VWTXkKpYFXXMj0aQdbVZOe6xRqmEu0mAebMsJ5Y%2F0c6FcVjsUkwyI7pUpY9UEGJzhc3DSoCeWsKzIMERWFCjqZdX%2F8f%2F%2FvAAJRphrvpYvCbT13MZL3H5oF5ybgfcsRBdYV8lvtd%2FSSVuRo2TMza6kMOyC8hTqZ%2F0uGZMgw1d%2BGZi%2Bx5XdgVskV9y0guW95rQ4e%2BQ0%2BR1l5%2FXj2zF4ig99qi0aihVvpgs9dttuV%2FRb6ANXZGbLB%2BuOwAEgjMIkJh%2F4t0mi7JOBcG5rLyJkrWTC3XgYiUYzYQhcOWWQVT4w%2FZ0iIXJzKJhFEhzcNrpUJXp7neLNLIwD9hgik0g8KT3lZdixt%2BUagipoKEClWHmDzDJRQp5a2kQbJaI7NDF3os1bZhSU24%2BSzBqwe%2BUePhZZZswBHHCmH4WOetDvmhodn2QtT9RZYwkhzDaDCwEh9xLM7Hq9e1Un3k7RW%2BcpNigh8KKab5IBhCnD1E4OKZgl7V8%2Fz5cAFik05ICDEivfMUExPgcwQ84zrHR4Tp94kTeTyZTV8Uv7M0VLOu7BMRUq1Sqx85JX4XXug%2BxLKHPNx%2Fh2FvdhRBpGjR95AC8qLblvYpaDX53ojelW54gnDIUojznCkUCIWZrED3phRHZtoF2Bmwgkuc0WDIGqpp0r6uUjbCZzElZ%2BhI7qAFVCigyX4jBF9xF8G22RDZHxdQZNzo584ccNPTyjcnd4J8TfOCo74gD5yHdfXERlHF9r6uvn3dxxHNFmMNUQJvyv23U8ZX92OzC0i%2FSC6l03W16kIprm9qORNN%2Bv%2Bhi2C4HOb6%2BV86T6ZS4tTNxQneG3biOcFA6t%2FTOUjuToaiZhC3LDZEbwM1ZJrNXj6Y%2BX%2BdL1aVURlCycVwrDk6U8%2FHwvLmEwpMWQqgY6sgFCxXeWxq%2Fq26g2m%2F4wnFxAAxne9fZ0eUpx5SAmp5Y2yV61IsIsgHz7nGXorGjxmeQFHBIZVS0eaftJhssDMqI2y5BCgYYPAnATIoUfFv72Hc8dJWE08PaV2sEaALjUUBerbDpNh68aNCQXkz71NAIhDBDWT4sZHC8ZxGsm8UZobGXkdn%2BHLSf5g5IiG8mN3jo6UePKZH%2F7EMxHPBtPKRs3NFCGp4blr7hgk6oVsMFzqQwW&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231102T231312Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLYJZPAEU%2F20231102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1d8958c186efd7d1ef49a01f600af8d036d2e76aa857bb03b77e82210682d0bb',
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
      image: 'https://edamam-product-images.s3.amazonaws.com/web-img/986/98647736f5d5e84e6efd52ece056bc48.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDh466MPUDz1%2Bz40kx%2FEX4dkI4IRRy5SCOWn6z85fl85QIhAKB1aoEBF4SFkPLVCgM0xXis8lh7v0R1LhhDYdoy3MYNKrkFCDcQABoMMTg3MDE3MTUwOTg2IgyUdcIq%2FZePloywxv8qlgWnumMvoVfmx136MBkdUL%2F1Z50onYiaPP6Lsd%2BAZbjNBLnWLYyrxL9h2215bulMoZjz12NCO9FqDbPOFClN0CfwkYwtkzCn3mfjzdfISA2chgcTHRH8CB35qUH0LL7frwnekdqi8HzKcxt4Feadi8xaVCAiPnM%2BbTC%2FWdsrA%2B%2Fx1eFma0E3ws%2B3bHroASW29GeHKcGFEEJ0QCnc%2B1rwURjkyW5bs38G%2F9HV1PNBKv23IbxYupcz6eAVJNPkLlWBQSDI5OpjjOPddmzf9LxI009gw32A2Xe0rNh39Q6I5iKkkBAfhTOLtYL1q8FUz3MNyN7L8CFsohZE3tPt35b5y2wAje94G%2BJRbJm2wHSg8xI76YGr8TzTTX8DKbLzSKmr7FqQa9HgaNmqeIUDyN2QC4BFr13AZ7TM%2FeO9Ay9fj96gQWJEQeVuJJxIKiaBNN7v64YswYxL9pwh9AHidJoyMoG6%2Fhv82K82IR7qENFZ9cgsk8geuEZ7qkVVhP7ajMfjBotKSMqiJNpwQIM%2F88sttIVJokHSHt5exgXE86Qo3nP095JNfPGzORPiHUcHjeb8KJsRRUXWK7b5hq4sWxS%2BR0b4rN48YbiU5r5e8wx7yCn%2FCzi0dNExbIr8lEWAUhuWseR7gqxF0krtZPXMombBsbASvxuzTMwnZl8y1yg9eFWUn8QIH6fzswdEXypqSKKUolb9RfGgdJCDcUs9ZXXqDRmUhsy3dI%2BdvjcZDJoe3bSYJYRjdhiaAAc2HUu9LL473sRIFUg8RGXobgySTg2T6KnYUJaO3QlZy3835ZwCWpT6ogoxmIXmYqCslzio9UaqlAXycSWOg4U9x4jMvjHELnXkHXHxmP28otTN87p%2BCJwOyaw3YTkfrjCotpCqBjqwAciSdRhBLQo8SamkEh8F3IDQ6AN0gn6CyLfhMjB4AuqLeGbHcBocdc1K5hRZRxFi9kFcSwicu2mF1MHdWGqnrvyfz%2BXafNJbJlkqAG%2FYFL99F4JJ9%2F6FI%2BuBBVxeAZjLwabhZ3i3UO21TypjLvI26u1wVmJafNmUx%2FAqA1f2qvvZ%2Fy98MrK1yKGaWXjvd%2BMNGTNDZ0Sq0ndWYPLS2UcKQ%2FidrhlO9RNC1KeSn86Xy%2B66&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231102T231216Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFMWIPSOU2%2F20231102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=09ad5ddc648abdb5e52fe599a42c73df3ef85cd6012dae6810cdb23461c4057d',
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
      image: 'https://edamam-product-images.s3.amazonaws.com/web-img/c33/c33890aa00310a3daa8f6743ba45d341.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIEMdiZrxrtVpcYr9ifFsm3HKI9wTO7Bzk2rXb43f8gxWAiAVnxhggRaxkhJMbaV01bsvoMqNPYKzLg4rCRHRToF%2F2Sq5BQg4EAAaDDE4NzAxNzE1MDk4NiIMhBA2hcVqJF0VWTXkKpYFXXMj0aQdbVZOe6xRqmEu0mAebMsJ5Y%2F0c6FcVjsUkwyI7pUpY9UEGJzhc3DSoCeWsKzIMERWFCjqZdX%2F8f%2F%2FvAAJRphrvpYvCbT13MZL3H5oF5ybgfcsRBdYV8lvtd%2FSSVuRo2TMza6kMOyC8hTqZ%2F0uGZMgw1d%2BGZi%2Bx5XdgVskV9y0guW95rQ4e%2BQ0%2BR1l5%2FXj2zF4ig99qi0aihVvpgs9dttuV%2FRb6ANXZGbLB%2BuOwAEgjMIkJh%2F4t0mi7JOBcG5rLyJkrWTC3XgYiUYzYQhcOWWQVT4w%2FZ0iIXJzKJhFEhzcNrpUJXp7neLNLIwD9hgik0g8KT3lZdixt%2BUagipoKEClWHmDzDJRQp5a2kQbJaI7NDF3os1bZhSU24%2BSzBqwe%2BUePhZZZswBHHCmH4WOetDvmhodn2QtT9RZYwkhzDaDCwEh9xLM7Hq9e1Un3k7RW%2BcpNigh8KKab5IBhCnD1E4OKZgl7V8%2Fz5cAFik05ICDEivfMUExPgcwQ84zrHR4Tp94kTeTyZTV8Uv7M0VLOu7BMRUq1Sqx85JX4XXug%2BxLKHPNx%2Fh2FvdhRBpGjR95AC8qLblvYpaDX53ojelW54gnDIUojznCkUCIWZrED3phRHZtoF2Bmwgkuc0WDIGqpp0r6uUjbCZzElZ%2BhI7qAFVCigyX4jBF9xF8G22RDZHxdQZNzo584ccNPTyjcnd4J8TfOCo74gD5yHdfXERlHF9r6uvn3dxxHNFmMNUQJvyv23U8ZX92OzC0i%2FSC6l03W16kIprm9qORNN%2Bv%2Bhi2C4HOb6%2BV86T6ZS4tTNxQneG3biOcFA6t%2FTOUjuToaiZhC3LDZEbwM1ZJrNXj6Y%2BX%2BdL1aVURlCycVwrDk6U8%2FHwvLmEwpMWQqgY6sgFCxXeWxq%2Fq26g2m%2F4wnFxAAxne9fZ0eUpx5SAmp5Y2yV61IsIsgHz7nGXorGjxmeQFHBIZVS0eaftJhssDMqI2y5BCgYYPAnATIoUfFv72Hc8dJWE08PaV2sEaALjUUBerbDpNh68aNCQXkz71NAIhDBDWT4sZHC8ZxGsm8UZobGXkdn%2BHLSf5g5IiG8mN3jo6UePKZH%2F7EMxHPBtPKRs3NFCGp4blr7hgk6oVsMFzqQwW&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231102T232046Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFLYJZPAEU%2F20231102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1caf4ac5723de6e91032f7db1af31699318865ec9fbc6e46b9d282bd88240510',
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
      label: 'Chicken Vesuvio',
      source: 'Serious Eats',
      image: 'https://edamam-product-images.s3.amazonaws.com/web-img/d50/d505bfa310aef10514249c526ed1652a.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDh466MPUDz1%2Bz40kx%2FEX4dkI4IRRy5SCOWn6z85fl85QIhAKB1aoEBF4SFkPLVCgM0xXis8lh7v0R1LhhDYdoy3MYNKrkFCDcQABoMMTg3MDE3MTUwOTg2IgyUdcIq%2FZePloywxv8qlgWnumMvoVfmx136MBkdUL%2F1Z50onYiaPP6Lsd%2BAZbjNBLnWLYyrxL9h2215bulMoZjz12NCO9FqDbPOFClN0CfwkYwtkzCn3mfjzdfISA2chgcTHRH8CB35qUH0LL7frwnekdqi8HzKcxt4Feadi8xaVCAiPnM%2BbTC%2FWdsrA%2B%2Fx1eFma0E3ws%2B3bHroASW29GeHKcGFEEJ0QCnc%2B1rwURjkyW5bs38G%2F9HV1PNBKv23IbxYupcz6eAVJNPkLlWBQSDI5OpjjOPddmzf9LxI009gw32A2Xe0rNh39Q6I5iKkkBAfhTOLtYL1q8FUz3MNyN7L8CFsohZE3tPt35b5y2wAje94G%2BJRbJm2wHSg8xI76YGr8TzTTX8DKbLzSKmr7FqQa9HgaNmqeIUDyN2QC4BFr13AZ7TM%2FeO9Ay9fj96gQWJEQeVuJJxIKiaBNN7v64YswYxL9pwh9AHidJoyMoG6%2Fhv82K82IR7qENFZ9cgsk8geuEZ7qkVVhP7ajMfjBotKSMqiJNpwQIM%2F88sttIVJokHSHt5exgXE86Qo3nP095JNfPGzORPiHUcHjeb8KJsRRUXWK7b5hq4sWxS%2BR0b4rN48YbiU5r5e8wx7yCn%2FCzi0dNExbIr8lEWAUhuWseR7gqxF0krtZPXMombBsbASvxuzTMwnZl8y1yg9eFWUn8QIH6fzswdEXypqSKKUolb9RfGgdJCDcUs9ZXXqDRmUhsy3dI%2BdvjcZDJoe3bSYJYRjdhiaAAc2HUu9LL473sRIFUg8RGXobgySTg2T6KnYUJaO3QlZy3835ZwCWpT6ogoxmIXmYqCslzio9UaqlAXycSWOg4U9x4jMvjHELnXkHXHxmP28otTN87p%2BCJwOyaw3YTkfrjCotpCqBjqwAciSdRhBLQo8SamkEh8F3IDQ6AN0gn6CyLfhMjB4AuqLeGbHcBocdc1K5hRZRxFi9kFcSwicu2mF1MHdWGqnrvyfz%2BXafNJbJlkqAG%2FYFL99F4JJ9%2F6FI%2BuBBVxeAZjLwabhZ3i3UO21TypjLvI26u1wVmJafNmUx%2FAqA1f2qvvZ%2Fy98MrK1yKGaWXjvd%2BMNGTNDZ0Sq0ndWYPLS2UcKQ%2FidrhlO9RNC1KeSn86Xy%2B66&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231102T232112Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFMWIPSOU2%2F20231102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=23b641c913fa9e9b67dc67d41292781aa1ad094fdb3190e50c2a10aafcb14ca9',
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
if (window.location.pathname === '/index.html') {
  window.addEventListener('load', displayPlaceholderRecipes);

}

window.addEventListener('DOMContentLoaded', function () {
  console.log('this code ran')
  var data = JSON.parse(localStorage.getItem('recipesData'));
  displayRecipes(data.hits);
  
});

if (window.location.pathname === '/Page2.html') {
  window.addEventListener('load', displaySavedRecipes);

}







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


fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&type=video&key=AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g`)

    .then(res =>{
      return res.json();
    })
    .then(data=>{
      data.items.forEach((curr)=>{
        console.log(curr)
      })
    })
