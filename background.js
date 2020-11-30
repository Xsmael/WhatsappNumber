/*TODO:
- Remove phone numbers from title attribute
*/
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        color: '#3aa757'
    }, function () {
        console.log("The color is green.");
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


function generateUUID() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.storage.sync.get('UUID', function(items) { // UUID is the UUID
    var userid = items.UUID;
    if (userid) {
        console.log("UUID= "+userid);
    } else {
        userid = generateUUID();
        console.log("Generated UUID= "+userid);
        chrome.storage.sync.set({UUID: userid});
    }
});

chrome.storage.sync.get('license_key', function(items) { // whatever is the UUID
    var license_key = items.license_key;
    if (license_key && license_key.length ) {
        console.log("License key= "+license_key);
    } 
    else {
        console.log("NO License key found");
        // chrome.storage.sync.set({license_key: license_key}, function() {
        // });
    }
    function useToken(userid) {
        // TODO: Use user id for authentication or whatever you want.
    }
});