using Bogus;
using EntityContext;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppContext.Seeders
{
    public class UserSeeder : Seeder
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<AppUser> _userManager;
        public UserSeeder(DataContext dataContext, UserManager<AppUser> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        public async Task Seed()
        {
            var userFaker = new Faker<AppUser>()
                .RuleFor(x => x.Email, f => f.Person.Email)
                .RuleFor(x => x.FirstName, f => f.Person.FirstName)
                .RuleFor(x => x.LastName, f => f.Person.LastName)
                .RuleFor(x => x.EmailConfirmed, f => true)
                .RuleFor(x => x.UserName, f => f.Person.Email);

            
            var users = userFaker.GenerateLazy(50).ToList();

            foreach (var item in users)
            {
                await _userManager.CreateAsync(item, "Passw0rd");
                await _userManager.AddToRoleAsync(_dataContext.Users.First(x => x.Email == item.Email), "user");
            }
        }
    }
}