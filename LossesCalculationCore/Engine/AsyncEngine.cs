using System;
using System.Collections.Generic;
using System.Linq;

namespace LossesCalculationCore.Engine {
    public class AsyncEngine {
        public const int STATOR_ROTATING_FREQUENCY = 1500;

        public static Charasteristic GetCharasteristic(
            double nomPower,
            double nomVoltage,
            int rotNom,
            double useCoef,
            double cos,
            double currRel,
            double momRel) {
            var activePower = nomPower / useCoef;
            var nominalMoment = 9.55 * nomPower / rotNom;
            var criticalMoment = momRel * nominalMoment;
            var nominalCurrent = nomPower / (1.733 * cos * useCoef * nomVoltage);
            var startingCurrent = currRel * nominalCurrent;
            var polesPairCount = (int)(60 * 50 / STATOR_ROTATING_FREQUENCY);
            var nominalSlip = 1 - (double)rotNom / STATOR_ROTATING_FREQUENCY;
            var criticalSlip = nominalSlip * (momRel + Math.Sqrt(momRel * momRel - 1));
            var slips = new List<double> { 0, 0.2, 0.4, 0.6, 0.8, 1, nominalSlip, criticalSlip };
            var charasteristicTable =
                slips.Select(x => new CharasteristicItem(x, criticalMoment, criticalSlip)).OrderBy(x => x.Slip).ToList();
            var canStart = charasteristicTable.First(x => x.Slip == 1).Moment > criticalMoment;
            return new Charasteristic(activePower, nominalMoment, criticalMoment, nominalCurrent, startingCurrent, polesPairCount, nominalSlip, criticalSlip, charasteristicTable, canStart);
        }

         

        public string Description {
            get {
                return "Расчёт асинхронного двигателя";
            }
        }

        public class CharasteristicItem {
            public double Count { get; private set; }
            public double Moment { get; private set; }
            public double Slip { get; private set; }

            public CharasteristicItem(double slip, double criticalMoment, double criticalSlip) {
                Slip = slip;
                Count = STATOR_ROTATING_FREQUENCY*(1 - slip);
                if (criticalSlip == 0 || slip == 0) {
                    Moment = 0;
                } else {
                    Moment = 2 * criticalMoment / (slip / criticalSlip + criticalSlip / slip);
                }
            }
        }

        public class Charasteristic {
            public double ActivePower { get; private set; }
            public double NominalMoment { get; private set; }
            public double CriticalMoment { get; private set; }
            public double NominalCurrent { get; private set; }
            public double StartingCurrent { get; private set; }
            public double PolesPairCount { get; private set; }
            public double NominalSlip { get; private set; }
            public double CriticalSlip { get; private set; }
            public IEnumerable<CharasteristicItem> CharasteristicTable { get; private set; }
            public bool CanStart { get; private set; }

            public Charasteristic(
                double activePower,
                double nominalMoment,
                double criticalMoment,
                double nominalCurrent,
                double startingCurrent,
                double polesPairCount,
                double nominalSlip,
                double criticalSlip,
                IEnumerable<CharasteristicItem> charasteristicTable,
                bool canStart) {
                ActivePower = activePower;
                NominalMoment = nominalMoment;
                CriticalMoment = criticalMoment;
                NominalCurrent = nominalCurrent;
                StartingCurrent = startingCurrent;
                PolesPairCount = polesPairCount;
                NominalSlip = nominalSlip;
                CriticalSlip = criticalSlip;
                CharasteristicTable = charasteristicTable;
                CanStart = canStart;
            }
        }
    }
}
