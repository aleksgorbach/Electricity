using System;
using System.Collections.Generic;
using System.Linq;

namespace LossesCalculationCore.Engine {
    public class Engine {
        public const int STATOR_ROTATING_FREQUENCY = 1500;
        private List<double> _slips = new List<double> {0, 0.2, 0.4, 0.6, 0.8, 1};

        public Engine(
            double nomPower,
            double nomVoltage,
            int rotNom,
            double useCoef,
            double cos,
            double currRel,
            double momRel) {
            ActivePower = nomPower / useCoef;
            NominalMoment = 9.55 * nomPower / rotNom;
            CriticalMoment = momRel * NominalMoment;
            NominalCurrent = nomPower / (1.733 * cos * useCoef * nomVoltage);
            StartingCurrent = currRel * NominalCurrent;
            PolesPairCount = (int)(60 * 50 / STATOR_ROTATING_FREQUENCY);
            NominalSlip = 1 - (double)rotNom / STATOR_ROTATING_FREQUENCY;
            CriticalSlip = NominalSlip * (momRel + Math.Sqrt(momRel * momRel - 1));
            _slips.Add(NominalSlip);
            _slips.Add(CriticalSlip);
            CharasteristicTable =
                _slips
                    .Select(x => new CharasteristicItem(x, CriticalMoment, CriticalSlip))
                    .OrderBy(x => x.Slip).ToList();
        }

        public double ActivePower { get; private set; }
        public double NominalMoment { get; private set; }
        public double CriticalMoment { get; private set; }
        public double NominalCurrent { get; private set; }
        public double StartingCurrent { get; private set; }
        public double PolesPairCount { get; private set; }
        public double NominalSlip { get; private set; }
        public double CriticalSlip { get; private set; }
        public List<CharasteristicItem> CharasteristicTable; 

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
                    Moment = 2*criticalMoment/(slip/criticalSlip + criticalSlip/slip);
                }
            }
        }
    }
}
