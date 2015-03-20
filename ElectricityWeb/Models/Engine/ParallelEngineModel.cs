using System.ComponentModel.DataAnnotations;

using ElectricityWeb.Attributes;

using LossesCalculationCore.Engine;

namespace ElectricityWeb.Models.Engine {
    public class ParallelEngineModel : ResultModel {
        public ParallelEngineModel() {
            CurrentsRelation = 2.5;
        }

        #region Входные данные
        [Display(Name = "Номинальное напряжение")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? NominalVoltage { get; set; }
        public string NominalVoltageUnits {
            get {
                return "В";
            }
        }

        [Display(Name = "Номинальная мощность")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? NominalPower { get; set; }
        public string NominalPowerUnits {
            get {
                return "кВт";
            }
        }

        [Display(Name = "Частота вращения якоря")]
        [Required]
        [NonZero]
        [IsNumeric(ErrorMessage = "Неверный формат")]
        public int? Frequency { get; set; }
        public string FrequencyUnits {
            get {
                return "об/мин";
            }
        }

        [Display(Name = "КПД")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? Efficiency { get; set; }
        public string EfficiencyUnits {
            get {
                return "%";
            }
        }

        [Display(Name = "Процент тока возбуждения")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? ExcitationPercent { get; set; }
        public string ExcitationPercentUnits {
            get {
                return "%";
            }
        }

        [Display(Name = "Мощность якоря")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? AnchorPower { get; set; }
        public string AnchorPowerUnits {
            get {
                return "Вт";
            }
        }

        [Display(Name = "Отношение пускового тока к номинальному")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? CurrentsRelation { get; set; }
        public string CurrentsRelationUnits {
            get {
                return "";
            }
        }

        #endregion

        #region Выходные данные
        [Display(Name = "Номинальный момент двигателя")]
        public double NominalMoment { get; set; }
        public string NominalMomentUnits {
            get {
                return "Нм";
            }
        }

        [Display(Name = "Подводимая мощность")]
        public double ConsumedPower { get; set; }
        public string ConsumedPowerUnits {
            get {
                return "кВт";
            }
        }

        [Display(Name = "Номинальный ток двигателя")]
        public double ConsumedCurrent { get; set; }
        public string ConsumedCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Ток возбуждения")]
        public double WindingCurrent { get; set; }
        public string WindingCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Ток якоря")]
        public double AnchorCurrent { get; set; }
        public string AnchorCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Сопротивление цепи возбуждения")]
        public double ChainResistance { get; set; }
        public string ChainResistanceUnits {
            get {
                return "Ом";
            }
        }

        [Display(Name = "Сопротивление якоря")]
        public double AnchorResistance { get; set; }
        public string AnchorResistanceUnits {
            get {
                return "Ом";
            }
        }

        [Display(Name = "Пусковой ток якоря")]
        public double StartingAnchorCurrent { get; set; }
        public string StartingAnchorCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Сопротивление реостата")]
        public double ReostatResistance { get; set; }
        public string ReostatResistanceUnits {
            get {
                return "Ом";
            }
        }
        #endregion

        public void SetCharasteristic(ParallelEngine.Charasteristic charasteristic) {
            NominalMoment = charasteristic.NominalMoment;
            ConsumedPower = charasteristic.ConsumedPower;
            ConsumedCurrent = charasteristic.ConsumedCurrent;
            WindingCurrent = charasteristic.WindingCurrent;
            AnchorCurrent = charasteristic.AnchorCurrent;
            ChainResistance = charasteristic.ChainResistance;
            AnchorResistance = charasteristic.AnchorResistance;
            StartingAnchorCurrent = charasteristic.StartingAnchorCurrent;
            ReostatResistance = charasteristic.ReostatResistance;
        }
    }
}