namespace LossesCalculationCore.Implementations {

    public class TransmissionLoss : IValuable<double> {
        private const double COEFFICIENT = 1.1;

        /// <summary>
        /// Инициализирует новый экземпляр класса <see cref="TransmissionLoss"/>.
        /// </summary>
        /// <param name="phaseCount">
        /// Число фаз линии
        /// </param>
        /// <param name="resistivity">
        /// Удельное сопротивление материала, Ом * мм2
        /// </param>
        /// <param name="current">
        /// Среднеквардратичный ток линии, А
        /// </param>
        /// <param name="length">
        /// Длина линии, м
        /// </param>
        /// <param name="size">
        /// Сечение провода, мм2
        /// </param>
        /// <param name="time">
        /// Время работы за расчетный период, час
        /// </param>
        public TransmissionLoss(
            int phaseCount,
            double resistivity,
            double current,
            double length,
            double size,
            double time) {
                Value = COEFFICIENT * phaseCount * resistivity * current * current * length / size * 0.001 * time;
        }

        public string Description {
            get {
                return "Потери электроэнергии в линии электропередачи";
            }
        }

        public double Value { get; private set; }
    }
}