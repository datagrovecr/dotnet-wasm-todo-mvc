import { dotnet } from './dotnet.js'

let exports;
let df = document.getElementById('docxFile')!
let mf = document.getElementById('mdFile')
console.log("attaching...", df)

// uploadFile(event: Event) {
//   const element = event.currentTarget as HTMLInputElement;
//   let fileList: FileList | null = element.files;
//   if (fileList) {
//     console.log("FileUpload -> files", fileList);
//   }
// }
df.addEventListener('change', (event) => {
    const file = event.target!['files'][0]
    console.log(file)
    var reader = new FileReader();
    reader.onload = async (event) => {
        //console.log("xx", event)
        //console.log(reader.result);
        //console.log(exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)))
        var string = exports.TodoMVC.MainJS.openDocxFile(new Uint8Array(reader.result as ArrayBuffer));

        downloadBlob(string, 'test.md', 'application/octet-stream');
    }
    reader.readAsArrayBuffer(file);
}, true);

// mf.addEventListener('change', (event) => {
//     const file = event.target.files[0]
//     console.log(file)
//     var reader = new FileReader();
//     reader.onload = async (event) => {
//         //console.log("xx", event)
//         //console.log(reader.result);
//         //console.log(exports.TodoMVC.MainJS.openFile(new Uint8Array(reader.result)))
//         var byte = exports.TodoMVC.MainJS.openMdFile(new Uint8Array(reader.result));

//         downloadBlob(byte, 'test.docx', 'application/octet-stream');
//     }
//     reader.readAsArrayBuffer(file);
// }, true);

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

  // async function md2html(md: string): Promise<string> {
  //   const file = await unified()
  //       .use(remarkParse)
  //       .use(remarkRehype)
  //       .use(rehypeSanitize)
  //       .use(rehypeStringify)
  //       .use(rehypeSlug)
  //       .process(md ?? "error")
  //   return String(file)
    // async function md2html(md) {
    //   const file = await unified()
    //     .use(remarkParse)
    //     .use(remarkRehype)
    //     .use(rehypeSanitize)
    //     .use(rehypeStringify)
    //     .process(md)
    
    //   console.log(String(file))
    // }