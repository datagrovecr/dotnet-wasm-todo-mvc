using System;
using System.IO;
using System.Runtime.InteropServices.JavaScript;
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
        public static string openFile(byte[] file)
        {
            string md;
            var outStream = new MemoryStream();

            using (MemoryStream data = new MemoryStream(file))
            {
                convertToMd(data, outStream);
                md = data.Length.ToString();
            }

            using (StreamReader reader = new StreamReader(outStream))
            {
                md += reader.ReadToEnd();
            }
            return md;
        }

        public static async void convertToMd(MemoryStream data, MemoryStream outStream)
        {
            await DgDocx.docx_to_md(data, outStream);
        }
    }
}