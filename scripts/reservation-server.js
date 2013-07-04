//var input_release_information = function() {



//this.start_input_server = function() {
var port = 1896;
var start_input_server = function(){
    console.log("Starting reservation input server");
    console.log("Server Running on port: " + port);
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




                var MongoClient = require('mongodb').MongoClient
                    , format = require('util').format;

                MongoClient.connect('mongodb://127.0.0.1:3001/reservation_system', function(err, db) {
                    if(err) throw err;

                    var collection = db.collection('reservation');
                    collection.insert(data, function(err, docs) {

                        collection.count(function(err, count) {
                            console.log(format("count = %s", count));
                        });

                        // Locate all the entries using find
                        collection.find().toArray(function(err, results) {
                            console.dir(results);
                            // Let's close the db
                            db.close();
                        });
                    });
                })















            });
            //console.log(request.method);
            response.writeHeader(200, {"Content-Type": "text/plain"});
            response.write("Complete");
            response.end();

        }

    }).listen(port);
};
//exports.input_release_information = input_release_information;

start_input_server();

/*

 var Db = require('mongodb').Db
 , Connection = require('mongodb').Connection
 , Server = require('mongodb').Server
 var client = new Db('reservation_system', new Server("127.0.0.1", 3001, {}), {w: 1}),
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

    */