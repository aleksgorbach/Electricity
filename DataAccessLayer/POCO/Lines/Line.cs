using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.POCO.Lines {
    public enum LineType {
            Air,
            AirCable,
            GroundCable
        }

        public enum LineMaterial {
            Copper,
            Aluminium
        }

    [Table("Lines")]
    public class Line {
        [Key]
        public Guid Id { get; set; }
        public double Square { get; set; }
        public LineType Type { get; set; }
        public LineMaterial Material { get; set; }

        public Line() {
            Id = Guid.NewGuid();
        }
    }
}
