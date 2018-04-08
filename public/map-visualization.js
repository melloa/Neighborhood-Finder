var regions = {}
var test;

function create_polygon(map, location, color) {
    var database_location = 'region/' + location + '/'
    firebase.database().ref(database_location).on('value', function (snapshot) {
        var points = snapshot.val()
        var polygon = new google.maps.Polygon({
            map: map,
            paths: points,
            strokeColor: '#757575',
            strokeOpacity: 0.85,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.85,
            draggable: false,
            geodesic: true
        });

        regions[location] = polygon
    });
}

function set_polygon_color(location, color) {
    regions[location].setOptions({
        fillColor: color
    })
}

function get_housing(callback) {
    var neighborhoods = [
        "Allston",
"Back Bay",
"Beacon Hill",
"Brighton",
"Charlestown",
"Chinatown",
"East Boston",
"Fenway",
"Hyde Park",
"Jamaica Plain",
"Kenmore",
"Mattapan",
"Mission Hill",
"North Dorchester",
"North End",
"Roslindale",
"Roxbury",
"South Boston",
"South Dorchester",
"South End",
"West End",
"West Roxbury"
    ]
    firebase.database().ref('housing/').on('value', function (snapshot) {
        housing = snapshot.val()
        console.log(housing)
        neighborhood_name = [];
        price = [];
        neighborhoods.forEach(function (n) {
            neighborhood_name.push(n)
            price.push(housing[n].house)
        })
        callback(neighborhood_name, price)
    });
}
