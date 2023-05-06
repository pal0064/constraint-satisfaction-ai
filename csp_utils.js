var logs = []
var solution = {}
var enabledLogs = false
var LOGS_SIZE = 20000;

function initializeNeighbors(data, adjacentRegions) {
    let stateObjectMapping = {}
    for (let i = 0; i < data.features.length; i++) {
        stateObjectMapping[data.features[i].properties.STATE_NAME] = data.features[i];
    }
    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i];
        let adjacentNeighbours = adjacentRegions[state.properties.STATE_NAME]
        let neighbors = []
        for (let j = 0; j < adjacentNeighbours.length; j++) {
            neighbors.push(stateObjectMapping[adjacentNeighbours[j]])
        }
        state.neighbors = neighbors

    }
}

function isValidColor(state, color) {
    let neighbors = state.neighbors
    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i].color === color) {
            if (enabledLogs && logs.length <= LOGS_SIZE) {
                logs.push(` ${color}: ${state.properties.STATE_NAME} conflicts with ${neighbors[i].properties.STATE_NAME}`)
            }
            return false;
        }
    }
    return true;
}

function assignColor(state, data) {
    for (const color of state.domain.values()) {
        if (enabledLogs && logs.length <= LOGS_SIZE) {
            logs.push(`Selected value ${color} for ${state.properties.STATE_NAME}`)
        }
        if (isValidColor(state, color)) {
            state.color = color;
            if (enabledLogs && logs.length <= LOGS_SIZE) {
                solution[state.properties.STATE_NAME] = color
                logs.push(`Solution: ${JSON.stringify(solution)}`)
            }
            if (assignColors(data)) {
                return true;
            }
            state.color = null;
        }
    };
    return false;
}

function assignColors(data) {
    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i];
        if (!state.color) {
            if (enabledLogs && logs.length <= LOGS_SIZE) {
                logs.push(`Selected variable: ${state.properties.STATE_NAME}`)
            }
            if (!assignColor(state, data)) {
                return false;
            }
        }
    }
    return true;
}

function postProcessing(data){
    if (checkAllStates(data)) {
        document.getElementById("status").innerHTML = `Solution Status:  Found`;
    } else {
        document.getElementById("status").innerHTML = `Solution Status: Could not find a solution`;
    }

}

async function createMapUsingBackTracking(svg, data) {
    assignColors(data);
    postProcessing(data)
    createMapColoredViz(svg, data)
}

function checkCompleteness(solution, variables) {
    return Object.keys(solution).length === variables.length;
}

function checkValueConsistency(variable, value, assignment, constraints) {
    if (assignment === null) {
        return false;
    }

    for (let v of constraints) {
        if (assignment.hasOwnProperty(v)) {
            if (value === assignment[v]) {
                if (enabledLogs) {
                    logs.push(`${variable}: ${value} conflicts with ${v}: ${assignment[v]}`);
                }

                return false;
            }
        }
    }

    return true;
}

function variableSelection(variables, solution) {
    let unassignedVariables = variables.filter(x => !solution.hasOwnProperty(x));
    let variable = unassignedVariables[0];
    if (enabledLogs && logs.length <= LOGS_SIZE) {
        logs.push(`Selected variable: ${variable}`);
    }
    return variable
}

function minimumRemainingValues(variables, domains, solution) {
    let unassignedVariables = variables.filter(x => !solution.hasOwnProperty(x));
    let variableDomainCount = unassignedVariables.map(x => [x, domains[x].length]);
    variableDomainCount.sort((a, b) => a[1] - b[1]);
    if (enabledLogs && logs.length <= LOGS_SIZE) {
        logs.push(`  Selected variable ${variableDomainCount[0][0]} with value count ${variableDomainCount[0][1]}`);
    }
    return variableDomainCount[0][0];
}


function degreeHeuristic(variables, constraints, solution) {
    let unassignedVariables = variables.filter(x => !solution.hasOwnProperty(x));
    let variableDomainCount = unassignedVariables.map(x => [x, constraints[x].length]);
    const variablesSorted = variableDomainCount.sort((a, b) => b[1] - a[1]);
    if (enabledLogs && logs.length <= LOGS_SIZE) {
        logs.push(`Selected variable ${variablesSorted[0][0]} with constraint count ${variablesSorted[0][1]}`);
    }
    return variablesSorted[0][0];
}

