import { dotnet } from './dotnet.js'

let exports;
const df = document.getElementById('docxFile')
const mf = document.getElementById('mdFile')
console.log("attaching...", df)
df.addEventListener('change', (event) => {
    const file = event.target.files[0]
    console.log(file)
    var reader = new FileReader();
    reader.onload = async (event) => {
        //console.log("xx", event)
        //console.log(reader.result);
        //console.log(exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)))
        var string = exports.TodoMVC.MainJS.openDocxFile(new Uint8Array(reader.result));

        downloadBlob(string, 'test.md', 'application/octet-stream');
    }
    reader.readAsArrayBuffer(file);
}, true);

mf.addEventListener('change', (event) => {
    const file = event.target.files[0]
    console.log(file)
    var reader = new FileReader();
    reader.onload = async (event) => {
        //console.log("xx", event)
        //console.log(reader.result);
        //console.log(exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)))
        var byte = exports.TodoMVC.MainJS.openMdFile(new Uint8Array(reader.result));

        downloadBlob(byte, 'test.docx', 'application/octet-stream');
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