chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received: ', message);
  // 2. A page requested  data, respond with that data
  if (message["-n"] !== " resume") {
    chrome.runtime.sendNativeMessage(
      'com.automatedbooks.convert_and_combine_pdfs',
      message,
      function (sendNativeMessageResponse) {
        // `.query` waits for the content script to be available.
        // `.send` sends the message.
        chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {sendNativeMessageResponse}, function(sendMessageResponse) {
              console.log(sendMessageResponse);
          });
        });
        console.log('Received ' + sendNativeMessageResponse);
      }
    );
    sendResponse(`${message.title}\n${message.href}`);
    return true;
  }
  sendResponse("The message is incomplete.");
  return true;
});


chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["scripts/content.js"],
  });
});
