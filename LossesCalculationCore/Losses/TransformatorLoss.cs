namespace LossesCalculationCore.Losses {
    using System;

    /// <summary>
    /// Transformator's loss
    /// </summary>
    public class TransformatorLoss : IValuable<double> {
        /// <summary>
        /// Инициализирует новый экземпляр класса <see cref="TransformatorLoss"/>.
        /// </summary>
        /// <param name="nominalPower">
        /// Номинальная мощность трансформатора, МВА
        /// </param>
        /// <param name="nominalVoltage">
        /// Номинальное напряжение, кВ
        /// </param>
        /// <param name="consumedEnergy">
        /// Потребленная активная электроэнергия за месяц, кВт*час
        /// </param>
        /// <param name="idlingPowerLoss">
        /// Потери мощности холостого хода трансформатора, кВт
        /// </param>
        /// <param name="shortCircuitLoss">
        /// Потери мощности короткого замыкания, кВт
        /// </param>
        /// <param name="loadedHourCount">
        /// Число часов работы трансформатора под нагрузкой за расчетный период, час
        /// </param>
        /// <param name="connectedTime">
        /// Время присоединения трансформатора за расчетный период к сети, час
        /// </param>
        public TransformatorLoss(
            double nominalPower,
            double nominalVoltage,
            double consumedEnergy,
            double idlingPowerLoss,
            double shortCircuitLoss,
            double loadedHourCount,
            double connectedTime) {

            var idlLoss = idlingPowerLoss * connectedTime * 1.061;
            var loadedCoef = (consumedEnergy / (nominalPower * loadedHourCount * 0.9)) * 0.001;
            var avgLost = consumedEnergy / (Math.Sqrt(3) * nominalVoltage * loadedHourCount * 0.9 * 1.033);
            var activeResistance = (shortCircuitLoss * nominalVoltage * nominalVoltage
                                    / (nominalPower * nominalPower)) * 0.001;
            var powerLoss = 3 * avgLost * avgLost * activeResistance * 0.001;
            var squareCoef = (1 + 2 * loadedCoef) / (3 * loadedCoef);
            var loadedLoss = 0.99 * powerLoss * loadedHourCount * squareCoef;
            var relLoadLoss = loadedLoss / consumedEnergy * 100;
            Value = idlLoss + (relLoadLoss * consumedEnergy / 100);
        }

        public string Description {
            get {
                return "Потери электроэнергии в трансформаторе";
            }
        }

        public double Value { get; private set; }
    }
}