function defineMapChangeEvent(svg) {
    d3.selectAll('.map-option')
        .on('change', () => {
            cleanPage()
            createMap(svg);
        });

}

function defineColorChangeEvent(svg) {
    d3.select('#numColors')
        .on('change', () => {
            cleanPage()
            createMap(svg);
        });

}

function defineRunCSPEvent(svg, allColors) {
    document.getElementById("runCSP").addEventListener("click", async function() {
        cleanPage()
        const loadingIndicator = document.getElementById("loadingIndicator");
        const runCSPButton = d3.select("#runCSP");
        vizCSPInProgress(loadingIndicator, runCSPButton)
        await runCSP(svg, allColors)
        vizCSPComplete(loadingIndicator, runCSPButton)
    });
}

function checkSearchOptions() {
    d3.select('select[name="search-option"]')
        .on('change', () => {
            cleanPage()
            const searchOption = d3.select('select[name="search-option"]').property("value");
            const selectionFC = d3.select('#forward_checking-options-container')
            if (searchOption === 'backtracking') {
                selectionFC.html('')
            } else {
                selectionFC.html(`
                   Heuristic: 
                   <input type="radio" id="mrv" name="forward_checking_options" value="mrv" checked>
                   <label for="mrv">Minimum Remaining Values</label>
                   <input type="radio" id="dh" name="forward_checking_options" value="dh">
                   <label for="dh">Degree Heuristic</label>
                   <input type="radio" id="noh" name="forward_checking_options" value="noh">
                   <label for="noh">None</label>
                   `)
            }

        });
}