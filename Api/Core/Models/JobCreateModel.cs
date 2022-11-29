using System.ComponentModel.DataAnnotations;

namespace Core.Models;

public class JobCreateModel
{
    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
}