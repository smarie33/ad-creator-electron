//FRONT END FUNCTIONS, RECIEVE DATA FROM functions.js

//CONSTANTS
const DEDICATEDS = [1,2,3,10];
const DAYPARTS = [3,5,8,9,10,11];
const DAYPARTCOLORS = ['gray','yellow','green','blue','purple'];

//GLOBALS
let isCSV = false;
let currentCSV = '';
let theCroppening;
let curCrop;
let enviornment = ***REMOVED******REMOVED***;
let dbinfo = ***REMOVED******REMOVED***;

// UTILITIES
  customAjax = (url, method, data) => ***REMOVED***
  return new Promise(function(resolve, reject) ***REMOVED***
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.onreadystatechange = function() ***REMOVED***
      if (request.readyState === XMLHttpRequest.DONE) ***REMOVED***
        if (request.status === 200) ***REMOVED***
          resolve(request.response);
        ***REMOVED*** else ***REMOVED***
          reject(Error(request.status));
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***;
    request.onerror = function() ***REMOVED***
      reject(Error("Network Error"));
    ***REMOVED***;
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(data));
  ***REMOVED***);
***REMOVED***

function getEnviornment()***REMOVED***
  customAjax("/enviornment/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      enviornment = results;
      //console.log(enviornment);
      checkBoxLogin();
    ***REMOVED***else***REMOVED***
      message('error',results.error);
      removeLoading('body');
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

function htmlEntities(str) ***REMOVED***
  var s1 = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return specialCharacters(s1);
***REMOVED***

function specialCharacters(s) ***REMOVED***
  if(!specialCharacters.translate_re) specialCharacters.translate_re = /[ÅåÀàÁáÂâÃãÄäÇçÉéÈèÊêËëÏïÍíÌìÎîÑñÒòÓóÔôÕõÖöÙùÛûÜüÚúØø•–]/g;
  var translate = ***REMOVED***
    "Å":"&Aring;",
    "å":"&aring;",
    "À":"&Agrave;",
    "à":"&agrave;",
    "Á":"&Aacute;",
    "á":"&aacute;",
    "Â":"&Acirc;",
    "â":"&circ;",
    "Ã":"&Atilde;",
    "ã":"&atilde;",
    "Ä":"&Auml;",
    "ä":"&auml;",
    "Ç":"&Ccedil;",
    "ç":"&ccedil;",
    "É":"&Eacute;",
    "é":"&eacute;",
    "È":"&Egrave;",
    "è":"&egrave;",
    "Ê":"&Ecirc;",
    "ê":"&ecirc;",
    "Ë":"&Euml;",
    "ë":"&euml;",
    "Ï":"&Iuml;",
    "ï":"&iuml;",
    "Í":"&Iacute;",
    "í":"&iacute;",
    "Ì":"&Igrave;",
    "ì":"&igrave;",
    "Î":"&Icirc;",
    "î":"&icirc;",
    "Ñ":"&Ntilde;",
    "ñ":"&ntilde;",
    "Ò":"&Ograve;",
    "ò":"&ograve;",
    "Ó":"&Oacute;",
    "ó":"&oacute;",
    "Ô":"&Ocirc;",
    "ô":"&ocirc;",
    "Õ":"&Otilde;",
    "õ":"&otilde;",
    "Ö":"&Ouml;",
    "ö":"&ouml;",
    "Ù":"&Ugrave;",
    "ù":"&ugrave;",
    "Û":"&Ucirc;",
    "û":"&ucirc;",
    "Ü":"&Uuml;",
    "ü":"&uuml;",
    "Ú":"&Uacute;",
    "ú":"&uacute;",
    "Ø":"&Oslash;",
    "ø":"&oslash;",
    "•":"&bull;",
    "–":"&ndash;"
  ***REMOVED***;
  return ( s.replace(specialCharacters.translate_re, function(match) ***REMOVED***
    return translate[match];
  ***REMOVED***) );
***REMOVED***

function inWords(num) ***REMOVED***
  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d***REMOVED***2***REMOVED***)(\d***REMOVED***2***REMOVED***)(\d***REMOVED***2***REMOVED***)(\d***REMOVED***1***REMOVED***)(\d***REMOVED***2***REMOVED***)$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
***REMOVED***

function div(text, id, classes, data)***REMOVED***
  let fullid = '', fullclass = '',texts = '',datas = '';
  if(id != undefined && id.trim() != '')***REMOVED***
    fullid = ` id="$***REMOVED***id***REMOVED***"`;
  ***REMOVED***
  if(classes != undefined && classes.trim() != '')***REMOVED***
    fullclass = ` class="$***REMOVED***classes***REMOVED***"`;
  ***REMOVED***
  if(text != undefined && text.trim() != '')***REMOVED***
    texts = text;
  ***REMOVED***
  if(typeof data === 'object')***REMOVED***
    datas = ` data-$***REMOVED***data.type***REMOVED***="$***REMOVED***data.value***REMOVED***"`;
  ***REMOVED***
  return `<div$***REMOVED***fullid***REMOVED***$***REMOVED***fullclass***REMOVED***$***REMOVED***datas***REMOVED***>$***REMOVED***texts***REMOVED***<div>`;
***REMOVED***

function select(options, id, classes, datas)***REMOVED***
  let fullid = '', fullclass = '',optionTags = '',data = '';
  if(id != undefined && id.trim() != '')***REMOVED***
    fullid = ` id="$***REMOVED***id***REMOVED***"`;
  ***REMOVED***
  if(classes != undefined && classes.trim() != '')***REMOVED***
    fullclass = ` class="$***REMOVED***classes***REMOVED***"`;
  ***REMOVED***
  if(text != undefined && text.trim() != '')***REMOVED***
    texts = text;
  ***REMOVED***
  if(datas != undefined && text.trim() != '')***REMOVED***
    datas = data;
  ***REMOVED***
  for (const option of options) ***REMOVED***
    optionTags += `<option value="$***REMOVED***option***REMOVED***">$***REMOVED***option***REMOVED***</option>`;
  ***REMOVED***
  return `<select$***REMOVED***fullid***REMOVED***$***REMOVED***fullclass***REMOVED***$***REMOVED***datas***REMOVED***>$***REMOVED***optionTags***REMOVED***<select>`;
***REMOVED***


function show(section, prev = false)***REMOVED***
  if(prev)***REMOVED***
    document.querySelector(section).previousSibling.previousSibling.classList.remove('hide');
  ***REMOVED***else***REMOVED***
    document.querySelector(section).classList.remove('hide');
  ***REMOVED***
***REMOVED***

function hide(section, prev = false)***REMOVED***
  if(prev)***REMOVED***
    document.querySelector(section).previousSibling.previousSibling.classList.add('hide');
  ***REMOVED***else***REMOVED***
    document.querySelector(section).classList.add('hide');
  ***REMOVED***
***REMOVED***

function remove(section)***REMOVED***
  document.querySelector(section).remove();
***REMOVED***

function addLoading(section)***REMOVED***
  const load = '<div class="loader"><img src="site-images/loader.gif" /></div>';
  document.querySelector(section).insertAdjacentHTML('beforeend',load);
***REMOVED***

function removeLoading(section)***REMOVED***
  document.querySelector(section+" .loader").remove();
***REMOVED***

function message(type,msg = [])***REMOVED***
  let display = (Array.isArray(msg)) ? msg.join('<br><br>') : msg;
  document.querySelector('#msg').className = 'hide';
  document.querySelector('#msg').classList.add(type);
  document.querySelector('#msg span').innerHTML = "";
  document.querySelector('#msg span').innerHTML = display;
  show('#msg');
***REMOVED***

function todaysDate()***REMOVED***
  const d = new Date();
  let m = d.getMonth()+1;
  let dt = d.getDate();
  let fullm = (m.toString().length < 2) ? '0'+m.toString() : m;
  letfulld = (dt.toString().length < 2) ? '0'+dt.toString() : dt;
  return d.getFullYear()+'-'+fullm+'-'+d.getDate();
***REMOVED***

function grabTemplate(template, callback)***REMOVED***
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'templates/'+template+'.html', true);
  xhr.onreadystatechange= function() ***REMOVED***
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
    if (xhr.readyState == 4) ***REMOVED***
      // defensive check
      if (typeof callback === "function") ***REMOVED***
          // apply() sets the meaning of "this" in the callback
          callback.apply(xhr);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
  xhr.send();
***REMOVED***

const zeroPad = (num, places) => String(num).padStart(places, '0');

