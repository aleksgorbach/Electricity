using DataAccessLayer.POCO.Lines;

using LossesCalculationCore.Line.Materials;

namespace LossesCalculationCore.Line.Lines {
    public class AirLine : Line {
        public AirLine(Material material, double length)
            : base(material, length) {
        }

        public override LineType Type {
            get {
                return LineType.Air;
            }
        }

        protected override double X0 {
            get {
                return 0.375;
            }
        }
    }
}
