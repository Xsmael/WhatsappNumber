let downloadBtn = document.getElementById('downloadBtn');
let activateBtn = document.getElementById('activateBtn');
let authPage = document.getElementById('auth');
let unAuthPage = document.getElementById('un-auth');

var UUID;

function verifyAuth() {
  chrome.storage.sync.get('license_key', function(items) { // whatever is the UUID
    var license_key = items.license_key;
    if (license_key && license_key.length )
    {
      console.log("verifyAuth SUCCESS");
      authPage.style.display="visible";
      unAuthPage.style.display="none";
    } 
    else 
    {
      console.log("verifyAuth FAIL");
      authPage.style.display="none";
      unAuthPage.style.display="visible";
    }
    function useToken(userid) {
        // TODO: Use user id for authentication or whatever you want.
    }
  });
}
verifyAuth();

downloadBtn.onclick = function(element) {
  alert("downloadBtn");
  let filename = document.getElementById('groupName').value;
  let desc = document.getElementById('groupDesc').value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'var filename="' + filename + '"; var desc="' + desc + '";'},
        function() {
          chrome.tabs.executeScript({file: 'injected.js'});
        });
        
  });
};

activateBtn.onclick = function(element) {
  let key = document.getElementById('key').value;
  let phone = document.getElementById('phone').value;
  sendRequest(key,phone);
};


chrome.storage.sync.get('UUID', function(items) { // UUID is the UUID
  UUID = items.UUID;
  if (!UUID) { console.error("UUID NOT FOUND"); } 
});

function sendRequest(key,phone) {
  var req = new XMLHttpRequest();
  var params= "q=auth&key="+key+"&phone="+phone+"&userUID="+UUID;
  // req.open("POST", "http://160.226.184.146:8008/fetch", true);
  req.open("POST", "http://localhost/WhatsappNumberServer/gateway.php", true);
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.onreadystatechange = function() {
      if (req.readyState == 4) {
          if (req.status == 200) {
              alert(req.responseText);
              var res= JSON.parse(req.responseText);
              if(res.success) {
                chrome.storage.sync.set({license_key: res.license_key}, function() {
                  verifyAuth();
                });
              }
          }
        }
      };
    req.send(params);
} 