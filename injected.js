(function download() {    
    groupName = document.querySelectorAll("#main span[title]")[0].getAttribute("title");
    filename = "groupe "+groupName+".txt" || "contacts.txt"
    desc = desc || "No Description";
    let header=  "Groupe: "+groupName+"\r\n\r\n";
        header+= "Description: "+desc+"\r\n\r\n";
        header+= "Membres:\r\n=================\r\n \r\n";
    let text=document.querySelectorAll("#main span[title]")[1].getAttribute("title").replace(/, /g, '\r\n');
    // let text=document.querySelector("span[title^='+']").getAttribute("title").replace(/,/g, '\r\n');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(header+text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
  })();
