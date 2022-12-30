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
            using (MemoryStream data = new MemoryStream(file))
            {
                using (WordprocessingDocument document = WordprocessingDocument.Open(data, true))
                {
                    // Get access to the main document part.
                    var docPart = document.MainDocumentPart;
                    Body body = docPart.Document.Body;
                    return body.InnerText;
                }
            }
        }
    }
}