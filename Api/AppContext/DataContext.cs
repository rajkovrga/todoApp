using EntityContext;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AppContext;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
        
    }
  
    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
    {
        var items = ChangeTracker.Entries();
        foreach (var item in items)
        {
            if (item.Entity is BaseEntity e)
            {
                switch (item.State)
                {
                    case EntityState.Added:
                        e.CreatedAt = DateTime.Now;
                        break;
    
                    case EntityState.Modified:
                        e.UpdatedAt = DateTime.Now;
                        break;
                }
            }
        }
    
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
   
    public DbSet<Job> Jobs { get; set; } = null!;
}