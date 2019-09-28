// Load data from hours-of-tv-watched.csv
d3.csv("5_top_countries.csv").then(function(csvData) 
{
  console.log(typeof(csvData));
// log a list of names
  csvData.forEach(function(d) {
    d.dates = +d.dates;
    d.ChinaData = +d.ChinaData;
    d.USAData= +d.USAData;
    d.BrazilData= +d.BrazilData;
    d.RussiaData= +d.RussiaData;
    d.NigeriaData= +d.NigeriaData;
    });
  var dates = csvData.map(item => item.dates + 1960);
  var dataChina = csvData.map(item => item.ChinaData);
  var dataUSA = csvData.map(item => item.USAData);
  var dataBrazil = csvData.map(item => item.BrazilData);
  var dataRussia = csvData.map(item => item.RussiaData);
  var dataNigeria = csvData.map(item => item.NigeriaData);


  console.log('Before');
//   console.log("dastes", dates);
  console.log('After')


 
  // Create our first trace
  var traceChina = {
    x: dates,
    y: dataChina,
    name: 'China',
    type: "scatter"

  };

  var traceUSA = {
    x: dates,
    y: dataUSA,
    name: 'United States',
    type: "scatter"
  };

  var traceBrazil = {
    x: dates,
    y: dataBrazil,
    name: 'Brazil',
    type: "scatter"
    
  };

  var traceRussia = {
    x: dates,
    y: dataRussia,
    name: 'Russia',
    type: "scatter"
  };

  var traceNigeria = {
    x: dates,
    y: dataNigeria,
    name: 'Nigeria',
    type: "scatter"
  };

  
  console.log(traceNigeria)


  // The data array consists of both traces
  var data = [traceChina, traceUSA, traceBrazil, traceRussia, traceNigeria];

  // Note that we omitted the layout object this time
  // This will use default parameters for the layout

  // TODO please add this code to the "body" section of index.html
  // 04-Ins_Multi_Trace/Solved (lesson 15-Interactive-Visualizations-and-Dashboards)
  // <div id="plot"></div>
  // <script src="plots.js"></script>

  Plotly.newPlot("plot", data);
});
