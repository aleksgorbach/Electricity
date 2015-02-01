using System;
using System.ComponentModel.DataAnnotations;

namespace ElectricityWeb.Attributes {
    [AttributeUsage(AttributeTargets.Property)]
    public class IsNumericAttribute : ValidationAttribute {
        public enum NumberType {
            Integer,
            Floating
        }

        private readonly NumberType _type;

        public IsNumericAttribute(NumberType type = NumberType.Integer) {
            _type = type;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            if (value != null) {
                switch (_type) {
                    case NumberType.Integer:
                        int t;
                        if (int.TryParse(value.ToString(), out t)) {
                            return ValidationResult.Success;
                        }
                        return new ValidationResult(ErrorMessage);
                    case NumberType.Floating:
                        double d;
                        if (double.TryParse(value.ToString(), out d)) {
                            return ValidationResult.Success;
                        }
                        return new ValidationResult(ErrorMessage);
                }
            }
            return ValidationResult.Success;
        }
    }
}