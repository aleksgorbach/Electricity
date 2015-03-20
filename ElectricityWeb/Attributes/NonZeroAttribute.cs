using System;
using System.ComponentModel.DataAnnotations;

namespace ElectricityWeb.Attributes {
    [AttributeUsage(AttributeTargets.Property)]
    public class NonZeroAttribute : ValidationAttribute {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            if (value != null) {
                double d;
                if (double.TryParse(value.ToString(), out d)) {
                    return d == 0 ? new ValidationResult("Значение не должно равняться нулю") : ValidationResult.Success;
                }
            }
            return new ValidationResult("Значение поля некорректно");
        }
    }
}