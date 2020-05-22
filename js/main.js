// add event to element with id button
var searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click',recipeSearch, false);

// enter key also activates/runs the function
var search = document.getElementById('search');
search.addEventListener('keypress', function enterKey(e) {
    if (e.keyCode == 13) {
        recipeSearch();
    };
}, false);

function recipeSearch() {
    
    // creating request variable and assigning XMLHRequest to it
    var request = new XMLHttpRequest();
    
    // store user input
    var search = document.getElementById('search').value;
    console.log(search)

    // clear any previous data after each new search
    document.getElementById('results').innerHTML = " ";

    
 	// open a new connection, using the GET request on the URL endpoint
 	request.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients="+search, true );
	request.setRequestHeader("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");
	request.setRequestHeader("x-rapidapi-key", "db9fcc3a67msh33deed82dc6759ep146526jsne07f73377e79");

	request.onload = function() {
		
        // begin accessing JSON data here 
        var data = JSON.parse(this.responseText);
        console.log(data)

        // loop thru data in data.items
        for (var i = 0; i < data.length; i++) {
            
            // store current recipes info
            var jdata = data[i];

            // create elements
            var newColSm4 = document.createElement('div');
            var newImg = document.createElement('img');
            var newH2 = document.createElement('h2');
            var newH3 = document.createElement('h3');
            var newH4 = document.createElement('h3');

            // add classes to elements
            newColSm4.className = 'col-sm-12 col-md-8 col-md-offset-2 item';

            // add h2 text
            newH2.innerText = jdata.title;

            // add image
            newImg.src = jdata.image;

            // save id number for future use
            var id = jdata.id;
            
            // // add other ingredients 
            var list = '<ul>'; 
            for (var e = 0; e < jdata.missedIngredients.length; e ++ ) {
                list += '<li>' + jdata.missedIngredients[e].original + '</li>';
            };

            list += '</ul>';
            var ingr = document.createElement('div');
            ingr.innerHTML = list;
            
            // add likes number 
            newH3.innerText = "Likes: " + jdata.likes;
           

            // add tags to document
            newColSm4.appendChild(newImg);
            newColSm4.appendChild(newH2);
            newColSm4.appendChild(newH3);
            newColSm4.appendChild(newH4);
            newColSm4.appendChild(ingr);

            // add results to the screen
            var results = document.getElementById('results');
            results.appendChild(newColSm4);

            // create "more" button 
            document.getElementById('results').innerHTML += "<button id = 'more'>More...</button>";
        };
            // // create event listener 
            // document.getElementById('more').addEventListener('click',recipePull, false);
       
        //     // create recipe pull request and display it next
        //     function recipePull() {

        //         // create new request
        //         var request2 = new XMLHttpRequest;

        //         // clear any previous data after each new search
        //         document.getElementById('recipe').innerHTML = " ";

        //         // open a new connection, using the GET request on the URL endpoint
        //         request2.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information");
        //         request2.setRequestHeader("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");
        //         request2.setRequestHeader("x-rapidapi-key", "db9fcc3a67msh33deed82dc6759ep146526jsne07f73377e79");

        //         request2.onload = function() {

        //             // begin accessing JSON data here 
        //             var rdata = JSON.parse(this.responseText);
        //             console.log(rdata)

        //             // loop thru data in data.items
        //             for (var i = 0; i < rdata.length; i++) {

        //                 // store all info
        //                 var idata = rdata[i];

        //                 // create div element
        //                 var dropInfo = document.createElement('div');

        //                 // save recipe instructions
        //                 var instruction = document.createElement('p');
        //                 instruction.innerText = idata.instructions;

        //                 // add tags 
        //                 dropInfo.appendChild(instruction);

        //                 // add results to the screen
        //                 var recipe = document.getElementById('recipe');
        //                 recipe.appendChild(dropInfo);
        //             };
        //         };
        //     };
        // };
    };
// send request
request.send() 
};
