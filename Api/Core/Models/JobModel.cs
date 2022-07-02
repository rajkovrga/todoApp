using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using EntityContext;

namespace Core.Models;

public class JobModel
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    public AppUser User { get; set; }
    public DateTime? DeletedAt { get; set; } = null;
    public DateTime? CreatedAt { get; set; } = null;
}