function outputDedicated(info)***REMOVED***
  let temp = grabTemplate('dedicated',
  // this callback is invoked AFTER the response arrives
    function () ***REMOVED***
      let d = info.Date;
      let changeDate = d.split('/');
      changeDate[0] = zeroPad(changeDate[0], 2);
      changeDate[1] = zeroPad(changeDate[1], 2);
      changeDate[2] = changeDate[2].substring(2);
      let newDate = changeDate.join('');
      let dashDate = changeDate.join('-');
      //
      let resp  = this.responseText;
      let a = resp.replace('[DATE DASH]',dashDate);
      let b = a.replace('[NAME 1]',info.Playlist);
      let c = b.replace('[NAME 2]',info.Playlist);
      let e = c.replace('[URI]',info.URI);
      let f = e.replace('[DATE]',newDate);

      let removeSymbols = info.Playlist.replace(/[^A-Za-z0-9$\s!?]/g, '');
      let nameNoSpace = removeSymbols.replace(/\s+/g, '');
      let folderName = 'HPTO_'+nameNoSpace+'_'+newDate;

      let dedName = ***REMOVED***'name': folderName***REMOVED***;
      let dedCode = ***REMOVED***'code': specialCharacters(f)***REMOVED***;
      let dedicatedInfo = ***REMOVED***...dedName, ...dedCode***REMOVED***;

      let code = '<iframe src="https://filtr.sonymusic.com/filtr/'+folderName+'/" width="800" height="235" frameborder="0" scrolling="no"></iframe>';
      let encodedStr = code.replace(/[\u00A0-\u9999<>\&]/gim, function(i) ***REMOVED***
         return '&#'+i.charCodeAt(0)+';';
      ***REMOVED***);

      customAjax("/function/output_dedicated_file", 'POST', dedicatedInfo).then(function(results) ***REMOVED***
        if(results.success != undefined)***REMOVED***
          document.querySelector('.dedicated .dedicated_code .code').insertAdjacentHTML('afterbegin','<pre><code>'+specialCharacters(encodedStr)+'</code></pre>');
          document.querySelector('.dedicated .dedicated_code').classList.remove('hide');
        ***REMOVED***
      ***REMOVED***)

    ***REMOVED***)
  ***REMOVED***

  function checkBoxLogin()***REMOVED***
    if(enviornment.token != undefined)***REMOVED***
      customAjax("checkauth/", 'GET').then(function(results) ***REMOVED***
          if(results.success != undefined)***REMOVED***
            if(results.success == "live token")***REMOVED***
              let newMsg = "Download Current Images";
              newMsg += '<span class="tooltiptext tooltip-top">You are loggedin to box and can bulk download images from a selected HPTO date</span>';
              document.querySelector('button[name="gather_images"]').classList.add("go");
              document.querySelector('button[name="gather_images"]').innerHTML = newMsg;
            ***REMOVED***
          ***REMOVED***else***REMOVED***
            console.log(results.error);
            if(results.error.code != undefined)***REMOVED***
              if(results.error.code == "ENOENT")***REMOVED***
                message('error',"the enviornment file does not exist");
              ***REMOVED***else***REMOVED***
                message('error',results.error.code);
              ***REMOVED***
            ***REMOVED***else***REMOVED***
              message('error',results.error);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***)
    ***REMOVED***
  ***REMOVED***

getEnviornment();


customAjax("/api/database/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      populateDefaults(results);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
      removeLoading('body');
      show('.container.defaults');
    ***REMOVED***
  ***REMOVED***)


// DISPLAY FUNCTIONS
function populateDefaults(info)***REMOVED***
  dbinfo = info;
  populateSettings(info);
  populateHeader(info);
  updateSheetList(info);
  if(info.defaults.start_type == 'csv')***REMOVED***
    runDefaultCSV();
  ***REMOVED***else***REMOVED***
    runDefaultSheet();
    customAjax("/api/titles", 'GET').then(function(results) ***REMOVED***
      displayTitles('.dedicated .dcells', results, DEDICATEDS)
      displayTitles('.container.cells .cells', results, DAYPARTS)
    ***REMOVED***)
  ***REMOVED***
  removeLoading('body');
  removeLoading('body >');
  removeLoading('.delete_spreedsheet');
  removeLoading('.choose_tab');
  show('.container.defaults');
  show('.choose_tab');
  show('.choose_tab select');
  //show('.choose_tab button');
  show('.choose_sheet select');
  //show('.choose_sheet button');
  show('.delete_spreedsheet select');
  show('.delete_spreedsheet button');
  show('.container.images');
  document.querySelector(".crop .holder").addEventListener( 'click', function ( event ) ***REMOVED***
    if(event.target.tagName == "IMG") ***REMOVED***
      console.log(event.target);
      runCropStudio(event);
    ***REMOVED***;
  ***REMOVED***);
  doAFunction('sendToCropArea',***REMOVED******REMOVED***);
***REMOVED***

