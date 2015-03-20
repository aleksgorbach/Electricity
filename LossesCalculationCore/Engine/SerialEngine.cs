namespace LossesCalculationCore.Engine {
    public class SerialEngine {
        public class Charasteristic {
            public double SummaryPower { get; private set; }
            public double NominalCurrent { get; private set; }
            public double NominalMoment { get; private set; }
            public double AnchorResistance { get; private set; }
            public double WindingResistance { get; private set; }

            public Charasteristic(double nomPower, double nomCurrent, double nomMoment, double anchRes, double windRes) {
                SummaryPower = nomPower;
                NominalCurrent = nomCurrent;
                NominalMoment = nomMoment;
                AnchorResistance = anchRes;
                WindingResistance = windRes;
            }
        }

        public static Charasteristic GetCharasteristic(
            double nomPower,
            double nomVoltage,
            double frequency,
            double anchorPower,
            double windPower,
            double mPower) {
            var summaryPower = nomPower + anchorPower + windPower + mPower;
            var nomCurrent = summaryPower / nomVoltage;
            var nomMoment = 9.55 * nomPower / frequency;
            var anchRes = anchorPower / (nomCurrent * nomCurrent);
            var windRes = windPower / (nomCurrent * nomCurrent);
            return new Charasteristic(summaryPower, nomCurrent, nomMoment, anchRes, windRes);
        }
    }
}
