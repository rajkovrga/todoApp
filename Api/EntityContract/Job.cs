namespace EntityContext;

public class Job : BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public AppUser AppUser { get; set; }
}
