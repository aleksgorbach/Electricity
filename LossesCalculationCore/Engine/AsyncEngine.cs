using System;
using System.Collections.Generic;
using System.Linq;

namespace LossesCalculationCore.Engine {
    public class AsyncEngine {
        public const int STATOR_ROTATING_FREQUENCY = 1500;
        private const double TOLERANCE = 0.001;

        public static Charasteristic GetCharasteristic(
            double nomPower,
            double nomVoltage,
            int rotNom,
            double useCoef,
            double cos,
            double currRel,
            double momRel) {
            var activePower = nomPower / useCoef * 100;
            var nominalMoment = 9550 * nomPower / rotNom;
            var criticalMoment = momRel * nominalMoment;
            var nominalCurrent = nomPower * 1000 / (1.733 * cos * useCoef * nomVoltage / 100);
            var startingCurrent = currRel * nominalCurrent;
            var polesPairCount = (int)(60 * 50 / STATOR_ROTATING_FREQUENCY);
            var nominalSlip = 1 - (double)rotNom / STATOR_ROTATING_FREQUENCY;
            var criticalSlip = nominalSlip * (momRel + Math.Sqrt(momRel * momRel - 1));
            return new Charasteristic(activePower, nominalMoment, criticalMoment, nominalCurrent, startingCurrent, polesPairCount, nominalSlip, criticalSlip);
        }

        public string Description {
            get {
                return "Расчёт асинхронного двигателя";
            }
        }

        

        public class Charasteristic {
            public double ActivePower { get; private set; }
            public double NominalMoment { get; private set; }
            public double CriticalMoment { get; private set; }
            public double NominalCurrent { get; private set; }
            public double StartingCurrent { get; private set; }
            public int PolesPairCount { get; private set; }
            public double NominalSlip { get; private set; }
            public double CriticalSlip { get; private set; }
            public bool CanStart { get; private set; }

            public Charasteristic(
                double activePower,
                double nominalMoment,
                double criticalMoment,
                double nominalCurrent,
                double startingCurrent,
                int polesPairCount,
                double nominalSlip,
                double criticalSlip) {
                ActivePower = activePower;
                NominalMoment = nominalMoment;
                CriticalMoment = criticalMoment;
                NominalCurrent = nominalCurrent;
                StartingCurrent = startingCurrent;
                PolesPairCount = polesPairCount;
                NominalSlip = nominalSlip;
                CriticalSlip = criticalSlip;
                CanStart = GetCharacteristicItem(1, CriticalMoment, CriticalSlip).Moment > NominalMoment;
            }

            private CharasteristicItem GetCharacteristicItem(double slip, double criticalMoment, double criticalSlip) {
                var s = slip;
                var c = STATOR_ROTATING_FREQUENCY * (1 - slip);
                double moment;
                if (criticalSlip == 0 || slip == 0) {
                    moment = 0;
                }
                else {
                    moment = 2 * criticalMoment / (slip / criticalSlip + criticalSlip / slip);
                }
                return new CharasteristicItem{Slip = s, Count = c, Moment = moment};
            }

            public IEnumerable<CharasteristicItem> CharasteristicTable {
                get {
                    var slips = new List<double> { 0, 0.2, 0.4, 0.6, 0.8, 1, NominalSlip, CriticalSlip };
                    return slips.Select(x => GetCharacteristicItem(x, CriticalMoment, CriticalSlip))
                        .OrderBy(x => x.Moment);
                }
            }

            public class CharasteristicItem {
                public double Count { get; set; }
                public double Moment { get; set; }
                public double Slip { get; set; }
            }
        }
    }
}
