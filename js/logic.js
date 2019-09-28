// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

var circles = []; 

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population / 40;
}

// Each city object contains the city's name, location and population
// Import Data

// The legend 

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');

    categories = [ "> 20000","> 10000","> 9000","> 8000","> 7000","> 6000","> 5000","> 4000","> 3000", "> 2000","> 1000",">500","<500",
    ];

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(categories[i]) + '"></i> ' +
             (categories[i] ? categories[i] + '<br>' : '+');
    }
    return div;
  }

load_data('Y1999');
// d3.json('/resources')
// .then()

function load_data(year_key) {
  d3.json('/resources')
  .then(function (alcohol) {
    // console.log('[d3.json() Succcessful!] alcohol:', alcohol);
  
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    var Country_List = []
    var Country_Tonnes = []
    var location = []
    alcohol.forEach(function (data) {
      Country_List.push(data.Area);
      data.latitude = (+data.latitude);
      data.longitude = (+data.longitude);
      var coordinates = [data.latitude, data.longitude];
      location.push(coordinates);
      Country_Tonnes.push(+data[year_key]);
    });
    
  
    // Loop through the countries array and create one marker for each city object
    console.log(`circles.length=: ${circles.length}`);
    
    for (i = 0; i < circles.length; ++i) {
      myMap.removeControl(circles[i]);
    }
    circles = [];

    for (var i = 0; i < Country_List.length; i++) {
      // Conditionals for countries tonnes
      var color = "";
      var Tonnes = Country_Tonnes[i];
  
       if (Tonnes  > 20000) {
        Legend = "> 20000",
        color = "red";
       } 
       else if (Tonnes  > 10000) {
        Legend = "> 10000",
        color = "blue";
        }
         else if (Tonnes  > 9000) {
          Legend = "> 9000",
          color = "lightSkyBlue ";
       } 
       else if (Tonnes  > 8000) {
        Legend = "> 8000",
        color = "paleturquoise ";
       }
        else if (Tonnes  > 7000) {
          Legend = "> 7000",
          color = "seagreen";
      } 
       else if (Tonnes  > 6000) {
        Legend = "> 6000",
        color = "springGreen ";
       }
        else if (Tonnes  > 5000) {
          Legend = "> 5000",
          color = "green";
        }
         else if (Tonnes  > 4000) {
          Legend = "> 4000",
          color = "darkorange";
       } 
       else if (Tonnes  > 3000) {
        Legend = "> 3000",
        color = "peru";
       }
        else if (Tonnes  > 2000) {
          Legend = "> 2000",
          color = "DarkGoldenRod ";
      } 
       else if (Tonnes  > 1000) {
        Legend = "> 1000",
        color = "darkSalmon";
       }
       else if (Tonnes  > 500) {
        Legend = ">500",
        color = "pink";
       }
       else {
        Legend = "<500",
        color = "purple";
       }  
  
      {
        c = L.circle(location[i], { // <- CHANGED THIS
          fillOpacity: 0.75,
          color: "black",
          fillColor: color,
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its Tonnes
          radius: 125000 + (Country_Tonnes[i] * 15) // <- CHANGED THIS (took out markerSize)
          //radius: 10000 + Country_Tonnes[i]
        });
        c.bindPopup("<h1>" + Country_List[i] + "</h1> <hr> <h3> Tonnes of Alcohol: " + Country_Tonnes[i] + "</h3>");
        c.addTo(myMap);
        circles.push(c);
      }
    }
    for (i = 0; i < circles.length; ++i) {
      circles[i].addTo(myMap);
    }
})
}

function optionChanged(newSample) {
  load_data(newSample);
};