function backtrack(solution, variables, domains, constraints, selectedheuristic) {
    if (enabledLogs && logs.length <= LOGS_SIZE) {
        logs.push(`Solution: ${JSON.stringify(solution)}`);
    }

    if (checkCompleteness(solution, variables)) {
        return [true, solution];
    }
    let variable;
    if (selectedheuristic === 'mrv') {
        variable = minimumRemainingValues(variables, domains, solution);
    } else if (selectedheuristic === 'dh') {
        variable = degreeHeuristic(variables, constraints, solution);
    } else {
        variable = variableSelection(variables, solution);
    }

    for (let i = 0; i < domains[variable].length; i++) {
        let domainValue = domains[variable][i];
        if (enabledLogs && logs.length <= LOGS_SIZE) {
            logs.push(`Selected value ${domainValue} for ${variable}`);
        }
        let value = domainValue;

        if (checkValueConsistency(variable, value, solution, constraints[variable])) {
            solution[variable] = value;
            let [variablesCopy, domainsCopy, constraintsCopy] = [JSON.parse(JSON.stringify(variables)), JSON.parse(JSON.stringify(domains)), JSON.parse(JSON.stringify(constraints))];

            let unassignedNeighbors = constraints[variable].filter(y => !solution.hasOwnProperty(y));
            let forwardCheck = true;
            for (let j = 0; j < unassignedNeighbors.length; j++) {
                let x = unassignedNeighbors[j];
                if (domains[x].includes(value)) {
                    if (enabledLogs) {
                        logs.push(`Removing ${value} from ${x}`);
                    }

                    domains[x] = domains[x].filter(c => c !== value);
                }

                if (domains[x].length === 0) {
                    forwardCheck = false;
                    break;
                }
            }
            if (forwardCheck) {
                let [result, newSolution] = backtrack(JSON.parse(JSON.stringify(solution)), variables, domains, constraints, selectedheuristic);
                if (result) {
                    return [true, newSolution];
                }
            }

            delete solution[variable];
            [variables, domains, constraints] = [variablesCopy, domainsCopy, constraintsCopy];
        }
    }

    return [false, solution];
}

async function createMapUsingForwardChecking(svg, data, colors) {
    const radioButtons = d3.selectAll('input[name="forward_checking_options"]');
    const selectedheuristic = radioButtons.filter(function() {
        return d3.select(this).property("checked");
    }).node().value;
    let variables = []
    let constraints = {}
    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i]
        variables.push(state.properties.STATE_NAME)
        constraints[state.properties.STATE_NAME] = data.adjacentRegions[state.properties.STATE_NAME]
    }
    let domains = {}
    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i]
        domains[state.properties.STATE_NAME] = colors
    }
    let solution = {};
    let [result, finalSolution] = backtrack(solution, variables, domains, constraints, selectedheuristic);
    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i]
        state.color = finalSolution[state.properties.STATE_NAME]
    }
    postProcessing(data)
    createMapColoredViz(svg, data)
}



function checkAllStates(data) {
    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i];
        let neighbors = state.neighbors
        for (let j = 0; j < neighbors.length; j++) {
            if (neighbors[j].color === state.color) {
                return false;
            }
        }
    }
    return true;
}

function getColors(allColors) {
    const numColorsInput = document.getElementById("numColors");
    const numColors = Math.max(Math.min(allColors.length, parseInt(numColorsInput.value)), 1);
    let colors = [];
    while (colors.length < numColors) {
        let randomIndex = Math.floor(Math.random() * allColors.length);
        let randomColor = allColors[randomIndex];
        if (!colors.includes(randomColor)) {
            colors.push(randomColor);
        }
    }
    return colors
}

async function initializeCSP(svg, colors) {
    logs = []
    solution = {}
    d3.selectAll("path").remove();
    d3.selectAll("text").remove();
    const country = d3.select('select[name="map-option"]').property("value");
    const geoDetails = getGeoDetails(country)
    const topoJsonURL = geoDetails[1]
    let topo;
    try {
        const response = await fetch(topoJsonURL);
        topo = await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

    let data = topojson.feature(topo, topo.objects.states);
    const adjacentRegions = getAdjacentRegions(country)
    data.adjacentRegions = adjacentRegions;
    data.features = data.features.filter(function(d) {
        return !SKIP_STATES.includes(d.properties.STATE_NAME) &&
            d.properties.STATE_NAME !== "";
    });

    for (let i = 0; i < data.features.length; i++) {
        let state = data.features[i];
        state.color = null;
        state.domain = new Set(colors);
    }
    data.path = geoDetails[0]
    createMapColoredViz(svg, data, false)
    initializeNeighbors(data, adjacentRegions)
    return data
}


async function runCSP(svg, allColors) {
    partialSolutions = {}
    const t0 = performance.now();
    enabledLogs = d3.select("#logs").property("checked");
    const colors = getColors(allColors)
    const data = await initializeCSP(svg, colors)
    const algo = d3.select('select[name="search-option"]').property("value");
    if (algo === "backtracking") {
        await createMapUsingBackTracking(svg, data)
    } else if (algo === 'forward_checking') {
        await createMapUsingForwardChecking(svg, data, colors)
    }
    const t1 = performance.now();
    const executionTime = (t1 - t0).toFixed(2);
    document.getElementById("timer").innerHTML = `Execution time: ${executionTime} ms`;
    if (enabledLogs) {
        d3.select('#ShowLogs').html("<p>" + logs.slice(1, LOGS_SIZE).join("</p><p>") + "</p>")
    }

}