// MANIPULATE DATA AND OUTPUT TO FRONTEND

const axios = require('axios').default;
const fs = require('fs');
const http = require('http');
const fsPromises = require('fs').promises;
const path = require('path');
const FormData = require('form-data');
const sharp = require('sharp');
const ncp = require('ncp').ncp;
const AdmZip = require("adm-zip");
const formidable = require('formidable');
const BoxSDK = require('box-node-sdk');

const ***REMOVED***app***REMOVED*** = require('electron');
const userDataPathHereFirst = app.getPath('userData');
const userDataPathHere = path.join(userDataPathHereFirst, '/hptodata');

const fileName = '/hptodata/db.json';
const file = require(path.join(userDataPathHereFirst, '/hptodata/db.json'));
const config = require(path.join(userDataPathHereFirst, '/hptodata/config.json'));
const envrmt = require(path.join(userDataPathHereFirst, '/hptodata/enviornment.json'));
const keys = require(path.join(userDataPathHereFirst, '/hptodata/keys.json'));

//APP FUNCTIONS
let client;
//changing to push

function add_default(params)***REMOVED***
  return axios
    .get(`$***REMOVED***envrmt.url***REMOVED***/refresh/$***REMOVED***params.sheet***REMOVED***`)
    .then(res => ***REMOVED***
      params.title = res.data.sheetTitle;
      file.defaults = params;
      fs.writeFile(file, JSON.stringify(file), function writeJSON(err) ***REMOVED***
        if (err) return ***REMOVED***'error': err***REMOVED***;
      ***REMOVED***);
      return ***REMOVED***'success': 'Defaults updated successfully'***REMOVED***;
    ***REMOVED***)
    .catch(error => ***REMOVED***
      return ***REMOVED***'error':error***REMOVED***;
    ***REMOVED***)
***REMOVED***

async function run_sheet(params)***REMOVED***
  const fs = require('fs');
  const fileName = '/hptodata/db.json';
  const file = require(path.join(userDataPathHere,fileName));

  return axios
    .get(`$***REMOVED***envrmt.url***REMOVED***/refresh/$***REMOVED***params.sheet***REMOVED***`)
    .then(res => ***REMOVED***
      if(res.data.error == undefined)***REMOVED***
        params.title = res.data.sheetTitle;
        file.defaults = params;
        fs.writeFile(file, JSON.stringify(file), function writeJSON(err) ***REMOVED***
          if (err) return ***REMOVED***'error': err***REMOVED***;
        ***REMOVED***);
        return file.defaults;
      ***REMOVED***else***REMOVED***
        return res.data;
      ***REMOVED***
    ***REMOVED***)
    .catch(error => ***REMOVED***
      return ***REMOVED***'error':error***REMOVED***;
    ***REMOVED***)

***REMOVED***

async function add_sheet(params)***REMOVED***
  file['googlesheets'].push(params);
  fs.writeFile(file, JSON.stringify(file), function writeJSON(err) ***REMOVED***
    if (err) return ***REMOVED***'error': err***REMOVED***;
  ***REMOVED***);
  return ***REMOVED***'success': 'New Sheet added successfully'***REMOVED***;
***REMOVED***

async function delete_sheet(params)***REMOVED***
  let shts = file['googlesheets'];
  for(let i = 0; i < shts.length; i++) ***REMOVED***
    if(shts[i].id == params.id)***REMOVED***
      shts.splice(i,1);
      break;
    ***REMOVED***
  ***REMOVED***
  file['googlesheets'] = shts;

  fs.writeFile(file, JSON.stringify(file), function writeJSON(err) ***REMOVED***
    if (err) return ***REMOVED***'error': err***REMOVED***;
  ***REMOVED***);
  return ***REMOVED***'success': 'Sheet deleted successfully'***REMOVED***;
***REMOVED***

