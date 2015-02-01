namespace LossesCalculationCore {
    /// <summary>
    /// Describes the objects that could be descripted
    /// </summary>
    public interface IValuable<T> {
        /// <summary>
        /// Gets the string representation of the object's description
        /// </summary>
        string Description { get; }
        T Value { get; }
    }
}
