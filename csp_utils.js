var logs = []
var solution = {}
var enabledLogs = false
var LOGS_SIZE = 20000;
function initializeNeighbors(data,adjacentRegions) {
    var stateObjectMapping = {}
    for (var i = 0; i < data.features.length; i++) {
        stateObjectMapping[data.features[i].properties.STATE_NAME] = data.features[i];
        }
    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        var adjacentNeighbours = adjacentRegions[state.properties.STATE_NAME]
        var neighbors = []
        for (var j = 0; j < adjacentNeighbours.length; j++) {
            neighbors.push(stateObjectMapping[adjacentNeighbours[j]])
        }
        state.neighbors = neighbors
        
}
}
function isValidColor(state, color) {
    var neighbors = state.neighbors
    for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].color === color) {
            if(enabledLogs && logs.length <=LOGS_SIZE){
                logs.push (` ${color}: ${state.properties.STATE_NAME} conflicts with ${neighbors[i].properties.STATE_NAME}`)
            }
            return false;
        }
    }
    return true;
}

function assignColor(state, data) {
    for (const color of state.domain.values()) {
        if(enabledLogs && logs.length <=LOGS_SIZE){
            logs.push(`Selected value ${color} for ${state.properties.STATE_NAME}`)
        }
        if (isValidColor(state, color)) {
            state.color = color;
            if(enabledLogs && logs.length <=LOGS_SIZE){
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

// Define a function to assign colors to all states
function assignColors(data) {
    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        if (!state.color) {
            if(enabledLogs && logs.length <=LOGS_SIZE){
            logs.push(`Selected variable: ${state.properties.STATE_NAME}`)
            }
            if (!assignColor(state, data)) {
                return false;
            }
        }
    }
    return true;
}

async function createMapUsingBackTracking(svg,data) {    
    assignColors(data);
    if (checkAllStates(data)) {
        alert("Solution Found");
    } else {
        alert("Could not find a solution");
    }
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
            if(enabledLogs){
                logs.push(`${variable}: ${value} conflicts with ${v}: ${assignment[v]}`);
            }
            
          return false;
        }
      }
    }
    
    return true;
  }
  

  function backtrackNew(solution, variables, domains,constraints) {
    if(enabledLogs && logs.length <=LOGS_SIZE){
        logs.push(`Solution: ${JSON.stringify(solution)}`);
    }

    
    if (checkCompleteness(solution, variables)) {
      return [true, solution];
    }
    
    let unassignedVariables = variables.filter(x => !solution.hasOwnProperty(x));
    let variable = unassignedVariables[0];
    if(enabledLogs && logs.length <=LOGS_SIZE){
        logs.push(`Selected variable: ${variable}`);   
    }
    for (let i = 0; i < domains[variable].length; i++) {
      let domainValue = domains[variable][i];
      if(enabledLogs && logs.length <=LOGS_SIZE){
      logs.push(`Selected value ${domainValue} for ${variable}`);
      }
      let value = domainValue;
      
      if (checkValueConsistency(variable, value, solution, constraints[variable])) {
        solution[variable] = value;
        let [variablesCopy, domainsCopy, constraintsCopy] = [JSON.parse(JSON.stringify(variables)), JSON.parse(JSON.stringify(domains)), JSON.parse(JSON.stringify(constraints))];
        
        let unassignedNeighbors = constraints[variable].filter(y => !solution.hasOwnProperty(y));
        let noInferenceNewCheck = true;
            for (let j = 0; j < unassignedNeighbors.length; j++) {
            let x = unassignedNeighbors[j];
            
            if (domains[x].includes(value)) {
                if(enabledLogs){
                logs.push(`Removing ${value} from ${x}`);
                }
                
                domains[x] = domains[x].filter(c => c !== value);
            }
            
            if (domains[x].length === 0) {
                noInferenceNewCheck = false;
                break;
            }
            }
        if (noInferenceNewCheck) {
          let [result, newSolution] = backtrackNew(JSON.parse(JSON.stringify(solution)), variables, domains, constraints);
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

async function createMapUsingForwardChecking(svg,data,colors) { 
    var variables = []
    var constraints = {}
    for (var i = 0; i < data.features.length; i++) {
        var state  = data.features[i]
        variables.push(state.properties.STATE_NAME)
        constraints[state.properties.STATE_NAME] = data.adjacentRegions[state.properties.STATE_NAME]
    }
    var domains = {}
    for (var i = 0; i < data.features.length; i++) {
        var state  = data.features[i]
        domains[state.properties.STATE_NAME] = colors
    }
    let solution = {};
    let [result, finalSolution] = backtrackNew(solution, variables, domains,constraints);
    for (var i = 0; i < data.features.length; i++) {
        var state  = data.features[i]
        state.color  = finalSolution[state.properties.STATE_NAME]
    }
    if (checkAllStates(data)) {
        alert("Solution Found");
    } else {
        alert("Could not find a solution");
    }
    createMapColoredViz(svg, data)
}



function checkAllStates(data) {
    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        var neighbors = state.neighbors
        for (var j = 0; j < neighbors.length; j++) {
            if (neighbors[j].color === state.color) {
                return false;
            }
        }
    }
    return true;
}

function getColors(allColors){
    var numColorsInput = document.getElementById("numColors");
    var numColors = Math.max(Math.min(allColors.length, parseInt(numColorsInput.value)), 1);
    var colors = [];
    while (colors.length < numColors) {
        var randomIndex = Math.floor(Math.random() * allColors.length);
        var randomColor = allColors[randomIndex];
        if (!colors.includes(randomColor)) {
            colors.push(randomColor);
        }
    }
    return colors
}

async function initializeCSP(svg,colors){
    logs = []
    solution={}
    d3.selectAll("path").remove();
    d3.selectAll("text").remove();
    var country = d3.select('select[name="map-option"]').property("value");
    var geoDetails = getGeoDetails(country)
    var topoJsonURL = geoDetails[1]
    let topo;
    try {
        const response = await fetch(topoJsonURL);
        topo = await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

    var data = topojson.feature(topo, topo.objects.states);
    var adjacentRegions = getAdjacentRegions(country)
    data.adjacentRegions = adjacentRegions;
    data.features = data.features.filter(function(d) {
        return !SKIP_STATES.includes(d.properties.STATE_NAME) &&
            d.properties.STATE_NAME !== "";
    });

    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        state.color = null;
        state.domain = new Set(colors); 
    }
    data.path = geoDetails[0]
    createMapColoredViz(svg,data,false)
    initializeNeighbors(data,adjacentRegions)
    return data
}


async function runCSP(svg, allColors) {
    const t0 = performance.now();
    enabledLogs = d3.select("#logs").property("checked");
    var colors = getColors(allColors)
    var data = await initializeCSP(svg,colors)
    var algo = d3.select('select[name="search-option"]').property("value");
    if (algo === "backtracking") {
        await createMapUsingBackTracking(svg,data)
    } 
    else if (algo =='forward_checking') {
        await createMapUsingForwardChecking(svg,data,colors)
    }
    const t1 = performance.now();
    const executionTime = (t1 - t0).toFixed(2);
    document.getElementById("timer").innerHTML = `Execution time: ${executionTime} ms`;
    if(enabledLogs){
        d3.select('#ShowLogs').html("<p>" +logs.slice(1,LOGS_SIZE).join("</p><p>") + "</p>")
    }
    
}