async function output_dedicated_file(data)***REMOVED***
  let sendThis;
  let newURL = path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.outputfiles***REMOVED***/$***REMOVED***data.name***REMOVED***`);
  return new Promise(function(resolve, reject) ***REMOVED***
    fs.mkdir(newURL, ***REMOVED*** recursive: true ***REMOVED***, (err) => ***REMOVED***
      if (err) reject(***REMOVED***'error': err***REMOVED***);

      fs.writeFile(newURL+'/index.html', data.code, (err) => ***REMOVED***
          if (err) reject(***REMOVED***'error': err***REMOVED***);

          sendThis = ***REMOVED***'success': 'Dedicated Created'***REMOVED***;
          resolve(sendThis);
      ***REMOVED***);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

var fn = function collectDirItems(item)***REMOVED***
  if(item.charAt(0) != '.')***REMOVED***
    return new Promise(resolve => item);
  ***REMOVED***
***REMOVED***;

async function sendToCropArea(data)***REMOVED***
  var arr = [], toSend;
  let url = `/editable/$***REMOVED***file.defaults.newimagesfolder***REMOVED***`;
  var files = fs.readdirSync(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/`));

  files.forEach(file => ***REMOVED***
    if(file.charAt(0) != '.')***REMOVED***
      arr.push(`$***REMOVED***url***REMOVED***/$***REMOVED***file***REMOVED***`);
    ***REMOVED***
  ***REMOVED***);

  if(arr.length > 0)***REMOVED***
    toSend = arr;
  ***REMOVED***else***REMOVED***
    toSend = ***REMOVED***'error':'Please upload some images for the dayparts'***REMOVED***
  ***REMOVED***

  return toSend;
***REMOVED***


function moveImage(oldImg,newImg)***REMOVED***
  fs.unlink(oldImg, (err) => ***REMOVED***
    if (err) ***REMOVED***
      console.error(err)
      return ***REMOVED***'error': err***REMOVED***;
    ***REMOVED***
  ***REMOVED***)
  fs.rename(oldImg, `newImg`, function (err) ***REMOVED***
    if (err) throw err
  ***REMOVED***)
***REMOVED***

sharpEdit = (newCreate, data, extractInfo) => ***REMOVED***
//  console.log(data);
//  console.log(extractInfo);
  return new Promise(function(resolve, reject) ***REMOVED***
    sharp(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/$***REMOVED***data.img***REMOVED***`))
      .resize(data.width, data.height,***REMOVED***fit: 'contain'***REMOVED***)
      .extract(extractInfo)
      .jpeg(***REMOVED***
        quality: 100,
        mozjpeg: true
      ***REMOVED***)
      .toFile(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***/$***REMOVED***newCreate***REMOVED***.jpg`), function(err) ***REMOVED***
        if(err)***REMOVED***
          reject(***REMOVED***'error': err***REMOVED***);
        ***REMOVED***else***REMOVED***
          resolve(true);
        ***REMOVED***
      ***REMOVED***)
  ***REMOVED***);
***REMOVED***

async function crop_image(data)***REMOVED***

  let coverName = data.img.split('.')[0];
  let ext = data.img.split('.')[1];

  if(ext != 'jpeg' || ext != 'jpg')***REMOVED***
    fs.unlink(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/$***REMOVED***data.img***REMOVED***`), err => ***REMOVED***
      if (err) console.log(err);
    ***REMOVED***);
  ***REMOVED***

  let base64Data = data.imgNew.split('base64,')[1];

  return new Promise((resolve, reject) => ***REMOVED***
    fs.writeFile(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/$***REMOVED***coverName***REMOVED***.jpg`), base64Data, 'base64', function(err) ***REMOVED***
      if(err == null)***REMOVED***
        resolve(***REMOVED***'id': data.replace, 'img': `$***REMOVED***coverName***REMOVED***.jpg`***REMOVED***);
      ***REMOVED***else***REMOVED***
        reject(***REMOVED***'error': err***REMOVED***);
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

async function moveCroppedFile(blob, newImg, oldImg)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.rename(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***/$***REMOVED***oldImg***REMOVED***`), path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/$***REMOVED***newImgfile***REMOVED***`), function (err) ***REMOVED***
      if (err)***REMOVED***
        reject(***REMOVED***'error': err***REMOVED***);
      ***REMOVED***else***REMOVED***
        resolve('image moved');
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

