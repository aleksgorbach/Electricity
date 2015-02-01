using LossesCalculationCore.Losses;

namespace ElectricityTests {
    using LossesCalculationCore.Implementations;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class TransformatorLossTests {
        [TestMethod]
        public void ValueTest() {
            // arrange
            var loss = new TransformatorLoss(0.63, 6, 37108, 1.31, 7.6, 720, 720);

            // act
            var value = loss.Value;

            // assert
            Assert.AreEqual(1001, value, 5);
        }
    }
}
