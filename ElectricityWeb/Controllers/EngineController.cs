using System;
using System.Web.Mvc;

using ElectricityWeb.Models.Engines;

using LossesCalculationCore.Engine;

namespace ElectricityWeb.Controllers
{
    public class EngineController : Controller
    {
        public ActionResult Index() {
            return RedirectToAction("Async");
        }

        [HttpGet]
        public ActionResult Async() {
            var model = new AsyncEngineModel();
            return View(model);
        }

        [HttpPost]
        public ActionResult Async(AsyncEngineModel model) {
            if (!ModelState.IsValid) {
                model.HasResult = false;
                return View(model);
            }

            try {
                var charasteristic = AsyncEngine.GetCharasteristic(
                    model.NominalPower,
                    model.NominalVoltage,
                    model.Frequency,
                    model.UsingCoefficient,
                    model.Cosinus,
                    model.CurrentsRelation,
                    model.MomentsRelation);
                model.SetCharacteristic(charasteristic);
                model.HasResult = true;
                return View(model);
            }
            catch (DivideByZeroException) {
                model.HasResult = false;
                ViewBag.Error = "Введите корректные данные";
                return View(model);
            }
        }
    }
}
