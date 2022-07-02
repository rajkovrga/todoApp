namespace EntityContext;

public class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = new DateTime();
    public DateTime? UpdatedAt { get; set; } = null;
    public DateTime? DeletedAt { get; set; } = null;
}