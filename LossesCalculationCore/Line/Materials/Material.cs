﻿using DataAccessLayer.POCO.Lines;

namespace LossesCalculationCore.Line.Materials {
    public abstract class Material {

        public abstract LineMaterial Type { get; }
        public abstract double Density { get; }

        public static Material Create(LineMaterial type) {
            switch (type) {
                case LineMaterial.Copper:
                    return new CopperMaterial();
                case LineMaterial.Aluminium:
                    return new AluminiumMaterial();
                default:
                    return new CopperMaterial();
            }
        }
    }
}
