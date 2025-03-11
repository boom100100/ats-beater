/*
On startup, connect to the "com.automatedbooks.convert_and_combine_pdfs" app.
*/
let port = browser.runtime.connectNative("com.automatedbooks.convert_and_combine_pdfs");

/*
Listen for messages from the app and log them to the console.
*/
port.onMessage.addListener((response) => {
  console.log("Received: " + response);
});

/*
Listen for the native messaging port closing.
*/
port.onDisconnect.addListener((port) => {
  if (port.error) {
    console.log(`Disconnected due to an error: ${port.error.message}`);
  } else {
    // The port closed for an unspecified reason. If this occurred right after
    // calling `browser.runtime.connectNative()` there may have been a problem
    // starting the the native messaging client in the first place.
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#troubleshooting
    console.log(`Disconnected`, port);
  }
});

/*
When the extension's action icon is clicked, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {
  // TODO: does it work: send the current page url, 
    // hardcode required values
  // TODO: mvp: send the (url, resume local file, open, and delete) request
    // have the native extension receive inputs

  // DEFAULT_COUNT = 1; // how many local files to choose
  // DEFAULT_LOCAL_FILE_PATHS = ["/Users/bernadette/Downloads/Bernadette Davis Professional Resume Long.pdf"]; // resume file path // TODO: persist this value in the extension because the resume will likely be reused. CRUD
  // DEFAULT_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = "output"; // combined file name // TODO: make gui in chrome extension to set this value.
  // DEFAULT_OUTPUT_DIRECTORY = "/Users/bernadette/Downloads"; // destination for generated files
  // DEFAULT_WEBPAGE_URLS = [document.location.href]; // webpages to convert to pdf, download, and combine

  // // // DEFAULT_WEBPAGE_URLS = [document.location.href];
  // // // const DEFAULT_COUNT = 1; // how many local files to choose
  // // // const SUPPLIED_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = undefined;
  // // // const SUPPLIED_LOCAL_FILE_PATHS = undefined || []; // TODO: persist this value in the extension because the resume will likely be reused. CRUD
  const body = {
    env_vars: {
      WEBPAGE_URLS: [document.location.href],
    },
    // "-n": SUPPLIED_OUTPUT_FILE_NAME_WITHOUT_EXTENSION,
    "-n": `${document.title} resume`,
    "-o": true,
    "-x": true,
  }
  
  // set -c if select resume selected option is new resume
  if ([].length === 0) {
    body["-c"] = 1;
  } else {
    body.env_vars.LOCAL_FILE_PATHS = ["/Users/bernadette/Downloads/Bernadette Davis Professional Resume Long.pdf"];
  }

  console.log(`Sending:  ${body}`);
  port.postMessage(body);
  // port.postMessage("ping");
});
