﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

using ElectricityWeb.Attributes;

using LossesCalculationCore.Engine;

namespace ElectricityWeb.Models.Engine {
    public class AsyncEngineModel : ResultModel {

        public AsyncEngineModel() {
            CharasteristicTable = new List<CharasteristicItemModel>();
        }

        #region Входные данные

        [Display(Name = "Номинальная мощность")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? NominalPower { get; set; }
        public string NominalPowerUnits {
            get {
                return "кВт";
            }
        }

        [Display(Name = "Номинальное напряжение")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? NominalVoltage { get; set; }
        public string NominalVoltageUnits {
            get {
                return "В";
            }
        }

        [Display(Name = "Частота вращения")]
        [Required]
        [NonZero]
        [IsNumeric(ErrorMessage = "Неверный формат")]
        public int? Frequency { get; set; }
        public string FrequencyUnits {
            get {
                return "об/мин";
            }
        }

        [Display(Name = "Коэффициент использования")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? UsingCoefficient { get; set; }
        public string UsingCoefficientUnits {
            get {
                return "%";
            }
        }

        [Display(Name = "Косинус угла")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? Cosinus { get; set; }
        public string CosinusUnits {
            get {
                return "";
            }
        }

        [Display(Name = "Отношение пускового тока к номинальному")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? CurrentsRelation { get; set; }
        public string CurrentsRelationUnits {
            get {
                return "";
            }
        }

        [Display(Name = "Отношение максимального момента к номинальному")]
        [Required]
        [NonZero]
        [IsNumeric(IsNumericAttribute.NumberType.Floating, ErrorMessage = "Неверный формат")]
        public double? MomentsRelation { get; set; }
        public string MomentsRelationUnits {
            get {
                return "";
            }
        }

        #endregion

        #region Выходные данные

        [Display(Name = "Активная мощность")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double ActivePower { get; set; }
        public string ActivePowerUnits {
            get {
                return "кВт";
            }
        }

        [Display(Name = "Номинальный момент")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double NominalMoment { get; set; }
        public string NominalMomentUnits {
            get {
                return "Нм";
            }
        }

        [Display(Name = "Критический момент")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double CriticalMoment { get; set; }
        public string CriticalMomentUnits {
            get {
                return "Нм";
            }
        }

        [Display(Name = "Номинальный ток")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double NominalCurrent { get; set; }
        public string NominalCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Пусковой ток")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double StartingCurrent { get; set; }
        public string StartingCurrentUnits {
            get {
                return "А";
            }
        }

        [Display(Name = "Число пар полюсов")]
        public int PolesPairCount { get; set; }
        public string PolesPairCountUnits {
            get {
                return "шт";
            }
        }

        [Display(Name = "Номинальное скольжение")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double NominalSlip { get; set; }
        public string NominalSlipUnits {
            get {
                return "";
            }
        }

        [Display(Name = "Критическое скольжение")]
        [DisplayFormat(DataFormatString = "{0:0.000}")]
        public double CriticalSlip { get; set; }
        public string CriticalSlipUnits {
            get {
                return "";
            }
        }

        [Display(Name = "Возможность запуска")]
        public bool CanStart { get; set; }

        public List<CharasteristicItemModel> CharasteristicTable;
 
        #endregion

        public void SetCharacteristic(AsyncEngine.Charasteristic charasteristic) {
            ActivePower = charasteristic.ActivePower;
            NominalMoment = charasteristic.NominalMoment;
            CriticalMoment = charasteristic.CriticalMoment;
            NominalCurrent = charasteristic.NominalCurrent;
            StartingCurrent = charasteristic.StartingCurrent;
            PolesPairCount = charasteristic.PolesPairCount;
            NominalSlip = charasteristic.NominalSlip;
            CriticalSlip = charasteristic.CriticalSlip;
            CanStart = charasteristic.CanStart;
            CharasteristicTable =
                charasteristic.CharasteristicTable.Select(
                    x => new CharasteristicItemModel { Count = x.Count, Moment = x.Moment, Slip = x.Slip }).ToList();
        }

        public class CharasteristicItemModel {
            public double Count { get; set; }
            public double Moment { get; set; }
            public double Slip { get; set; }
        }
    }
}