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

const {app} = require('electron');
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

function add_default(params){
  return axios
    .get(`${envrmt.url}/refresh/${params.sheet}`)
    .then(res => {
      params.title = res.data.sheetTitle;
      file.defaults = params;
      fs.writeFile(file, JSON.stringify(file), function writeJSON(err) {
        if (err) return {'error': err};
      });
      return {'success': 'Defaults updated successfully'};
    })
    .catch(error => {
      return {'error':error};
    })
}

async function run_sheet(params){
  const fs = require('fs');
  const fileName = '/hptodata/db.json';
  const file = require(path.join(userDataPathHere,fileName));

  return axios
    .get(`${envrmt.url}/refresh/${params.sheet}`)
    .then(res => {
      if(res.data.error == undefined){
        params.title = res.data.sheetTitle;
        file.defaults = params;
        fs.writeFile(file, JSON.stringify(file), function writeJSON(err) {
          if (err) return {'error': err};
        });
        return file.defaults;
      }else{
        return res.data;
      }
    })
    .catch(error => {
      return {'error':error};
    })

}

async function add_sheet(params){
  file['googlesheets'].push(params);
  fs.writeFile(file, JSON.stringify(file), function writeJSON(err) {
    if (err) return {'error': err};
  });
  return {'success': 'New Sheet added successfully'};
}

async function delete_sheet(params){
  let shts = file['googlesheets'];
  for(let i = 0; i < shts.length; i++) {
    if(shts[i].id == params.id){
      shts.splice(i,1);
      break;
    }
  }
  file['googlesheets'] = shts;

  fs.writeFile(file, JSON.stringify(file), function writeJSON(err) {
    if (err) return {'error': err};
  });
  return {'success': 'Sheet deleted successfully'};
}

async function output_dedicated_file(data){
  let sendThis;
  let newURL = path.join(userDataPathHere, `/public/${file.defaults.outputfiles}/${data.name}`);
  return new Promise(function(resolve, reject) {
    fs.mkdir(newURL, { recursive: true }, (err) => {
      if (err) reject({'error': err});

      fs.writeFile(newURL+'/index.html', data.code, (err) => {
          if (err) reject({'error': err});

          sendThis = {'success': 'Dedicated Created'};
          resolve(sendThis);
      });
    });
  });
}

var fn = function collectDirItems(item){
  if(item.charAt(0) != '.'){
    return new Promise(resolve => item);
  }
};

async function sendToCropArea(data){
  var arr = [], toSend;
  let url = `/editable/${file.defaults.newimagesfolder}`;
  var files = fs.readdirSync(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/`));

  files.forEach(file => {
    if(file.charAt(0) != '.'){
      arr.push(`${url}/${file}`);
    }
  });

  if(arr.length > 0){
    toSend = arr;
  }else{
    toSend = {'error':'Please upload some images for the dayparts'}
  }

  return toSend;
}


function moveImage(oldImg,newImg){
  fs.unlink(oldImg, (err) => {
    if (err) {
      console.error(err)
      return {'error': err};
    }
  })
  fs.rename(oldImg, `newImg`, function (err) {
    if (err) throw err
  })
}

sharpEdit = (newCreate, data, extractInfo) => {
//  console.log(data);
//  console.log(extractInfo);
  return new Promise(function(resolve, reject) {
    sharp(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/${data.img}`))
      .resize(data.width, data.height,{fit: 'contain'})
      .extract(extractInfo)
      .jpeg({
        quality: 100,
        mozjpeg: true
      })
      .toFile(path.join(userDataPathHere, `/public/${file.defaults.tempfolder}/${newCreate}.jpg`), function(err) {
        if(err){
          reject({'error': err});
        }else{
          resolve(true);
        }
      })
  });
}

async function crop_image(data){

  let coverName = data.img.split('.')[0];
  let ext = data.img.split('.')[1];

  if(ext != 'jpeg' || ext != 'jpg'){
    fs.unlink(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/${data.img}`), err => {
      if (err) console.log(err);
    });
  }

  let base64Data = data.imgNew.split('base64,')[1];

  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/${coverName}.jpg`), base64Data, 'base64', function(err) {
      if(err == null){
        resolve({'id': data.replace, 'img': `${coverName}.jpg`});
      }else{
        reject({'error': err});
      }
    })
  })
}

