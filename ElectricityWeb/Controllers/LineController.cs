using System.Web.Mvc;

using ElectricityWeb.Models.Lines;

using LossesCalculationCore.Line.Lines;

namespace ElectricityWeb.Controllers {
    public class LineController : Controller {
        public ActionResult Index() {
            return RedirectToAction("Choose");
        }

        [HttpGet]
        public ActionResult Choose() {
            return View(new LineViewModel());
        }

        [HttpPost]
        public ActionResult Choose(LineViewModel model) {
            if (!ModelState.IsValid) {
                model.HasResult = false;
                return View(model);
            }
            var line = Line.Choose(
                model.Type,
                model.Material,
                model.Power,
                model.Cos,
                model.Length,
                model.Voltage,
                model.DeltaVoltage);
            model.Initialize(line);
            model.HasResult = true;
            return View(model);
        }
    }
}
