using LossesCalculationCore.Line.Materials;

namespace LossesCalculationCore.Line.Lines {
    public abstract class CableLine : Line {
        protected CableLine(Material material, double length)
            : base(material, length) {
        }

        protected override double X0 {
            get {
                return 0.075;
            }
        }
    }
}
