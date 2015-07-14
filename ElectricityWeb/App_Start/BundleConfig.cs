using System.Web.Optimization;

namespace ElectricityWeb {
    public class BundleConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Content/js/jquery/jquery-2.1.3.min.js")
                .Include("~/Content/js/jquery/jquery.unobtrusive-ajax.min.js"));

            bundles.Add(new StyleBundle("~/bundles/globalStyles")
                .Include("~/Content/css/site.min.css")
                .Include("~/Content/css/menu.min.css"));
        }
    }
}