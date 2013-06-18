//var input_release_information = function() {

//this.start_input_server = function() {
var start_input_server = function(){
    console.log("Starting reservation input server");
    // this.port = 1896
    var sys = require("sys"),
        querystring=require('querystring'),
        my_http = require("http");
    my_http.createServer(function(request,response){
        if(request.method === "POST") {
            var data = "";
            console.log("Writing reservation to database.");
            request.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
                data += chunk;
            });

            request.on('end', function() {
            console.log("Complete data");
            console.log(querystring.parse(data));
            //consoles.log(request);
            var Db = require('mongodb').Db
                , Connection = require('mongodb').Connection
                , Server = require('mongodb').Server
            var client = new Db('reservation_system', new Server("127.0.0.1", 27017, {}), {w: 1}),
                test = function (err, collection) {
                    collection.insert({"lp":"Who is laura Palmer?"}, function(err, docs) {
                        if (err) {
                            console.log("Failed to save reservation");
                        } else {
                            console.log("Successfully saved reservation");
                        }
                        console.log("Done write attempt");
                    })
                };
            });
            //console.log(request.method);
            response.writeHeader(200, {"Content-Type": "text/plain"});
            response.write("Complete");
            response.end();

        }
        console.log("Server Running on port: 1896");
    }).listen(1896);
};
//exports.input_release_information = input_release_information;

start_input_server();