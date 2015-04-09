using System.Linq;
using System.Web.Mvc;

using DotNet.Highcharts;
using DotNet.Highcharts.Enums;
using DotNet.Highcharts.Helpers;
using DotNet.Highcharts.Options;

using ElectricityWeb.Models.Engine;

using LossesCalculationCore.Engine;

namespace ElectricityWeb.Controllers {
    public class EngineController : Controller {
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
                return PartialView("_AsyncResults", model);
            }

            var charasteristic = AsyncEngine.GetCharasteristic(
                model.NominalPower.Value,
                model.NominalVoltage.Value,
                model.Frequency.Value,
                model.UsingCoefficient.Value,
                model.Cosinus.Value,
                model.CurrentsRelation.Value,
                model.MomentsRelation.Value);
            model.SetCharacteristic(charasteristic);
            model.HasResult = true;
            return PartialView("_AsyncResults", model);
        }

        //public ActionResult AsyncChart(AsyncEngineModel model) {
        //    var xAxis = model.CharasteristicTable.Select(x => x.Moment.ToString("##.0")).ToArray();
        //    var yAxis = model.CharasteristicTable.Select(x => new object[] { x.Count }).ToArray();


        //    var chart = new Highcharts("chart");
        //    chart.InitChart(new Chart { DefaultSeriesType = ChartTypes.Line });
        //    chart.SetTitle(new Title { Text = "Характеристика" });
        //    chart.SetXAxis(new XAxis { Categories = xAxis  });
        //    chart.SetYAxis(new YAxis { Title = new YAxisTitle { Text = "Обороты" } });
        //    chart.SetSeries(new[] { new Series { Data = new Data(yAxis), Name = "Количество оборотов" } });
        //    return PartialView(chart);
        //}

        [HttpGet]
        public ActionResult Parallel() {
            var model = new ParallelEngineModel();
            return View(model);
        }

        [HttpPost]
        public ActionResult Parallel(ParallelEngineModel model) {
            if (!ModelState.IsValid) {
                model.HasResult = false;
                return View(model);
            }

            var charasteristic = ParallelEngine.GetCharasteristic(
                model.NominalVoltage.Value,
                model.NominalPower.Value,
                model.Frequency.Value,
                model.Efficiency.Value,
                model.ExcitationPercent.Value,
                model.AnchorPower.Value,
                model.CurrentsRelation.Value);

            model.SetCharasteristic(charasteristic);
            model.HasResult = true;
            return View(model);
        }

        [HttpGet]
        public ActionResult Serial() {
            var model = new SerialEngineModel();
            return View(model);
        }

        [HttpPost]
        public ActionResult Serial(SerialEngineModel model) {
            if (!ModelState.IsValid) {
                model.HasResult = false;
                return View(model);
            }

            var charasteristic = SerialEngine.GetCharasteristic(
                model.NominalPower,
                model.NominalVoltage,
                model.Frequency,
                model.AnchorPower,
                model.WindPower,
                model.MomentPower);

            model.SetCharasteristic(charasteristic);
            model.HasResult = true;
            return View(model);
        }
    }
}
