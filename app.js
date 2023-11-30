const express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    routes = require("./routes/index"),
    cors = require('cors'),
    createError = require('http-errors'),
    dbData = require('./data/db.json'),
    envrmt = require('./data/enviornment.json'),
    ***REMOVED***app***REMOVED*** = require('electron'),
    userDataPathHereA = app.getPath('userData'),
    server = express();


server.use( bodyParser.json(***REMOVED*** limit: '50mb' ***REMOVED***) );       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded(***REMOVED*** limit: '50mb',extended: true***REMOVED***));    // to support URL-encoded bodies
server.use(cors())
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));
server.use("/editable", express.static(path.join(userDataPathHereA, '/hptodata/public')));

server.use("/", routes);

// catch 404 and forward to error handler
server.use(function (req, res, next) ***REMOVED***
    next(createError(404));
***REMOVED***);

// error handler
server.use(function (err, req, res, next) ***REMOVED***
    // set locals, only providing error in development
    res.locals.title = "error";
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : ***REMOVED******REMOVED***;

    // render the error page
    res.status(err.status || 500);
    res.json(***REMOVED***
      test: 'from app js',
      message: err.message,
      error: err
    ***REMOVED***);
    res.end();
***REMOVED***);

const serverLive = server.listen(envrmt.port, () => ***REMOVED***
***REMOVED***);

module.exports = server;