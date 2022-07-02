namespace Core.Exceptions;

public class IdentityException : Exception
{
    public IdentityException(string message = "User error")
        : base(message)
    {
    }
}