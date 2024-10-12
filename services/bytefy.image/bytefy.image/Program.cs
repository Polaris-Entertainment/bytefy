using ImageMagick;
using Microsoft.AspNetCore.Antiforgery;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAntiforgery(options => options.HeaderName = "2311d8d8-607d-4747-8939-1bde65643254");
var app = builder.Build();

app.UseAntiforgery();

app.MapPost("/convert/{format}", async (IFormFile image, string format) =>
{
    try
    {
        if (!Enum.TryParse(format, true, out MagickFormat magickFormat) || magickFormat == MagickFormat.Unknown)
            return Results.BadRequest("Invalid format");

        if (image == null || image.Length == 0)
            return Results.BadRequest("No image provided");

        if (image.Length > 20 * 1024 * 1024)
            throw new Exception("Image size too large");

        using var memoryStream = new MemoryStream();
        await image.CopyToAsync(memoryStream);
        var magickImage = new MagickImage(memoryStream.ToArray());
        magickImage.Format = magickFormat;
        
        var resultStream = new MemoryStream();
        magickImage.Write(resultStream);
        resultStream.Position = 0;

        var mimeType = MimeTypes.MimeTypeMap.GetMimeType($"image/{magickFormat.ToString().ToLower()}");
        var fileName = Path.GetFileNameWithoutExtension(image.FileName);

        return Results.File(resultStream, mimeType, fileDownloadName: $"{fileName}.{magickFormat.ToString().ToLower()}");
    }
    catch (NotSupportedException) {
        return Results.BadRequest();
    }
});

app.MapGet("/antiforgery/token", (IAntiforgery forgeryService, HttpContext context) =>
{
    var tokens = forgeryService.GetAndStoreTokens(context);
    var xsrfToken = tokens.RequestToken!;
    return TypedResults.Content(xsrfToken, "text/plain");
});

app.Run();