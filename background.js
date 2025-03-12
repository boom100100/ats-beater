chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received: ', message);
  // 2. A page requested  data, respond with that data
  if (message.title) {
    // gotta fix native host has exited
    chrome.runtime.sendNativeMessage(
      'com.automatedbooks.convert_and_combine_pdfs',
      {ping: "ping"},
      function (response) {
        console.log('Received ' + response);
      }
    );
    sendResponse(`${message.title}\n${message.href}`);
    return true;
  }
  return true;
});


chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ["scripts/content.js"],
  });
});