async function moveCroppedFile(blob, newImg, oldImg){
  return new Promise((resolve, reject) => {
    fs.rename(path.join(userDataPathHere, `/public/${file.defaults.tempfolder}/${oldImg}`), path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/${newImgfile}`), function (err) {
      if (err){
        reject({'error': err});
      }else{
        resolve('image moved');
      }
    })
  })
}

async function scrape_images(data){
for (let i = 0; i < data.length; i++) {

    //console.log(data[i]);
    client.sharedItems.get(
      data[i],
      null,
      {fields: 'type,id,extension,created_by,shared_link,permissions'},
    ).then(file => {
      client.files.update(file.id, {
        shared_link: {
          access: client.accessLevels.OPEN,
          permissions: {
            can_download: true
          }
        }
      }).then(file => {
        //console.log(file.shared_link);
      })
      .catch(error => console.log('An error happened! files.update', error));
      // console.log(file);
      // let fs = require('fs');
      // client.files.getReadStream(file.id, null, function(error, stream) {
      //  if (error) {
      //     console.log('----------------------------error----------------------------');
      //     console.log(file.id);
      //     console.log(error.response.body);
      //     console.log('-------------------------------------------------------------');
      //    return {'error': error};
      //  }
      //  // write the file to disk
      //  let output = fs.createWriteStream(`${process.cwd()}/images/cover${i+1}.${file.extension}`);
      //  stream.pipe(output);
      // });
    })
    .catch(error => console.log('An error happened! sharedItems.get', error));

  }

  return {'success': 'Images Scraped'};
}

async function delete_items_from_directory(directory){
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err){
        console.log(err);
        reject(`There was an issue retrieving images from the directory ${directory}`);
      }
      if(Array.isArray(files)){
        for (const file of files) {
          if(fs.lstatSync(directory+'/'+file).isDirectory()){
            fs.rm(directory+'/'+file, {recursive: true}, err => {console.log(err)});
          }else{
            fs.unlink(path.join(directory, file), err => {
              if (err){
                console.log(err);
                reject(`There was an issue deleting the file ${file}`);
              }
            })
          }
        }
      }
      resolve(true);
    })
  })
}

async function delete_a_file_rm(file){
  return new Promise((resolve, reject) => {
    fs.rm(file, {recursive: true}, (err) => {
      if(err){
        console.log('delete issue file');
        console.log(err);
        reject(`There was an issue deleting the file ${file}`);
      }else{
        resolve(true);
      }
    });
  })
}

async function getListofFiles(directory){
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err){
        console.log('get file list issue');
        console.log(err);
        reject(`There was an issue retrieving files from the directory ${directory}`);
      }else{
        resolve(files);
      }
    })
  })
}

async function deleteEverythihng(directory, files){
  const promises = [];

  for(const file of files) {
    promises.push(delete_a_file_rm(path.join(directory, file)))
  }

  const filesDeleted = await Promise.all(promises);
}

async function delete_items_from_directory_rm(directory){
  const files = await getListofFiles(directory);
  await deleteEverythihng(directory, files);
}

async function reduce_images(data){
  //console.log('starting reduce_images');
  return await Promise.all([delete_items_from_directory(path.join(userDataPathHere, `/public/${file.defaults.imagesfolder}`))])
  .then(b => {
   // console.log('delete everything from image dir and get folder contents');
    return getFolderContents(file.defaults.newimagesfolder);
  })
  .then(res => {
    const reduceAndMove = res.map(async img => {
    if(img.charAt(0) != '.'){
      //console.log(img);
      await useSharp(img);
      //  return reducedImg;
      }
    })
   // console.log('reduce all the images in this folder');
    return Promise.all(reduceAndMove);
  })
  .then(d => {
    return {'success': 'Images Reduced'};
  }).catch((e) => {
       console.log("reduce_images "+e);
       return {'error': e};
   });
}

async function useSharp(img){
  return new Promise((resolve, reject) => {
    let fileName = img.split('.');
    return sharp(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/${img}`))
      .resize(250, 250)
      .jpeg({
        quality: 80,
        mozjpeg: true
      })
      .toFile(path.join(userDataPathHere, `/public/${file.defaults.imagesfolder}/${fileName[0]}.jpg`), function(err) {
        if(err){
          reject({'useSharp error': err});
        }else{
          resolve({'success': 'Images reduced'});
        }
    })
  });
}

function getFolderContents(folder){
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(userDataPathHere, `/public/${folder}/`), (error, files) => {
      if(error){
        return reject(error);
      }
      return resolve(files);
    });
  })
}


