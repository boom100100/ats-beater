// console.log(tab);
// console.log("continuing setup");
/*
On startup, connect to the "com.automatedbooks.convert_and_combine_pdfs" app.
*/
// let port = browser.runtime.connectNative("com.automatedbooks.convert_and_combine_pdfs");
// let port = chrome.runtime.connectNative("/Users/bernadette/Desktop/github/convert_and_combine_pdfs/convert_and_combine_pdfs.sh");
// let port = chrome.runtime.connectNative("com.automatedbooks.convert_and_combine_pdfs");
// let port = chrome.runtime.connectNative("com.automatedbooks.convert_and_combine_pdfs");
// const port = {
//   onMessage: { addListener: (arg) => arg},
//   onDisconnect: { addListener: (arg) => arg},
//   postMessage: (arg) => console.log(arg),
// }

// let port; 
// // port = chrome.runtime.connectNative("com.automatedbooks.convert_and_combine_pdfs");
// if (!port) {
//   // this will run the first time to launch the native host, and save the connection to that instance in the port
//   console.log(chrome);
//   // console.log();
//   // port = chrome.runtime.connect('com.automatedbooks.convert_and_combine_pdfs');
//   port = chrome.runtime.connect('fccgofolnpapjidppgokhjpbfkmbangp');
//   // port = chrome.runtime.connectNative('com.automatedbooks.convert_and_combine_pdfs');
// }









// /*
// Listen for messages from the app and log them to the console.
// */
// port.onMessage.addListener((response) => {
//   console.log("Received: " + response);
// });

// /*
// Listen for the native messaging port closing.
// */
// port.onDisconnect.addListener((port) => {
//   if (port.error) {
//     console.log(`Disconnected due to an error: ${port.error.message}`);
//   } else {
//     // The port closed for an unspecified reason. If this occurred right after
//     // calling `browser.runtime.connectNative()` there may have been a problem
//     // starting the the native messaging client in the first place.
//     // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#troubleshooting
//     console.log(`Disconnected`, port);
//   }
// });

chrome.action.onClicked.addListener(async (tab) => {
  // `.query` waits for the content script to be available.
  // `.send` sends the message.
  chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {port: "sm"}, function(response) {
        console.log(response);
    });
  }); 
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["scripts/content.js"],
  });
});