async function scrape_images(data)***REMOVED***
for (let i = 0; i < data.length; i++) ***REMOVED***

    //console.log(data[i]);
    client.sharedItems.get(
      data[i],
      null,
      ***REMOVED***fields: 'type,id,extension,created_by,shared_link,permissions'***REMOVED***,
    ).then(file => ***REMOVED***
      client.files.update(file.id, ***REMOVED***
        shared_link: ***REMOVED***
          access: client.accessLevels.OPEN,
          permissions: ***REMOVED***
            can_download: true
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***).then(file => ***REMOVED***
        //console.log(file.shared_link);
      ***REMOVED***)
      .catch(error => console.log('An error happened! files.update', error));
      // console.log(file);
      // let fs = require('fs');
      // client.files.getReadStream(file.id, null, function(error, stream) ***REMOVED***
      //  if (error) ***REMOVED***
      //     console.log('----------------------------error----------------------------');
      //     console.log(file.id);
      //     console.log(error.response.body);
      //     console.log('-------------------------------------------------------------');
      //    return ***REMOVED***'error': error***REMOVED***;
      //  ***REMOVED***
      //  // write the file to disk
      //  let output = fs.createWriteStream(`$***REMOVED***process.cwd()***REMOVED***/images/cover$***REMOVED***i+1***REMOVED***.$***REMOVED***file.extension***REMOVED***`);
      //  stream.pipe(output);
      // ***REMOVED***);
    ***REMOVED***)
    .catch(error => console.log('An error happened! sharedItems.get', error));

  ***REMOVED***

  return ***REMOVED***'success': 'Images Scraped'***REMOVED***;
***REMOVED***

