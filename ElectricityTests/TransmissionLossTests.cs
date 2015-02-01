namespace ElectricityTests {
    using LossesCalculationCore.Implementations;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class TransmissionLossTests {
        [TestMethod]
        public void ValueTest() {
            // arrange
            var loss = new TransmissionLoss(3, 0.0271, 5.3407, 50, 240, 720);
            
            // act
            var lossValue = loss.Value;

            // assert
            Assert.AreEqual(0.38, lossValue, 0.01);
        }
    }
}
