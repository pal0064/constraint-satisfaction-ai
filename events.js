function defineMapChangeEvent(svg, colorScale) {
    d3.selectAll('.map-option')
        .on('change', () => {
            d3.select("#timer").text("");
            const selectedMapType = d3.select('select[name="map-option"]').property("value");
            createMap(svg, colorScale);
        });

}

function defineRunCSPEvent(svg, allColors) {
    document.getElementById("runCSP").addEventListener("click", async function() {
        d3.select("#timer").text("");
        const loadingIndicator = document.getElementById("loadingIndicator");
        const runCSPButton = d3.select("#runCSP");
        loadingIndicator.style.display = "inline-block";
        runCSPButton.classed("loading", true);
        runCSPButton.disabled = true;
        await runCSP(svg, allColors)
        loadingIndicator.style.display = "none";
        runCSPButton.disabled = false;
        runCSPButton.classed("loading", false);
    });
}

function checkSearchOptions() {

    d3.select('select[name="search-option"]')
        .on('change', () => {
            d3.select("#timer").text("");
            var searchOption = d3.select('select[name="search-option"]').property("value");
            if (searchOption === 'local_search') {
                d3.select('#max-iter-container')
                    .html('<label for="max-iter-input"> Maximum Iterations: </label><input type="number" name="max-iter-input" id="max-iter-input" min="100"  max="10000" value="500">');
            } else {
                d3.select('#max-iter-container')
                    .html('');
            }

        });

}