async function output_txt(data){
  let newURL = path.join(userDataPathHere, `/public/${file.defaults.textfolder}/${data.name}.txt`);
  let changeHere = data.textInfo;
  let nextChange = changeHere.replace(/&lt;/g, '<');
  let useThis = nextChange.replace(/&gt;/g, '>');
  let newDate = data.textName.split('-');

  let html = newDate[0]+'/'+newDate[1]+' dayparts';
  html += '\n\n';
  html += useThis;

  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(newURL, html);
      resolve(`${envrmt.url}/editable/${file.defaults.textfolder}/${data.textName}.txt`);
    }catch (err) {
      reject({'error': err});
    }
  })
}

async function gather_images(data){
  const env = envrmt; //JSON.parse(envrmt, {encoding:'utf8', flag:'r'});
  let linksOnly = data.links.split(',');
  let links = [];
  let num = 1;
  linksOnly.forEach(link => {
    let addOrder = {'num':num, 'url':link};
    links.push(addOrder);
    num++;
  })

  try{
    const checkToken = await checkifTokenIsLiveStill(env);
    const afterDeleteItmes = await delete_items_from_directory(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}`));
    const downloadedImages = await downloadAllSelectedImages(env.token, links);
    return {'success': downloadedImages};
  }catch(error){
    return {'error': error};
  }
}

function dateDiffInMinutes(date1InMilliseconds, date2InMilliseconds) {
  // Get the difference in milliseconds
  let diffInMilliseconds = Math.abs(date2InMilliseconds - date1InMilliseconds);

  // Convert milliseconds to minutes and return the result
  return diffInMilliseconds / (1000 * 60);
}

async function checkifTokenIsLiveStill(env){
  //console.log('checkifTokenIsLiveStill')
  const errMsg = 'Your token has expired';
  return new Promise((resolve, reject) => {
    if(env.token == undefined || env.expires == undefined || env.token_time == undefined){
      console.log(errMsg)
      reject(errMsg);
    }
    const tokenTime = env.token_time;
    const currentTime = new Date();
    const expireInMinutes = env.expires / 60;
    if(dateDiffInMinutes(tokenTime, currentTime) > expireInMinutes){
      console.log(errMsg)
      reject(errMsg);
    }

    if(dateDiffInMinutes(tokenTime, currentTime) < expireInMinutes){
      resolve(true);
    }
  })
}

async function downloadAllSelectedImages(token, links){
  const allTheImages = [];

  links.forEach(link => {
    allTheImages.push(downloadImage(token, link));
  })

  return Promise.all(allTheImages)
   .then((results) => {
       return results;
   })
   .catch((e) => {
       console.log("downloadAllSelectedImages Promise.all error "+e);
       return e;
   });

}

async function downloadImage(token, link){
  let client = BoxSDK.getBasicClient(token);
  return new Promise((resolve, reject) => {
    client.sharedItems.get(
      link.url,
      null,
      {fields: 'type,id,extension'},
    ).then(imgs => {
      client.files.getReadStream(imgs.id, null, function(error, stream) {
      	if (error) {
      		console.log("downloadImage "+error.statusCode);
          reject(`There was an issue downloading this image ${link.url}`);
          return;
      	}
      	var output = fs.createWriteStream(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/cover${link.num}.${imgs.extension}`));
      	stream.pipe(output);

        if(imgs.extension == 'tif' || imgs.extension == 'tiff'){
          reject(`Image cover${link.num} is a tiff. Please replace with a jpg or png.`);
        }else{
          resolve(`cover${link.num}.${imgs.extension}`);
        }
      }).catch(error => {
        console.log(`creating write stream error cover${link.num}.${imgs.extension}`);
        console.log('getReadStream error '+error.statusCode);
        reject('There was an issue retrieving image information');
      });
    }).catch(error => {
      console.log(`image finding issue cover${link.num}`);
     // console.log('getReadStream error '+error.statusCode);
      reject(`Image cover${link.num} is not found`);
    });
  })
}

async function hptoCreateOriginalFolder(data, newURL, it){
  return new Promise((resolve, reject) => {
    const folderAssoc = {
      'A' : '',
      'B' : '2',
      'C' : '3',
      'D' : '4',
      'E' : '5',
      'F' : '6',
      'G' : '7',
    }
    let end = (it == 0) ? folderAssoc[data.iterator] : `_${data.iterator}${it}`;
    fs.mkdir(newURL+end, { recursive: true }, (err) => {
      if(err){
        let sendThis = {'error': err};
        console.log(sendThis);
        reject(sendThis);
        return sendThis;
      }else{
       // console.log(`new folder: ${end}`);
        resolve(end);
      }
    })
  })
}

