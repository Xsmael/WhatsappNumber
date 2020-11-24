(function download() {
    filename = filename || "contacts.txt";
    desc = desc || "No Description";
    let header=  "Description: "+desc+"\r\n-----------------------\r\n \r\n";
    let text=document.querySelector("span[title^='+']").getAttribute("title").replace(/,/g, '\r\n');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(header+text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
  })();
