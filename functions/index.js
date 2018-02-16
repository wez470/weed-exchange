const functions = require('firebase-functions');
var axios = require("axios");

var ALLOWED_DOMAINS = ["https://meta-chronic.com", "https://weed-exchange.firebaseapp.com"];

exports.helloWorld = functions.https.onRequest((request, response) => {
    var host = request.get('host');
    console.log(host);
    if (ALLOWED_DOMAINS.indexOf(host) >= 0) {
        response.setHeader('Access-Control-Allow-Origin', host);
    }
    if (request.method === 'OPTIONS') {
        return;
    }

    strain = request.query.strain;
    console.log("Searching strain: " + strain);
    axios.get('https://weston-carlson.com/meta-chronic/strain/search?q=' + strain)
        .then(function (res) {
            var data = JSON.stringify(res['data']);
            console.log(data);
            response.send(data);
        })
        .catch(function (error) {
            console.log(error);
            response.status(500).end();
        });
});
