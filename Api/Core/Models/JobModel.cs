using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using EntityContext;

namespace Core.Models;

public class JobModel
{
    public string Title { get; set; }
    public string Description { get; set; }
    public AppUser User { get; set; }
    public int Id { get; set; }
    public DateTime? DeletedAt { get; set; } = null;
    public DateTime? CreatedAt { get; set; } = null;
}