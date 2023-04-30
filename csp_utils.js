function getAdjacentRegions(country) {
    var ausAdjacentRegions = {
        'Western Australia': ['Northern Territory', 'South Australia'],
        'Northern Territory': ['Western Australia', 'South Australia', 'Queensland'],
        'South Australia': ['Western Australia', 'Northern Territory', 'Queensland', 'New South Wales', 'Victoria'],
        'Queensland': ['Northern Territory', 'South Australia', 'New South Wales'],
        'New South Wales': ['Queensland', 'South Australia', 'Victoria'],
        'Victoria': ['South Australia', 'New South Wales'],
        'Tasmania': []
    };
    var usAdjacentRegions = {
        'Alaska': ['Washington'],
        'Alabama': ['Florida', 'Georgia', 'Mississippi', 'Tennessee'],
        'Arkansas': ['Louisiana', 'Missouri', 'Mississippi', 'Oklahoma', 'Tennessee', 'Texas'],
        'Arizona': ['California', 'Colorado', 'New Mexico', 'Nevada', 'Utah'],
        'California': ['Arizona', 'Hawaii', 'Nevada', 'Oregon'],
        'Colorado': ['Arizona', 'Kansas', 'Nebraska', 'New Mexico', 'Oklahoma', 'Utah', 'Wyoming'],
        'Connecticut': ['Massachusetts', 'New York', 'Rhode Island'],
        'District of Columbia': ['Maryland', 'Virginia'],
        'Delaware': ['Maryland', 'New Jersey', 'Pennsylvania'],
        'Florida': ['Alabama', 'Georgia'],
        'Georgia': ['Alabama', 'Florida', 'North Carolina', 'South Carolina', 'Tennessee'],
        'Hawaii': ['California'],
        'Iowa': ['Illinois', 'Minnesota', 'Missouri', 'Nebraska', 'South Dakota', 'Wisconsin'],
        'Idaho': ['Montana', 'Nevada', 'Oregon', 'Utah', 'Washington', 'Wyoming'],
        'Illinois': ['Iowa', 'Indiana', 'Kentucky', 'Missouri', 'Wisconsin'],
        'Indiana': ['Illinois', 'Kentucky', 'Missouri', 'Wisconsin'],
        'Kansas': ['Colorado', 'Missouri', 'Nebraska', 'Oklahoma'],
        'Kentucky': ['Illinois', 'Indiana', 'Missouri', 'Ohio', 'Tennessee', 'Virginia', 'West Virginia'],
        'Louisiana': ['Arkansas', 'Mississippi', 'Texas'],
        'Massachusetts': ['Connecticut', 'New Hampshire', 'New York', 'Rhode Island', 'Vermont'],
        'Maryland': ['District of Columbia', 'Delaware', 'Pennsylvania', 'Virginia', 'West Virginia'],
        'Maine': ['New Hampshire'],
        'Michigan': ['Indiana', 'Ohio', 'Wisconsin'],
        'Minnesota': ['Iowa', 'North Dakota', 'South Dakota', 'Wisconsin'],
        'Missouri': ['Arkansas', 'Iowa', 'Illinois', 'Kansas', 'Kentucky', 'Nebraska', 'Oklahoma', 'Tennessee'],
        'Mississippi': ['Alabama', 'Arkansas', 'Louisiana', 'Tennessee'],
        'Montana': ['Idaho', 'North Dakota', 'South Dakota', 'Wyoming'],
        'North Carolina': ['Georgia', 'South Carolina', 'Tennessee', 'Virginia'],
        'North Dakota': ['Minnesota', 'Montana', 'South Dakota'],
        'Nebraska': ['Colorado', 'Iowa', 'Kansas', 'Missouri', 'South Dakota', 'Wyoming'],
        'New Hampshire': ['Massachusetts', 'Maine', 'Vermont'],
        'New Jersey': ['Delaware', 'New York', 'Pennsylvania'],
        'New Mexico': ['Arizona', 'Colorado', 'Oklahoma', 'Texas', 'Utah'],
        'Nevada': ['Arizona', 'California', 'Idaho', 'Oregon', 'Utah'],
        'New York': ['Connecticut', 'Massachusetts', 'New Jersey', 'Pennsylvania', 'Vermont'],
        'Ohio': ['Indiana', 'Kentucky', 'Michigan', 'Pennsylvania', 'West Virginia'],
        'Oklahoma': ['Arkansas', 'Colorado', 'Kansas', 'Missouri', 'New Mexico', 'Texas'],
        'Oregon': ['California', 'Idaho', 'Nevada', 'Washington'],
        'Pennsylvania': ['Delaware', 'Maryland', 'New Jersey', 'New York', 'Ohio', 'West Virginia'],
        'Rhode Island': ['Connecticut', 'Massachusetts'],
        'South Carolina': ['Georgia', 'North Carolina'],
        'South Dakota': ['Iowa', 'Minnesota', 'Montana', 'North Dakota', 'Nebraska', 'Wyoming'],
        'Tennessee': ['Alabama', 'Arkansas', 'Georgia', 'Kentucky', 'Missouri', 'Mississippi', 'North Carolina', 'Virginia'],
        'Texas': ['Arkansas', 'Louisiana', 'New Mexico', 'Oklahoma'],
        'Utah': ['Arizona', 'Colorado', 'Idaho', 'New Mexico', 'Nevada', 'Wyoming'],
        'Virginia': ['District of Columbia', 'Kentucky', 'Maryland', 'North Carolina', 'Tennessee', 'West Virginia'],
        'Vermont': ['Massachusetts', 'New Hampshire', 'New York'],
        'Washington': ['Alaska', 'Idaho', 'Oregon'],
        'Wisconsin': ['Iowa', 'Illinois', 'Michigan', 'Minnesota'],
        'West Virginia': ['Kentucky', 'Maryland', 'Ohio', 'Pennsylvania', 'Virginia'],
        'Wyoming': ['Colorado', 'Idaho', 'Montana', 'Nebraska', 'South Dakota', 'Utah']
    }
    var indiaAdjacentRegions = {
        'Andaman & Nicobar Island': [],
        'Andhra Pradesh': ['Karnataka',
            'Tamil Nadu',
            'Odisha',
            'Chhattisgarh',
            'Telangana'
        ],
        'Arunanchal Pradesh': ['Assam', 'Nagaland'],
        'Assam': ['Arunanchal Pradesh', 'Manipur', 'Nagaland', 'Meghalaya', 'Tripura'],
        'Bihar': ['Uttar Pradesh', 'Jharkhand', 'West Bengal'],
        'Chhattisgarh': ['Andhra Pradesh', 'Madhya Pradesh', 'Telangana',
            'Odisha',
            'Jharkhand',
            'Maharashtra',
            'Uttar Pradesh'
        ],
        'Goa': ['Maharashtra', 'Karnataka'],
        'Gujarat': ['Rajasthan', 'Maharashtra', 'Madhya Pradesh'],
        'Haryana': ['Rajasthan', 'Uttar Pradesh', 'Himachal Pradesh', 'Punjab'],
        'Himachal Pradesh': ['Jammu & Kashmir', 'Punjab', 'Haryana', 'Uttarakhand'],
        'Jammu & Kashmir': ['Himachal Pradesh', 'Punjab'],
        'Jharkhand': ['West Bengal',
            'Bihar',
            'Odisha',
            'Chhattisgarh',
            'Uttar Pradesh'
        ],
        'Karnataka': ['Maharashtra',
            'Goa',
            'Kerala',
            'Tamil Nadu',
            'Andhra Pradesh',
            'Telangana'
        ],
        'Kerala': ['Karnataka', 'Tamil Nadu'],
        'Madhya Pradesh': ['Rajasthan',
            'Uttar Pradesh',
            'Chhattisgarh',
            'Gujarat',
            'Maharashtra'
        ],
        'Maharashtra': ['Gujarat',
            'Madhya Pradesh',
            'Chhattisgarh',
            'Karnataka',
            'Telangana',
            'Goa'
        ],
        'Manipur': ['Assam', 'Nagaland', 'Mizoram'],
        'Meghalaya': ['Assam'],
        'Mizoram': ['Assam', 'Tripura'],
        'Nagaland': ['Arunanchal Pradesh', 'Manipur', 'Assam'],
        'Odisha': ['Jharkhand',
            'Chhattisgarh',
            'Andhra Pradesh',
            'Telangana',
            'Chhattisgarh',
            'West Bengal'
        ],
        'Punjab': ['Himachal Pradesh', 'Jammu & Kashmir', 'Haryana', 'Rajasthan'],
        'Rajasthan': ['Gujarat',
            'Madhya Pradesh',
            'Uttar Pradesh',
            'Haryana',
            'Punjab'
        ],
        'Sikkim': ['West Bengal'],
        'Tamil Nadu': ['Kerala', 'Karnataka', 'Andhra Pradesh'],
        'Telangana': ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Chhattisgarh'],
        'Tripura': ['Assam', 'Mizoram'],
        'Uttar Pradesh': ['Uttarakhand',
            'Madhya Pradesh',
            'Rajasthan',
            'Haryana',
            'Jharkhand',
            'Bihar',
            'Chhattisgarh'
        ],
        'Uttarakhand': ['Uttar Pradesh', 'Himachal Pradesh'],
        'West Bengal': ['Bihar', 'Jharkhand', 'Odisha', 'Sikkim', 'Assam']
    }
    switch (country) {
        case 'australia':
            return ausAdjacentRegions;
        case 'us':
            return usAdjacentRegions;
        case 'india':
            return indiaAdjacentRegions
        default:
            return ausAdjacentRegions
    }

}

