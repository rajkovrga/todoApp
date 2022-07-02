using System.Text;
using AppContext;
using Core.Middlewares;
using EntityContext;
using Service.Job;
using Service.User;
using ServiceContract.Job;
using ServiceContract.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

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

var connectionString = configuration.GetConnectionString("ToDoDb");

builder.Services.AddDbContext<DataContext>(ctx =>
{        
    ctx.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});


builder.Services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services
    .AddTransient<IJobService, JobService>()
    .AddTransient<IUserService, UserService>()
    .AddTransient<IConfiguration>(x => configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller=Home}/{action=Index}/{id?}");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ErrorHandlerMiddleware>();
app.MapControllers();

app.Run();