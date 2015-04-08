using System.Linq;
using System.Web.Mvc;

using DataAccessLayer.Service;

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
                return PartialView("LinesResult", model);
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
            return PartialView("LinesResult", model);
        }

        [HttpGet]
        public ActionResult Edit() {
            return View(new DataAccessLayer.POCO.Lines.Line());
        }

        [HttpPost]
        public ActionResult Edit(DataAccessLayer.POCO.Lines.Line model) {
            RepositoryService.LineRepository.Add(model);
            model.Square = 0;
            return View(model);
        }

        public ActionResult LinesTable() {
            var model = RepositoryService.LineRepository.All().OrderBy(x => x.Type).ThenBy(x => x.Square);
            return PartialView(model);
        }
    }
}
