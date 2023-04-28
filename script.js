// import { createMap } from "./map_utils.js";
// import { defineMapChangeEvent } from "./events.js";

// Define the size of the SVG element
var width = 960,
    height = 600;
    
// Create the SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
var allColors = ["red", "green", "blue", "yellow","purple","orange","pink"];   

createMap(svg,colorScale)    
defineMapChangeEvent(svg,colorScale)