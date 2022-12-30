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
        //console.log("length", exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)))
        console.log(exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)));
    }
    reader.readAsArrayBuffer(file);
}, true);

const { getAssemblyExports, getConfig } = await dotnet.create();
exports = await getAssemblyExports(getConfig().mainAssemblyName);

await dotnet.run();

const onHashchange = () => exports.TodoMVC.MainJS.OnHashchange(document.location.hash);
window.addEventListener('hashchange', onHashchange);
onHashchange();
