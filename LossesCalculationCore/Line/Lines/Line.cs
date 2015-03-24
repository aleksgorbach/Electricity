using System;
using System.Linq;

using DataAccessLayer.POCO.Lines;
using DataAccessLayer.Service;

using LossesCalculationCore.Line.Materials;

namespace LossesCalculationCore.Line.Lines {
    public abstract class Line {

        public abstract LineType Type { get; }
        public Material Material { get; private set; }
        public double Length { get; private set; }
        public double Square { get; private set; }
        public string Description { get; protected set; }
        protected abstract double X0 { get; }

        protected Line(Material material, double length) {
            Material = material;
            Length = length;
        }

        private void Calculate(double power, double cos, double voltage, int deltaVoltage) {
            var q = power * Math.Tan(Math.Acos(cos));
            Square = (1000 * power * Material.Density)
                     / ((deltaVoltage * voltage * voltage) / (Length * 100000) - q * X0);
            var lineType = RepositoryService.LineRepository.All().Where(x =>x.Square > Square&& (x.Type == LineType.GroundCable || x.Type == LineType.AirCable || (x.Type == LineType.Air && x.Material == Material.Type))).Min(x => x.Square);
            Description = lineType.ToString();
        }

        private static Line Create(LineType type, LineMaterial materialType, double length) {
            var material = Material.Create(materialType);
            switch (type) {
                case LineType.Air:
                    return new AirLine(material, length);
                case LineType.AirCable:
                    return new AirCableLine(material, length);
                default:
                    return new GroundCableLine(material, length);
            }
        }

        public static Line Choose(
            LineType type,
            LineMaterial materialType,
            double power,
            double cos,
            double length,
            double voltage,
            int deltaVoltage) {
            var line = Line.Create(type, materialType, length);
            line.Calculate(power, cos, voltage, deltaVoltage);
            return line;
        }
    }
}
