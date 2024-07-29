// This script runs in the background and can interact with different parts of the browser.

try {
  // Listening for the extension being installed
  chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension installed successfully!");

    // You can perform other background tasks here
    // For example, setting up alarms, initializing storage, etc.
  });

  // Listen for messages from content scripts or popup
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "checkInput") {
        console.log("Checking input from content script...");
        // Process the request or forward it, then send a response
        sendResponse({result: "Processed"});
      }
    }
  );
} catch (e) {
  console.error("Error in background script:", e);
}

