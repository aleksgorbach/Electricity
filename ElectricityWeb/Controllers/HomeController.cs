using ElectricityWeb.Models.Losses;

using LossesCalculationCore.Implementations;
using LossesCalculationCore.Losses;

namespace ElectricityWeb.Controllers
{
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult TransformatorLoss() {
            var loss = new TransformatorLossModel();
            return View(loss);
        }

        [HttpPost]
        public ActionResult TransformatorLoss(TransformatorLossModel model) {
            if (!ModelState.IsValid) {
                ViewBag.Error = "Пожалуйста, заполните все поля!";
                model.HasResult = false;
                return View(model);
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
            return View(model);
        }


        [HttpGet]
        public ActionResult TransmissionLoss() {
            var loss = new TransmissionLossModel();
            return View(loss);
        }

        [HttpPost]
        public ActionResult TransmissionLoss(TransmissionLossModel model) {
            if (!ModelState.IsValid) {
                model.HasResult = false;
                return View(model);
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
            return View(model);
        }
    }
}
