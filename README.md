# AngularJS Reservation Application

A web application that allows a user to create and view reservations





##Database

###Starting the Database

```
sudo mongod -port 3001
```

###Connect to Database

```
mongo -host 127.0.0.1:3001
```

###View Reservations

```
use reservation_system;
db.reservation.find();
```

Example to find reservations on Halloween

```
db.reservation.find({day:"31", month:"11", "year":"2013"});
```

```
var reservation = {
 "company" : "", "address" : "123 Street name", "month" : 5,
 "day" : 29, "date" : "2013-06-29T22:53:00.000Z", "year" : 2013,
 "status" : "maybe", "duration_minutes" : 0,
 "_id" : ObjectId("51f751d7d0fda46a65000007")
}
```


##Server

###Start server

```
node scripts/web server.js
```