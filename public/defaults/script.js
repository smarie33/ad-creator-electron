var runThis;
var time = new Date().getHours();
if (time <= 7) ***REMOVED***
 $('.one').show();
 runThis = 'one';
***REMOVED*** else if (time > 7 && time <= 11) ***REMOVED***
 $('.two').show();
 runThis = 'two';
***REMOVED*** else if (time > 11 && time <= 15) ***REMOVED***
 $('.three').show();
 runThis = 'three';
***REMOVED*** else if (time > 15 && time <= 19) ***REMOVED***
 $('.four').show();
 runThis = 'four';
***REMOVED*** else if (time > 19) ***REMOVED***
 $('.five').show();
 runThis = 'five';
***REMOVED***

if(document.querySelector('.slide.slider.'+runThis) != null)***REMOVED***
  var slideOnThisOne, slideOnThisTwo, slideOnThisThree, slideOnThisFour, slideOnThisFive;
  const intervals = ***REMOVED***one:slideOnThisOne,two:slideOnThisTwo, three:slideOnThisThree, four:slideOnThisFour, five:slideOnThisFive***REMOVED***;

  startAfterPause(runThis);
  document.querySelector('.container .slider.'+runThis).addEventListener('mouseover', function()***REMOVED***
    clearInterval(intervals[runThis]);
  ***REMOVED***)

  document.querySelector('.container .slider.'+runThis).addEventListener('mouseleave', function()***REMOVED***
    startAfterPause(runThis);
  ***REMOVED***)

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
    var left = '-170px' //getPropertyVal(elem,'left');
    var width = getPropertyVal(elem,'width');
    var newLeft = -360; //(parseInt(left) - unit) - 10;
    var newWidth = (parseInt(width) - unit) - 10;
    elem.style.left = newLeft+'.px';
    elem.style.transitionDuration = '';
    setTimeout(() => ***REMOVED***
      elem.style.transitionDuration = '0s';
      var moveLast = document.querySelector('.slider.'+slideNUm+' .album-container:first-of-type').innerHTML;
      document.querySelector('.slider.'+slideNUm+' .album-container:first-of-type').remove();
      document.querySelector('.slider.'+slideNUm+' .album-set').insertAdjacentHTML('beforeend', '<div class="album-container">'+moveLast+'</div>');
      elem.style.left = left;
    ***REMOVED***,800);
  ***REMOVED***

  function getPropertyVal(elem,property)***REMOVED***
    return window.getComputedStyle(elem,null).getPropertyValue(property);
  ***REMOVED***

***REMOVED*** //does not equal null
