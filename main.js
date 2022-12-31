import { dotnet } from './dotnet.js'

let exports;
const fh = document.getElementById('fileInput')
console.log("attaching...", fh)
fh.addEventListener('change', (event) => {
    const file = event.target.files[0]
    console.log(file)
    var reader = new FileReader();
    reader.onload = (event) => {
        console.log("xx", event)
        console.log(reader.result);
        console.log(exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)))
        //var string = exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result));

        //downloadBlob(string, 'test.md', 'application/octet-stream');
    }
    reader.readAsArrayBuffer(file);
}, true);

const { getAssemblyExports, getConfig } = await dotnet.create();
exports = await getAssemblyExports(getConfig().mainAssemblyName);

await dotnet.run();

const onHashchange = () => exports.TodoMVC.MainJS.OnHashchange(document.location.hash);
window.addEventListener('hashchange', onHashchange);
onHashchange();

var downloadBlob = function(data, fileName, mimeType) {
    var blob = new Blob([data], {
      type: mimeType
    });
    var url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function() {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  };
  
   var downloadURL = function(data, fileName) {
    var a;
    a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };