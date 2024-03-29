using EntityContext;
using EntityContract;
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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<AppUser>()
            .HasKey(x => x.Email);

        base.OnModelCreating(builder);
    }

    public DbSet<Job> Jobs { get; set; } = null!;
    public DbSet<EmailVerification> EmailVerifications { get; set; } = null!;

}