//data variable
var data;

//Get IDs from the JSON and link to the HTML
function init() {
  d3.json("samples.json").then(dataInitial => {
    data = dataInitial;
    var selectValues = dataInitial.names;
//Link to html
    var selectOpt = d3.select("#selDataset");
    selectValues.forEach(value => {
      selectOpt
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}
//Fill data in the drop down
init();

d3.selectAll("#selDataset").on("change", plotFunctions);

//Define functions to plot selected value in the webpage
function plotFunctions() {
  var valueSelect = d3.select("#selDataset").node().value;
  panelPlot(valueSelect);
  bacFunc(valueSelect);
  bubbleChart(valueSelect);
  gaugeChart(valueSelect);
}


//function to return the name of the bacteria.

function BacID(name) {
  var listOfBact = [];

  for (var i = 0; i < name.length; i++) {
    var stringName = name[i].toString();
    var splitValue = stringName.split(";");
    if (splitValue.length > 1) {
      listOfBact.push(splitValue[splitValue.length - 1]);
    } else {
      listOfBact.push(splitValue[0]);
    }
  }
  return listOfBact;
}

function Ouid(name) {
  var listOfOuid = [];
  for (var i = 0; i < name.length; i++) {
    listOfOuid.push(`OTU ${name[i]}`);
  }
  return listOfOuid;
}



// Retrive bacteria IDs and slice to a max of first 10 results found
function bacFunc(valueSelect) {
  var filterValue = data.samples.filter(value => value.id == valueSelect);
  var ouid = filterValue.map(v => v.otu_ids);
  ouid = Ouid(ouid[0].slice(0, 10));
  var Xaxis = filterValue.map(v => v.sample_values);
  Xaxis = Xaxis[0].slice(0, 10);

  var out_label = filterValue.map(v => v.otu_labels);
  var names = BacID(out_label[0]).slice(0, 10);


  // Create the Trace
  var trace = {
    x: Xaxis,
    y: ouid,
    text: names,
    type: "bar",
    orientation: "h"
  };

  //arrange in descending order
  var layout = {
    yaxis: {
      autorange: "reversed"
    }
  };

  // Create the data array for the plot
  var bac = [trace];

  // Plot the chart to be placed in the div tag with id "bar"
  Plotly.newPlot("bar", bac, layout);
}


//set demographic info panel under panel-body tag
function panelPlot(valueSelect) {
  var filterValue = data.metadata.filter(value => value.id == valueSelect);
  var divValue = d3.select(".panel-body");
  divValue.html("");
  divValue.append("p").text(`id: ${filterValue[0].id}`);
  divValue.append("p").text(`ethnicity: ${filterValue[0].ethnicity}`);
  divValue.append("p").text(`gender: ${filterValue[0].gender}`);
  divValue.append("p").text(`age: ${filterValue[0].age}`);
  divValue.append("p").text(`location: ${filterValue[0].location}`);
  divValue.append("p").text(`bbtype: ${filterValue[0].bbtype}`);
  divValue.append("p").text(`wfreq: ${filterValue[0].wfreq}`);
}


// create bubblechart
function bubbleChart(valueSelect) {
  var filterValue3 = data.samples.filter(value => value.id == valueSelect);
  var ouid = filterValue3.map(v => v.otu_ids);
  ouid = ouid[0];
  var valueY = filterValue3.map(v => v.sample_values);
  valueY = valueY[0];

  var out_label = filterValue3.map(v => v.otu_labels);
  out_label = BacID(out_label[0]);

  var trace1 = {
    x: ouid,
    y: valueY,
    mode: "markers",
    marker: {
      color: ouid,
      size: (valueY)
    },
    text: out_label
  };

  var data2 = [trace1];

  var layout = {
    showlegend: false,
    xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", data2, layout);
}

//create gauge chart
function gaugeChart(valueSelect) {
  var filterValue = data.metadata.filter(value => value.id == valueSelect);
  var weeklyFreq = filterValue[0].wfreq;

  var data2 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      title: {
        text: "Belly Button Washing Frequency <br>Scrubs per Week"
      },
      type: "indicator",

      mode: "gauge",
      gauge: {
        axis: {
          range: [0, 9],
          tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          ticks: "outside"
        },

        steps: [
          { range: [0, 1], color: "#3a9e3b" },
          { range: [1, 2], color: "#46f316" },
          { range: [2, 3], color: "#90bf56" },
          { range: [3, 4], color: "#b1be54" },
          { range: [4, 5], color: "#d9f41e" },
          { range: [5, 6], color: "#d4a025" },
          { range: [6, 7], color: "#f7af02" },
          { range: [7, 8], color: "#b72f0b" },
          { range: [8, 9], color: "#6f1c06" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 1,
          value: weeklyFreq
        }
      }
    }
  ];

  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data2, layout);
}
