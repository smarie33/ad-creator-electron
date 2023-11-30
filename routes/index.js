const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const ncp = require('ncp').ncp;
const readline = require('readline');
const ***REMOVED***google***REMOVED*** = require('googleapis');
const axios = require('axios').default;
let formidable = require('formidable');
const qs = require('qs');
var createError = require('http-errors');
const BoxSDK = require('box-node-sdk');

const ***REMOVED***app***REMOVED*** = require('electron');
const userDataPathHereI = app.getPath('userData');

let key, dbData, enviornment, config;

if(fs.existsSync(path.join(userDataPathHereI, '/hptodata')))***REMOVED***
  key = require(path.join(userDataPathHereI, '/hptodata/keys.json'));
  dbData = require(path.join(userDataPathHereI, '/hptodata/db.json'));
  enviornment = require(path.join(userDataPathHereI, '/hptodata/enviornment.json'));
  config = require(path.join(userDataPathHereI, '/hptodata/config.json'));
***REMOVED***else***REMOVED***
  fs.mkdirSync(path.join(userDataPathHereI, '/hptodata'), ***REMOVED***recursive: true***REMOVED***);
  fs.copyFileSync(path.resolve(__dirname,'../data/config.json'), path.join(userDataPathHereI, '/hptodata/config.json'), fs.constants.COPYFILE_EXCL);
  fs.copyFileSync(path.resolve(__dirname,'../data/enviornment.json'), path.join(userDataPathHereI, '/hptodata/enviornment.json'), fs.constants.COPYFILE_EXCL);
  fs.copyFileSync(path.resolve(__dirname,'../data/db.json'), path.join(userDataPathHereI, '/hptodata/db.json'), fs.constants.COPYFILE_EXCL);
  fs.copyFileSync(path.resolve(__dirname,'../data/keys.json'), path.join(userDataPathHereI, '/hptodata/keys.json'), fs.constants.COPYFILE_EXCL);

  key = require(path.join(userDataPathHereI, '/hptodata/keys.json'));
  dbData = require(path.join(userDataPathHereI, '/hptodata/db.json'));
  enviornment = require(path.join(userDataPathHereI, '/hptodata/enviornment.json'));
  config = require(path.join(userDataPathHereI, '/hptodata/config.json'));

  //create folder structure
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.outputfiles***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.imagesfolder***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.textfolder***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.tempfolder***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.storecsvs***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.savedzips***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.tempfolder***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.newimagesfolder***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.outputfiles***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);
  fs.mkdirSync(path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.savedHPTOzips***REMOVED***`), ***REMOVED***recursive: true***REMOVED***);

  ncp.limit = 25;

  // ncp(source, destination, callback)
  ncp(path.resolve(__dirname,'../data/dummy-images'), path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.newimagesfolder***REMOVED***`),
    function (err) ***REMOVED***
      if (err)***REMOVED***
        let sendThis = ***REMOVED***'error': err***REMOVED***;
        console.log(sendThis);
      ***REMOVED***else***REMOVED***
        //console.log(`dummy images folder copied recursively top $***REMOVED***dbData.defaults.newimagesfolder***REMOVED***`);
      ***REMOVED***
  ***REMOVED***);

 ncp(path.resolve(__dirname,'../data/dummy-images'), path.join(userDataPathHereI, `/hptodata/public/$***REMOVED***dbData.defaults.imagesfolder***REMOVED***`),
    function (err) ***REMOVED***
      if (err)***REMOVED***
        let sendThis = ***REMOVED***'error': err***REMOVED***;
        console.log(sendThis);
      ***REMOVED***else***REMOVED***
       // console.log(`dummy images folder copied recursively top $***REMOVED***dbData.defaults.imagesfolder***REMOVED***`);
      ***REMOVED***
  ***REMOVED***);
***REMOVED***

const functions = require('../functions/functions.js');

// Requiring module
const process = require('process');


