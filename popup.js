let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
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



