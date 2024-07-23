chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension successfully installed!');
  // Perform some actions on installation, e.g., setting default settings
  chrome.storage.local.set({enabled: true}, function() {
      console.log("Extension is enabled by default.");
  });
});

// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.command == "logPII") {
          console.log("PII detected: ", request.data);
          sendResponse({result: "Data logged"});
      }
      return true;  // Indicate that you wish to send a response asynchronously (important if response will be delayed)
  }
);

// Example to use a command or to trigger actions from the background
chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle-pii") {
      chrome.storage.local.get('enabled', function(data) {
          let currentState = data.enabled;
          chrome.storage.local.set({enabled: !currentState}, function() {
              console.log('Extension enabled state is now:', !currentState);
          });
      });
  }
});
