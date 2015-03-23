namespace LossesCalculationCore.Line.Materials {
    public class AluminiumMaterial : Material {
        public override LineMaterial Type {
            get {
                return LineMaterial.Aluminium;
            }
        }

        public override double Density {
            get {
                return 0.0283;
            }
        }
    }
}