function getNeighbors(state, data) {
    var neighbors = [];
    var adjacentNeighbours = data.adjacentRegions[state.properties.STATE_NAME]
    for (var i = 0; i < data.features.length; i++) {
        var otherState = data.features[i];
        // console.log("otherState",otherState.properties)
        // console.log("state.properties.STATE_NAME",state.properties.STATE_NAME)
        if (adjacentNeighbours.includes(otherState.properties.STATE_NAME)) {
            neighbors.push(otherState);
        }
    }
    return neighbors
}

function isValidColor(state, color, data) {
    var neighbors = getNeighbors(state, data);
    for (var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].color === color) {
            return false;
        }
    }
    return true;
}

function assignColor(state, colors, data, path) {
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        if (isValidColor(state, color, data)) {
            state.color = color;
            if (assignColors(colors, data, path)) {
                return true;
            }
            state.color = null;
        }
    }
    return false;
}

// Define a function to assign colors to all states
function assignColors(colors, data, path) {
    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        if (!state.color) {
            if (!assignColor(state, colors, data, path)) {
                return false;
            }
        }
    }
    return true;
}

async function createMapUsingBackTracking(svg, colors) {
    d3.selectAll("path").remove();
    d3.selectAll("text").remove();
    var country = d3.select('select[name="map-option"]').property("value");
    var geoDetails = getGeoDetails(country)

    var path = geoDetails[0]
    var topoJsonURL = geoDetails[1]
    let topo;
    try {
        const response = await fetch(topoJsonURL);
        topo = await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }

    //    d3.json(topoJsonURL, {async:false})
    // .then(function(topoJson) {
    //   topo = topoJson;
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });

    var data = topojson.feature(topo, topo.objects.states);
    data.adjacentRegions = getAdjacentRegions(country)
    data.features = data.features.filter(function(d) {
        return !SKIP_STATES.includes(d.properties.STATE_NAME) &&
            d.properties.STATE_NAME !== "";
    });

    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        state.color = null;
    }
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function(d) {
            return d.properties.STATE_NAME;
        })
        .style("fill", function(d) {
            return d.color;
        })
    // setTimeout(function() {
    assignColors(colors, data, path);

    if (checkAllStates(data)) {
        alert("Solution Found");
    } else {
        alert("Could not find a solution");
    }
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .transition()
        .ease(d3.easePoly)
        .duration(500)
        .delay(function(d, i) {
            return i * 500;
        }) // Add delay for each feature
        .attr("d", path)
        .attr("id", function(d) {
            return d.properties.STATE_NAME;
        })
        .style("fill", function(d) {
            return d.color;
        })

    svg.append("g")
        .selectAll("text")
        .data(data.features)
        .enter()
        .append("text")
        .text(function(d) {
            return d.properties.STATE_NAME;
        })
        .attr("x", function(d) {
            return path.centroid(d)[0];
        })
        .attr("y", function(d) {
            return path.centroid(d)[1];
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", "15px");
    // }, 1000); 
    // }

    // );
}



async function createMapUsingLocalSearch(svg, colors) {
    d3.selectAll("path").remove();
    d3.selectAll("text").remove();
    const country = d3.select('select[name="map-option"]').property("value");
    const maxIterations = d3.select('input[name="max-iter-input"]').property("value");
    const geoDetails = getGeoDetails(country);

    const path = geoDetails[0];
    const topoJsonURL = geoDetails[1];

    let topo;
    try {
        const response = await fetch(topoJsonURL);
        topo = await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
    const data = topojson.feature(topo, topo.objects.states);
    data.adjacentRegions = getAdjacentRegions(country);
    data.features = data.features.filter(function(d) {
        return (
            !SKIP_STATES.includes(d.properties.STATE_NAME) &&
            d.properties.STATE_NAME !== ""
        );
    });

    // Initialize states with random colors
    data.features.forEach((state) => {
        state.color = colors[Math.floor(Math.random() * colors.length)];
    });

    let conflicts = countConflicts(data);
    var iter = 0
    // Perform local search for minimum conflicts
    for (let i = 0; i < maxIterations && conflicts > 0; i++) {
        iter++;
        // Pick a random state and color to change
        const stateIndex = Math.floor(Math.random() * data.features.length);
        const state = data.features[stateIndex];
        const oldColor = state.color;
        const newColor = getRandomColorExcept(oldColor, colors);

        // Check if new color reduces conflicts
        let newConflicts = countConflicts(data, state, newColor);
        if (newConflicts < conflicts) {
            state.color = newColor;
            conflicts = newConflicts;
        }
    }

    if (iter === maxIterations || !checkAllStates(data)) {
        alert("Could not find a valid solution within the given number of iterations.");
        for (var i = 0; i < data.features.length; i++) {
            var state = data.features[i];
            state.color = null;
        }
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", function(d) {
                return d.properties.STATE_NAME;
            })
            .style("fill", function(d) {
                return d.color;
            })
    } else {
        alert("Solution Found");
        svg
            .append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .transition()
            .ease(d3.easePoly)
            .duration(500)
            .delay(function(d, i) {
                return i * 500;
            }) // Add delay for each feature
            .attr("d", path)
            .attr("id", function(d) {
                return d.properties.STATE_NAME;
            })
            .style("fill", function(d) {
                return d.color;
            });

        svg
            .append("g")
            .selectAll("text")
            .data(data.features)
            .enter()
            .append("text")
            .text(function(d) {
                return d.properties.STATE_NAME;
            })
            .attr("x", function(d) {
                return path.centroid(d)[0];
            })
            .attr("y", function(d) {
                return path.centroid(d)[1];
            })
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .style("font-size", "15px");
    }
}

