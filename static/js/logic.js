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

var layers = {
  TWENTY_THOUSAND: new L.LayerGroup(),
  TEN_THOUSAND: new L.LayerGroup(),
  NINE_THOUSAND: new L.LayerGroup(),
  EIGHT_THOUSAND: new L.LayerGroup(),
  SEVEN_THOUSAND: new L.LayerGroup(),
  SIX_THOUSAND: new L.LayerGroup(),
  FIVE_THOUSAND: new L.LayerGroup(),
  FOUR_THOUSAND: new L.LayerGroup(),
  THREE_THOUSAND: new L.LayerGroup(),
  TWO_THOUSAND: new L.LayerGroup(),
  ONE_THOUSAND: new L.LayerGroup(),
  GREATER_THEN_500: new L.LayerGroup(),
  LESS_THEN_500: new L.LayerGroup()
};

// Create the map with our layers

var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    layers.TWENTY_THOUSAND,
    layers.TEN_THOUSAND,
    layers.NINE_THOUSAND,
    layers.EIGHT_THOUSAND,
    layers.SEVEN_THOUSAND,
    layers.SIX_THOUSAND,
    layers.FIVE_THOUSAND,
    layers.FOUR_THOUSAND,
    layers.THREE_THOUSAND,
    layers.TWO_THOUSAND,
    layers.ONE_THOUSAND,
    layers.GREATER_THEN_500,
    layers.LESS_THEN_500
  ]
});

//>20000
//>10000
//>9000
//>8000
//>7000
//>6000
//>5000
//>4000
//>3000
//>2000
//>1000
//>500
//<500

// Initialize all of the LayerGroups we'll be using


// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
   "TWENTY_THOUSAND" : layers.TWENTY_THOUSAND,
   "TWENTY_THOUSAND" : layers.TEN_THOUSAND,
   "TWENTY_THOUSAND" : layers.NINE_THOUSAND,
   "TWENTY_THOUSAND" : layers.EIGHT_THOUSAND,
   "TWENTY_THOUSAND" : layers.SEVEN_THOUSAND,
   "TWENTY_THOUSAND" : layers.SIX_THOUSAND,
   "TWENTY_THOUSAND" : layers.FIVE_THOUSAND,
   "TWENTY_THOUSAND" :  layers.FOUR_THOUSAND,
   "TWENTY_THOUSAND" :  layers.THREE_THOUSAND,
   "TWENTY_THOUSAND" :  layers.TWO_THOUSAND,
   "TWENTY_THOUSAND" :  layers.ONE_THOUSAND,
   "TWENTY_THOUSAND" :  layers.GREATER_THEN_500,
   "TWENTY_THOUSAND" :  layers.LESS_THEN_500
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
//var icons = {
//  COMING_SOON: L.ExtraMarkers.icon({
//    icon: "ion-settings",
//    iconColor: "white",
//    markerColor: "yellow",
//    shape: "star"
//  }),
//  EMPTY: L.ExtraMarkers.icon({
//   icon: "ion-android-bicycle",
 //   iconColor: "white",
//    markerColor: "red",
//    shape: "circle"
//  }),
//  OUT_OF_ORDER: L.ExtraMarkers.icon({
//    icon: "ion-minus-circled",
//    iconColor: "white",
//    markerColor: "blue-dark",
//    shape: "penta"
//  }),
//  LOW: L.ExtraMarkers.icon({
//    icon: "ion-android-bicycle",
//    iconColor: "white",
 //   markerColor: "orange",
 //   shape: "circle"
 // }),
 // NORMAL: L.ExtraMarkers.icon({
 //   icon: "ion-android-bicycle",
 //   iconColor: "white",
 //   markerColor: "green",
 //   shape: "circle"
//  })
//};

// Load Data for the map 


d3.json('/resources')
  .then(function (alcohol) {
    console.log('[d3.json() Succcessful!] alcohol:', alcohol);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    var Country_List = []
    var Country_Tonnes = []
    var location = []

    alcohol.forEach(function (data) {
      Country_List.push(data.Area);
      // console.log(Country_List);
      data.latitude = (+data.latitude);
      data.longitude = (+data.longitude);
      var coordinates = [data.latitude, data.longitude];
      location.push(coordinates);
      Country_Tonnes.push(+data.Y2013);
    });
    
    console.log('NEW alcohol:', alcohol);


    // Loop through the countries array and create one marker for each city object

  
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
        L.circle(location[i], { // <- CHANGED THIS
          fillOpacity: 0.75,
          color: "black",
          fillColor: color,
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its Tonnes
          radius: 125000 + (Country_Tonnes[i] * 15) // <- CHANGED THIS (took out markerSize)
          //radius: 10000 + Country_Tonnes[i]
        }).bindPopup("<h1>" + Country_List[i] + "</h1> <hr> <h3> Tonnes of Alcohol: " + Country_Tonnes[i] + "</h3>").addTo(myMap);
      }
    }

     function init() {

      // Grab a reference to the dropdown select element
      var selector = d3.select("#selDataset");

       // Use the list of years to populate the select options

       d3.json("/resources").then((sampleNames) => {
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