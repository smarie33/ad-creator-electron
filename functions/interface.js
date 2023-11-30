// MANIPULATE DATA FROM index.js, MAKE IT SIZEABLE CHUCKS THAT THE API CAN RETURN

const fs = require('fs');
const path = require('path');
const ***REMOVED***app***REMOVED*** = require('electron');
const userDataPathHereInterface = app.getPath('userData');
const data = require(path.join(userDataPathHereInterface, '/hptodata/db.json'));
const appSavePath = path.join(userDataPathHereInterface, '/hptodata');
const CsvReadableStream = require('csv-reader');
const BoxSDK = require('box-node-sdk');

async function checkTokenLife(env)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    if(env.token == undefined || env.expires == undefined || env.token_time == undefined)***REMOVED***
      reject(false);
    ***REMOVED***
    const tokenTime = env.token_time;
    const currentTime = new Date();
    const expireInMinutes = env.expires / 60;
    let diffInMilliseconds = Math.abs(tokenTime - currentTime);

    // Convert milliseconds to minutes and return the result
    let amtOfMins = diffInMilliseconds / (1000 * 60);

    if(amtOfMins > expireInMinutes)***REMOVED***
      reject(false);
    ***REMOVED***

    if(amtOfMins < expireInMinutes)***REMOVED***
      resolve(true);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

async function checkIfLoggedIn(enviornment)***REMOVED***

  window.location.href = `https://account.box.com/api/oauth2/authorize?response_type=code&client_id=$***REMOVED***enviornment.boxClientId***REMOVED***`;
  // client = BoxSDK.getBasicClient(token);
  // return new Promise((resolve, reject) => ***REMOVED***
  //   client.users.get(client.CURRENT_USER_ID)
  //   .then(currentUser => ***REMOVED*** console.log(currentUser); resolve(true); ***REMOVED***)
  //   .catch(error => ***REMOVED*** console.log(error); reject('Token has expired. Cannot retrieve user'); ***REMOVED***);
  // ***REMOVED***)
***REMOVED***


function getDates(rows)***REMOVED***
  let newDate = '';
  let dates = new Array();
  rows.map((row) => ***REMOVED***
    if(row[1] !== newDate)***REMOVED***
      dates.push(row[1]);
      newDate = row[1]
    ***REMOVED***
  ***REMOVED***);
  return dates;
***REMOVED***

