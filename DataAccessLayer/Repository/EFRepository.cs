using System.Collections.Generic;

using DataAccessLayer.EF;

namespace DataAccessLayer.Repository {
    public class EFRepository<T> : IRepository<T>
        where T : class {

        public void Add(T item) {
            using (var context = new DataContext()) {
                context.Set<T>().Add(item);
                context.SaveChanges();
            }
        }

        public void Remove(T item) {
            using (var context = new DataContext()) {
                context.Set<T>().Remove(item);
                context.SaveChanges();
            }
        }

        public IEnumerable<T> All() {
            using (var context = new DataContext()) {
                foreach (var item in context.Set<T>()) {
                    yield return item;
                }
            }
        }
    }
}