async function delete_items_from_directory(directory)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.readdir(directory, (err, files) => ***REMOVED***
      if (err)***REMOVED***
        console.log(err);
        reject(`There was an issue retrieving images from the directory $***REMOVED***directory***REMOVED***`);
      ***REMOVED***
      if(Array.isArray(files))***REMOVED***
        for (const file of files) ***REMOVED***
          if(fs.lstatSync(directory+'/'+file).isDirectory())***REMOVED***
            fs.rm(directory+'/'+file, ***REMOVED***recursive: true***REMOVED***, err => ***REMOVED***console.log(err)***REMOVED***);
          ***REMOVED***else***REMOVED***
            fs.unlink(path.join(directory, file), err => ***REMOVED***
              if (err)***REMOVED***
                console.log(err);
                reject(`There was an issue deleting the file $***REMOVED***file***REMOVED***`);
              ***REMOVED***
            ***REMOVED***)
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
      resolve(true);
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

async function delete_a_file_rm(file)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.rm(file, ***REMOVED***recursive: true***REMOVED***, (err) => ***REMOVED***
      if(err)***REMOVED***
        console.log('delete issue file');
        console.log(err);
        reject(`There was an issue deleting the file $***REMOVED***file***REMOVED***`);
      ***REMOVED***else***REMOVED***
        resolve(true);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***

async function getListofFiles(directory)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.readdir(directory, (err, files) => ***REMOVED***
      if (err)***REMOVED***
        console.log('get file list issue');
        console.log(err);
        reject(`There was an issue retrieving files from the directory $***REMOVED***directory***REMOVED***`);
      ***REMOVED***else***REMOVED***
        resolve(files);
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

async function deleteEverythihng(directory, files)***REMOVED***
  const promises = [];

  for(const file of files) ***REMOVED***
    promises.push(delete_a_file_rm(path.join(directory, file)))
  ***REMOVED***

  const filesDeleted = await Promise.all(promises);
***REMOVED***

async function delete_items_from_directory_rm(directory)***REMOVED***
  const files = await getListofFiles(directory);
  await deleteEverythihng(directory, files);
***REMOVED***

async function reduce_images(data)***REMOVED***
  //console.log('starting reduce_images');
  return await Promise.all([delete_items_from_directory(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.imagesfolder***REMOVED***`))])
  .then(b => ***REMOVED***
   // console.log('delete everything from image dir and get folder contents');
    return getFolderContents(file.defaults.newimagesfolder);
  ***REMOVED***)
  .then(res => ***REMOVED***
    const reduceAndMove = res.map(async img => ***REMOVED***
    if(img.charAt(0) != '.')***REMOVED***
      //console.log(img);
      await useSharp(img);
      //  return reducedImg;
      ***REMOVED***
    ***REMOVED***)
   // console.log('reduce all the images in this folder');
    return Promise.all(reduceAndMove);
  ***REMOVED***)
  .then(d => ***REMOVED***
    return ***REMOVED***'success': 'Images Reduced'***REMOVED***;
  ***REMOVED***).catch((e) => ***REMOVED***
       console.log("reduce_images "+e);
       return ***REMOVED***'error': e***REMOVED***;
   ***REMOVED***);
***REMOVED***

async function useSharp(img)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    let fileName = img.split('.');
    return sharp(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/$***REMOVED***img***REMOVED***`))
      .resize(250, 250)
      .jpeg(***REMOVED***
        quality: 80,
        mozjpeg: true
      ***REMOVED***)
      .toFile(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.imagesfolder***REMOVED***/$***REMOVED***fileName[0]***REMOVED***.jpg`), function(err) ***REMOVED***
        if(err)***REMOVED***
          reject(***REMOVED***'useSharp error': err***REMOVED***);
        ***REMOVED***else***REMOVED***
          resolve(***REMOVED***'success': 'Images reduced'***REMOVED***);
        ***REMOVED***
    ***REMOVED***)
  ***REMOVED***);
***REMOVED***

function getFolderContents(folder)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.readdir(path.join(userDataPathHere, `/public/$***REMOVED***folder***REMOVED***/`), (error, files) => ***REMOVED***
      if(error)***REMOVED***
        return reject(error);
      ***REMOVED***
      return resolve(files);
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***


async function output_txt(data)***REMOVED***
  let newURL = path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.textfolder***REMOVED***/$***REMOVED***data.name***REMOVED***.txt`);
  let changeHere = data.textInfo;
  let nextChange = changeHere.replace(/&lt;/g, '<');
  let useThis = nextChange.replace(/&gt;/g, '>');
  let newDate = data.textName.split('-');

  let html = newDate[0]+'/'+newDate[1]+' dayparts';
  html += '\n\n';
  html += useThis;

  return new Promise((resolve, reject) => ***REMOVED***
    try ***REMOVED***
      fs.writeFileSync(newURL, html);
      resolve(`$***REMOVED***envrmt.url***REMOVED***/editable/$***REMOVED***file.defaults.textfolder***REMOVED***/$***REMOVED***data.textName***REMOVED***.txt`);
    ***REMOVED***catch (err) ***REMOVED***
      reject(***REMOVED***'error': err***REMOVED***);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

async function gather_images(data)***REMOVED***
  const env = envrmt; //JSON.parse(envrmt, ***REMOVED***encoding:'utf8', flag:'r'***REMOVED***);
  let linksOnly = data.links.split(',');
  let links = [];
  let num = 1;
  linksOnly.forEach(link => ***REMOVED***
    let addOrder = ***REMOVED***'num':num, 'url':link***REMOVED***;
    links.push(addOrder);
    num++;
  ***REMOVED***)

  try***REMOVED***
    const checkToken = await checkifTokenIsLiveStill(env);
    const afterDeleteItmes = await delete_items_from_directory(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***`));
    const downloadedImages = await downloadAllSelectedImages(env.token, links);
    return ***REMOVED***'success': downloadedImages***REMOVED***;
  ***REMOVED***catch(error)***REMOVED***
    return ***REMOVED***'error': error***REMOVED***;
  ***REMOVED***
***REMOVED***

function dateDiffInMinutes(date1InMilliseconds, date2InMilliseconds) ***REMOVED***
  // Get the difference in milliseconds
  let diffInMilliseconds = Math.abs(date2InMilliseconds - date1InMilliseconds);

  // Convert milliseconds to minutes and return the result
  return diffInMilliseconds / (1000 * 60);
***REMOVED***

async function checkifTokenIsLiveStill(env)***REMOVED***
  //console.log('checkifTokenIsLiveStill')
  const errMsg = 'Your token has expired';
  return new Promise((resolve, reject) => ***REMOVED***
    if(env.token == undefined || env.expires == undefined || env.token_time == undefined)***REMOVED***
      console.log(errMsg)
      reject(errMsg);
    ***REMOVED***
    const tokenTime = env.token_time;
    const currentTime = new Date();
    const expireInMinutes = env.expires / 60;
    if(dateDiffInMinutes(tokenTime, currentTime) > expireInMinutes)***REMOVED***
      console.log(errMsg)
      reject(errMsg);
    ***REMOVED***

    if(dateDiffInMinutes(tokenTime, currentTime) < expireInMinutes)***REMOVED***
      resolve(true);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

async function downloadAllSelectedImages(token, links)***REMOVED***
  const allTheImages = [];

  links.forEach(link => ***REMOVED***
    allTheImages.push(downloadImage(token, link));
  ***REMOVED***)

  return Promise.all(allTheImages)
   .then((results) => ***REMOVED***
       return results;
   ***REMOVED***)
   .catch((e) => ***REMOVED***
       console.log("downloadAllSelectedImages Promise.all error "+e);
       return e;
   ***REMOVED***);

***REMOVED***

async function downloadImage(token, link)***REMOVED***
  let client = BoxSDK.getBasicClient(token);
  return new Promise((resolve, reject) => ***REMOVED***
    client.sharedItems.get(
      link.url,
      null,
      ***REMOVED***fields: 'type,id,extension'***REMOVED***,
    ).then(imgs => ***REMOVED***
      client.files.getReadStream(imgs.id, null, function(error, stream) ***REMOVED***
      	if (error) ***REMOVED***
      		console.log("downloadImage "+error.statusCode);
          reject(`There was an issue downloading this image $***REMOVED***link.url***REMOVED***`);
          return;
      	***REMOVED***
      	var output = fs.createWriteStream(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/cover$***REMOVED***link.num***REMOVED***.$***REMOVED***imgs.extension***REMOVED***`));
      	stream.pipe(output);

        if(imgs.extension == 'tif' || imgs.extension == 'tiff')***REMOVED***
          reject(`Image cover$***REMOVED***link.num***REMOVED*** is a tiff. Please replace with a jpg or png.`);
        ***REMOVED***else***REMOVED***
          resolve(`cover$***REMOVED***link.num***REMOVED***.$***REMOVED***imgs.extension***REMOVED***`);
        ***REMOVED***
      ***REMOVED***).catch(error => ***REMOVED***
        console.log(`creating write stream error cover$***REMOVED***link.num***REMOVED***.$***REMOVED***imgs.extension***REMOVED***`);
        console.log('getReadStream error '+error.statusCode);
        reject('There was an issue retrieving image information');
      ***REMOVED***);
    ***REMOVED***).catch(error => ***REMOVED***
      console.log(`image finding issue cover$***REMOVED***link.num***REMOVED***`);
     // console.log('getReadStream error '+error.statusCode);
      reject(`Image cover$***REMOVED***link.num***REMOVED*** is not found`);
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***

async function hptoCreateOriginalFolder(data, newURL, it)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    const folderAssoc = ***REMOVED***
      'A' : '',
      'B' : '2',
      'C' : '3',
      'D' : '4',
      'E' : '5',
      'F' : '6',
      'G' : '7',
    ***REMOVED***
    let end = (it == 0) ? folderAssoc[data.iterator] : `_$***REMOVED***data.iterator***REMOVED***$***REMOVED***it***REMOVED***`;
    fs.mkdir(newURL+end, ***REMOVED*** recursive: true ***REMOVED***, (err) => ***REMOVED***
      if(err)***REMOVED***
        let sendThis = ***REMOVED***'error': err***REMOVED***;
        console.log(sendThis);
        reject(sendThis);
        return sendThis;
      ***REMOVED***else***REMOVED***
       // console.log(`new folder: $***REMOVED***end***REMOVED***`);
        resolve(end);
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

async function hptoAddIndex(data, curUrl, it)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.writeFile(curUrl+'/index.html', data.code, (err) => ***REMOVED***
        if (err)***REMOVED***
          let sendThis = ***REMOVED***'error': err***REMOVED***;
          console.log(sendThis);
          reject(sendThis);
          //return sendThis;
        ***REMOVED***else***REMOVED***
          let sendThis = ***REMOVED***'success': 'Index page created'***REMOVED***;
          //console.log(sendThis);
          resolve(sendThis);
        ***REMOVED***
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***

async function hptoAddScript(data, curUrl, it)***REMOVED***
return new Promise((resolve, reject) => ***REMOVED***
  if(it > 0)***REMOVED***
      fs.copyFile(path.resolve(__dirname,`../public/defaults/$***REMOVED***it***REMOVED***/script.js`), `$***REMOVED***curUrl***REMOVED***/script.js`, (err) => ***REMOVED***
        if (err)***REMOVED***
          let sendThis = ***REMOVED***'error': err***REMOVED***;
          console.log(sendThis);
          reject(sendThis);
        ***REMOVED***else***REMOVED***
          //console.log(`$***REMOVED***it***REMOVED*** script.js was copied to destination`);
          resolve(true);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***else***REMOVED***
      fs.copyFile(path.resolve(__dirname,`../public/defaults/script.js`), `$***REMOVED***curUrl***REMOVED***/script.js`, (err) => ***REMOVED***
        if (err)***REMOVED***
          let sendThis = ***REMOVED***'error': err***REMOVED***;
          console.log(sendThis);
          reject(sendThis);
        ***REMOVED***else***REMOVED***
          //console.log('default script.js was copied to destination');
          resolve(true);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

async function hptoAddStyle(data, curUrl, it)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    if(it > 0)***REMOVED***
      fs.copyFile(path.resolve(__dirname,`../public/defaults/$***REMOVED***it***REMOVED***/style.css`), `$***REMOVED***curUrl***REMOVED***/style.css`, (err) => ***REMOVED***
        if (err)***REMOVED***
          let sendThis = ***REMOVED***'error': err***REMOVED***;
          console.log(sendThis);
          reject(sendThis);
          return sendThis;
        ***REMOVED***else***REMOVED***
          //console.log(`$***REMOVED***it***REMOVED*** style.css was copied to destination`);
          resolve(true);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***else***REMOVED***
      fs.copyFile(path.resolve(__dirname,`../public/defaults/style.css`), `$***REMOVED***curUrl***REMOVED***/style.css`, (err) => ***REMOVED***
        if (err)***REMOVED***
          let sendThis = ***REMOVED***'error': err***REMOVED***;
          console.log(sendThis);
          reject(sendThis);
          return sendThis;
        ***REMOVED***else***REMOVED***
          //console.log('default style.css was copied to destination');
          resolve(true);
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

async function hptoAddImages(data, curUrl, it)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    ncp.limit = 25;

    // ncp(source, destination, callback)
    ncp(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.imagesfolder***REMOVED***`), `$***REMOVED***curUrl***REMOVED***/$***REMOVED***file.defaults.imagesfolder***REMOVED***`,
      function (err) ***REMOVED***
        if (err)***REMOVED***
          let sendThis = ***REMOVED***'error': err***REMOVED***;
          console.log(sendThis);
          reject(sendThis);
          return sendThis;
        ***REMOVED***else***REMOVED***
         // console.log('images folder copied recursively');
          resolve(true);
        ***REMOVED***
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***

async function hptoFillFolder(data, curUrl, it)***REMOVED***
  return await Promise.all([hptoAddIndex(data, curUrl, it),hptoAddScript(data, curUrl, it),hptoAddStyle(data, curUrl, it),hptoAddImages(data, curUrl, it)]);
***REMOVED***

async function createHTPOfolder(data, it)***REMOVED***
  let newURL = path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.outputfiles***REMOVED***/$***REMOVED***data.name***REMOVED***`);
  //const chmodValue = '777';

  const end = await hptoCreateOriginalFolder(data, newURL, it);
  await hptoFillFolder(data,newURL+end,it);
***REMOVED***

async function build_hptos(data)***REMOVED***
  const promises = [];

  for (let i = 0; i <= 5; i++) ***REMOVED***
    promises.push(createHTPOfolder(data, i));
  ***REMOVED***

  const filesBuilt = await Promise.all(promises);
***REMOVED***

async function output_code(data)***REMOVED***
  try***REMOVED***
    const textURL = await output_txt(data);
    await delete_items_from_directory_rm(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.outputfiles***REMOVED***`));
    await build_hptos(data);
    await checkForAllFiles(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.outputfiles***REMOVED***/`));
    const dlURL = await create_zip_for_hptos(`$***REMOVED***data.name***REMOVED***$***REMOVED***data.iterator***REMOVED***`);
    return ***REMOVED***'success': 'yes', 'dlURL': dlURL, 'textFile': textURL***REMOVED***;
  ***REMOVED***catch(error)***REMOVED***
    console.log(error);
    return ***REMOVED***'error': error***REMOVED***;
  ***REMOVED***
***REMOVED***

async function checkForAllFiles(folderName)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    const fileList = fs.readdirSync(folderName);
    let goodTogo = '';
    for (let i = 0; i < fileList.length; i++)***REMOVED***
      if (fileList[i] === ".DS_Store") ***REMOVED***
        let spliced = fileList.splice(i, 1);
      ***REMOVED***
    ***REMOVED***
   // console.log(fileList);
    if(fileList.length == 6)***REMOVED***
      fileList.forEach((folder) => ***REMOVED***
        const folderList = fs.readdirSync(`$***REMOVED***folderName***REMOVED***$***REMOVED***folder***REMOVED***/`);
        //console.log(folderList);
        let missing = '';
        folderList.forEach((item) => ***REMOVED***
          switch(item) ***REMOVED***
            case 'images':
              break;
            case 'index.html':
              break;
            case 'script.js':
              break;
            case 'style.css':
              break;
            default:
              missing = item;
          ***REMOVED***
          if(missing != '')***REMOVED***
            const redoFiles = addfiles(missing,`$***REMOVED***folderName***REMOVED***$***REMOVED***folder***REMOVED***/`);
          ***REMOVED***
        ***REMOVED***)
      ***REMOVED***)
      resolve(true);
    ***REMOVED***else***REMOVED***
      reject('There is a folder missing');
    ***REMOVED*** // if(fileList.length == 6)***REMOVED***
  ***REMOVED***) // end promise
***REMOVED***

async function addFiles(fileName, toThisFolder)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    ncp.limit = 25;
    // ncp(source, destination, callback)
    if(fileName == 'images')***REMOVED***
      ncp(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.imagesfolder***REMOVED***`), toThisFolder,
        function (err) ***REMOVED***
          if (err)***REMOVED***
            reject(err);
            //sendThis = ***REMOVED***'error': err***REMOVED***;
            //return sendThis;
          ***REMOVED***else***REMOVED***
            resolve('missing images folder copied recursively');
          ***REMOVED***
        ***REMOVED***
      )
    ***REMOVED***
  ***REMOVED***)
***REMOVED***


async function update_images()***REMOVED***
  //processing on the front end, just need to return success bc thts wht the
  // function needs
  return ***REMOVED***'success': 'do the thing'***REMOVED***;
***REMOVED***

async function create_zip_for_hptos(data)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    const zip = new AdmZip();
    const outputFile = path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.savedHPTOzips***REMOVED***/$***REMOVED***data***REMOVED***.zip`);
    zip.addLocalFolder(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.outputfiles***REMOVED***`));
    zip.writeZip(outputFile);
    resolve(`$***REMOVED***envrmt.url***REMOVED***/editable/$***REMOVED***file.defaults.savedHPTOzips***REMOVED***/$***REMOVED***data***REMOVED***.zip`);
  ***REMOVED***)
***REMOVED***

async function create_zip(data)***REMOVED***
  const zip = new AdmZip();
  const outputFile = path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.savedzips***REMOVED***/$***REMOVED***data.name***REMOVED***.zip`);
  zip.addLocalFolder(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***`));
  zip.writeZip(outputFile);
  return ***REMOVED***'success': `zip $***REMOVED***data.name***REMOVED***.zip created`***REMOVED***;
***REMOVED***

async function open_zip(data)***REMOVED***
  return await Promise.all([delete_items_from_directory(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***`)),delete_items_from_directory(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***`))])
  .then(b => ***REMOVED***
    return new Promise((resolve, reject) => ***REMOVED***
      try ***REMOVED***
        const zip = new AdmZip(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.savedzips***REMOVED***/$***REMOVED***data.name***REMOVED***.zip`));
        const outputDir = path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***`);
        zip.extractAllTo(outputDir);
        resolve(***REMOVED***'success': 'images extracted!'***REMOVED***);
      ***REMOVED*** catch (e) ***REMOVED***
        reject(***REMOVED***'error': `Something went wrong. $***REMOVED***e***REMOVED***`***REMOVED***);
      ***REMOVED***
    ***REMOVED***)
   ***REMOVED***)
  .then(c => ***REMOVED***
    let files;
    return new Promise((resolve, reject) => ***REMOVED***
      try ***REMOVED***
        files = fs.readdirSync(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***/$***REMOVED***data.name***REMOVED***`));
        resolve(files);
      ***REMOVED***catch (err) ***REMOVED***
        reject(***REMOVED***'error': err***REMOVED***);
      ***REMOVED***
    ***REMOVED***)
    .then(files => ***REMOVED***
      let filesToReturn = [];
      return Promise.all([
        files.forEach(file => ***REMOVED***
         if(file.charAt(0) != '.')***REMOVED***
           try ***REMOVED***
             fsPromises.rename(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***/$***REMOVED***data.name***REMOVED***/$***REMOVED***file***REMOVED***`), path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***/$***REMOVED***file***REMOVED***`));
             return file;
           ***REMOVED*** catch (err) ***REMOVED***
              return ***REMOVED***'error': err***REMOVED***;
           ***REMOVED***
         ***REMOVED***
       ***REMOVED***)
      ])
      .then(e => ***REMOVED***
        return new Promise((resolve, reject) => ***REMOVED***
          try ***REMOVED***
            fsPromises.rmdir(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.tempfolder***REMOVED***/$***REMOVED***data.name***REMOVED***`));
            resolve(***REMOVED***'success': 'run frontend function'***REMOVED***);
          ***REMOVED*** catch (err) ***REMOVED***
            reject(***REMOVED***'error': err***REMOVED***);
          ***REMOVED***
        ***REMOVED***)
      ***REMOVED***)
      .then(f => ***REMOVED***
        return new Promise((resolve, reject) => ***REMOVED***
          try ***REMOVED***
            files = fs.readdirSync(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.newimagesfolder***REMOVED***`));
            resolve(***REMOVED***'success': 'run frontend function', 'files': files***REMOVED***);
          ***REMOVED***catch (err) ***REMOVED***
            reject(***REMOVED***'error': err***REMOVED***);
          ***REMOVED***
        ***REMOVED***)
      ***REMOVED***)
    ***REMOVED***)
  ***REMOVED***)
