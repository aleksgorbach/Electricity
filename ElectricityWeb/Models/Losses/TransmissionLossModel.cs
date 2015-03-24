using System.ComponentModel.DataAnnotations;

using ElectricityWeb.Attributes;

namespace ElectricityWeb.Models.Losses {
    public class TransmissionLossModel : ResultModel {
        #region Constructors

        public TransmissionLossModel(
            int phaseCount,
            double resistivity,
            double current,
            double length,
            double size,
            double time) {
            PhaseCount = phaseCount;
            Resistivity = resistivity;
            Current = current;
            Length = length;
            Size = size;
            Time = time;
        }

        public TransmissionLossModel() {
        }

        #endregion Constructors

        #region Parameter fields

        [Display(Name="Число фаз линии")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Integer, ErrorMessage = "Неверный формат")]
        public int PhaseCount { get; set; }
        public string PhaseCountUnits {
            get {
                return "шт";
            }
        }

        [Display(Name = "Удельное сопротивление материала")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double Resistivity { get; set; }
        public string ResistivityUnits {
            get {
                return "Ом*мм2";
            }
        }

        [Display(Name = "Среднеквардратичный ток линии")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double Current { get; set; }
        public string CurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Длина линии")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double Length { get; set; }
        public string LengthUnits {
            get {
                return "м";
            }
        }

        [Display(Name = "Сечение провода")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double Size { get; set; }
        public string SizeUnits {
            get {
                return "мм2";
            }
        }

        [Display(Name = "Время работы за расчетный период")]
        [Required]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double Time { get; set; }
        public string TimeUnits {
            get {
                return "час";
            }
        }

        [Display(Name = "Потери")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double Loss { get; set; }
        public string LossUnits {
            get {
                return "кВт*час";
            }
        }

        #endregion Parameter fields
    }
}