function runDefaultCSV()***REMOVED***
  isCSV = true;
  customAjax("/csvinfo/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      let removeExt = results[0].split('.');
      customAjax("csvinfo/"+removeExt[0]+"/titles", 'GET').then(function(results) ***REMOVED***
          displayTitles('.dedicated .dcells', results, DEDICATEDS)
          displayTitles('.container.cells .cells', results, DAYPARTS)
      ***REMOVED***)
      customAjax("/csvinfo/"+removeExt[0]+"/dates", 'GET').then(function(results) ***REMOVED***
        if(results.error == undefined)***REMOVED***
          currentCSV = removeExt[0];
          document.querySelector('.csv-checkbox').checked = true;
          show('.csv-info');
          hide('.container.defaults .sheet_info');
          document.querySelector('.container.cells .dates select').innerHTML = '';
          displayDaypartDates(results);
        ***REMOVED***else***REMOVED***
          Object.entries(results).map(msg => message(msg[0], msg[1]));
        ***REMOVED***
      ***REMOVED***)
      customAjax("/csvinfo/"+removeExt[0]+"/dedicateds", 'GET').then(function(results) ***REMOVED***
        if(results.error == null)***REMOVED***
          isCSV = true;
          let saveTitles = document.querySelector('.container.dedicated .dcells .titles').innerHTML;
          document.querySelector('.container.dedicated .dcells').innerHTML = '';
          document.querySelector('.container.dedicated .dcells').insertAdjacentHTML('afterbegin','<div class="titles">'+saveTitles+'</div>');
          displayDedicated(results, DEDICATEDS);
        ***REMOVED***else***REMOVED***
          Object.entries(results).map(msg => message(msg[0], msg[1]));
        ***REMOVED***
      ***REMOVED***)
    ***REMOVED***else***REMOVED***
      Object.entries(results).map(msg => message(msg[0], msg[1]));
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

function runDefaultSheet()***REMOVED***
  customAjax("/api/dedicateds", 'GET').then(function(results) ***REMOVED***
    displayDedicated(results, DEDICATEDS);
    show('.container.dedicated');
  ***REMOVED***)

  customAjax("/api/sheetinfo/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      addSheetTabs('.choose_tab select',results.tabTitles);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
      removeLoading('body');
      show('.container.defaults');
    ***REMOVED***
  ***REMOVED***)

  customAjax("/api/dates/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      //displayDaypartDates calls displayDayparts immediately after
      displayDaypartDates(results);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
      removeLoading('body');
      show('.container.cells');
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

function populateSettings(info)***REMOVED***
  document.querySelector('#popup-settings #'+info.defaults.start_type).checked = true;
  document.querySelector('#popup-settings input[name="sheet"]').value = info.defaults.sheet;
  document.querySelector('#popup-settings input[name="tab"]').value = info.defaults.tab;
  document.querySelector('#popup-settings input[name="range"]').value = info.defaults.range;
  document.querySelector('#popup-settings input[name="default_path"]').value = info.defaults.default_path;
  document.querySelector('#popup-settings input[name="storecsvs"]').value = info.defaults.storecsvs;
  document.querySelector('#popup-settings input[name="imagesfolder"]').value = info.defaults.imagesfolder;
  document.querySelector('#popup-settings input[name="savedzips"]').value = info.defaults.savedzips;
  document.querySelector('#popup-settings input[name="tempfolder"]').value = info.defaults.tempfolder;
  document.querySelector('#popup-settings input[name="newimagesfolder"]').value = info.defaults.newimagesfolder;
  document.querySelector('#popup-settings input[name="outputfiles"]').value = info.defaults.outputfiles;
***REMOVED***

function addSheetTabs(section, rows)***REMOVED***
  document.querySelector(section).innerHTML = "";
  if(rows == undefined)***REMOVED***
    option = `<option value="">This sheet has no tabs</option>`;
    document.querySelector(section).insertAdjacentHTML('beforeend', option);
  ***REMOVED***else***REMOVED***
    rows.map((row) => ***REMOVED***
      option = `<option value="$***REMOVED***row***REMOVED***">$***REMOVED***row***REMOVED***</option>`;
      document.querySelector(section).insertAdjacentHTML('beforeend', option);
    ***REMOVED***)
  ***REMOVED***
***REMOVED***

function populateHeader(info)***REMOVED***
  document.querySelector('.sheet_id span').innerHTML = info.defaults.sheet;
  document.querySelector('.sheet_name span').innerHTML = info.defaults.title;
  document.querySelector('.sheet_tab span').innerHTML = info.defaults.tab;
***REMOVED***

function displayTitles(section, row, fields)***REMOVED***
  const dedicatedCells = document.querySelector(section);
  //dedicatedCells.insertAdjacentHTML('beforeend',loading);
  let titles = dedicatedCells.insertAdjacentHTML('afterbegin',div('','','titles'));
  fields.map((field) => ***REMOVED***
      document.querySelector(section+" .titles").insertAdjacentHTML('beforeend',div(row[field],'',''));
  ***REMOVED***)
  const newlyCreated = document.querySelectorAll(section+" .titles div");
  for (const div of newlyCreated) ***REMOVED***
    if(div.innerHTML == '')***REMOVED***
      div.remove();
    ***REMOVED***
  ***REMOVED***
***REMOVED***

function displayDedicated(rows, fields)***REMOVED***
  let dataTypes = [];
  customAjax("/api/titles", 'GET').then(function(results) ***REMOVED***
    for (const ded of DEDICATEDS) ***REMOVED***
      dataTypes.push(results[ded]);
    ***REMOVED***
    const dedicatedCells = document.querySelector('.dedicated section.dcells');
    let indx = 0
    if(rows.length > 0)***REMOVED***
      for (const dedicated of rows) ***REMOVED***
        dedicatedCells.insertAdjacentHTML('beforeend',div('','dedicated_'+indx,'daypart'));
        document.querySelector('#dedicated_'+indx).addEventListener('click',createDedicated);

        let cnt = 1
        for(const field of fields)***REMOVED***
          let data = ***REMOVED***'type': 'type', 'value': dataTypes[cnt - 1]***REMOVED***;
          document.querySelector('#dedicated_'+indx).insertAdjacentHTML('beforeend',div(dedicated[field],'','cell cell_'+cnt,data));
          cnt++;
        ***REMOVED***
        indx++;
      ***REMOVED***
    ***REMOVED***

    const newlyCreated = document.querySelectorAll('.dedicated section.dcells .daypart div');
    for (const div of newlyCreated) ***REMOVED***
      if(div.innerHTML == '')***REMOVED***
        div.remove();
      ***REMOVED***
    ***REMOVED***
    hide('.container.dedicated', true);
  ***REMOVED***)
***REMOVED***

function ddChangeEvent(evt)***REMOVED***
  show('.container.cells .loader');
  document.querySelector('.container.dayparts section.dayparts').innerHTML = '';
  updateDateForm(evt.target.value);
  if(isCSV)***REMOVED***
    customAjax("/csvinfo/"+currentCSV+"/date/"+evt.target.value, 'GET').then(function(results) ***REMOVED***
      displayDayparts(results, DAYPARTS, DAYPARTCOLORS)
    ***REMOVED***)
  ***REMOVED***else***REMOVED***
    customAjax("/api/date/"+evt.target.value, 'GET').then(function(results) ***REMOVED***
      displayDayparts(results, DAYPARTS, DAYPARTCOLORS)
    ***REMOVED***)
  ***REMOVED***
***REMOVED***

function displayDaypartDates(results)***REMOVED***
  const selectTags = '.container.cells .dates select';
  const selectTag = document.querySelector(selectTags);
  selectTag.innerHTML = '';
  const optionTags = results.map(option  => `<option value="$***REMOVED***option***REMOVED***">$***REMOVED***option***REMOVED***</option>`);
  selectTag.insertAdjacentHTML('afterbegin', optionTags.join(''));
  selectTag.removeEventListener('change',ddChangeEvent);
  selectTag.addEventListener('change',ddChangeEvent);
  show(selectTags);
  let firstDate = document.querySelector(selectTags+' option:first-of-type').value;
  updateDateForm(firstDate);
  if(isCSV)***REMOVED***
    customAjax("/csvinfo/"+currentCSV+"/firstdate/", 'GET').then(function(results) ***REMOVED***
      displayDayparts(results, DAYPARTS, DAYPARTCOLORS)
    ***REMOVED***)
  ***REMOVED***else***REMOVED***
    customAjax("/api/date/"+firstDate, 'GET').then(function(results) ***REMOVED***
        displayDayparts(results, DAYPARTS, DAYPARTCOLORS);
    ***REMOVED***)
  ***REMOVED***
***REMOVED***

function displayDayparts(results, fields, colors)***REMOVED***
  const daypartCells = document.querySelector('.container.cells .cells');
  daypartCells.innerHTML = '';
  let alldayparts = '';
  let sortedDayparts = [], brokenUpDayparts = [];

  daypartCells.innerHTML = '';
  //console.log(results);

  if(results.error == undefined)***REMOVED***
    let time = '';
    for (const part of results) ***REMOVED***
      if(time != part[5])***REMOVED***
        if(brokenUpDayparts.length > 0)***REMOVED***
          sortedDayparts.push(brokenUpDayparts);
        ***REMOVED***
        brokenUpDayparts = [];
        time = part[5];
      ***REMOVED***
      brokenUpDayparts.push(part);
    ***REMOVED***
    sortedDayparts.push(brokenUpDayparts);
  //  console.log(sortedDayparts);
    let reducedDayparts = [];

    sortedDayparts.map((dayparts, indx) => ***REMOVED***
      let reducedDaypart = []
      alldayparts += `<div class="dayparts $***REMOVED***colors[indx]***REMOVED***">`;
      dayparts.map((daypart) => ***REMOVED***
        let reducedCells = []
        alldayparts += '<div class="daypart">';
        fields.map((field,indx) => ***REMOVED***
          reducedCells.push(daypart[field]);
          alldayparts += `<div class="cell_$***REMOVED***indx+1***REMOVED***">`;
          alldayparts += daypart[field];
          alldayparts += '</div>';
        ***REMOVED***)
        reducedDaypart.push(reducedCells);
        alldayparts += '</div>';
      ***REMOVED***)
      reducedDayparts.push(reducedDaypart);
      alldayparts += '</div>';
    ***REMOVED***)
    updateViewArea(reducedDayparts);
  ***REMOVED***else***REMOVED***
    message('error',results.error+'. Please choose another date');
  ***REMOVED***

  hide('.container.cells .loader');
  daypartCells.insertAdjacentHTML('beforeend',alldayparts);
  show('.container.cells');
***REMOVED***

function updateDateForm(lastdate)***REMOVED***
  let parts = lastdate.split('/');
  parts.forEach(function(part, i)***REMOVED***
    if(part.length == 1)***REMOVED***
      parts[i] = '0'+part;
    ***REMOVED***
  ***REMOVED***)
  document.querySelector('.final-date').value = parts.join('-');
***REMOVED***

function updateSheetList(info)***REMOVED***
  document.querySelector('.choose_sheet select').innerHTML = '';
  document.querySelector('.delete_spreedsheet select').innerHTML = '';
  info.googlesheets.map((sheet) => ***REMOVED***
    let select = (info.defaults.sheet == sheet.id) ? 'selected' : '';
    option = `<option value="$***REMOVED***sheet.id***REMOVED***" $***REMOVED***select***REMOVED***>$***REMOVED***sheet.id***REMOVED***</option>`;
    document.querySelector('.choose_sheet select').insertAdjacentHTML('beforeend', option);
    document.querySelector('.delete_spreedsheet select').insertAdjacentHTML('beforeend', option);
  ***REMOVED***)
  document.querySelector('.choose_tab select').value = info.defaults.tab;
***REMOVED***


// MATCHED BTN FUNCTIONS

let runFunctions = ***REMOVED******REMOVED***;

runFunctions.run_sheet = function(info) ***REMOVED***
  let encapsulate = ***REMOVED******REMOVED***;
  encapsulate.defaults = info;
  populateDefaults(encapsulate);
  //populateHeader(encapsulate);
***REMOVED***

runFunctions.add_sheet = function(info)***REMOVED***
  Object.entries(info).map(msg => message(msg[0], msg[1]));
  customAjax("/api/database/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      document.querySelector('input[name="sheet_id"]').value = '';
      updateSheetList(results);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

runFunctions.delete_sheet = function(info)***REMOVED***
  Object.entries(info).map(msg => message(msg[0], msg[1]));
  customAjax("/api/database/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      updateSheetList(results);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

runFunctions.scrape_images = function(info)***REMOVED***
  Object.entries(info).map(msg => message(msg[0], msg[1]));
  customAjax("/api/database/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      updateSheetList(results);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

runFunctions.output_code = function(info)***REMOVED***
  let keys = Object.keys(info);
  if(keys.includes('error'))***REMOVED***
    Object.entries(info).map(msg => message(msg[0], msg[1]));
  ***REMOVED***
  if(keys.includes('success'))***REMOVED***
    document.querySelector(".get_final_zip").href = info.dlURL;
    document.querySelector(".get_final_zip").classList.remove('disabled');
    document.querySelector(".output_txt").href = info.textFile;
    document.querySelector(".output_txt").classList.remove('disabled');
  ***REMOVED***
  customAjax("/api/database/", 'GET').then(function(results) ***REMOVED***
    if(results.error == undefined)***REMOVED***
      updateSheetList(results);
    ***REMOVED***else***REMOVED***
      message('error',results.error);
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

runFunctions.reduce_images = function(info)***REMOVED***
  let key = Object.keys(info)[0];
  setTimeout(() => ***REMOVED***
    var timestamp = new Date().getTime();
    let allImgs = document.querySelectorAll('img.album-thumbnail');

    allImgs.forEach(function(slide)***REMOVED***
      let link = slide.src+"?t=" + timestamp;
      slide.src = link;
    ***REMOVED***)
    message(key,info[key]);
  ***REMOVED***, 1000);
***REMOVED***

runFunctions.sendToCropArea = function(info)***REMOVED***
  document.querySelector(".crop .holder").innerHTML = '';
  let inx = 1;
  info.forEach(function(image)***REMOVED***
    let img = `<div class="img-holder"><img id="$***REMOVED***inx***REMOVED***" src="$***REMOVED***image***REMOVED***"><div class="number">cover $***REMOVED***inx***REMOVED***</div></div>`;
    let newImg = document.querySelector(".crop .holder").insertAdjacentHTML('beforeend',img);
    inx++;
  ***REMOVED***)
***REMOVED***

runFunctions.crop_image = function(info)***REMOVED***
  document.querySelector("#popup-crop").classList.add('hide');

  if(theCroppening != null && theCroppening != undefined)***REMOVED***
    theCroppening.destroy();
  ***REMOVED***

  let timestamp = new Date().getTime();
  let el = document.getElementById(info.id);
  let queryString = "?t=" + timestamp;
  el.src = `/editable/$***REMOVED***dbinfo.defaults.newimagesfolder***REMOVED***/$***REMOVED***info.img***REMOVED***$***REMOVED***queryString***REMOVED***`;
***REMOVED***

runFunctions.update_images = function(info)***REMOVED***
  update_current_images()
  document.querySelector('button[name="update_images"]').innerHTML = 'Images Updated';
  setTimeout(() => ***REMOVED***
    document.querySelector('button[name="update_images"]').innerHTML = 'Update Images';
  ***REMOVED***, 5000);

***REMOVED***

runFunctions.create_zip = function(info)***REMOVED***
  Object.entries(info).map(msg => message(msg[0], msg[1]));
  document.querySelector('.current_imgs .do_zip input').value = '';
***REMOVED***

runFunctions.open_zip = function(info)***REMOVED***
  if(info.files != null)***REMOVED***update_current_images(info.files)***REMOVED***;
  Object.entries(info).map((msg) => ***REMOVED***
    if(msg[0] == 'error')***REMOVED***
      message(msg[0], msg[1]);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

runFunctions.gather_images = function(info)***REMOVED***
  if(info == 'error')***REMOVED***
    let newMsg = "Login to Gather Image";
    newMsg += '<span class="tooltiptext tooltip-top">Login to box to get access to download images</span>';
    document.querySelector('button[name="gather_images"]').classList.remove("go");
    document.querySelector('button[name="gather_images"]').innerHTML = newMsg;
    return;
  ***REMOVED***
  if(info.success != null && info.success != undefined)***REMOVED***
    let holder = document.querySelector('.current_imgs .crop .holder');
    holder.innerHTML = '';
    let loading = '<div class="imgs-loading">loading...</div>';
    holder.insertAdjacentHTML('beforeend',loading);
    setTimeout(() => ***REMOVED***
      holder.innerHTML = '';
      if(Array.isArray(info.success))***REMOVED***
      info.success.forEach(function(link)***REMOVED***
        let breakUp = link.split('cover');
        let num = breakUp[1].split('.')[0];

        let timestamp = new Date().getTime();
        let url = link+"?t=" + timestamp;
        let html = `<div class="img-holder"><div class="number">cover $***REMOVED***num***REMOVED***</div><img id="$***REMOVED***num***REMOVED***" src="/editable/$***REMOVED***dbinfo.defaults.newimagesfolder***REMOVED***/$***REMOVED***url***REMOVED***"></div>`;
        holder.insertAdjacentHTML('beforeend',html);
      ***REMOVED***)
    ***REMOVED***else***REMOVED***
      message('error', info.success);
    ***REMOVED***
    ***REMOVED***, "8000")
  ***REMOVED***
***REMOVED***


runFunctions.delete_zip = function(info)***REMOVED***
  if(info.success != null)***REMOVED***
    //console.log(info.success);
    document.querySelector("#"+info.success).parentElement.remove();
  ***REMOVED***
  Object.entries(info).map((msg) => ***REMOVED***
    if(msg[0] == 'error')***REMOVED***
      message(msg[0], msg[1]);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

runFunctions.delete_csv = function(info)***REMOVED***
  if(info.success != null)***REMOVED***
    //console.log(info.success);
    document.querySelector("#"+info.success).parentElement.remove();
  ***REMOVED***
  Object.entries(info).map((msg) => ***REMOVED***
    if(msg[0] == 'error')***REMOVED***
      message(msg[0], msg[1]);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***


function update_current_images(imgs = [])***REMOVED***
  if(imgs.length > 0)***REMOVED***
    let images = document.querySelector(".crop .holder");
    images.innerHTML = '';
    let html = '';
    imgs.forEach(function(img,indx)***REMOVED***
      indx++;
      let timestamp = new Date().getTime();
      let queryString = "?t=" + timestamp;
      html += `<div class="img-holder"><div class="number">cover $***REMOVED***inx***REMOVED***</div><img id="$***REMOVED***inx***REMOVED***" src="/editable/$***REMOVED***idbinfo.defaults.newimagesfolder***REMOVED***/$***REMOVED***img+queryString***REMOVED***"></div>`;
      //html += '<img id="'+indx+'" src="/'+dbinfo.defaults.newimagesfolder+'/'+img+queryString+'" />';
    ***REMOVED***)
    images.insertAdjacentHTML('beforeend',html);
    // document.querySelectorAll(".crop .holder img").forEach(function(t)***REMOVED***
    //   t.addEventListener('click', (e) => ***REMOVED***
    //   //  console.log(e.target);
    //     runCropStudio(e);
    //   ***REMOVED***)
    // ***REMOVED***)
  ***REMOVED***else***REMOVED***
    let images = document.querySelectorAll(".crop .holder img");
    images.forEach(function(image)***REMOVED***
      let timestamp = new Date().getTime();
      let el = image;
      let imgURL = el.src;
      let pieces = imgURL.split('/');
      let name = pieces.pop();
      let namePieces = name.split('?');
      let queryString = "?t=" + timestamp;
      el.src = `/$***REMOVED***dbinfo.defaults.newimagesfolder***REMOVED***/$***REMOVED***namePieces[0]***REMOVED***$***REMOVED***queryString***REMOVED***`;
    ***REMOVED***)
  ***REMOVED***
***REMOVED***

// CLICK FUNCTIONS

Object.entries(document.getElementsByTagName("button")).map(( object ) => ***REMOVED***
  object[1].addEventListener("click", () => ***REMOVED***
    const action = object[1].name;
    const atr = object[1].getAttribute('data');
    let data = (atr == undefined) ? ***REMOVED******REMOVED*** : JSON.parse(object[1].getAttribute('data'));
    const t = document.querySelector(`button[name="$***REMOVED***action***REMOVED***"]`);

    if(action == 'run_sheet')***REMOVED***
      let sht = document.querySelector('.choose_sheet select').value;
      let ttl = document.querySelector('.choose_sheet select').getAttribute('datatitle');
      let tb = document.querySelector('.choose_tab select').value;
      let rng = document.querySelector('#popup-settings input[name="range"]').value;
      let pth = document.querySelector('#popup-settings input[name="default_path"]').value;
      data = ***REMOVED***"sheet": sht, "title": ttl,"tab": tb, "range": rng, "default_path":pth***REMOVED***;
    ***REMOVED***

    if(action == 'add_sheet')***REMOVED***
      let sht = document.querySelector('input[name="sheet_id"]').value;
      if(sht.trim() == '')***REMOVED***
        message('error',['Please fill out box to add a sheet']);
        return;
      ***REMOVED***else***REMOVED***
        data = ***REMOVED***'id': sht, 'added': todaysDate()***REMOVED***;
      ***REMOVED***
    ***REMOVED***

    if(action == 'delete_sheet')***REMOVED***
      data = ***REMOVED***'id': document.querySelector('.delete_spreedsheet select[name="sheet_id"]').value***REMOVED***;
    ***REMOVED***

    // if(action == 'options_toggle')***REMOVED***
    //   const options = '.container.emailcode';
    //   if(document.querySelector(options).classList.contains('hide'))***REMOVED***
    //     show(options);
    //     t.innerText = "Hide Sheet Options";
    //   ***REMOVED***else***REMOVED***
    //     hide(options);
    //     t.innerText = "Show Sheet Options";
    //   ***REMOVED***
    //   return;
    // ***REMOVED***

    if(action == 'code_toggle')***REMOVED***
      const code = '.container.output .content';
      if(document.querySelector(code).classList.contains('hide'))***REMOVED***
        show(code);
        t.innerText = "Hide Code";
      ***REMOVED***else***REMOVED***
        hide(code);
        t.innerText = "Show Code";
      ***REMOVED***
      return;
    ***REMOVED***

    if(action == 'copy_clipboard')***REMOVED***
      const code = '.container.output .content .copycode';
      copyToClipboard(document.querySelector(code).innerHTML);
      message('success', 'Code copied to clipboard');
      return;
    ***REMOVED***

    if(action == 'scrape_images')***REMOVED***
      let images = document.querySelectorAll('.container.cells .dayparts .daypart .cell_4');
      data = Array.from(images).map(img => img.innerText);
      let outputThis = data.join(',');
      copyToClipboard(outputThis);
      window.location.href = 'downloadfromDropBox://com.apple.automator.downloadfromDropBox';
    ***REMOVED***

    if(action == 'gather_images')***REMOVED***
      if(document.querySelector('button[name="gather_images"]').classList.contains("go"))***REMOVED***
        let images = document.querySelectorAll('.container.cells .dayparts .daypart .cell_4');
        data = Array.from(images).map(img => img.innerText);
        let outputThis = data.join(',');
        data = ***REMOVED***
          'links' : outputThis
        ***REMOVED***
      ***REMOVED***else***REMOVED***
        window.location.href = `https://account.box.com/api/oauth2/authorize?response_type=code&client_id=$***REMOVED***enviornment.boxClientId***REMOVED***&redirect_uri=$***REMOVED***enviornment.redirect***REMOVED***`;
        return;
      ***REMOVED***
      // let images = document.querySelectorAll('.container.cells .dayparts .daypart .cell_4');
      // url = Array.from(images).map(img => img.innerText);
      // let urls = url.join(',');
      // data = ***REMOVED***
      //   'urls' : urls
      // ***REMOVED***
    ***REMOVED***

    if(action == 'output_code')***REMOVED***
      outputFullTemplate();
      return;
    ***REMOVED***

    // if(action == 'crop_image')***REMOVED***
    //   let cropper = document.querySelector("#popup-crop .image-holder .window");
    //   let toCrop = document.querySelector("#popup-crop .image-holder img");
    //   let cropHere;
    //
    //   if(toCrop.classList[0] == 'noCrop')***REMOVED***
    //     return;
    //   ***REMOVED***
    //
    //   if(toCrop.classList[0] == 'landscape')***REMOVED***
    //     cropHere = parseInt(cropper.style.left, 10) - parseInt(toCrop.style.left, 10);
    //   ***REMOVED***
    //
    //   if(toCrop.classList[0] == 'portrait')***REMOVED***
    //     cropHere = parseInt(cropper.style.top, 10) - parseInt(toCrop.style.top, 10);
    //   ***REMOVED***
    //
    //   data = ***REMOVED***
    //     'width': toCrop.offsetWidth,
    //     'height': toCrop.offsetHeight,
    //     'type': toCrop.classList[0],
    //     'id': toCrop.getAttribute('data-id'),
    //     'img': toCrop.getAttribute('data-img'),
    //     'crop': cropHere
    //   ***REMOVED***
    // ***REMOVED***

    if(action == 'create_zip')***REMOVED***
      data = ***REMOVED***'name' : document.querySelector('.zip_name').value***REMOVED***;
    ***REMOVED***

    doAFunction(action,data);

    // customAjax(`/function/$***REMOVED***action***REMOVED***`, 'POST', data).then(function(results) ***REMOVED***
    //   if(results.error == undefined)***REMOVED***
    //     runFunctions[action](results);
    //   ***REMOVED***else***REMOVED***
    //     message('error',results.error);
    //   ***REMOVED***
    // ***REMOVED***)

  ***REMOVED***) //end of click listener
***REMOVED***) //end of button objects

document.querySelector('.see_zips').addEventListener('click', () => ***REMOVED***
  customAjax("/zipnames", 'GET').then(function(results) ***REMOVED***
    document.querySelector("#popup-zips .zips-holder").innerHTML = '';
    results.map((zip, indx) => ***REMOVED***
      zipHTML = '<div class="zip-holder">';
        zipHTML += '<div id="open-'+indx+'" class="zip" data-name="'+zip+'">Open: '+zip+'</div>';
        zipHTML += '<div id="delete-'+indx+'" class="zip-delete" data-name="'+zip+'">delete</div>';
      zipHTML += '</div>';
      document.querySelector("#popup-zips .zips-holder").insertAdjacentHTML('beforeend',zipHTML);
      document.querySelector(".zip-holder #open-"+indx).addEventListener('click', (e) => ***REMOVED***
        doAFunction('open_zip',***REMOVED***'name': e.target.dataset.name***REMOVED***);
      ***REMOVED***)
      document.querySelector(".zip-holder #delete-"+indx).addEventListener('click', (e) => ***REMOVED***
        doAFunction('delete_zip',***REMOVED***'name': e.target.dataset.name, 'deleteid': e.target.id***REMOVED***);
      ***REMOVED***)
    ***REMOVED***)
    show('#popup-zips');
  ***REMOVED***)
***REMOVED***)
document.querySelector('.open_dedicated').addEventListener('click', (e) => ***REMOVED***
  let select = '.dedicated .dcells';
  e.preventDefault();
  if(document.querySelector(select).classList.contains('hide'))***REMOVED***
    show(select);
    e.target.innerText = 'close';
  ***REMOVED***else***REMOVED***
    hide(select);
    e.target.innerText = 'open';
  ***REMOVED***
***REMOVED***)
document.querySelector('.see_csvs').addEventListener('click', () => ***REMOVED***
  customAjax("/csvnames", 'GET').then(function(results) ***REMOVED***
    document.querySelector("#popup-csv .csvs-holder").innerHTML = '';
    results.map((csv, indx) => ***REMOVED***
      csvHTML = '<div class="csv-holder">';
        csvHTML += '<div id="open-'+indx+'" class="csv" data-name="'+csv+'">Open: '+csv+'</div>';
        csvHTML += '<div id="delete-'+indx+'" class="csv-delete" data-name="'+csv+'">delete</div>';
      csvHTML += '</div>';
      document.querySelector("#popup-csv .csvs-holder").insertAdjacentHTML('beforeend',csvHTML);
      document.querySelector(".csv-holder #open-"+indx).addEventListener('click', (e) => ***REMOVED***
        // customAjax("/csvinfo/"+e.target.dataset.name+"/firstdate", 'GET').then(function(results) ***REMOVED***
        //   if(results.error == null)***REMOVED***
        //     isCSV = true;
        //     currentCSV = e.target.dataset.name;
        //     document.querySelector('.container.cells .cells').innerHTML = '';
        //     displayDayparts(results, DAYPARTS, DAYPARTCOLORS);
        //     hide('#popup-csv');
        //   ***REMOVED***else***REMOVED***
        //     Object.entries(results).map(msg => message(msg[0], msg[1]));
        //     hide('#popup-csv');
        //   ***REMOVED***
        // ***REMOVED***)
        customAjax("/csvinfo/"+e.target.dataset.name+"/dedicateds", 'GET').then(function(results) ***REMOVED***
          if(results.error == null)***REMOVED***
            isCSV = true;
            let saveTitles = document.querySelector('.container.dedicated .dcells .titles').innerHTML;
            document.querySelector('.container.dedicated .dcells').innerHTML = '';
            document.querySelector('.container.dedicated .dcells').insertAdjacentHTML('afterbegin','<div class="titles">'+saveTitles+'</div>');
            displayDedicated(results, DEDICATEDS);
          ***REMOVED***else***REMOVED***
            Object.entries(results).map(msg => message(msg[0], msg[1]));
          ***REMOVED***
        ***REMOVED***)
        customAjax("/csvinfo/"+e.target.dataset.name+"/dates", 'GET').then(function(results) ***REMOVED***
          if(results.error == null)***REMOVED***
            isCSV = true;
            currentCSV = e.target.dataset.name;
            document.querySelector('.container.cells .dates select').innerHTML = '';
            displayDaypartDates(results);
            hide('#popup-csv');
          ***REMOVED***else***REMOVED***
            Object.entries(results).map(msg => message(msg[0], msg[1]));
            hide('#popup-csv');
          ***REMOVED***
        ***REMOVED***)

      ***REMOVED***)

      document.querySelector(".csv-holder #delete-"+indx).addEventListener('click', (e) => ***REMOVED***
        doAFunction('delete_cvs',***REMOVED***'name': e.target.dataset.name, 'deleteid': e.target.id***REMOVED***);
      ***REMOVED***)
    ***REMOVED***)
    show('#popup-csv');
  ***REMOVED***)
***REMOVED***)


document.querySelector('#msg .close').addEventListener('click', () => ***REMOVED***
  hide('#msg');
***REMOVED***)

document.querySelector('#popup-csv .close').addEventListener('click', () => ***REMOVED***
  hide('#popup-csv');
***REMOVED***)


document.querySelector('#popup-settings .close').addEventListener('click', () => ***REMOVED***
  hide('#popup-settings');
***REMOVED***)

document.querySelector('.settings').addEventListener('click', () => ***REMOVED***
  show('#popup-settings');
***REMOVED***)

document.querySelector('#popup-crop .close').addEventListener('click', () => ***REMOVED***
  hide('#popup-crop');
  if(theCroppening != null && theCroppening != undefined)***REMOVED***
    theCroppening.destroy();
  ***REMOVED***
***REMOVED***)
document.querySelector('#popup-zips .close').addEventListener('click', () => ***REMOVED***
  hide('#popup-zips');
***REMOVED***)

document.querySelector('.current_imgs .do_zip input').addEventListener('keyup', (e) => ***REMOVED***
  let rawVal = document.querySelector('.current_imgs .do_zip input').value;
  let val = rawVal.trim();
  customAjax("/zipnames/"+val, 'GET').then(function(results) ***REMOVED***
      if(results == null)***REMOVED***
        document.querySelector('button[name="create_zip"]').removeAttribute('disabled');
      ***REMOVED***else***REMOVED***
        if(val != '')***REMOVED***
          message('error',['This zip already exists']);
        ***REMOVED***
        document.querySelector('button[name="create_zip"]').setAttribute('disabled', '');
      ***REMOVED***
  ***REMOVED***)
***REMOVED***)


function outputFullTemplate()***REMOVED***
  if(document.querySelector('.final-date').value == '')***REMOVED***
    alert('Please add a date');
    return;
  ***REMOVED***

  if(document.querySelector('.iteration').value == '')***REMOVED***
    alert('Please add an iteration');
    return;
  ***REMOVED***

  let itr = document.querySelector('.iteration').value;

  let html = '';
  document.querySelector('.container.output .content code').innerHTML = '';

  const allSlides = document.querySelectorAll('section.dayparts .daypart-preview .slide');
  allSlides.forEach(function(slide)***REMOVED***
    let slideInfo = slide.outerHTML;
    let brushup = slideInfo.replaceAll(/ style=".*"/gim,'');
    html += brushup;
  ***REMOVED***)
  let cleanFirst = html.replaceAll(/undefined/gim,'');
  let cleanSecond = cleanFirst.replaceAll(enviornment.url+'/','');
  let clean = cleanSecond.replaceAll(/\?(.*?)\"/gim,'"');

  let iterator = itr.toUpperCase();
  let place = getInterator(iterator);
  if(place == 1)***REMOVED***place = ''***REMOVED***;

  let temp = grabTemplate('final',
  // this callback is invoked AFTER the response arrives
  function () ***REMOVED***
    let d = document.querySelector('.final-date').value;
    let resp  = this.responseText;
    let q = resp.replaceAll('[date]',d);
    let r = q.replace('[slides]',specialCharacters(clean));
    // let encodedStr = r.replace(/[\u00A0-\u9999<>\&]/gim, function(i) ***REMOVED***
    //    return '&#'+i.charCodeAt(0)+';';
    // ***REMOVED***);

    let changeDate = d.split('-');
    let newDate = changeDate.join('');

    const c1 = '<pre><code>';
    const c2 = '</code></pre>';
    let code = '';
    let da = document.querySelector('.final-date').value;
    let pos = document.querySelector('.final-date').value;
    let getdatepieces = da.split('-');
    let fileDate = getdatepieces.join('');
    let displaydate = getdatepieces[0]+'/'+getdatepieces[1]+' dayparts';
    const amt = 5;
    let url = 'https://filtr.sonymusic.com/filtr/HPTO_'+fileDate+'_FV';
    let iframe = '<iframe src="'+url+place+'/" width="800" height="235" frameborder="0" scrolling="no"></iframe>';
    let encodedStrEmail = iframe.replace(/[\u00A0-\u9999<>\&]/gim, function(i) ***REMOVED***
       return '&#'+i.charCodeAt(0)+';';
    ***REMOVED***);

   let removeForLive = r.split('/editable/').join('');
   let encodedStrLive = removeForLive.replace(/[\u00A0-\u9999<>\&]/gim, function(i) ***REMOVED***
       return '&#'+i.charCodeAt(0)+';';
    ***REMOVED***);

    code += c1+displaydate+c2;
    code += '<pre><code class="iframe">'+encodedStrEmail+c2;
    code += c1+displaydate+c2;
    for(let i = 1; i <= amt; i++)***REMOVED***
      code += c1+url+'_'+iterator+i+'/'+c2;
    ***REMOVED***

    document.querySelector('.container.emailcode').setAttribute('data-title', getdatepieces[0]+'-'+getdatepieces[1]+'-'+getdatepieces[2]+'_dayparts');

    document.querySelector('.container.emailcode .code').insertAdjacentHTML('afterbegin',code );

    document.querySelector('.container.output .content code').insertAdjacentHTML('afterbegin',specialCharacters(encodedStrLive));

    document.querySelector('.container.output .content .copycode').insertAdjacentHTML('afterbegin',specialCharacters(removeForLive));

    data = ***REMOVED***
      'name':'HPTO_'+fileDate+'_FV',
      'iterator':document.querySelector('.iteration').value,
      'code':removeForLive,
      'textName' : document.querySelector('.container.emailcode').getAttribute('data-title'),
      'textInfo': document.querySelector('.container.emailcode .iframe').innerHTML

    ***REMOVED***;

    doAFunction('output_code',data);

  ***REMOVED***)
***REMOVED***

function doAFunction(action,data)***REMOVED***
  customAjax(`/function/$***REMOVED***action***REMOVED***`, 'POST', data).then(function(results) ***REMOVED***
    //console.log('results',results);
    if(results != null)***REMOVED***
      if("error" in results)***REMOVED***
        console.log(results);
        if(Object.keys(results.error).length === 0)***REMOVED***
          message('error','There is an error, but it is undefined');
        ***REMOVED***else***REMOVED***
          message('error',results.error);
        ***REMOVED***
        console.log(results.error);
        //let text = results.error.map((e, i) => e+": "+i);
        if(results.error == 'Your token has expired')***REMOVED***
          runFunctions['gather_images']('error');
        ***REMOVED***
      ***REMOVED***else***REMOVED***
        runFunctions[action](results);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

function getInterator(itr)***REMOVED***
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  let r = 0;
  alphabet.forEach(function(a, i)***REMOVED***
    if(a == itr)***REMOVED***
      r = i + 1;
      return;
    ***REMOVED***
  ***REMOVED***)
  return r;
***REMOVED***

function createDedicated(e)***REMOVED***
  let dedicated;
  let info = ***REMOVED******REMOVED***;
  if(e.target.classList.contains('daypart'))***REMOVED***
    e.target.classList.add('clicked');
    dedicated = e.target;
  ***REMOVED***
  if(e.target.classList.contains('cell'))***REMOVED***
    e.target.parentNode.classList.add('clicked');
    dedicated = e.target.parentNode;
  ***REMOVED***

  let cells = dedicated.childNodes;

  for (let i = 0; i < cells.length; i++) ***REMOVED***
    let type = cells[i].getAttribute('data-type');
    let txt = cells[i].textContent;
    let newinfo = ***REMOVED******REMOVED***;
    newinfo[type] = txt;
    info = ***REMOVED*** ...info, ...newinfo ***REMOVED***;
  ***REMOVED***
  outputDedicated(info)
***REMOVED***

function save_defaults()***REMOVED***
  let formData = new FormData(document.querySelector('.settings-form'));
  let creatArr = Array.from(formData.entries());
  let creatObj = Object.fromEntries(creatArr);
  customAjax('/function/add_default', 'POST', creatObj).then(function(results) ***REMOVED***
    Object.entries(results).map(msg => message(msg[0], msg[1]));
    if(results.success)***REMOVED***
       hide('#popup-settings');
    ***REMOVED***
  ***REMOVED***)
***REMOVED***

formElem.onsubmit = async (e) => ***REMOVED***
  e.preventDefault();
    let t = new FormData(formElem);
    for(let [name, value] of t) ***REMOVED***
      console.log(`$***REMOVED***name***REMOVED*** = $***REMOVED***value***REMOVED***`); // key1 = value1, then key2 = value2
      console.log(value);
    ***REMOVED***
//console.log(new FormData(formElem));
  let response = await fetch('/csv', ***REMOVED***
    method: 'POST',
    body: new FormData(formElem),
  ***REMOVED***);

  let result = await response.json();

  Object.entries(result).map(msg => message(msg[0], msg[1]));
  //message(Object.entries(result)[0],[Object.entries(result)[1]]);
***REMOVED***;

// async function upload_csv() ***REMOVED***
//   let formData = new FormData();
//   console.log(fileupload.files[0]);
//
//   formData.append("fileupload", fileupload.files[0]);
//   formData.append('_method', 'PATCH');
//   doAFunction("upload_csv",fileupload.files[0]);
//   doAFunction("upload_csv",formData);
//   // for(let [name, value] of formData) ***REMOVED***
//   //   console.log(`$***REMOVED***name***REMOVED*** = $***REMOVED***value***REMOVED***`); // key1 = value1, then key2 = value2
//   //   console.log(value);
//   // ***REMOVED***
// //  console.log(formData);
//   //   await fetch('/function/upload_csv', ***REMOVED***
//   //   method: "POST",
//   //   data: ***REMOVED***"u":"testu"***REMOVED***
//   // ***REMOVED***);
// ***REMOVED***

function updateViewArea(dayparts)***REMOVED***
  document.querySelector('.container.dayparts section.dayparts').innerHTML = '';
  let html = '';
  let templates;

  dayparts.forEach(function (day, indx) ***REMOVED***
    indx++;
    let headline = ''
    // let headline = day.querySelector('.headline').innerHTML;
    // headline = headline.trim();
    const part = day;
    // if(part.length == 1)***REMOVED***
    //   templates = [
    //     ['single-imgs', 'Single Image','singleimgs'],
    //     ['empty-link', 'Link Only, No Image','emptylink']
    //   ];
    // ***REMOVED***else if(part.length == 3)***REMOVED***
    //   templates = [['three-up', 'Header with Three Images','threeup']];
    // ***REMOVED***else if((headline == 'Headline: N/A' || headline == '' || headline == 'Headline: ' || headline == 'Headline:') && part.length !== 1)***REMOVED***
    //   headline = '';
    //   templates = [
    //     ['no-lines-larger-imgs', 'No header with Full Text','nolineslargerimgs'],
    //     ['animated-imgs', 'No header with Full Text, Animated','animatedimgs'],
    //   ];
    // ***REMOVED***else***REMOVED***
    //   templates = [
    //     ['','Original','original'],
    //     ['one-line-lrg-images','Large Images No Text','onelinelrgimages'],
    //     ['slightly-larger-center-imgs', 'Header with Full Text', 'slightlylargercenterimgs'],
    //   ];
    // ***REMOVED***
    templates = [
      ['hover-text-no-headline','Hover Text No Headline','hover-text-no-headline'],
      ['animated-imgs', 'No header with Full Text, Animated','animatedimgs'],
      ['no-lines-larger-imgs', 'No header with Full Text','nolineslargerimgs'],
      ['slider', 'Slider','slider'],
      ['hover-text', 'Hover Text','hover-text'],
      ['tv', 'TV','tv']
    ];
    buildDaypart(part, templates, headline, indx);
  ***REMOVED***)

  show('.container.dayparts');
***REMOVED***

function buildDaypart(daypart, templates, headline, slideNum)***REMOVED***
  let html = '';

  let temp = grabTemplate(templates[0][2],
  //this callback is invoked AFTER the response arrives
  function () ***REMOVED***
    let resp  = this.responseText;

    resp = useTemplate(resp, daypart, slideNum, headline);

    //depending on when item comes back it may be inserted at the incorrect place
    const parentContainer = document.querySelector('.container.dayparts section.dayparts');

    const checkArray = [1,2,3,4];
    const times = ['12AM - 7:59AM','8AM - 11:59AM','12PM - 3:59PM','4PM - 7:59PM','8PM - 11:59PM'];
    let inThere = [];
    checkArray.forEach(function(pos)***REMOVED***
      const selector = document.querySelector('.daypart-preview.'+inWords(pos));
      if(parentContainer.contains(selector))***REMOVED***
        inThere.push(pos);
      ***REMOVED***
    ***REMOVED***)
    inThere.push(slideNum);
    inThere.sort(function(a, b)***REMOVED***return a - b***REMOVED***);

    let posit = inThere.indexOf(slideNum);
    let prevNum = posit - 1;
    if(prevNum < 0) prevNum = 0;
      html += '<div class="daypart-preview '+inWords(slideNum)+'">'+resp+'</div>';
      parentContainer.insertAdjacentHTML('beforeend',html);
      if(templates.length > 1)***REMOVED***
        let area = document.querySelector('.container.dayparts section.dayparts .daypart-preview.'+inWords(slideNum));
        let opts = createSelect(templates, inWords(slideNum)+"change-template", '', ***REMOVED***'data-pos':slideNum***REMOVED***);
        area.insertAdjacentHTML('afterbegin','<div class="top"><span>'+times[slideNum - 1]+'</span></div>');
        let top = document.querySelector('.container.dayparts section.dayparts .daypart-preview.'+inWords(slideNum)+' .top');
        top.prepend(opts);
        
        opts.addEventListener('change', (e) => ***REMOVED***
          const dNum = e.target.getAttribute('data-pos');
          const daypart = document.querySelectorAll('.container.cells .cells .dayparts')[dNum-1];
          let headline = '';
          area = document.querySelector('.container.dayparts section.dayparts .daypart-preview.'+inWords(dNum));
          if(e.target.value == 'slider')***REMOVED***
            let origInfo = document.querySelector('.container.cells .cells .dayparts:nth-of-type('+dNum+')');
            let imgLngth = origInfo.childElementCount;
            let startImgHere = 0;
            if(dNum == 1)***REMOVED***
              startImgHere = 1;
            ***REMOVED***else***REMOVED***
              startImgHere = (imgLngth * (dNum - 1)) + 1;
            ***REMOVED***
            let temp = grabTemplate('album-container',
              function () ***REMOVED***
                let respF = "";
                let resp  = this.responseText;
                for (let r = 1; r <= imgLngth; r++)***REMOVED***
                  let daypart = [];
                  let info = document.querySelector('.container.cells .cells .dayparts:nth-of-type('+dNum+') .daypart:nth-of-type('+r+')');
                  for (let s = 1; s <= info.childElementCount; s++)***REMOVED***
                    let cell = document.querySelector('.container.cells .cells .dayparts:nth-of-type('+dNum+') .daypart:nth-of-type('+r+') .cell_'+s);
                    daypart.push(cell.innerText);
                  ***REMOVED***
                  respF += midTemplate(resp, daypart, startImgHere);
                  startImgHere++;
                ***REMOVED***

                let fullTemp = grabTemplate('slider',
                function () ***REMOVED***
                  let respC  = this.responseText;
                  area.querySelector('.slide').remove();
                  addfullTemp = dumpAlbumSet(respC, respF, dNum, document.querySelector('.container.cells .cells .dayparts:nth-of-type('+dNum+') .daypart:nth-of-type(1) .cell_6').innerText);
                  area.insertAdjacentHTML('beforeend',addfullTemp);
                  sliderFuncSet(inWords(dNum));

                ***REMOVED***)
              ***REMOVED***
            )
          ***REMOVED***else***REMOVED***
            let temp = grabTemplate(e.target.value,
              function () ***REMOVED***
                let resp  = this.responseText;
                //console.log(resp);
                parts = [];
                let selection = daypart.querySelectorAll('.daypart');
                for (var i = 0; i < selection.length; i++)***REMOVED***
                  let piece = selection[i].querySelectorAll('div');
                  part = [];
                  for (var y = 0; y < piece.length; y++)***REMOVED***
                    part.push(piece[y].textContent);
                  ***REMOVED***
                  parts.push(part);
                ***REMOVED***
                area.querySelector('.slide').remove();
                resp = useTemplate(resp, parts, dNum, headline);
                area.insertAdjacentHTML('beforeend',resp);
              ***REMOVED***
            )
          ***REMOVED***
        ***REMOVED***)
      ***REMOVED***
  ***REMOVED***);
***REMOVED***

function createSelect(options, classes = '', id = '', attributes = ***REMOVED******REMOVED***)***REMOVED***
  let select = document.createElement("SELECT");
  if(id != undefined && id != '')***REMOVED***
     select.id = id;
  ***REMOVED***
  if(classes != undefined && classes != '')***REMOVED***
    select.className = classes;
  ***REMOVED***
  for (var i = 0; i < options.length; i++) ***REMOVED***
    var option = document.createElement("OPTION");
    option.value = options[i][2];
    option.text = options[i][1];
    select.appendChild(option);
  ***REMOVED***
  if(attributes != undefined && attributes != '')***REMOVED***
    for (let [key, value] of Object.entries(attributes)) ***REMOVED***
      select.setAttribute(key, value);
    ***REMOVED***
  ***REMOVED***
  return select;
***REMOVED***

function midTemplate(resp, day, img)***REMOVED***
  resp = resp.replace("[PLAYLIST URI]", day[4]);
  resp = resp.replace("[PLAYLIST NAME]", day[0]);
  resp = resp.replace("[IMAGE]", '/images/cover'+img+'.jpg');
  let wordCheck = day[2];
  if(wordCheck != '')***REMOVED***
    let copy = wordCheck.split('Copy:');
    let words = copy[1].split('||');
    resp = resp.replace("[TEXT LINE 1]", htmlEntities(words[0].trim()));
    if(words[1] != undefined)***REMOVED***
      resp = resp.replace("[TEXT LINE 2]", htmlEntities(words[1].trim()));
    ***REMOVED***else***REMOVED***
      resp = resp.replace("[TEXT LINE 2]", '&nbsp;');
    ***REMOVED***
    if(words[2] != undefined)***REMOVED***
      resp = resp.replace("[TEXT LINE 3]", htmlEntities(words[2].trim()));
    ***REMOVED***else***REMOVED***
      resp = resp.replace("[TEXT LINE 3]", '&nbsp;');
    ***REMOVED***
  ***REMOVED***

  return resp;
***REMOVED***

function dumpAlbumSet(newTemplate, templatedData, dNum, uri)***REMOVED***
  resp = newTemplate.replace("[PLAYLIST URI]", uri);
  resp = resp.replace("[SLIDE NUMBER]", inWords(dNum));
  resp = resp.replace("[SLIDES]", templatedData);
  return resp;
***REMOVED***

function useTemplate(resp, daypart, slideNum, headline)***REMOVED***
  slideNum = parseInt(slideNum);
  let img;
  switch(slideNum) ***REMOVED***
    case 1:
      img = 1;
      break;
    case 2:
      img = 5;
      break;
    case 3:
      img = 9;
      break;
    case 4:
      img = 13;
      break;
    case 5:
      img = 17;
      break;
    default:
      img = 1;
  ***REMOVED***

  resp = resp.replace("[SLIDE NUMBER]", inWords(slideNum));
  if(headline == '' || headline == 'Headline: N/A' || headline == 'Headline: ' || headline == 'Headline:')***REMOVED***
    headline = '';
  ***REMOVED***else***REMOVED***
    resp = resp.replace("[HEADLINE]", headline);
  ***REMOVED***
  resp = resp.replace("[PLAYLIST URI MAIN]", daypart[0][5]);
  resp = resp.replace("[PLAYLIST NAME MAIN]", 'Background Click Playlist');

  daypart.forEach(function (day, indx) ***REMOVED***
    // console.log(img);
    // let test = img;
    // if(test.toString().includes('/'))***REMOVED***
    //   let imgParts = test.split('/');
    //   let urlEnd = imgParts[imgParts.length - 1].split('?t=');
    //   console.log(urlEnd[0]);
    // ***REMOVED***
    indx++;
    resp = resp.replace("[PLAYLIST URI "+indx+"]", day[4]);
    resp = resp.replace("[PLAYLIST NAME "+indx+"]", day[0]);
    resp = resp.replaceAll("[IMAGE "+indx+"]", '/editable/images/cover'+img+'.jpg');
    let wordCheck = day[2];
    if(wordCheck != '')***REMOVED***
      let copy = wordCheck.split('Copy:');
      let words = copy[1].split('||');
      resp = resp.replace("[TEXT LINE 1 "+indx+"]", htmlEntities(words[0].trim()));
      if(words[1] != undefined)***REMOVED***
        resp = resp.replace("[TEXT LINE 2 "+indx+"]", htmlEntities(words[1].trim()));
      ***REMOVED***else***REMOVED***
        resp = resp.replace("[TEXT LINE 2 "+indx+"]", '&nbsp;');
      ***REMOVED***
      if(words[2] != undefined)***REMOVED***
        resp = resp.replace("[TEXT LINE 3 "+indx+"]", htmlEntities(words[2].trim()));
      ***REMOVED***else***REMOVED***
        resp = resp.replace("[TEXT LINE 3 "+indx+"]", '&nbsp;');
      ***REMOVED***
    ***REMOVED***
    img++;
  ***REMOVED***)
  return resp;
***REMOVED***

function runCropStudio(img)***REMOVED***
  document.querySelector('#popup-crop .image-holder').innerHTML = '';
  let getImg = img.target.src;
  let imsplt = getImg.split('/');
  let imgName = imsplt[imsplt.length - 1];
  curCrop = img.target.id;

  show('#popup-crop');

  theCroppening = new Croppie(document.querySelector('#popup-crop .image-holder'), ***REMOVED***
    showZoomer: true,
    viewport: ***REMOVED***
      width: 250,
      height: 250,
      type: 'square'
    ***REMOVED***,
    enableResize: false,
    boundary: ***REMOVED*** width: 600, height: 600 ***REMOVED***,
  ***REMOVED***);

  theCroppening.bind(***REMOVED***
    url: getImg,
    point: [0,0,0,0]
  ***REMOVED***);

  document.querySelector('.crop_image').addEventListener('click', function (ev) ***REMOVED***
    if(curCrop == img.target.id)***REMOVED***
      console.log(curCrop+' '+img.target.id);
      theCroppening.result(***REMOVED***
        type: 'base64',
        format: 'jpeg',
      ***REMOVED***).then(function (blob) ***REMOVED***
        sendImg = ***REMOVED***
          'img' : imgName,
          'imgNew' : blob,
          'replace': img.target.id
        ***REMOVED***
        doAFunction('crop_image',sendImg);
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***,***REMOVED*** once: true ***REMOVED***);
***REMOVED***

function copyToClipboard(text) ***REMOVED***
    if (window.clipboardData && window.clipboardData.setData) ***REMOVED***
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    ***REMOVED***
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) ***REMOVED***
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try ***REMOVED***
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        ***REMOVED***
        catch (ex) ***REMOVED***
            console.warn("Copy to clipboard failed.", ex);
            return false;
        ***REMOVED***
        finally ***REMOVED***
            document.body.removeChild(textarea);
        ***REMOVED***
    ***REMOVED***
***REMOVED***

document.querySelector('.csv-checkbox').addEventListener('change', (e) => ***REMOVED***
  if(e.target.checked == true)***REMOVED***
    show('.csv-info');
  ***REMOVED***else***REMOVED***
    hide('.csv-info');
  ***REMOVED***
***REMOVED***)



document.querySelector('.choose_sheet select').addEventListener('change', () => ***REMOVED***
  let t = document.querySelector('.choose_sheet select');
  customAjax("/refresh/"+t.value, 'GET').then(function(results) ***REMOVED***
    addSheetTabs('.choose_tab select',results.tabTitles);
  ***REMOVED***)
***REMOVED***);

/////////////////////////////// SLIDER ACTIONS /////////////////////////////////////////


var slideOnThisOne, slideOnThisTwo, slideOnThisThree, slideOnThisFour, slideOnThisFive;
const intervals = ***REMOVED***one:slideOnThisOne,two:slideOnThisTwo, three:slideOnThisThree, four:slideOnThisFour, five:slideOnThisFive***REMOVED***;

function sliderFuncSet(slideNUm)***REMOVED***
  //copy all slides and add to the end
  //moveSlider(slideNUm);
      

  document.querySelector('.container .slider.'+slideNUm).addEventListener('mouseover', function()***REMOVED***
    clearInterval(intervals[slideNUm]);
  ***REMOVED***)

  document.querySelector('.container .slider.'+slideNUm).addEventListener('mouseleave', function()***REMOVED***
    startAfterPause(slideNUm);
  ***REMOVED***)

***REMOVED***

function startAfterPause(num) ***REMOVED***
  setTimeout(num => ***REMOVED***
    moveSlider(num);
    intervals[num] = setInterval(
      () => moveSlider(num),
      5000
    );
  ***REMOVED***,500,num)
***REMOVED***

  function moveSlider(slideNUm)***REMOVED***
    var unit = document.querySelector('.slider.'+slideNUm+' .album-container').offsetWidth;

    var elem = document.querySelector('.slider.'+slideNUm+' .content');
    var left = '-170px'; //getPropertyVal(elem,'left');
    var width = getPropertyVal(elem,'width');
    var newLeft = -360; //(parseInt(left) - unit) - 10;
    var newWidth = (parseInt(width) - unit) - 10;
    elem.style.left = newLeft+'.px';
    elem.style.transitionDuration = '';

    //transition duration 0.8s set in css
    setTimeout(() => ***REMOVED***
      elem.style.transitionDuration = '0s';
      var moveLast = document.querySelector('.slider.'+slideNUm+' .album-container:first-of-type').innerHTML;
      document.querySelector('.slider.'+slideNUm+' .album-set').insertAdjacentHTML('beforeend', '<div class="album-container">'+moveLast+'</div>');
      document.querySelector('.slider.'+slideNUm+' .album-container:first-of-type').remove();
      elem.style.left = left;
    ***REMOVED***,800);

  ***REMOVED***

  function getPropertyVal(elem,property)***REMOVED***
    return window.getComputedStyle(elem,null).getPropertyValue(property);
  ***REMOVED***