async function hptoAddIndex(data, curUrl, it){
  return new Promise((resolve, reject) => {
    fs.writeFile(curUrl+'/index.html', data.code, (err) => {
        if (err){
          let sendThis = {'error': err};
          console.log(sendThis);
          reject(sendThis);
          //return sendThis;
        }else{
          let sendThis = {'success': 'Index page created'};
          //console.log(sendThis);
          resolve(sendThis);
        }
    });
  })
}

async function hptoAddScript(data, curUrl, it){
return new Promise((resolve, reject) => {
  if(it > 0){
      fs.copyFile(path.resolve(__dirname,`../public/defaults/${it}/script.js`), `${curUrl}/script.js`, (err) => {
        if (err){
          let sendThis = {'error': err};
          console.log(sendThis);
          reject(sendThis);
        }else{
          //console.log(`${it} script.js was copied to destination`);
          resolve(true);
        }
      });
    }else{
      fs.copyFile(path.resolve(__dirname,`../public/defaults/script.js`), `${curUrl}/script.js`, (err) => {
        if (err){
          let sendThis = {'error': err};
          console.log(sendThis);
          reject(sendThis);
        }else{
          //console.log('default script.js was copied to destination');
          resolve(true);
        }
      });
    }
  })
}

async function hptoAddStyle(data, curUrl, it){
  return new Promise((resolve, reject) => {
    if(it > 0){
      fs.copyFile(path.resolve(__dirname,`../public/defaults/${it}/style.css`), `${curUrl}/style.css`, (err) => {
        if (err){
          let sendThis = {'error': err};
          console.log(sendThis);
          reject(sendThis);
          return sendThis;
        }else{
          //console.log(`${it} style.css was copied to destination`);
          resolve(true);
        }
      });
    }else{
      fs.copyFile(path.resolve(__dirname,`../public/defaults/style.css`), `${curUrl}/style.css`, (err) => {
        if (err){
          let sendThis = {'error': err};
          console.log(sendThis);
          reject(sendThis);
          return sendThis;
        }else{
          //console.log('default style.css was copied to destination');
          resolve(true);
        }
      });
    }
  })
}

async function hptoAddImages(data, curUrl, it){
  return new Promise((resolve, reject) => {
    ncp.limit = 25;

    // ncp(source, destination, callback)
    ncp(path.join(userDataPathHere, `/public/${file.defaults.imagesfolder}`), `${curUrl}/${file.defaults.imagesfolder}`,
      function (err) {
        if (err){
          let sendThis = {'error': err};
          console.log(sendThis);
          reject(sendThis);
          return sendThis;
        }else{
         // console.log('images folder copied recursively');
          resolve(true);
        }
    });
  })
}

async function hptoFillFolder(data, curUrl, it){
  return await Promise.all([hptoAddIndex(data, curUrl, it),hptoAddScript(data, curUrl, it),hptoAddStyle(data, curUrl, it),hptoAddImages(data, curUrl, it)]);
}

async function createHTPOfolder(data, it){
  let newURL = path.join(userDataPathHere, `/public/${file.defaults.outputfiles}/${data.name}`);
  //const chmodValue = '777';

  const end = await hptoCreateOriginalFolder(data, newURL, it);
  await hptoFillFolder(data,newURL+end,it);
}

async function build_hptos(data){
  const promises = [];

  for (let i = 0; i <= 5; i++) {
    promises.push(createHTPOfolder(data, i));
  }

  const filesBuilt = await Promise.all(promises);
}

async function output_code(data){
  try{
    const textURL = await output_txt(data);
    await delete_items_from_directory_rm(path.join(userDataPathHere, `/public/${file.defaults.outputfiles}`));
    await build_hptos(data);
    await checkForAllFiles(path.join(userDataPathHere, `/public/${file.defaults.outputfiles}/`));
    const dlURL = await create_zip_for_hptos(`${data.name}${data.iterator}`);
    return {'success': 'yes', 'dlURL': dlURL, 'textFile': textURL};
  }catch(error){
    console.log(error);
    return {'error': error};
  }
}