const ***REMOVED***getDates,getDedicateds,getContentAtDate,checkForZeros,getTitles,getAllZips,getAllZipsNames,getThisZip,runCSVFunctions,getAllCsvNames,getThisCsv,getAllCsvs,firstDate,returnEnvnJson,checkTokenLife,checkIfLoggedIn***REMOVED*** = require('../functions/interface.js');

const SCOPES = dbData.defaults.scopes;
const SHEET = dbData.defaults.sheet;
const RANGE = dbData.defaults.tab+dbData.defaults.range;

let client;
var router = express.Router()

/* GET home page. */
router.get('/', (req, res) => ***REMOVED***
  return res.sendStatus(200)
***REMOVED***)

/* GET healthcheck */
router.get('/healthcheck', (req, res) => ***REMOVED***
  return res.send('OK')
***REMOVED***)

router.get('/how-to', function(req, res)***REMOVED***
  res.sendFile(path.join(__dirname, '../public/how-to.html'));
***REMOVED***)

router.get('/docs', function(req, res)***REMOVED***
  res.sendFile(path.join(__dirname, '../public/docs/index.html'));
***REMOVED***)

router.get('/grabtoken', (request, response) =>***REMOVED***
  const authenticationUrl = 'https://api.box.com/oauth2/token';
  let queryCode = request.query.code;

  let accessToken = axios.post(
    authenticationUrl,
    qs.stringify(***REMOVED***
      grant_type: 'authorization_code',
      code: queryCode,
      client_id: enviornment.boxClientId,
      client_secret: enviornment.boxClientSeceret
    ***REMOVED***)
  )
  .then(function(res)***REMOVED***
  //  console.log("grabtoken "+res.data.access_token);
    const token = ***REMOVED***'token' : res.data.access_token***REMOVED***;
    const expires = ***REMOVED***'expires' : res.data.expires_in***REMOVED***;
    const date = ***REMOVED***'token_time' : new Date().getTime()***REMOVED***;
    const ***REMOVED***boxClientId, boxClientSeceret, redirect***REMOVED*** = enviornment;
    const addAuth = ***REMOVED***...enviornment, ...token, ...expires, ...date***REMOVED***;
    fs.writeFileSync(path.join(userDataPathHereI, '/hptodata/enviornment.json'), JSON.stringify(addAuth));
    response.redirect('/');
  ***REMOVED***);
***REMOVED***)

