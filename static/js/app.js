/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code 


ARRAY METHODS;
- forEach
- push
- filter
- find (find index)
- map
- [0]
- slice

DICTIONARY

- .##

*/

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    d3.json("samples.json").then((response) => {

        var metadata = response.metadata
        var sampleItem = metadata.find(meta => meta.id == sample);
        var demoInfo = d3.select("#sample-metadata")

        // Clear out old queries
        demoInfo.html("");

        Object.entries(sampleItem).forEach(([key, value]) => {
            var heading = demoInfo.append("h6");
            heading.text(`${key} : ${value}`);
        });
    });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    d3.json("samples.json").then((response) => {
        var samplesArray = response.samples
        var sampleItem = samplesArray.find(array => array.id == sample);

        var otu_idsArray = sampleItem.otu_ids;
        var otu_labelsArray = sampleItem.otu_labels;
        var sample_valuesArray = sampleItem.sample_values;

        var new_otu_idsArray = otu_idsArray.map(item => `OTU ${item}`);

        // Create bar chart in correct location
        var data = [{
            type: 'bar',
            x: sample_valuesArray.slice(0, 10).reverse(),
            y: new_otu_idsArray.slice(0, 10).reverse(),
            orientation: 'h',
            text: otu_labelsArray.slice(0, 10).reverse()
        }];

        Plotly.newPlot("bar", data);

        var trace1 = {
            x: otu_idsArray,
            y: sample_valuesArray,
            mode: 'markers',
            marker: {
                size: sample_valuesArray,
                color: otu_idsArray},
            text: otu_labelsArray,
          };
          
          var data2 = [trace1];
          
          var layout = {
            title: 'BELLY BUTTONS',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data2, layout);

    });

}

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then((response) => {
        // console.log(response)

        response.names.forEach((item) => {
            var option = d3.select("#selDataset").append("option");
            option.text(item);
            option.property("value", item);
        });

        var firstItem = response.names[0]

        buildMetadata(firstItem);
        buildCharts(firstItem);

    });
}

function optionChanged(newSample) {
    console.log(newSample);

    buildMetadata(newSample);
    buildCharts(newSample);

}

// Initialize dashboard on page load
init();

