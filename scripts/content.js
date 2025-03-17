(function(){
  console.log("content ran");
  


  const handleMessages = (message, sender, sendResponse) => {
    console.log("handleMessages ran");
    
    console.log("message", message);
    sendResponse("OK");
  }
  
  chrome.runtime.onMessage.addListener(handleMessages);
  
  /*
  When submit is triggered, send the app a message.
  */
  const submit = () => {
    // if (fcnTodoRename === undefined) {
    //   return;
    // }
  
    // fcnTodoRename({ping: "ping"});
  
    
    
      // TODO: mvp: send the (url, resume local file, open, and delete) request
    
      // DEFAULT_COUNT = 1; // how many local files to choose
      // DEFAULT_LOCAL_FILE_PATHS = ["/Users/<username-for-mac>/Downloads/Resume.pdf"]; // resume file path // TODO: persist this value in the extension because the resume will likely be reused. CRUD
      // DEFAULT_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = "output"; // combined file name // TODO: make gui in chrome extension to set this value.
      // DEFAULT_OUTPUT_DIRECTORY = "./outputs"; // destination for generated files
      // DEFAULT_WEBPAGE_URLS = [document.location.href]; // webpages to convert to pdf, download, and combine
    
      // // // DEFAULT_WEBPAGE_URLS = [document.location.href];
      // // // const DEFAULT_COUNT = 1; // how many local files to choose
      // // // const SUPPLIED_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = undefined;
      // // // const SUPPLIED_LOCAL_FILE_PATHS = undefined || []; // TODO: persist this value in the extension because the resume will likely be reused. CRUD
      const SUPPLIED_LOCAL_FILE_PATHS = []; // TODO: persist this value in the extension because the resume will likely be reused. CRD required
      const body = {
        app: "ats_beater",
        // env vars that should be set before the cli tool processes this.
        env_vars: {
          WEBPAGE_URLS: [document.location.href],
          OUTPUT_DIRECTORY: "./outputs",
        },
        // "-d": "./outputs", // Set body.env_vars.OUTPUT_DIRECTORY instead.
        // "-n": SUPPLIED_OUTPUT_FILE_NAME_WITHOUT_EXTENSION,
        "-n": `${document.title} resume`,
        "-o": true,
        "-x": true,
      }
    
      // set -c if select resume selected option is choose new resume
      if (SUPPLIED_LOCAL_FILE_PATHS.length === 0) {
        body["-c"] = 1;
      } else {
        body.env_vars.LOCAL_FILE_PATHS = SUPPLIED_LOCAL_FILE_PATHS;
      }
    
      console.log("Sending:");
      console.log(body);
      chrome.runtime.sendMessage(body, (response) => {
        // 3. Got an asynchronous response with the data from the service worker
        console.log('received response:');
        console.log(response);
      });
  };
  
  submit();
  })();
