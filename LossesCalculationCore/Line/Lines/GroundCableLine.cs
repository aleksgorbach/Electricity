using DataAccessLayer.POCO.Lines;

using LossesCalculationCore.Line.Materials;

namespace LossesCalculationCore.Line.Lines {
    public class GroundCableLine : CableLine {
        public GroundCableLine(Material material, double length)
            : base(material, length) {
        }

        public override LineType Type {
            get {
                return LineType.GroundCable;
            }
        }
    }
}
