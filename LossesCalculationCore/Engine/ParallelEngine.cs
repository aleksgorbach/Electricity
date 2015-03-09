namespace LossesCalculationCore.Engine {
    public class ParallelEngine {
        public class Charasteristic {
            public double NominalMoment { get; private set; }
            public double ConsumedPower { get; private set; }
            public double ConsumedCurrent { get; private set; }
            public double WindingCurrent { get; private set; }
            public double AnchorCurrent { get; private set; }
            public double ChainResistance { get; private set; }
            public double AnchorResistance { get; private set; }
            public double ReostatResistance { get; private set; }

            public Charasteristic(
                double nomMoment,
                double consPower,
                double consCurrent,
                double windCurrent,
                double anchCurrent,
                double chainRes,
                double anchRes,
                double reostRes) {
                NominalMoment = nomMoment;
                ConsumedPower = consPower;
                ConsumedCurrent = consCurrent;
                WindingCurrent = windCurrent;
                AnchorCurrent = anchCurrent;
                ChainResistance = chainRes;
                AnchorResistance = anchRes;
                ReostatResistance = reostRes;
            }
        }

        public static Charasteristic GetCharasteristic(
            double nomVoltage,
            double nomPower,
            double rotFrequency,
            double efficiency,
            double excPercent,
            double anchorPower,
            double currentsRelation = 2.5) {
            var nomMoment = 9550 * nomPower / rotFrequency;
            var consPower = nomPower / efficiency;
            var consCurrent = consPower / nomVoltage;
            var windCurrent = excPercent * consCurrent;
            var anchorCurrent = consCurrent - windCurrent;
            var chainRes = nomVoltage / windCurrent;
            var anchRes = anchorPower / (anchorCurrent * anchorCurrent);
            var reostRes = nomPower / (currentsRelation * anchorCurrent) - anchRes;
            return new Charasteristic(nomMoment, consPower, consCurrent, windCurrent, anchorCurrent, chainRes, anchRes, reostRes);
        }
    }
}
