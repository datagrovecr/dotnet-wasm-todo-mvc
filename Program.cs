using System;
using System.IO;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using docx_lib;

namespace TodoMVC
{
    public partial class MainJS
    {
        static Controller? controller;

        public static async Task Main()
        {
            if (!OperatingSystem.IsBrowser())
            {
                throw new PlatformNotSupportedException("This demo is expected to run on browser platform");
            }

            await JSHost.ImportAsync("todoMVC/store.js", "./store.js");
            await JSHost.ImportAsync("todoMVC/view.js", "./view.js");

            var store = new Store();
            var view = new View(new Template());
            controller = new Controller(store, view);
            Console.WriteLine("Ready!");
        }

        [JSExport]
        public static void OnHashchange(string url)
        {
            controller?.SetView(url);
        }

        [JSExport]
        public static string openDocxFile(byte[] file)
        {
            return convertToMd(file).Result;
        }



        public static async Task<string> convertToMd(byte[] file)
        {
            string md;
            var outStream = new MemoryStream();

            using (MemoryStream data = new MemoryStream(file))
            {
                await DgDocx.docx_to_md(data, outStream);
                StreamReader reader = new StreamReader(outStream);
                outStream.Seek(0, SeekOrigin.Begin);
                md = reader.ReadToEnd();
            }
            return md;
        }
        [JSExport]
        public static byte[] openMdFile(byte[] file)
        {
            return convertToDocx(file).Result;//Returns a stream
        }

        public static async Task<byte[]> convertToDocx(byte[] data)
        {

            string stringData = Encoding.UTF8.GetString(data);

            var outStream = new MemoryStream();

            await DgDocx.md_to_docx(stringData, outStream);

            byte[] outData = outStream.ToArray();

            return outData;
        }
    }
}