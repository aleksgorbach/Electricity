namespace LossesCalculationCore.Line.Materials {
    public class CopperMaterial : Material {
        public override LineMaterial Type {
            get {
                return LineMaterial.Copper;
            }
        }

        public override double Density {
            get {
                return 0.0175;
            }
        }
    }
}
