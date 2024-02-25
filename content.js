function extractIPAddresses(text) {

  var ipRegex = /\b\d{1,3}(\[\.\]|\.)\d{1,3}(\[\.\]|\.)\d{1,3}(\[\.\]|\.)\d{1,3}\b/g;
  return text.match(ipRegex) || [];
}

function extractMD5Hashes(text) {
  var md5Regex = /\b[a-fA-F0-9]{32}\b/g;
  return text.match(md5Regex) || [];
}

function extractDomains(text) {
  var domainRegex = /\b(((http[s]?|ftp|hxxp[s]?):\/\/)|www|(\w+(\.|\[\.\])\w+))\S+\b/g;
  return text.match(domainRegex) || [];
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getInfo") {
    var text = document.body.innerText;
    sendResponse({
      ipAddresses: extractIPAddresses(text),
      md5Hashes: extractMD5Hashes(text),
      domains: extractDomains(text)
    });
  }
});
