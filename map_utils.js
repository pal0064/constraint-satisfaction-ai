var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
var SKIP_STATES = [
    "American Samoa",
    "Guam",
    "Commonwealth of the Northern Mariana Islands",
    "Puerto Rico",
    "United States Virgin Islands",
    "Australian Capital Territory",
    "Daman & Diu",
    "Lakshadweep",
    "Chandigarh",
    "Puducherry",
    "Dadara & Nagar Havelli",
    "NCT of Delhi"
]

function getAdjacentRegions(country) {
    const ausAdjacentRegions = {
        'Western Australia': ['Northern Territory', 'South Australia'],
        'Northern Territory': ['Western Australia', 'South Australia', 'Queensland'],
        'South Australia': ['Western Australia', 'Northern Territory', 'Queensland', 'New South Wales', 'Victoria'],
        'Queensland': ['Northern Territory', 'South Australia', 'New South Wales'],
        'New South Wales': ['Queensland', 'South Australia', 'Victoria'],
        'Victoria': ['South Australia', 'New South Wales'],
        'Tasmania': []
    };
    const usAdjacentRegions = {
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
        'Indiana': ['Illinois', 'Kentucky', 'Wisconsin', 'Michigan', 'Ohio'],
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
        'Wisconsin': ['Iowa', 'Illinois', 'Michigan', 'Minnesota', 'Indiana'],
        'West Virginia': ['Kentucky', 'Maryland', 'Ohio', 'Pennsylvania', 'Virginia'],
        'Wyoming': ['Colorado', 'Idaho', 'Montana', 'Nebraska', 'South Dakota', 'Utah']
    }
    const indiaAdjacentRegions = {
        'Andaman & Nicobar Island': [],
        'Andhra Pradesh': ['Karnataka',
            'Tamil Nadu',
            'Odisha',
            'Chhattisgarh',
            'Telangana'
        ],
        'Arunanchal Pradesh': ['Assam', 'Nagaland'],
        'Assam': ['Arunanchal Pradesh', 'Manipur', 'Nagaland', 'Meghalaya', 'Tripura', 'Mizoram', 'West Bengal'],
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
        'Mizoram': ['Assam', 'Tripura', 'Manipur'],
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
        'Telangana': ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Chhattisgarh', 'Odisha'],
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

function getGeoDetails(country) {
    let projection;
    let topoJsonURL;
    switch (country) {
        case 'australia':
            projection = d3.geoMercator()
                .center([140, -24])
                .scale(1000);
            topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/australia_states.json";
            break;
        case 'us':
            projection = d3.geoAlbersUsa()
                .scale(1200)
                .translate([width / 2, height / 2]);

            topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/usa_states.json"
            break;
        case 'japan':
            projection = d3.geoMercator()
                .center([139.6503, 35.6762])
                .scale(1300)
                .translate([width / 2, height / 2]);
            topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/japan_states.json"
            break;
        case 'india':
            projection = d3.geoMercator()
                .center([78.9629, 22.5937])
                .scale(1000)
                .translate([width / 2, height / 2]);
            topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/india_states.json"
            break;

        case 'china':
            projection = d3.geoMercator()
                .center([105, 35])
                .scale(800)
                .translate([width / 2, height / 2]);
            topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/china_states.json"
            break;

        default:
            projection = d3.geoMercator()
                .center([140, -24])
                .scale(1000);
            topoJsonURL = "https://raw.githubusercontent.com/pal0064/maps/master/topojsons/australia_states.json";

            break;
    }
    const path = d3.geoPath()
        .projection(projection);
    return [path, topoJsonURL];
}

function createMap(svg) {
    d3.selectAll("path").remove();
    d3.selectAll("text").remove();
    const country = d3.select('select[name="map-option"]').property("value");
    const geoDetails = getGeoDetails(country)
    const path = geoDetails[0]
    const topoJsonURL = geoDetails[1]
    d3.json(topoJsonURL).then(function(topo) {
        let data = topojson.feature(topo, topo.objects.states);
        data.features = data.features.filter(function(d) {
            return !SKIP_STATES.includes(d.properties.STATE_NAME) &&
                d.properties.STATE_NAME !== "";
        });
        data.path = path
        showMap(svg, data)
        showText(svg, data)
    });

}

function createMapColoredViz(svg, data, animate = true) {
    if (animate) {
        svg
            .append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .transition()
            .ease(d3.easePoly)
            .duration(100)
            .delay(function(d, i) {
                return i * 100;
            })
            .attr("d", data.path)
            .attr("id", function(d) {
                return d.properties.STATE_NAME;
            })
            .style("fill", function(d) {
                return d.color;
            });
    } else {
        showMap(svg, data, color = true)

    }

    showText(svg, data)
}


function showText(svg, data) {
    svg.append("g")
        .selectAll("text")
        .data(data.features)
        .enter()
        .append("text")
        .text(function(d) {
            return d.properties.STATE_NAME;
        })
        .attr("x", function(d) {
            return data.path.centroid(d)[0];
        })
        .attr("y", function(d) {
            return data.path.centroid(d)[1];
        })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("font-size", "10px");

}

function showMap(svg, data, color = false) {
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", data.path)
        .attr("id", function(d) {
            return d.properties.STATE_NAME;
        })
        .style("fill", function(d, i) {
            if (color == true) {
                return d.color
            }
            return colorScale(i);
        });
}