var saveBtn = document.querySelector('.saveBtn');
var editBtn = document.querySelector('.editbtn');

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');
const searchButton = document.querySelector(".search-btn");

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}
//Fuction to test if API works
// fetch(`https://api.edamam.com/search?q=&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096&from=0&to=10`)
// .then(response => {
//     if (response.ok) {
//         console.log('API is working');
//     }else{
//         console.error('API responded with an error:',response.status);
//     }
// })

//API Key for YouTube Data API --AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g

$(document).ready(function() {
    $(".editBtn").on("click", function() {
      var $contentEdit = $(".content");
      $contentEdit.attr("contenteditable", true);
    });
  
    $(".saveBtn").on("click", function() {
      var parent = $(this).parent().parent()  
      var inputValue = parent.html()
      var key = parent.attr("id");
      localStorage.setItem(key, inputValue);
      console.log(localStorage.getItem(key));
    });
  
    $("textarea").each(function() {
      var key = $(this).parent().attr("id");
      var savedValue = localStorage.getItem(key);
      if (savedValue) {
        $(this).val(savedValue);
      }
    });
  });

  