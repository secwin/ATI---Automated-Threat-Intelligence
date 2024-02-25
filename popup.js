document.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getInfo" }, function (response) {
            displayInfo(response.ipAddresses, response.md5Hashes, response.domains);

            document.getElementById('exportBtn').addEventListener('click', function () {
                exportToCSV(response.ipAddresses, response.md5Hashes, response.domains);
            });
        });
    });
});

function displayInfo(ipAddresses, md5Hashes, domains) {
  var ipList = document.getElementById('ipList');
  var md5List = document.getElementById('md5List');
  var domainList = document.getElementById('domainList');

  displayItems(ipList, "IP Addresses", ipAddresses);
  displayItems(md5List, "MD5 Hashes", md5Hashes);
  displayItems(domainList, "Domains+Files", domains);
  
  var exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export to CSV';
    exportBtn.id = 'exportBtn';
    document.body.appendChild(exportBtn);
}

function displayItems(listElement, title, items) {
  if (items.length > 0) {
    var titleElement = document.createElement('h2');
    titleElement.textContent = title;
    listElement.appendChild(titleElement);

    items.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = item;
      listElement.appendChild(li);
    });
  } else {
    var li = document.createElement('li');
    li.textContent = "No " + title.toLowerCase() + " found on Twitter.";
    listElement.appendChild(li);
  }
}






function exportToCSV(ipAddresses, md5Hashes, domains) {
    var csvContent = "data:text/csv;charset=utf-8,";

    csvContent += "IP Addresses,MD5 Hashes,Domains\n";

    for (var i = 0; i < Math.max(ipAddresses.length, md5Hashes.length, domains.length); i++) {
        csvContent += (ipAddresses[i] || "") + "," + (md5Hashes[i] || "") + "," + (domains[i] || "") + "\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "parsed_data.csv");
    document.body.appendChild(link);

    link.click();
}