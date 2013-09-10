#!/usr/bin/env node

var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events')
    developerKey = "";

var DEFAULT_PORT = 8000;

function main(argv) {
  new HttpServer({
    'GET': createServlet(StaticServlet),
    'HEAD': createServlet(StaticServlet),
    //'POST': createServlet(StaticServlet)
  }).start(Number(argv[2]) || DEFAULT_PORT);
}

function escapeHtml(value) {
  return value.toString().
    replace('<', '&lt;').
    replace('>', '&gt;').
    replace('"', '&quot;');
}

function createServlet(Class) {
  var servlet = new Class();
  return servlet.handleRequest.bind(servlet);
}

/**
 * An Http server implementation that uses a map of methods to decide
 * action routing.
 *
 * @param {Object} Map of method => Handler function
 */
function HttpServer(handlers) {
  this.handlers = handlers;
  this.server = http.createServer(this.handleRequest_.bind(this));
}

HttpServer.prototype.start = function(port) {
  this.port = port;
  this.server.listen(port);
  util.puts('Http Server running at http://localhost:' + port + '/');
};

HttpServer.prototype.parseUrl_ = function(urlString) {
  var parsed = url.parse(urlString);
  parsed.pathname = url.resolve('/', parsed.pathname);
  return url.parse(url.format(parsed), true);
};


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

HttpServer.prototype.handleRequest_ = function(req, res) {

  this.host = "192.168.1.77:3001";

  /**
   * Handle writes to db here
   */
  if (req.method == "POST") {
      var data = '';
      res.end("Post received");

      console.log("The post is here");
      req.data;


      req.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          data += chunk;
      });

      req.on('end', function() {
          var querystring = require('querystring');
          console.log("Complete data");
          console.log(JSON.parse(data));


          MongoClient.connect('mongodb://192.168.1.77:3001/reservation_system', function(err, db) {
              if(err) return false;

              var collection = db.collection('reservation');

              if (JSON.parse(data).hasOwnProperty("_id")) {
                  console.log("Update attempt : ");
                  console.log(data);
                  collection.findAndModify({_id: data["_id"]}, [["_id","asc"]], {$set: {status: data["status"], company: data["company"]}}, {w:1}, function(err) {
                      if (err) console.warn(err.message);
                      else console.log('successfully updated');
                  });
              } else {
                  collection.insert(JSON.parse(data), function(err, docs) {

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
              }
          });

      });

  }



    if (req.url == "/" || req.url == "") {
        req.url = "index.html";
    }

  var logEntry = req.method + ' ' + req.url;
  if (req.headers['user-agent']) {
    logEntry += ' ' + req.headers['user-agent'];
  }
  util.puts(logEntry);
  req.url = this.parseUrl_(req.url);
  console.log("THIS IS A REQUEST TO THE SYSTEM\n\n\n");

  if (req.url.pathname == "/reservations") {
    console.log("Getting reservations");
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

      MongoClient.connect('mongodb://192.168.1.77:3001/reservation_system', function(err, db) {
          if(err) return false;

          var collection = db.collection('reservation');
console.log(req);
          // Locate all the entries using find
          req.url.query.month = req.url.query.month.toString();
          req.url.query.day = req.url.query.day.toString();
          collection.find(
              {
                  day: parseInt(req.url.query.day),
                  month: parseInt(req.url.query.month),
                  year: parseInt(req.url.query.year)
              }
          ).toArray(function(err, results) {
              console.dir(results);
              res.end(JSON.stringify(results));
              // Let's close the db
              db.close();
          });
      });
  } else if (req.url.pathname == "/places") {


      var request = require('request');
      var requestUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.248869,-122.973796&radius=5000&types=" + req.url.query.category + "&name=" + req.url.query.searchText + "&sensor=false&key="+developerKey;
      request(requestUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body) // Print the google web page.
              res.end(body);
          }
      })
  } else {

  var handler = this.handlers[req.method];
  if (!handler) {
    res.writeHead(501);
    res.end();
  } else {
    handler.call(this, req, res);
  }
  }
};

/**
 * Handles static content.
 */
function StaticServlet() {}

StaticServlet.MimeMap = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'xml': 'application/xml',
  'json': 'application/json',
  'js': 'application/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'png': 'image/png',
  'svg': 'image/svg+xml'
};

StaticServlet.prototype.handleRequest = function(req, res) {
  var self = this;
  var path = ('./' + req.url.pathname).replace('//','/').replace(/%(..)/g, function(match, hex){
    return String.fromCharCode(parseInt(hex, 16));
  });
  var parts = path.split('/');
  if (parts[parts.length-1].charAt(0) === '.')
    return self.sendForbidden_(req, res, path);
  fs.stat(path, function(err, stat) {
    if (err)
      return self.sendMissing_(req, res, path);
    if (stat.isDirectory())
      return self.sendDirectory_(req, res, path);
    return self.sendFile_(req, res, path);
  });
}

