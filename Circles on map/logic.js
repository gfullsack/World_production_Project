// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

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
d3.csv("Clean_Alcoholic_Beverages_df.csv")
  .then(function(alcohol){

// Step 1: Parse Data/Cast as numbers
    // ==============================
    var Country_List = [] 
    var Country_Tonnes = [] 
    var location = []
    alcohol.forEach(function(data) {
      Country_List.push(data.Area);
      // console.log(Country_List);
      data.latitude = (+data.latitude);
      data.longitude = (+data.longitude);
      var coordinates = [data.latitude, data.longitude];
      location.push(coordinates);
      Country_Tonnes.push(+data.Y1961);
    });
// console.log(alcohol);


// Loop through the cities array and create one marker for each city object
for (var i = 0; i < Country_List.length; i++) {
  L.circle(location[i], { // <- CHANGED THIS
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its Tonnes
    radius: 1 + Country_Tonnes[i] * 100 // <- CHANGED THIS (took out markerSize)
  }).bindPopup("<h1>" + Country_List[i] + "</h1> <hr> <h3> Tonnes of Alcohol: " + Country_Tonnes[i] + "</h3>").addTo(myMap);
}


function init() {


  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();

  });