chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getIPAddresses") {

    const iocextract = require('iocextract');
    const text = request.text;
    const ipAddresses = iocextract.IP(text);

    chrome.tabs.sendMessage(sender.tab.id, { action: "displayIPAddresses", ipAddresses: ipAddresses });
  }
});
