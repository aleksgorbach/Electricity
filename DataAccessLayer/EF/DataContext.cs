using System.Data.Entity;

using DataAccessLayer.POCO.Lines;

namespace DataAccessLayer.EF {
    public class DataContext : DbContext {
        public DbSet<Line> Lines { get; set; }
    }
}