***REMOVED***

async function delete_zip(data)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.unlink(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.savedzips***REMOVED***/$***REMOVED***data.name***REMOVED***.zip`), err => ***REMOVED***
      if (err)***REMOVED***
        reject(***REMOVED***'error': err***REMOVED***);
        return;
      ***REMOVED***
      resolve(***REMOVED***'success': data.deleteid***REMOVED***);
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***

async function delete_csv(data)***REMOVED***
  return new Promise((resolve, reject) => ***REMOVED***
    fs.unlink(path.join(userDataPathHere, `/public/$***REMOVED***file.defaults.storecsvs***REMOVED***/$***REMOVED***data.name***REMOVED***.csv`), err => ***REMOVED***
      if (err)***REMOVED***
        reject(***REMOVED***'error': err***REMOVED***);
        return;
      ***REMOVED***
      resolve(***REMOVED***'success': data.deleteid***REMOVED***);
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***


module.exports = ***REMOVED***
  add_default,
  add_sheet,
  run_sheet,
  delete_sheet,
  output_dedicated_file,
  scrape_images,
  output_code,
  reduce_images,
  sendToCropArea,
  crop_image,
  update_images,
  create_zip,
  open_zip,
  delete_zip,
  delete_csv,
  gather_images
***REMOVED***;