router.get(['/api','/api/:id', '/api/:id/:month','/api/:id/:month/:day','/api/:id/:month/:day/:year'],  async (request, response) =>***REMOVED***
  const skipapi = ['defaults','database'];
  if(skipapi.includes(request.params.id))***REMOVED***
    switch(request.params.id)***REMOVED***
      case 'defaults':
        returns = dbData.defaults;
        break;
      case 'database':
        returns = dbData;
        break;
      default:
        returns = dbData;
        break;
    ***REMOVED***

    response.send(returns);
    return;
  ***REMOVED***

  try ***REMOVED***
    const auth = new google.auth.GoogleAuth(***REMOVED***
        keyFile: path.join(userDataPathHereI, '/hptodata/keys.json'), //the key file
        //url to spreadsheets API
        scopes: SCOPES,
    ***REMOVED***);

    //Auth client Object
    const authClientObject = await auth.getClient();

    //Google sheets instance
    const googleSheetsInstance = google.sheets(***REMOVED*** version: "v4", auth: authClientObject ***REMOVED***);

    // spreadsheet id
    const spreadsheetId = SHEET;

    // Get metadata about spreadsheet
    const sheetInfo = await googleSheetsInstance.spreadsheets.get(***REMOVED***
        auth,
        spreadsheetId,
    ***REMOVED***);

    let returns, onlyValues = [], removeTop = [];

    //console.log(dbData.defaults.tab);

    if(dbData.defaults.tab != '')***REMOVED***
      //Read from the spreadsheet
      const readData = await googleSheetsInstance.spreadsheets.values.get(***REMOVED***
          auth, //auth object
          spreadsheetId, // spreadsheet id
          range: RANGE, //range of cells to read from.
      ***REMOVED***)

      if(readData.data.values != undefined)***REMOVED***
        onlyValues = readData.data.values;
        removeTop = onlyValues.shift();
      ***REMOVED***
    ***REMOVED***

    if(request.params.id == 'sheetinfo')***REMOVED***
      returns = getTitles(sheetInfo.data.properties.title, sheetInfo.data.sheets);
      response.send(returns);
      return;
    ***REMOVED***

    let times = 0;
    let month = '',day = '',year = '';
    if(request.params.month != undefined)***REMOVED***
      month = checkForZeros(request.params.month);
      times++;
    ***REMOVED***
    if(request.params.day != undefined)***REMOVED***
      day = checkForZeros(request.params.day);
      times++;
    ***REMOVED***
    if(request.params.year != undefined)***REMOVED***
      year = checkForZeros(request.params.year);
      times++;
    ***REMOVED***
    if(onlyValues.length > 0)***REMOVED***
      switch (request.params.id)***REMOVED***
        case 'titles':
          returns = removeTop;
          break;
        case 'dates':
          if(times > 0)***REMOVED***
            returns = getContentAtDate(onlyValues,month,day,year)
          ***REMOVED***else***REMOVED***
            returns = getDates(onlyValues)
          ***REMOVED***
          break;
        case 'date':
          if(times > 0)***REMOVED***
            returns = getContentAtDate(onlyValues,month,day,year)
          ***REMOVED***else***REMOVED***
            returns = getDates(onlyValues)
          ***REMOVED***
          break;
        case 'dedicateds':
          returns = getDedicateds(onlyValues);
          break;
        default:
          returns = removeTop.concat(onlyValues);
        ***REMOVED***
      ***REMOVED***

      if(returns == null || returns == undefined || returns.length < 1)***REMOVED***
        returns = ***REMOVED***'error':'requested information does not exist on this tab'***REMOVED***
      ***REMOVED***

    response.send(returns);
  ***REMOVED*** catch(err) ***REMOVED***
    let errors = [];
    if(err.errors == undefined)***REMOVED***
      console.log(err);
      errors.push(err);
      errors.push('There is an issue with the api connection. Please check the server logs');
    ***REMOVED***else***REMOVED***
      console.log(err.errors);
      errors = err.errors.map((error) => ***REMOVED***
        return error.message
      ***REMOVED***)
    ***REMOVED***
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***

***REMOVED***);

