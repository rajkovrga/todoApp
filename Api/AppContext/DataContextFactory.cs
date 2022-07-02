using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AppContext;

public class DataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

        if (environment is null)
        {
            throw new ArgumentNullException("ASPNETCORE_ENVIRONMENT cannot be null");
        }

        var path = Path.GetFullPath(environment switch
        {
            "Development" => Path.Combine(Directory.GetCurrentDirectory(), "..", "Api"),
            _ => throw new Exception("Invalid ASPNETCORE_ENVIRONMENT")
        });

        var configuration = new ConfigurationBuilder()
            .SetBasePath(path)
            .AddJsonFile("appsettings.json", true)
            .AddJsonFile($"appsettings.{environment}.json", optional: true)
            .Build();
        
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        var connectionString = configuration.GetConnectionString("ToDoDb");
        
        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

        return new DataContext(optionsBuilder.Options);
    }
}