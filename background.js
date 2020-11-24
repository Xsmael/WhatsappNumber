chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        color: '#3aa757'
    }, function () {
        console.log("The color is green.");
        sendRequest();
    });
});


chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                hostEquals: 'web.whatsapp.com'
            },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});


function sendRequest() {
    console.log("Sending request");
    console.log("Sending request");
    var req = new XMLHttpRequest();
    req.open("GET", "http://www.google.com/search?hl=en&q=ajax", true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                alert(req.responseText);
                document.write("OK");
                console.log(req.responseText);
            }
          }
        };
      req.send();
} 