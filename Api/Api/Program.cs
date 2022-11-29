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
using Api.Formatters;
using AppContext.Seeders;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

string policyName = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(policyName,
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

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
builder.Services.AddDbContext<DataContext>(ctx => ctx.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services
    .AddTransient<IJobService, JobService>()
    .AddTransient<IUserService, UserService>()
    .AddTransient<IConfiguration>(x => configuration)
    .AddTransient<IEmailService, EmailService>()
    .AddTransient<ITokenService, TokenService>();

builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("BasicActions", policy =>
        policy.RequireRole(ClaimTypes.Role, "user", "admin"));

    options.AddPolicy("UserActions", policy =>
        policy.RequireRole(ClaimTypes.Role, "user"));

    options.AddPolicy("AdminActions", policy =>
        policy.RequireRole(ClaimTypes.Role, "admin"));

});

builder.Services.AddControllers();
builder.Services.AddControllers(o => o.InputFormatters.Insert(o.InputFormatters.Count, new TextPlainInputFormatter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireDigit = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetService<DataContext>();
}

if (args.Length > 0 && !string.IsNullOrEmpty(args[0]))
{
    await SeedData(app, args[0]);
    return;
}

async Task SeedData(IHost app, string arg)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using(var scope = scopedFactory?.CreateScope())
    {
        var service = scope?.ServiceProvider.GetService<DataContext>();

        if(arg.ToLower().Contains("seed"))
        {
            var userManagerService = scope?.ServiceProvider.GetService<UserManager<AppUser>>();
            
            await (new RoleSeeder(service!)).Seed();
            await (new UserSeeder(service!, userManagerService!)).Seed();
        }

        if (arg.ToLower().Contains("roles"))
        {
            await (new RoleSeeder(service!)).Seed();
        }

    }

    Console.WriteLine("Data successed succesfully");
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseCors(policyName);
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller=Home}/{action=Index}/{id?}");

app.Run();
