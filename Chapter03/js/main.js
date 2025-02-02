
// declare global array of js objects 
var cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];
// verify
console.log('cityPop= ', cityPop);

/*
* function to add columns 
* parameter: cityPop, a global array of js objects
*/
function addColumns(cityPop){
	// verify call and rows
    console.log('addColumns called');
	let rows = document.querySelectorAll("tr");
	console.log("Rows found:", rows.length);
	// get the rows and loop
    document.querySelectorAll("tr").forEach(function(row, i){
		console.log('inside addColumns loop');
		// add new column header to the first row
    	if (i == 0){
			console.log('addColumns loop IF');
    		row.insertAdjacentHTML('beforeend', '<th>  City Size</th>');
			
    	} else {
			// assign new column values to the rows
			console.log('addColumns loop ELSE');
    		var citySize;
			// choose the value
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			// insert the value in the end of the row i
			row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
    	};
    });
};

/*
 * function to add event listeners to the table
 */
function addEvents() {
    console.log('inside addEvents');
	//get the table and add listener
    document.querySelector("table").addEventListener("mouseover", function() {
        var color = "rgb(";
		// loop x3 to make random rgb string 'color'
        for (var i = 0; i < 3; i++) {
			console.log('inside addEvents loop');
            var random = Math.round(Math.random() * 255);
            color += random;
			// first 2 passes add a comma between numbers
            if (i < 2) {
                color += ",";
            } 
			// final iteration, close the ()
			else {
                color += ")";
            }
        }
		console.log('color ', color);
		// apply the color to the table
        document.querySelector("table").style.backgroundColor = color;
    });
	// browser alert...
    function clickme() {
        alert('Hey, you clicked me!');
    }
	// listener for the browser alert
    document.querySelector("table").addEventListener("click", clickme);
}

/*
 * function to make a table
 * parameter: cityPop, a global array of js objects
 */
function cities(cityPop){
    
    //create the table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement("tr");

    //add the "City" and "Population" columns to the header row
    headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

    //add the row to the table
    table.appendChild(headerRow);

    //loop to add a new row for each city
    for(var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        table.insertAdjacentHTML('beforeend',rowHtml);
    }

    document.querySelector("#mydiv").appendChild(table);
}

/*
 * function showing where data is available and undefined
 */
function jsAjax(){
    var myData;
    //use Fetch to retrieve data
    fetch('data/MegaCities.geojson')
        .then(function(response){
            myData = response;
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              // this will be defined
              console.log(myData);
            return response.json();
        }) 
        .then(callback) 
        // this executed first and us undefined
        console.log(myData);
};

//define callback function
function callback(response){
    //tasks using the data go here
    
}

/*
 * function to insert data from fetch
 */
function debugCallback(data) {
    // get the div and insert
    document.querySelector("#mydiv")
      .insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(data));
  }
  
 /*
  * function to fetch data from a geojson file
  */
  function debugAjax() {
    //initiate the promise to return the data
    fetch("data/MegaCities.geojson")
      .then(function(response) {
        // verify
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // format it
        return response.json();
      })
      .then(function(data) {
        // pass the parsed data to callback
        debugCallback(data);
      })
      .catch(function(error) {
        //deal with errors
        console.error("Fetch error:", error);
        document.querySelector("#mydiv")
          .insertAdjacentHTML('beforeend', '<br>Error fetching data: ' + error.message);
      });
  }
  

/*
 * function to call the functions in the right order
 */
function initialize(){
	cities(cityPop);
    addColumns(cityPop);
	addEvents();
    debugAjax();
};
//start the initialize function on page load
document.addEventListener('DOMContentLoaded',initialize)