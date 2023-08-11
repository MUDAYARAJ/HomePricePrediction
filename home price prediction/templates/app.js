function getbathvalue() {
    var uiBath = document.getElementsByName("uiBathrooms");
    for (var i in uiBath) {
        if (uiBath[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function getbhkvalue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}



function onClickedEstimatePrice() {
    console.log("estimeted button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getbhkvalue();
    var bath = getbathvalue();
    var loc = document.getElementById("uiLocations");
    var estimted = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        location: loc.value,
        bath: bath,
        bhk: bhk,

    }, function(data, status) {
        console.log(data.estimated_price);
        estimted.innerHTML = "<h2>" + data.estimated_price.toString() + "Lakh</h2>"
        console.log(status);
    });
}


function onPageLoad() {
    console.log("loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function(data, status) {
        console.log("got response");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt)
            }
        }
    });
}

window.onload = onPageLoad;