StaticServlet.prototype.sendError_ = function(req, res, error) {
  res.writeHead(500, {
      'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n');
  res.write('<title>Internal Server Error</title>\n');
  res.write('<h1>Internal Server Error</h1>');
  res.write('<pre>' + escapeHtml(util.inspect(error)) + '</pre>');
  util.puts('500 Internal Server Error');
  util.puts(util.inspect(error));
};

StaticServlet.prototype.sendMissing_ = function(req, res, path) {
  path = path.substring(1);
  res.writeHead(404, {
      'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n');
  res.write('<title>404 Not Found</title>\n');
  res.write('<h1>Not Found</h1>');
  res.write(
    '<p>The requested URL ' +
    escapeHtml(path) +
    ' was not found on this server.</p>'
  );
  res.end();
  util.puts('404 Not Found: ' + path);
};

StaticServlet.prototype.sendForbidden_ = function(req, res, path) {
  path = path.substring(1);
  res.writeHead(403, {
      'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n');
  res.write('<title>403 Forbidden</title>\n');
  res.write('<h1>Forbidden</h1>');
  res.write(
    '<p>You do not have permission to access ' +
    escapeHtml(path) + ' on this server.</p>'
  );
  res.end();
  util.puts('403 Forbidden: ' + path);
};

StaticServlet.prototype.sendRedirect_ = function(req, res, redirectUrl) {
  res.writeHead(301, {
      'Content-Type': 'text/html',
      'Location': redirectUrl
  });
  res.write('<!doctype html>\n');
  res.write('<title>301 Moved Permanently</title>\n');
  res.write('<h1>Moved Permanently</h1>');
  res.write(
    '<p>The document has moved <a href="' +
    redirectUrl +
    '">here</a>.</p>'
  );
  res.end();
  util.puts('301 Moved Permanently: ' + redirectUrl);
};

StaticServlet.prototype.sendFile_ = function(req, res, path) {
    console.log("PATH VV");
  console.log(path);
  console.log("PATH ^^");
  
  if (path == "/THISISATTEST") {
    console.log("SENDING MOCK REQUEST DATA");
    
  }
  
  var self = this;
  var file = fs.createReadStream(path);
  res.writeHead(200, {
    'Access-Control-Allow-Origin' : 'http://localhost:8000/',
    'Content-Type': StaticServlet.
      MimeMap[path.split('.').pop()] || 'text/plain'
  });
  if (req.method === 'HEAD') {
    res.end();
  } else {
    file.on('data', res.write.bind(res));
    file.on('close', function() {
      res.end();
    });
    file.on('error', function(error) {
      self.sendError_(req, res, error);
    });
  }
};

StaticServlet.prototype.sendDirectory_ = function(req, res, path) {
  var self = this;
  if (path.match(/[^\/]$/)) {
    req.url.pathname += '/';
    var redirectUrl = url.format(url.parse(url.format(req.url)));
    return self.sendRedirect_(req, res, redirectUrl);
  }
  fs.readdir(path, function(err, files) {
    if (err)
      return self.sendError_(req, res, error);

    if (!files.length)
      return self.writeDirectoryIndex_(req, res, path, []);

    var remaining = files.length;
    files.forEach(function(fileName, index) {
      fs.stat(path + '/' + fileName, function(err, stat) {
        if (err)
          return self.sendError_(req, res, err);
        if (stat.isDirectory()) {
          files[index] = fileName + '/';
        }
        if (!(--remaining))
          return self.writeDirectoryIndex_(req, res, path, files);
      });
    });
  });
};

StaticServlet.prototype.writeDirectoryIndex_ = function(req, res, path, files) {
  
  path = path.substring(1);
  //res.header('Access-Control-Allow-Origin', "*")
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : 'http://localhost:1896/'
  });
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.write('<!doctype html>\n');
  res.write('<title>' + escapeHtml(path) + '</title>\n');
  res.write('<style>\n');
  res.write('  ol { list-style-type: none; font-size: 1.2em; }\n');
  res.write('</style>\n');
  res.write('<h1>Directory: ' + escapeHtml(path) + '</h1>');
  res.write('<ol>');
  files.forEach(function(fileName) {
    if (fileName.charAt(0) !== '.') {
      res.write('<li><a href="' +
        escapeHtml(fileName) + '">' +
        escapeHtml(fileName) + '</a></li>');
    }
  });
  res.write('</ol>');
  res.end();
};

// Must be last,
main(process.argv);




