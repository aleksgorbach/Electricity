using System.ComponentModel.DataAnnotations;

using ElectricityWeb.Attributes;

namespace ElectricityWeb.Models.Losses {
    public class TransformatorLossModel {
        #region Constructors

        public TransformatorLossModel(
            double nominalPower,
            double nominalVoltage,
            double consumedEnergy,
            double idlingPowerLoss,
            double shortCircuitLoss,
            double loadedHourCount,
            double connectedTime) {
            NominalPower = nominalPower;
            NominalVoltage = nominalVoltage;
            ConsumedEnergy = consumedEnergy;
            IdlingPowerLoss = idlingPowerLoss;
            ShortCircuitLoss = shortCircuitLoss;
            LoadedHourCount = loadedHourCount;
            ConnectedTime = connectedTime;
        }

        public TransformatorLossModel() {
        }

        #endregion Constructors

        #region Parameter fields

        [Display(Name = "Номинальная мощность трансформатора")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double NominalPower { get; set; }
        public string NominalPowerUnits {
            get {
                return "МВА";
            }
        }

        [Display(Name = "Номинальное напряжение")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double NominalVoltage { get; set; }
        public string NominalVoltageUnits {
            get {
                return "кВ";
            }
        }

        [Display(Name = "Потребленная активная электроэнергия за месяц")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double ConsumedEnergy { get; set; }
        public string ConsumedEnergyUnits {
            get {
                return "кВт*час";
            }
        }

        [Display(Name = "Потери мощности холостого хода трансформатора")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double IdlingPowerLoss { get; set; }
        public string IdlingPowerLossUnits {
            get {
                return "кВт";
            }
        }

        [Display(Name = "Потери мощности короткого замыкания")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double ShortCircuitLoss { get; set; }
        public string ShortCircuitLossUnits {
            get {
                return "кВт";
            }
        }

        [Display(Name = "Число часов работы трансформатора под нагрузкой за расчетный период")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double LoadedHourCount { get; set; }
        public string LoadedHourCountUnits {
            get {
                return "час";
            }
        }

        [Display(Name = "Время присоединения трансформатора за расчетный период к сети")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double ConnectedTime { get; set; }
        public string ConnectedTimeUnits {
            get {
                return "час";
            }
        }

        [Display(Name = "Потери")]
        public double Value { get; set; }
        public string LossUnits {
            get {
                return "кВт*час";
            }
        }

        #endregion Parameter fields
    }
}