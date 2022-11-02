using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppContext.Seeders
{
    public interface Seeder
    {
        Task Seed();
    }
}
