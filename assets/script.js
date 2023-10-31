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

        
//   <script src="https://apis.google.com/js/api.js"></script>
//   <script>
//     /**
//      * Sample JavaScript code for youtube.channels.list
//      * See instructions for running APIs Explorer code samples locally:
//      * https://developers.google.com/explorer-help/code-samples#javascript
//      */
  
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
//     gapi.load("client:auth2", function() {
//       gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//     });
// //   </script>
// //   <button onclick="authenticate().then(loadClient)">authorize and load</button>
// //   <button onclick="execute()">execute</button>
        
 
        