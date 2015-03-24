using System.ComponentModel.DataAnnotations;

using ElectricityWeb.Attributes;

using LossesCalculationCore.Engine;

namespace ElectricityWeb.Models.Engine {
    public class SerialEngineModel : ResultModel {
        #region Входные данные
        
        [Display(Name = "Номинальная мощность")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? NominalPower { get; set; }
        public string NominalPowerUnits {
            get {
                return "Вт";
            }
        }

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

        [Display(Name = "Мощность тока возбуждения")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? WindPower { get; set; }
        public string WindPowerUnits {
            get {
                return "Вт";
            }
        }

        [Display(Name = "Мощность момента двигателя")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? MomentPower { get; set; }
        public string MomentPowerUnits {
            get {
                return "Вт";
            }
        }

        #endregion

        #region Выходные данные
        [Display(Name = "Подводимая мощность двигателя")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double SummaryPower { get; set; }
        public string SummaryPowerUnits {
            get {
                return "Вт";
            }
        }

        [Display(Name = "Номинальный ток")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double NominalCurrent { get; set; }
        public string NominalCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Номинальный момент двигателя")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double NominalMoment { get; set; }
        public string NominalMomentUnits {
            get {
                return "Нм";
            }
        }

        [Display(Name = "Сопротивление обмотки якоря")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double AnchorResistance { get; set; }
        public string AnchorResistanceUnits {
            get {
                return "Ом";
            }
        }

        [Display(Name = "Сопротивление обмотки возбуждения")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double WindingResistance { get; set; }
        public string WindingResistanceUnits {
            get {
                return "Ом";
            }
        }

        #endregion

        public void SetCharasteristic(SerialEngine.Charasteristic charasteristic) {
            SummaryPower = charasteristic.SummaryPower;
            NominalCurrent = charasteristic.NominalCurrent;
            NominalMoment = charasteristic.NominalMoment;
            AnchorResistance = charasteristic.AnchorResistance;
            WindingResistance = charasteristic.WindingResistance;
        }
    }
}