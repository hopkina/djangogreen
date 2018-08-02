var geojson;
var info = L.control({position: 'topright'});


// setup a colour map
function getColor(d) {
    return d == 'Allotments Or Community Growing Spaces' ? '#a6cee3' :
            d == 'Bowling Green'  ? '#1f78b4' :
            d == 'Cemetery'  ? '#b2df8a' :
            d == 'Golf Course'  ? '#33a02c' :
            d == 'Other Sports Facility'   ? '#fb9a99' :
            d == 'Play Space'   ? '#e31a1c' :
            d == 'Playing Field'   ? '#fdbf6f' :
            d == 'Public Park Or Garden'   ? '#ff7f00' :
            d == 'Religious Grounds'   ? '#cab2d6' :
            d == 'Tennis Court'   ? '#6a3d9a' :
                        '#ffff99';
}


// setup a style for displaying the sites
function style(feature) {
    return {
        fillColor: getColor(feature.properties.function),
        weight: 1,
        opacity: 1,
        color: '#666',
        fillOpacity: 0.7
    };
}


// setup a style to highlight a feature on mouseover
function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}


// setup a style to reset the highlight after mouseover
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


// add an information panel
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};


// method to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Green Sites in Oxfordshire</h4>' +  (props ?
        '<b>' + props.id + '</b><br />' + props.function + '<br />' + 
        props.name + '<br />' + props.wardname
        : 'Hover over a site <p>&nbsp</p><br />');
};

var legend = L.control({position: 'bottomright'});

// add a legend
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['Allotments Or Community Growing Spaces', 
                'Bowling Green', 
                'Cemetery', 
                'Golf Course', 
                'Other Sports Facility', 
                'Play Space', 
                'Playing Field', 
                'Public Park Or Garden',
                'Religious Grounds',
                'Tennis Court'],
        labels = [];

    // loop through the classes and generate a label with a colored square for each
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<p><i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + '<br></p>';
    }

    return div;
};

// add search functionality
var options = {
    position: 'topleft',
    title: 'Search',
    panelTitle: 'Search for green sites',
    placeholder: 'eg: allotment, play space',
    maxResultLength: 15,
    threshold: 0.5,
    showInvisibleFeatures: true,
};

var searchCtrl = L.control.fuseSearch(options)


// the oneachfeature function
function onEachFeature(feature, layer) {
    var props = feature.properties;
    var content = `<h4>${props.function}</h4><p>${props.name}</p>`;
    layer.bindPopup(content);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
    feature.layer = layer;
}