function getDedicateds(rows)***REMOVED***
  let onlyded = new Array();
  rows.map((row) => ***REMOVED***
    if(row[7] != undefined)***REMOVED***
      if(!Number.isInteger(row[7]))***REMOVED***
        if(row[7].toLowerCase() == 'all')***REMOVED***
          onlyded.push(row);
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
  return onlyded;
***REMOVED***

function firstDate(rows)***REMOVED***
  let theseDates = new Array();
  let fd = '';
  rows.map((row) => ***REMOVED***
    if(row[1] != undefined)***REMOVED***
      if(fd != '' && row[1] != fd)***REMOVED***
        return theseDates;
      ***REMOVED***
      if(Number.isInteger(row[7]))***REMOVED***
        if(fd == '' || fd == row[1])***REMOVED***
          theseDates.push(row);
          if(fd == '')***REMOVED***
            fd = row[1];
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***else if(row[7].toLowerCase() != 'all')***REMOVED***
        if(fd == '' || fd == row[1])***REMOVED***
          theseDates.push(row);
          if(fd == '')***REMOVED***
            fd = row[1];
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)
  return theseDates;
***REMOVED***

function getContentAtDate(rows, month, day, year)***REMOVED***
  let theseDates = new Array();
  rows.map((row) => ***REMOVED***
    if(row[1] != undefined && row[7] != undefined)***REMOVED***
      let dates = row[1].split('/');
      if(month != '' && day != '' && year != '')***REMOVED***
        if(dates[0] == month && dates[1] == day && dates[2] == year)***REMOVED***
        //  console.log(row);
          if(Number.isInteger(row[7]))***REMOVED***
            theseDates.push(row);
          ***REMOVED***else if(row[7].toLowerCase() != 'all')***REMOVED***
            theseDates.push(row);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***else if(month != '' && day != '')***REMOVED***
        if(dates[0] == month && dates[1] == day)***REMOVED***
          if(Number.isInteger(row[7]))***REMOVED***
            theseDates.push(row);
          ***REMOVED***else if(row[7].toLowerCase() != 'all')***REMOVED***
            theseDates.push(row);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***else***REMOVED***
        if(dates[0] == month)***REMOVED***
          if(Number.isInteger(row[7]))***REMOVED***
            theseDates.push(row);
          ***REMOVED***else if(row[7].toLowerCase() != 'all')***REMOVED***
            theseDates.push(row);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
  return theseDates;
***REMOVED***

function getTitles(title,rows)***REMOVED***
  let tabs = new Array();
  rows.map((row) => ***REMOVED***
    if('title' in row.properties)***REMOVED***
      tabs.push(row.properties.title);
    ***REMOVED***
  ***REMOVED***);
  return ***REMOVED***'sheetTitle': title,'tabTitles': tabs***REMOVED***;
***REMOVED***

function checkForZeros(number)***REMOVED***
  return (number[0] == 0) ? number.slice(1) : number;
***REMOVED***

function getAllZips()***REMOVED***
  let arr = [];
  let files = fs.readdirSync(path.join(appSavePath, `/public/$***REMOVED***data.defaults.savedzips***REMOVED***/`));

  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      arr.push(file);
    ***REMOVED***
  ***REMOVED***);
  return arr;
***REMOVED***

function getAllZipsNames()***REMOVED***
  let arr = [];
  let files = fs.readdirSync(path.join(appSavePath, `/public/$***REMOVED***data.defaults.savedzips***REMOVED***/`));

  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      let nameOnly = file.split('.')
      arr.push(nameOnly[0]);
    ***REMOVED***
  ***REMOVED***);
  return arr;
***REMOVED***

function getThisZip(n)***REMOVED***
  let files = fs.readdirSync(path.join(appSavePath, `/public/$***REMOVED***data.defaults.savedzips***REMOVED***/`));
  let aname = '';
  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      let nameOnly = file.split('.')
      if(n.toLowerCase() == nameOnly[0].toLowerCase())***REMOVED***
        aname = [nameOnly[0]];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);

  return aname;
***REMOVED***

function getAllCsvNames()***REMOVED***
  let arr = [];
  let files = fs.readdirSync(path.join(appSavePath, `/public/$***REMOVED***data.defaults.storecsvs***REMOVED***/`));

  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      let nameOnly = file.split('.')
      arr.push(nameOnly[0]);
    ***REMOVED***
  ***REMOVED***);
  return arr;
***REMOVED***

function getAllCsvs()***REMOVED***
  let arr = [];
  let files = fs.readdirSync(path.join(appSavePath, `/public/$***REMOVED***data.defaults.storecsvs***REMOVED***/`));

  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      arr.push(file);
    ***REMOVED***
  ***REMOVED***);
  return arr;
***REMOVED***


function getThisCsv(n)***REMOVED***
  let files = fs.readdirSync(path.join(appSavePath, `/public/$***REMOVED***data.defaults.storecsvs***REMOVED***/`));
  let aname = '';
  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      let nameOnly = file.split('.')
      if(n.toLowerCase() == nameOnly[0].toLowerCase())***REMOVED***
        aname = [nameOnly[0]];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);

  return aname;
***REMOVED***

