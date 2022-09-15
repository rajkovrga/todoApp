using System.ComponentModel.DataAnnotations;

namespace Core.Models;

public class JobCreateModel
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
}