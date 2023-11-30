//the time specified is for the entire hour
// <= 11 is less than or equal to 11:59
var time = new Date().getHours();
if (time <= 7) ***REMOVED***
 $('.one').show();
***REMOVED*** else if (time > 7 && time <= 11) ***REMOVED***
 $('.two').show();
***REMOVED*** else if (time > 11 && time <= 15) ***REMOVED***
 $('.three').show();
***REMOVED*** else if (time > 15 && time <= 19) ***REMOVED***
 $('.four').show();
***REMOVED*** else if (time > 19) ***REMOVED***
 $('.five').show();
***REMOVED***
