var width = 960,
    height = 600;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "datavizMap");

const allColors = ["red", "green", "blue", "yellow", "purple", "orange", "pink"];

createMap(svg)
defineColorChangeEvent(svg)
defineMapChangeEvent(svg)
defineRunCSPEvent(svg, allColors)
checkSearchOptions()
