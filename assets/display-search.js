//APIs

var ytAPIURL =  'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=cookchicken&type=video&key=AIzaSyDHy2YFq13_XxMv4LMm5N-nrwKkmPYtJ5g' //replace chicken w/ search token query
var  foodAPIurl = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096' // also replace chicken :) 

// QUERY PARAMS
var queryString = window.location.search;
var urlParam = new URLSearchParams(queryString);
var searchTerm = urlParam.get('q')




// EVENT LISTENER    <--- on load for now, until we connect functionality from index 

window.addEventListener("load", (event) => {
    event.preventDefault();


    console.log("page is fully loaded");


  });




/// YOUTUBE API FETCHING
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
          <iframe width="100%" height="auto"
          src="https://www.youtube.com/embed/${items.id.videoId}}">
          </iframe>
          <br/><br/>
                <p></p>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item saveBtn">Save</a>
        
        
      </footer>
        `  
        document.getElementById('videos').appendChild(card)

    })
    
})

// FETCH EDAMAM
fetch(foodAPIurl)
.then (function (response){
    return response.json();
}) 
.then(function (data){
    console.log(data);
})
