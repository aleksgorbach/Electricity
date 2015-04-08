using System.Web.Mvc;

using ElectricityWeb.Models.Losses;

using LossesCalculationCore.Implementations;
using LossesCalculationCore.Losses;

namespace ElectricityWeb.Controllers
{
    public class LossController : Controller
    {
        //
        // GET: /Loss/

        public ActionResult Index()
        {
            return RedirectToAction("Transformator");
        }

        [HttpGet]
        public ActionResult Transformator() {
            var loss = new TransformatorLossModel();
            return View(loss);
        }

        [HttpPost]
        public ActionResult Transformator(TransformatorLossModel model) {
            if (!ModelState.IsValid) {
                ViewBag.Error = "Пожалуйста, заполните все поля!";
                model.HasResult = false;
                return PartialView("TransformatorResults", model);
            }
            var loss = new TransformatorLoss(
                model.NominalPower,
                model.NominalVoltage,
                model.ConsumedEnergy,
                model.IdlingPowerLoss,
                model.ShortCircuitLoss,
                model.LoadedHourCount,
                model.ConnectedTime);
            model.Loss = loss.Value;
            model.HasResult = true;
            return PartialView("TransformatorResults", model);
        }


        [HttpGet]
        public ActionResult Transmission() {
            var loss = new TransmissionLossModel();
            return View(loss);
        }

        [HttpPost]
        public ActionResult Transmission(TransmissionLossModel model) {
            if (!ModelState.IsValid) {
                model.HasResult = false;
                return PartialView("TransmissionResults", model);
            }
            var loss = new TransmissionLoss(
                model.PhaseCount,
                model.Resistivity,
                model.Current,
                model.Length,
                model.Size,
                model.Time);
            model.Loss = loss.Value;
            model.HasResult = true;
            return PartialView("TransmissionResults", model);
        }
    }
}
