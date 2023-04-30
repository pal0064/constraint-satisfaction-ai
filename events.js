function defineMapChangeEvent(svg,colorScale){
    d3.selectAll('.map-option')
    .on('change', () => {
      const selectedMapType = d3.select('select[name="map-option"]').property("value");
      createMap(svg,colorScale);
    });
}


function defineRunCSPEvent(svg,allColors){
    document.getElementById("runCSP").addEventListener("click", async function()
    {
      
    await(runCSP(svg,allColors))
    });
}

function checkSearchOptions(){
  d3.select('select[name="search-option"]')
  .on('change', () => {
    var searchOption = d3.select('select[name="search-option"]').property("value");
    if (searchOption === 'local_search') {
      d3.select('#max-iter-container')
        .html('<label for="max-iter-input"> Maximum Iterations: </label><input type="number" name="max-iter-input" id="max-iter-input" min="100"  max="2000" value="500">');
    } else {
      d3.select('#max-iter-container')
        .html('');
    }

  });

}

