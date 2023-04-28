function getAdjacentRegions(country){
    var ausAdjacentRegions = {
                      'WA': ['NT', 'SA'],
                      'NT': ['WA', 'SA', 'Q'],
                      'SA': ['WA', 'NT', 'Q', 'NSW', 'V'],
                      'Q': ['NT', 'SA', 'NSW'],
                      'NSW': ['Q', 'SA', 'V'],
                      'V': ['SA', 'NSW']
                  };
    switch(country) {
            case 'australia':
                return ausAdjacentRegions
            default:
            return ausAdjacentRegions
          }
  
  }


  function getNeighbors(state) {
    var neighbors = [];
    var initials = getInitials(state.properties.STATE_NAME)
      var adjacentNeighbours = adjacentRegions[initials]
      for (var i = 0; i < data.features.length; i++) {
      var otherState = data.features[i];
     if (adjacentNeighbours.includes(getInitials(otherState.properties.STATE_NAME))) {
        neighbors.push(otherState);
      }
    }
    return neighbors
  }

function isValidColor(state, color) {
    var neighbors = getNeighbors(state);
    for (var i = 0; i < neighbors.length; i++) {
      if (neighbors[i].color === color) {
        return false;
      }
    }
    return true;
  }
  

    
    // function assignColor(state) {
    //   for (var i = 0; i < colors.length; i++) {
    //     var color = colors[i];
    //     if (isValidColor(state, color)) {
    //       state.color = color;
    //       if (assignColors()) {
    //         return true;
    //       }
    //       state.color = null;
    //     }
    //   }
    //   return false;
    // }
    
    function assignColor(state) {
        for (var i = 0; i < colors.length; i++) {
          var color = colors[i];
          //  state.color = color;
          // updateMap(state) 
          if (isValidColor(state, color)) {
            state.color = color;
            updateMap(state) 
            if (assignColors()) {
              return true;
            }
            
            state.color = null;
            // svg.select("path" + state.id).style("fill", null); // reset the color in the map
          }
        }
        return false;
      }

      function updateMap(state) {
    
        svg.append("g")
            .selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
            .transition()
            .ease(d3.easePoly)
        .duration(2000)
        .delay(function(d, i) { return i * 2000; }) // Add delay for each feature
          .attr("d", path)
          .style("fill", function(d) { 
            // console.log(d)
            return d.color; })
        }

// Define a function to assign colors to all states
function assignColors() {
    for (var i = 0; i < data.features.length; i++) {
      var state = data.features[i];
        if (!state.color) {
          if (!assignColor(state)) {
            return false;
          }
        }
    }
    return true;
  }



  function createMapUsingCSP(colors){
    d3.json("https://raw.githubusercontent.com/rowanhogan/australian-states/master/states.geojson").then(function(data) {
      data.features = data.features.filter(function(d) {
      return d.properties.STATE_NAME !== "Australian Capital Territory" &&
             d.properties.STATE_NAME !== "Tasmania" &&
             d.properties.STATE_NAME !== "";
    });
  
  for (var i = 0; i < data.features.length; i++) {
      var state = data.features[i];
      state.color = null;
  }
  
  
  // Call the function to assign colors to all states
  assignColors();
  
  // Draw the map with the assigned colors
  // svg.append("g")
  //     .selectAll("path")
  //   .data(data.features)
  //   .enter()
  //   .append("path")
  //     .transition()
  //     .ease(d3.easePoly)
  // .duration(2000)
  // .delay(function(d, i) { return i * 2000; }) // Add delay for each feature
  //   .attr("d", path)
  //   .style("fill", function(d) { 
  //     // console.log(d)
  //     return d.color; })
  
  
  svg.append("g")
          .selectAll("text")
          .data(data.features)
          .enter()
          .append("text")
          .text(function(d) { return d.properties.STATE_NAME; })
          .attr("x", function(d) { return path.centroid(d)[0]; })
          .attr("y", function(d) { return path.centroid(d)[1]; })
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "central")
          .style("font-size", "15px");
  
  });
  }

function runCSP(){
    document.getElementById("runCSP").addEventListener("click", async function() {
        var numColorsInput = document.getElementById("numColors");
        var state = document.getElementById("map-container");
        var numColors = Math.max(Math.min(allColors.length,parseInt(numColorsInput.value)),1) ;
        var colors = [];
        while (colors.length < numColors) {
          var randomIndex = Math.floor(Math.random() * allColors.length);
          var randomColor = allColors[randomIndex];
          if (!colors.includes(randomColor)) {
            colors.push(randomColor);
          }
        }
        // await(createMapUsingCSP(colors))
      });
}
  