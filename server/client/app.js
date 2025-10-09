// function getBathValue() {
//     // Select all radio buttons with name "uiBathrooms"
//     var uiBathrooms = document.getElementsByName("uiBathrooms");
//     for (var i = 0; i < uiBathrooms.length; i++) {
//         if (uiBathrooms[i].checked) {
//             return parseInt(uiBathrooms[i].value);
//         }
//     }
//     return -1; // if none selected
// }

// function getBHKValue() {
//     // Select all radio buttons with name "uiBHK"
//     var uiBHK = document.getElementsByName("uiBHK");
//     for (var i = 0; i < uiBHK.length; i++) {
//         if (uiBHK[i].checked) {
//             return parseInt(uiBHK[i].value);
//         }
//     }
//     return -1; // if none selected
// }

// function onClickedEstimatePrice() {
//     console.log("Estimate price button clicked");

//     var sqft = document.getElementById("uiSqft");
//     var bhk = getBHKValue();
//     var bathrooms = getBathValue();
//     var locations = document.getElementById("uiLocations");
//     var estPrice = document.getElementById("uiEstimatedPrice");

//     var url = "http://127.0.0.1:5000/predict_home_price";

//     $.post(url, {
//         total_sqft: parseFloat(sqft.value),
//         bhk: bhk,
//         bath: bathrooms,
//         location: locations.value
//     }, function(data, status) {
//         console.log(data.estimated_price);
//         estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
//         console.log(status);
//     });
// }

// function onPageLoad() {
//     console.log("Document loaded");
//     var url = "http://127.0.0.1:5000/get_location_names";

//     $.get(url, function(data, status) {
//         console.log("Got response for get_location_names");

//         if (data) {
//             var locations = data.locations;
//             var uilocations = document.getElementById("uiLocations");
//             $('#uiLocations').empty();

//             for (var i in locations) {
//                 var opt = new Option(locations[i]);
//                 $('#uiLocations').append(opt);
//             }
//         }
//     });
// }

// window.onload = onPageLoad;





function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) return parseInt(uiBathrooms[i].value);
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) return parseInt(uiBHK[i].value);
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var locations = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Use relative URL for deployment
    var url = "/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: locations.value
    }, function(data, status) {
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(data, status);
    });
}

function onPageLoad() {
    console.log("Document loaded");
    var url = "/get_location_names";  // Relative URL

    $.get(url, function(data, status) {
        if (data) {
            var locations = data.locations;
            var uilocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();

            // Add default option
            $('#uiLocations').append(new Option("Choose a Location", ""));

            for (var i in locations) {
                $('#uiLocations').append(new Option(locations[i], locations[i]));
            }
        }
    });
}

window.onload = onPageLoad;


