function myFunc(){
    var myDiv =  document.getElementById("mydiv");
    myDiv.innerHTML = "Hello World.";
};

window.onload = myFunc();

//initialize function called when the script loads
function initialize(){
    cities();
};

//Example 2.3 line 6...function to create a table with cities and their populations
function cities(){
    //create the table element
    var table = document.createElement("table");
    //define an array of objects for cities and population
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

    //...

    //Example 2.3 line 41...loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city; //NOTE DIFFERENT SYNTAX
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population; //NOTE DIFFERENT SYNTAX
        tr.appendChild(pop);

        table.appendChild(tr);
    };
    //add the table to the div in index.html
    var myDiv =  document.getElementById("mydiv");
    myDiv.appendChild(table);
}

 //Added below Example 3.6...
    //change the text color
    document.querySelector('#mydiv').style.color = 'red';

    //change the text size and alignment
    document.querySelector('#mydiv').style.fontSize = '2em';
    document.querySelector('#mydiv').style.textAlign = 'left';

    //get the text color and add it as text to the div
    var thecolor = document.querySelector('#mydiv').style.color;
    document.querySelector('#mydiv').insertAdjacentHTML('beforeend',thecolor);
//call the initialize function when the window has loaded
window.onload = initialize();