async function runCSVFunctions(name)***REMOVED***
  return await new Promise(function(resolve, reject) ***REMOVED***
    const AutoDetectDecoderStream = require('autodetect-decoder-stream');
    let allRows = [];
    let inputStream = fs.createReadStream(path.join(appSavePath, `/public/$***REMOVED***data.defaults.storecsvs***REMOVED***/$***REMOVED***name***REMOVED***.csv`))
    .pipe(new AutoDetectDecoderStream(***REMOVED*** defaultEncoding: 'utf8' ***REMOVED***)); // If failed to guess encoding, default to 1255

      inputStream
        .pipe(new CsvReadableStream(***REMOVED*** parseNumbers: true, parseBooleans: true, trim: true ***REMOVED***))
        .on('data', function (row) ***REMOVED***
            allRows.push(row);
        ***REMOVED***).on('end', function () ***REMOVED***
          resolve(allRows);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***

function returnEnvnJson()***REMOVED***
  const data = fs.readFileSync(path.join(appSavePath, `/enviornment.json`), ***REMOVED***encoding:'utf8'***REMOVED***);
  return JSON.parse(data);
***REMOVED***

// function getTrelloInfo(name)***REMOVED***
//   //return 'NodeJS File Upload Success!';
//   // return new Promise((resolve, reject) => ***REMOVED***
//   //   fs.readFileSync(`$***REMOVED***process.cwd()***REMOVED***/trello/$***REMOVED***name***REMOVED***.json`, 'utf8', (err, jsonString) => ***REMOVED***
//   //     if (err) ***REMOVED***
//   //       reject("Error reading file from disk:"+err);
//   //     ***REMOVED***
//   //     //res.send(req.params.id);
//   //     const obj = JSON.parse(jsonString);
//   //     //res.send(obj);
//   //     resolve('NodeJS File Upload Success!');
//   //   ***REMOVED***)
//   // ***REMOVED***)

//   const data = fs.readFileSync(path.join(appSavePath, `/public/trello/$***REMOVED***name***REMOVED***.json`), ***REMOVED***encoding:'utf8'***REMOVED***);
//   const parsed = JSON.parse(data);
//   let lists = [];

//   Object.entries(parsed.lists).forEach(([key, value]) => ***REMOVED***
//     let newObj = ***REMOVED***
//       id: value.id,
//       name: value.name,
//       cards: []
//     ***REMOVED***
//     lists.push(newObj);
//   ***REMOVED***)

//   Object.entries(parsed.cards).forEach(([key, value]) => ***REMOVED***
//     Object.entries(lists).forEach(([xkey, xvalue]) => ***REMOVED***
//       if(value.idList == xvalue.id)***REMOVED***
//         xvalue.cards.push(value.name);
//         if(value.desc != '')***REMOVED***
//           xvalue.cards.push(value.desc);
//         ***REMOVED***
//       ***REMOVED***
//     ***REMOVED***)
//   ***REMOVED***)

//   let allcards = '';

//   lists.forEach(list => ***REMOVED***
//     allcards += '<h3>'+list.name+'</h3>';
//     allcards += '<ul>';
//     list.cards.forEach(card => ***REMOVED***
//       if(card.charAt(0) == '-')***REMOVED***
//         allcards += '<ul style="list-style-type: none;">';
//         let diffRows = card.split('\n');
//         diffRows.forEach(row => ***REMOVED***
//           allcards += '<li>'+row+'</li>';
//         ***REMOVED***)
//         allcards += '</ul>';
//       ***REMOVED***else***REMOVED***
//         allcards += '<li>'+card+'</li>';
//       ***REMOVED***
//     ***REMOVED***)
//     allcards += '</ul>';
//   ***REMOVED***)

//   return allcards;
// ***REMOVED***


module.exports = ***REMOVED***
  getDates,
  getDedicateds,
  getContentAtDate,
  checkForZeros,
  getTitles,
  getAllZips,
  getAllZipsNames,
  getThisZip,
  getAllCsvNames,
  getAllCsvs,
  getThisCsv,
  runCSVFunctions,
  firstDate,
  returnEnvnJson,
  checkTokenLife,
  checkIfLoggedIn
***REMOVED***;
