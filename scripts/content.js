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
  // TODO: mvp: send the current page url
  // have the native extension receive inputs

  DEFAULT_WEBPAGE_URLS = [document.location.href];
  DEFAULT_COUNT = 1; // how many local files to choose
  const body = {
    env_vars: {
      WEBPAGE_URLS: DEFAULT_WEBPAGE_URLS
    },
    "-c": DEFAULT_COUNT,
  }
  // DEFAULT_COUNT = 0; // how many local files to choose
  // DEFAULT_LOCAL_FILE_PATHS = ["/Users/bernadette/Downloads/Bernadette Davis Professional Resume Long.pdf"]; // TODO: persist this value in the extension because the resume will likely be reused. CRUD
  // DEFAULT_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = "output"; // TODO: make gui in chrome extension to set this value.
  // DEFAULT_OUTPUT_DIRECTORY = "/Users/bernadette/Downloads";
  // DEFAULT_TOGGLE_FLAGS = "ox"; // -o open combined; -x delete downloaded if both download and combine occurred
  // DEFAULT_WEBPAGE_URLS = [document.location.href];

  // const body = {
  //   env_vars: {
  //     LOCAL_FILE_PATHS: DEFAULT_LOCAL_FILE_PATHS, // -l and ignores -c
  //     WEBPAGE_URLS: DEFAULT_WEBPAGE_URLS, // -w and overwrites url_args
  //     OUTPUT_DIRECTORY: DEFAULT_OUTPUT_DIRECTORY, // or -d; can omit -d flag in the body here
  //   },
  //   TOGGLE_FLAGS: DEFAULT_TOGGLE_FLAGS,
  //   "-n": DEFAULT_OUTPUT_FILE_NAME_WITHOUT_EXTENSION,
  //   "-c": DEFAULT_COUNT,
  // };
  console.log(`Sending:  ${body}`);
  port.postMessage(body);
  // port.postMessage("ping");
});
