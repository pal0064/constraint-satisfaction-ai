function defineMapChangeEvent(svg,colorScale){
    d3.selectAll('.map-option')
    .on('change', () => {
      const selectedMapType = d3.select('input[name="map-option"]:checked').node().value;
      createMap(svg,colorScale);
    });
}
