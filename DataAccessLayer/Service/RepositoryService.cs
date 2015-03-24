using DataAccessLayer.POCO.Lines;
using DataAccessLayer.Repository;

namespace DataAccessLayer.Service {
    public static class RepositoryService {
        static RepositoryService() {
            LineRepository = new EFRepository<Line>();
        }

        public static IRepository<Line> LineRepository { get; private set; }  
    }
}
