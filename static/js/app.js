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

*/

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    d3.json("samples.json").then((response) => {

        var metadata = response.metadata

        var sampleItem = metadata.find(meta => meta.id == sample);

        console.log(sampleItem);

    });


}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    //d3.json("samples.json").then((response) => {}

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

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
        // Parse and filter data to get sample names
        // Add dropdown option for each sample - Iteration & add to dropdown
        // Array Name Options... 

        // Use first sample to build metadata and initial plots
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

