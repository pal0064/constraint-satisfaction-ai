function cleanPage() {
    d3.select("#timer").text("");
    d3.select('#ShowLogs').html(' ');
    d3.select('#status').html(' ');
}

function vizCSPInProgress(loadingIndicator, runCSPButton) {
    loadingIndicator.style.display = "inline-block";
    runCSPButton.classed("loading", true);
    runCSPButton.disabled = true;
}

function vizCSPComplete(loadingIndicator, runCSPButton) {
    loadingIndicator.style.display = "none";
    runCSPButton.disabled = false;
    runCSPButton.classed("loading", false);
}