//get csv info
router.get(['/csvinfo','/csvinfo/:id/:type', '/csvinfo/:id/:type/:month','/csvinfo/:id/:type/:month/:day','/csvinfo/:id/:type/:month/:day/:year'],  async (request, response) =>***REMOVED***

  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send(getAllCsvs());
    ***REMOVED***else***REMOVED***
      let getCSVdata = runCSVFunctions(request.params.id);
      getCSVdata.then(function(result)***REMOVED***
        let returns, onlyValues = [], removeTop = [];

          onlyValues = result;
          removeTop = result.shift();

        let times = 0;
        let month = '',day = '',year = '';
        if(request.params.month != undefined)***REMOVED***
          month = checkForZeros(request.params.month);
          times++;
        ***REMOVED***
        if(request.params.day != undefined)***REMOVED***
          day = checkForZeros(request.params.day);
          times++;
        ***REMOVED***
        if(request.params.year != undefined)***REMOVED***
          year = checkForZeros(request.params.year);
          times++;
        ***REMOVED***
        if(onlyValues.length > 0)***REMOVED***
          switch (request.params.type)***REMOVED***
            case 'titles':
              returns = removeTop;
              break;
            case 'dates':
              if(times > 0)***REMOVED***
                returns = getContentAtDate(onlyValues,month,day,year)
              ***REMOVED***else***REMOVED***
                returns = getDates(onlyValues)
              ***REMOVED***
              break;
            case 'date':
              if(times > 0)***REMOVED***
                returns = getContentAtDate(onlyValues,month,day,year)
              ***REMOVED***else***REMOVED***
                returns = getDates(onlyValues)
              ***REMOVED***
              break;
            case 'dedicateds':
              returns = getDedicateds(onlyValues);
              break;
            case 'firstdate':
              returns = firstDate(onlyValues);
              break;
            default:
              returns = removeTop.concat(onlyValues);
            ***REMOVED***
          ***REMOVED***

          if(returns == null || returns == undefined || returns.length < 1)***REMOVED***
            returns = ***REMOVED***'error':'requested information does not exist on this tab'***REMOVED***
          ***REMOVED***

        response.send(returns);
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    if(err == undefined)***REMOVED***
      errors = "Unedfined error";
    ***REMOVED***else***REMOVED***
      errors = err.errors.map((error) => ***REMOVED***
        return error.message
      ***REMOVED***)
    ***REMOVED***
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***

***REMOVED***);

router.get(['/refresh','/refresh/:id'],  async (request, response) =>***REMOVED***
  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send("please add a sheet id");
    ***REMOVED***else***REMOVED***
      const auth = new google.auth.GoogleAuth(***REMOVED***
          keyFile: path.join(userDataPathHereI, '/hptodata/keys.json'), //the key file
          //url to spreadsheets API
          scopes: SCOPES,
      ***REMOVED***);

      //Auth client Object
      const authClientObject = await auth.getClient();

      //Google sheets instance
      const googleSheetsInstance = google.sheets(***REMOVED*** version: "v4", auth: authClientObject ***REMOVED***);

      // spreadsheet id
      const spreadsheetId = request.params.id;

      // Get metadata about spreadsheet
      const sheetInfo = await googleSheetsInstance.spreadsheets.get(***REMOVED***
          auth,
          spreadsheetId,
      ***REMOVED***);

      response.send(getTitles(sheetInfo.data.properties.title, sheetInfo.data.sheets));
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    console.log(err);
    errors = err.errors.map((error) => ***REMOVED***
      return error.message
    ***REMOVED***)
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***

***REMOVED***);

router.get(['/checkzips', '/checkzips/:id'],  async (request, response) =>***REMOVED***
  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send(getAllZips());
    ***REMOVED***else***REMOVED***
      //response.send(getTitles(sheetInfo.data.properties.title, sheetInfo.data.sheets));
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    errors = err.errors.map((error) => ***REMOVED***
      return error.message
    ***REMOVED***)
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***

***REMOVED***);

router.get(['/zipnames', '/zipnames/:id'],  async (request, response) =>***REMOVED***
  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send(getAllZipsNames());
    ***REMOVED***else***REMOVED***
      response.send(getThisZip(request.params.id));
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    errors = err.errors.map((error) => ***REMOVED***
      return error.message
    ***REMOVED***)
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***
***REMOVED***);


//get csv names
router.get(['/csvnames', '/csvnames/:id'],  async (request, response) =>***REMOVED***
  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send(getAllCsvNames());
    ***REMOVED***else***REMOVED***
      response.send(getThisCsv(request.params.id));
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    if(err == undefined)***REMOVED***
      errors = "Unedfined error";
    ***REMOVED***else***REMOVED***
      errors = err.errors.map((error) => ***REMOVED***
        return error.message
      ***REMOVED***)
    ***REMOVED***
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***
***REMOVED***);

router.post('/function/:id', (request, response) =>***REMOVED***
  thisFunction = (request.params.id == null) ? ***REMOVED***'error':'no function'***REMOVED*** : functions[request.params.id](request.body);
  thisFunction.then((res) => response.send(res));
***REMOVED***)

//process uploaded csv
router.post("/csv", (req, res) => ***REMOVED***
  //Create an instance of the form object
  let form = new formidable.IncomingForm();

  //Process the file upload in Node
  form.parse(req, function (error, fields, file) ***REMOVED***
    let filepath = file.fileupload.filepath;
    let newpath = path.join(userDataPathHereI, '/hptodata/public/csv/');
    let sendFile = true;
    let msg;

    let checkFiles = fs.readdirSync(newpath);

    if(checkFiles != null)***REMOVED***
      checkFiles.map(async img => ***REMOVED***
        if(img.charAt(0) != '.')***REMOVED***
          if(img == file.fileupload.originalFilename)***REMOVED***
            msg = ***REMOVED***'error': "this file already exists"***REMOVED***;
            sendFile = false;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED***

    //Copy the uploaded file to a custom folder
    if(sendFile)***REMOVED***
      newpath += file.fileupload.originalFilename;
      fs.renameSync(filepath, newpath);
      msg = ***REMOVED***'success': file.fileupload.originalFilename+' uploaded'***REMOVED***;
    ***REMOVED***
    res.send(msg)
    res.end();

  ***REMOVED***);
***REMOVED***);

router.get(['/zipname', '/zipname/:id'],  async (request, response) =>***REMOVED***
  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send(getAllZipsNames());
    ***REMOVED***else***REMOVED***
      response.send(getThisZip(request.params.id));
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    errors = err.errors.map((error) => ***REMOVED***
      return error.message
    ***REMOVED***)
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***
***REMOVED***);

router.get(['/enviornment', '/enviornment/:id'],  async (request, response) =>***REMOVED***
  try ***REMOVED***
    if(request.params.id == undefined)***REMOVED***
      response.send(returnEnvnJson());
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    console.log(err);
    if(err != undefined && err != null)***REMOVED***
      errors = err.errors.map((error) => ***REMOVED***
        return error.message
      ***REMOVED***)
    ***REMOVED***else***REMOVED***
      errors[0] = 'unknown error';
    ***REMOVED***
    response.send(***REMOVED***error: errors***REMOVED***);
  ***REMOVED***
***REMOVED***);



// router.get("/trello/:id", async (req, res) => ***REMOVED***
//   try ***REMOVED***
//     res.send(getTrelloInfo(req.params.id));
//   ***REMOVED*** catch(err) ***REMOVED***
//     let errors;
//     if(typeof errors == 'object')***REMOVED***
//       errors = err.errors.map((error) => ***REMOVED***
//         return error.message
//       ***REMOVED***)
//     ***REMOVED***else***REMOVED***
//       errors = err;
//     ***REMOVED***
//     res.send(***REMOVED***error: errors***REMOVED***);
//   ***REMOVED***
//   res.end();
// ***REMOVED***)

router.get("/checkauth", async (req, res) => ***REMOVED***
  try ***REMOVED***
    const env = JSON.parse(fs.readFileSync(path.join(userDataPathHereI, '/hptodata/enviornment.json'), ***REMOVED***encoding:'utf8', flag:'r'***REMOVED***));
    if(env.token == undefined)***REMOVED***
      res.send(***REMOVED***"success": "no auth token"***REMOVED***);
      res.end();
    ***REMOVED***else***REMOVED***
      let checkLive = checkTokenLife(env);
      checkLive.then(isit => ***REMOVED***
        if(isit)***REMOVED***
          res.send(***REMOVED***"success": "live token"***REMOVED***);
          res.end();
        ***REMOVED***else***REMOVED***
          res.send(***REMOVED***"success": "token expired"***REMOVED***);
          res.end();
        ***REMOVED***
      ***REMOVED***).catch(error => ***REMOVED***
        console.log(error);
        res.send(***REMOVED***"success": "token expired"***REMOVED***);
        res.end();
      ***REMOVED***)
    ***REMOVED***
  ***REMOVED*** catch(err) ***REMOVED***
    let errors;
    if(typeof errors == 'object')***REMOVED***
      errors = err.errors.map((error) => ***REMOVED***
        return error.message
      ***REMOVED***)
    ***REMOVED***else***REMOVED***
      errors = err;
    ***REMOVED***
    res.send(***REMOVED***error: errors***REMOVED***);
    res.end();
  ***REMOVED***
***REMOVED***)


module.exports = router