// Helper function to count the number of conflicts between neighboring states
function countConflicts(data, excludeState = null, excludeColor = null) {
    var states = data.features
    let conflicts = 0;
    for (let i = 0; i < states.length; i++) {
        const state = states[i];
        if (state === excludeState) {
            continue;
        }
        var adjacentNeighbours = data.adjacentRegions[state.properties.STATE_NAME]
        for (let j = 0; j < adjacentNeighbours.length; j++) {
            const adjacentState = findState(states, adjacentNeighbours[j]);
            if (!adjacentState) {
                continue;
            }
            if (adjacentState.color === state.color && adjacentState !== excludeState && state !== excludeState) {
                conflicts++;
                break;
            }
        }
    }
    return conflicts;
}

function checkAllStates(data) {
    for (var i = 0; i < data.features.length; i++) {
        var state = data.features[i];
        var neighbors = getNeighbors(state, data);
        for (var j = 0; j < neighbors.length; j++) {
            if (neighbors[j].color === state.color) {
                console.log(neighbors[j].properties)
                return false;
            }
        }
    }
    return true;
}


function findState(states, stateName) {
    for (let i = 0; i < states.length; i++) {
        if (states[i].properties.STATE_NAME === stateName) {
            return states[i];
        }
    }
    return null;
}

function getRandomColorExcept(oldColor, colors) {
    const newColors = colors.filter((color) => color !== oldColor); // create a new array of colors without the old color
    return newColors[Math.floor(Math.random() * newColors.length)]; // return a random color from the new array
}


async function runCSP(svg, allColors) {
    const t0 = performance.now();
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
    var algo = d3.select('select[name="search-option"]').property("value");
    if (algo === "backtracking") {
        await createMapUsingBackTracking(svg, colors)
    } else {
        await createMapUsingLocalSearch(svg, colors)
    }
    const t1 = performance.now();
    const executionTime = (t1 - t0).toFixed(2);
    document.getElementById("timer").innerHTML = `Execution time: ${executionTime} ms`;
}