async function checkForAllFiles(folderName){
  return new Promise((resolve, reject) => {
    const fileList = fs.readdirSync(folderName);
    let goodTogo = '';
    for (let i = 0; i < fileList.length; i++){
      if (fileList[i] === ".DS_Store") {
        let spliced = fileList.splice(i, 1);
      }
    }
   // console.log(fileList);
    if(fileList.length == 6){
      fileList.forEach((folder) => {
        const folderList = fs.readdirSync(`${folderName}${folder}/`);
        //console.log(folderList);
        let missing = '';
        folderList.forEach((item) => {
          switch(item) {
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
          }
          if(missing != ''){
            const redoFiles = addfiles(missing,`${folderName}${folder}/`);
          }
        })
      })
      resolve(true);
    }else{
      reject('There is a folder missing');
    } // if(fileList.length == 6){
  }) // end promise
}

async function addFiles(fileName, toThisFolder){
  return new Promise((resolve, reject) => {
    ncp.limit = 25;
    // ncp(source, destination, callback)
    if(fileName == 'images'){
      ncp(path.join(userDataPathHere, `/public/${file.defaults.imagesfolder}`), toThisFolder,
        function (err) {
          if (err){
            reject(err);
            //sendThis = {'error': err};
            //return sendThis;
          }else{
            resolve('missing images folder copied recursively');
          }
        }
      )
    }
  })
}


async function update_images(){
  //processing on the front end, just need to return success bc thts wht the
  // function needs
  return {'success': 'do the thing'};
}

async function create_zip_for_hptos(data){
  return new Promise((resolve, reject) => {
    const zip = new AdmZip();
    const outputFile = path.join(userDataPathHere, `/public/${file.defaults.savedHPTOzips}/${data}.zip`);
    zip.addLocalFolder(path.join(userDataPathHere, `/public/${file.defaults.outputfiles}`));
    zip.writeZip(outputFile);
    resolve(`${envrmt.url}/editable/${file.defaults.savedHPTOzips}/${data}.zip`);
  })
}

async function create_zip(data){
  const zip = new AdmZip();
  const outputFile = path.join(userDataPathHere, `/public/${file.defaults.savedzips}/${data.name}.zip`);
  zip.addLocalFolder(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}`));
  zip.writeZip(outputFile);
  return {'success': `zip ${data.name}.zip created`};
}

async function open_zip(data){
  return await Promise.all([delete_items_from_directory(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}`)),delete_items_from_directory(path.join(userDataPathHere, `/public/${file.defaults.tempfolder}`))])
  .then(b => {
    return new Promise((resolve, reject) => {
      try {
        const zip = new AdmZip(path.join(userDataPathHere, `/public/${file.defaults.savedzips}/${data.name}.zip`));
        const outputDir = path.join(userDataPathHere, `/public/${file.defaults.tempfolder}`);
        zip.extractAllTo(outputDir);
        resolve({'success': 'images extracted!'});
      } catch (e) {
        reject({'error': `Something went wrong. ${e}`});
      }
    })
   })
  .then(c => {
    let files;
    return new Promise((resolve, reject) => {
      try {
        files = fs.readdirSync(path.join(userDataPathHere, `/public/${file.defaults.tempfolder}/${data.name}`));
        resolve(files);
      }catch (err) {
        reject({'error': err});
      }
    })
    .then(files => {
      let filesToReturn = [];
      return Promise.all([
        files.forEach(file => {
         if(file.charAt(0) != '.'){
           try {
             fsPromises.rename(path.join(userDataPathHere, `/public/${file.defaults.tempfolder}/${data.name}/${file}`), path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}/${file}`));
             return file;
           } catch (err) {
              return {'error': err};
           }
         }
       })
      ])
      .then(e => {
        return new Promise((resolve, reject) => {
          try {
            fsPromises.rmdir(path.join(userDataPathHere, `/public/${file.defaults.tempfolder}/${data.name}`));
            resolve({'success': 'run frontend function'});
          } catch (err) {
            reject({'error': err});
          }
        })
      })
      .then(f => {
        return new Promise((resolve, reject) => {
          try {
            files = fs.readdirSync(path.join(userDataPathHere, `/public/${file.defaults.newimagesfolder}`));
            resolve({'success': 'run frontend function', 'files': files});
          }catch (err) {
            reject({'error': err});
          }
        })
      })
    })
  })
}

async function delete_zip(data){
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(userDataPathHere, `/public/${file.defaults.savedzips}/${data.name}.zip`), err => {
      if (err){
        reject({'error': err});
        return;
      }
      resolve({'success': data.deleteid});
    });
  })
}

async function delete_csv(data){
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(userDataPathHere, `/public/${file.defaults.storecsvs}/${data.name}.csv`), err => {
      if (err){
        reject({'error': err});
        return;
      }
      resolve({'success': data.deleteid});
    });
  })
}


module.exports = {
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
};
