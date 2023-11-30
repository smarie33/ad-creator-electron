// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => ***REMOVED***
  const replaceText = (selector, text) => ***REMOVED***
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  ***REMOVED***

  for (const type of ['chrome', 'node', 'electron']) ***REMOVED***
    replaceText(`$***REMOVED***type***REMOVED***-version`, process.versions[type])
  ***REMOVED***
***REMOVED***)
