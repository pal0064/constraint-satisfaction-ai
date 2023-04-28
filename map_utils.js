function getInitials(stateName){
    var initials = stateName
      .split(" ")
      .map(function(word) { return word.charAt(0); })
      .join("");
      return initials
    }

    function getGeoDetails(country){
        switch(country) {
                case 'australia':
                var projection = d3.geoMercator()
                                .center([140, -24])
                                .scale(1000);
                var topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/australia_states.json";
                  break;
                  // case 'us':
                  //     var projection = d3.geoAlbersUsa()
                  //         .scale(1200)
                  //         .translate([width / 2, height / 2]);

                  //         var topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/usa_states.json"
                  //     break;
//                       case 'japan':
//                           var projection = d3.geoMercator()
//                               .center([139.6503, 35.6762])
//                               .scale(1300)
//                               .translate([width / 2, height / 2]);
//                           var  topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/japan_states.json"
//                         break;
//                 case 'india':
//                   var projection = d3.geoMercator()
//     .center([78.9629, 22.5937])
//     .scale(1000)
//     .translate([width / 2, height / 2]);
// var  topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/india_states.json"
// break;

//               case 'china':
// var projection = d3.geoMercator()
//     .center([105, 35])
//     .scale(800)
//     .translate([width / 2, height / 2]);
//     var  topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/china_states.json"
//     break;

              default:
                var projection = d3.geoMercator()
                                .center([140, -24])
                                .scale(1000);
                var topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/australia_states.json";

                break;
              }
      // Create a path generator
      var path = d3.geoPath()
          .projection(projection);
          return [path,topoJsonURL];
      }
  
function createMap(svg){
  d3.selectAll("path").remove();
  d3.selectAll("text").remove();
  var country = d3.select('input[name="map-option"]:checked').node().value;
  var geoDetails =  getGeoDetails(country)
  var path = geoDetails[0]
  var topoJsonURL = geoDetails[1]
  d3.json(topoJsonURL).then(function(topo) {
var data = topojson.feature(topo, topo.objects.states);
data.features = data.features.filter(function(d) {
  // console.log(data.features)
return d.properties.STATE_NAME !== "Australian Capital Territory" &&
       d.properties.STATE_NAME !== "Tasmania" &&
       d.properties.STATE_NAME !== "";
});
      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        // .transition()
        // .ease(d3.easePoly)
    // .duration(500)
    // .delay(function(d, i) { return i * 500; }) // Add delay for each feature
    .attr("d", path)
    
        .style("fill", function(d,i) {
            // Color the map based on CSP algorithm
            // Here you can write your own CSP algorithm based on your data
            return colorScale(i);
            // colors[i%colors.length]
        });    
        svg.append("g")
            .selectAll("text")
            .data(data.features)
            .enter()
            .append("text")
            .text(function(d) { 
              return d.properties.STATE_NAME;
            })
            .attr("x", function(d) { return path.centroid(d)[0]; })
            .attr("y", function(d) { return path.centroid(d)[1]; })
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .style("font-size", "15px");
    
    });
    
}