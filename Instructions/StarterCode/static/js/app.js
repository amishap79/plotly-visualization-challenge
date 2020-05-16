
function init() {

    var sampleData = []
    var select = d3.selectAll("#selDataset")
    d3.json("samples.json").then((data) => {
        //console.log(data);
        for (var i = 0; i < data.samples.length; i++) {
            value = parseInt(data.samples[i].id);
            //console.log(value);
            var cell = select.append("option");
            cell.text(value);
        }
    });
}

init();


function optionChanged(filterValue) {
    console.log("-------------: " + filterValue);
    buildPlot(filterValue);
}

function buildPlot(filterValue) {
    d3.json("samples.json").then(async  (data) => {
        var sampleData = data.samples;
        //console.log(sampleData);
       
        var otu_ids = [];
        var otu_labels = [];
        var sample_values = [];
        var topten_otu_ids = [];
        var topten_otu_labels = [];
        var topten_sample_values = []; 

        var oneSample =  sampleData.filter((e)=> parseInt(e.id) === parseInt(filterValue)); 
        console.log("oneSample: " + JSON.stringify(oneSample));

        var result = Object.values(oneSample).sort(async (a,b) => b-a);
        //console.log("result: " + result);
        otu_ids = result[0].otu_ids;
        //console.log("otu_ids: " + otu_ids);
        otu_labels = result[0].otu_labels;
        //console.log("otu_labels: " + otu_labels);
        sample_values = result[0].sample_values;
        //console.log("sample_values: " + sample_values);

        topten_otu_ids = otu_ids.slice(0, 10);
        topten_otu_labels = otu_labels.slice(0, 10);
        topten_sample_values = sample_values.slice(0, 10);
        console.log("topten_otu_ids: " + topten_otu_ids);
        console.log("topten_otu_labels: " + topten_otu_labels);
        console.log("topten_sample_values: " + topten_sample_values);
        

        // Bar Chart
        var trace1 = {
            x: topten_otu_ids,
            y: topten_otu_labels,
            text: topten_sample_values,
            type: "bar",
            orientation: "h"
        };

        var layout = {
            title: "OTU Bar Chart"
        };
        
        var chartData = [trace1];

        Plotly.newPlot("bar", chartData, layout);


        // Bubble Chart
        var trace1 = {
            x: topten_otu_ids,
            y: topten_sample_values,
            mode: 'markers',
            marker: {
              size: topten_sample_values,
              color: topten_otu_ids,
              opacity: [1, 0.8, 0.6, 0.4],
            },
            text: topten_otu_labels
        };
          
        var data = [trace1];
          
        var layout = {
            title: 'OTU Bubble Chart',
            showlegend: false,
            height: 600,
            width: 1000
        };
          
        Plotly.newPlot('bubble', data, layout);
    });
};

// selDataset.on("change", function() {
//     var selection = d3.event.target.value;
//     console.log(selection);
//     buildPlot(selection);
//   });

