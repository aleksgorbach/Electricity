using System.Collections.Generic;

namespace DataAccessLayer.Repository {
    public interface IRepository<T> {
        void Add(T item);
        void Remove(T item);
        IEnumerable<T> All();
    }
}
