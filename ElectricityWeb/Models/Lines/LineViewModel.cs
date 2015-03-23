using System.ComponentModel.DataAnnotations;

using LossesCalculationCore.Line.Lines;
using LossesCalculationCore.Line.Materials;

namespace ElectricityWeb.Models.Lines {
    public class LineViewModel : ResultModel {
        [Required]
        [Display(Name = "Тип линии")]
        public Line.LineType Type { get; set; }

        [Required]
        [Display(Name = "Материал")]
        public Material.LineMaterial Material { get; set; }

        [Required]
        [Display(Name = "Активная мощность")]
        public double Power { get; set; }
        public string PowerUnits {
            get {
                return "кВт";
            }
        }

        [Required]
        [Display(Name = "Cos")]
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

        [Display(Name = "Площадь сечения")]
        public double Square { get; set; }
        public string SquareUnits {
            get {
                return "мм2";
            }
        }

        [Display(Name = "Марка провода")]
        public string Description { get; set; }

        public LineViewModel() {
            Type = Line.LineType.Air;
            Material = LossesCalculationCore.Line.Materials.Material.LineMaterial.Copper;
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