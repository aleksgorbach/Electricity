using DataAccessLayer.POCO.Lines;

using LossesCalculationCore.Line.Materials;

namespace LossesCalculationCore.Line.Lines {
    public class AirCableLine : CableLine {
        public AirCableLine(Material material, double length)
            : base(material, length) {
        }

        public override LineType Type {
            get {
                return LineType.AirCable;
            }
        }
    }
}
