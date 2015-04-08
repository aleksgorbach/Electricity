using System.ComponentModel.DataAnnotations;

using DataAccessLayer.POCO.Lines;

using LossesCalculationCore.Line.Materials;

using Line = LossesCalculationCore.Line.Lines.Line;

namespace ElectricityWeb.Models.Lines {
    public class LineViewModel : ResultModel {
        [Required]
        [Display(Name = "Тип линии")]
        public LineType Type { get; set; }

        [Required]
        [Display(Name = "Материал")]
        public LineMaterial Material { get; set; }

        [Required]
        [Display(Name = "Активная мощность")]
        public double Power { get; set; }
        public string PowerUnits {
            get {
                return "кВт";
            }
        }

        [Required]
        [Display(Name = "Cos \u03C6")]
        public double Cos { get; set; }

        [Required]
        [Display(Name = "Длина линии")]
        public double Length { get; set; }
        public string LengthUnits {
            get {
                return "км";
            }
        }

        [Required]
        [Display(Name = "Напряжение")]
        public double Voltage { get; set; }
        public string VoltageUnits {
            get {
                return "В";
            }
        }

        [Required]
        [Display(Name = "Допустимое падение напряжения")]
        [Range(0, 100)]
        public int DeltaVoltage { get; set; }
        public string DeltaVoltageUnits {
            get {
                return "%";
            }
        }

        [Display(Name = "Рассчитанная площадь сечения")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double Square { get; set; }
        public string SquareUnits {
            get {
                return "мм2";
            }
        }

        [Display(Name = "Подходящее сечение провода")]
        public string Description { get; set; }
        public string DescriptionUnits {
            get {
                return "мм2";
            }
        }

        public LineViewModel() {
            Type = LineType.Air;
            Material = LineMaterial.Copper;
            Cos = 1;
            Voltage = 380;
            DeltaVoltage = 5;
        }

        public void Initialize(Line line) {
            Square = line.Square;
            Description = line.Description;
        }
    }
}