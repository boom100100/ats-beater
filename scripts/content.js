(function(){
  console.log("content ran");
  
  chrome.runtime.sendMessage({
    href: document.location.href,
    title: document.title
  }, (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.log('received', response);
  });
  
  /*
  When submit is triggered, send the app a message.
  */
  const submit = () => {
    // if (fcnTodoRename === undefined) {
    //   return;
    // }
  
    // fcnTodoRename({ping: "ping"});
  
    
    
    // // console.log("submit");
    //   // TODO: does it work: send the current page url, 
    //     // hardcode required values
    //   // TODO: mvp: send the (url, resume local file, open, and delete) request
    //     // have the native extension receive inputs
    
    //   // DEFAULT_COUNT = 1; // how many local files to choose
    //   // DEFAULT_LOCAL_FILE_PATHS = ["/Users/bernadette/Downloads/Bernadette Davis Professional Resume Long.pdf"]; // resume file path // TODO: persist this value in the extension because the resume will likely be reused. CRUD
    //   // DEFAULT_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = "output"; // combined file name // TODO: make gui in chrome extension to set this value.
    //   // DEFAULT_OUTPUT_DIRECTORY = "/Users/bernadette/Downloads"; // destination for generated files
    //   // DEFAULT_WEBPAGE_URLS = [document.location.href]; // webpages to convert to pdf, download, and combine
    
    //   // // // DEFAULT_WEBPAGE_URLS = [document.location.href];
    //   // // // const DEFAULT_COUNT = 1; // how many local files to choose
    //   // // // const SUPPLIED_OUTPUT_FILE_NAME_WITHOUT_EXTENSION = undefined;
    //   // // // const SUPPLIED_LOCAL_FILE_PATHS = undefined || []; // TODO: persist this value in the extension because the resume will likely be reused. CRUD
    //   const SUPPLIED_LOCAL_FILE_PATHS = []; // TODO: persist this value in the extension because the resume will likely be reused. CRUD
    //   const body = {
    //     env_vars: {
    //       WEBPAGE_URLS: [document.location.href],
    //     },
    //     // "-n": SUPPLIED_OUTPUT_FILE_NAME_WITHOUT_EXTENSION,
    //     "-n": `${document.title} resume`,
    //     "-o": true,
    //     "-x": true,
    //   }
    
    //   // set -c if select resume selected option is choose new resume
    //   if (SUPPLIED_LOCAL_FILE_PATHS.length === 0) {
    //     body["-c"] = 1;
    //   } else {
    //     body.env_vars.LOCAL_FILE_PATHS = ["/Users/bernadette/Downloads/Bernadette Davis Professional Resume Long.pdf"];
    //   }
    
    //   console.log(`Sending:  ${body}`);
    //   port.postMessage(body);
  };
  
  submit();
  })();
