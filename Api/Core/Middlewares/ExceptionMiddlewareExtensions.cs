using Microsoft.AspNetCore.Builder;
using System.Net;
using System.Text.Json;
using Core.Exceptions;
using Core.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Core.Middlewares;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            var errorDetails = new ErrorDetails()
            {
                Message = error.Message
            };

            switch (error)
            {
                case IdentityException:
                    response.StatusCode = (int) HttpStatusCode.NotFound;
                    break;
                case ModelNotFoundException:
                    response.StatusCode = (int) HttpStatusCode.NotFound;
                    break;
                case NullReferenceException:
                    response.StatusCode = (int) HttpStatusCode.BadRequest;
                    break;
                default:
                    errorDetails.Message = error.Message;
                    response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    break;
            }

            var result = JsonSerializer.Serialize(new {message = errorDetails?.Message});
            await response.WriteAsync(result);
        }
    }
}