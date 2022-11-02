using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace AppContext.Seeders
{
    public class RoleSeeder : Seeder
    {
        private readonly DataContext _dataContext;
        public RoleSeeder(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task Seed()
        {
            var roles = new List<RolesAndPermissions>();

            using (StreamReader r = new StreamReader("../AppContext/Seeders/data/rolesAndPermissions.json"))
            {
                string json = r.ReadToEnd();
                roles = JsonSerializer.Deserialize<List<RolesAndPermissions>>(json);
            }

            if(roles is not null)
            {

                var all = _dataContext.RoleClaims.ToList();
                _dataContext.RoleClaims.RemoveRange(all);
                await _dataContext.SaveChangesAsync();

                foreach (var item in roles)
                {
                    if (_dataContext.Roles.FirstOrDefault(x => x.Name == item.Name) is null)
                    {
                        _dataContext.Roles.Add(new IdentityRole { Name = item.Name, NormalizedName = item.Name!.ToUpper() });

                        await _dataContext.SaveChangesAsync();
                    }

                    foreach (var permission in item.Permissions!)
                    {
                        var id = _dataContext.Roles.First(x => x.Name == item.Name).Id;
                        _dataContext.RoleClaims.Add(new IdentityRoleClaim<string> { ClaimValue = permission, ClaimType = item.Name, RoleId =  id});
                        await _dataContext.SaveChangesAsync();
                    }
                }
            }
        }
    }

    public class RolesAndPermissions
    {
        public string? Name { get; set; }
        public List<string>? Permissions { get; set; }
    }
}
