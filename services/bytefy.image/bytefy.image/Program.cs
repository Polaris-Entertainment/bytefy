using bytefy.image;
using ImageMagick;
using Microsoft.AspNetCore.Antiforgery;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAntiforgery(options => options.HeaderName = "2311d8d8-607d-4747-8939-1bde65643254");
builder.Services.AddSingleton<ConversionQueueService>();
builder.Services.AddHostedService(provider => provider.GetRequiredService<ConversionQueueService>());

var app = builder.Build();

app.UseAntiforgery();

var conversionQueue = app.Services.GetRequiredService<ConversionQueueService>();

app.MapPost("/convert/{format}", async (IFormFile image, string format) =>
{
    if (!Enum.TryParse(format, true, out MagickFormat magickFormat) || magickFormat == MagickFormat.Unknown)
        return Results.BadRequest("Invalid format");

    if (image == null || image.Length == 0)
        return Results.BadRequest("No image provided");

    if (image.Length > 20 * 1024 * 1024)
        throw new Exception("Image size too large");

    using var memoryStream = new MemoryStream();
    await image.CopyToAsync(memoryStream);

    var conversionTask = new ConversionTask
    {
        ImageData = memoryStream.ToArray(),
        Format = magickFormat
    };

    var tcs = new TaskCompletionSource<(byte[], string)>();
    conversionQueue.QueueConversion(conversionTask, tcs);

    var (imageData, mimeType) = await tcs.Task;

    return Results.File(new MemoryStream(imageData), mimeType, $"{Path.GetFileNameWithoutExtension(image.FileName)}.{magickFormat.ToString().ToLower()}");
});

app.MapGet("/antiforgery/token", (IAntiforgery forgeryService, HttpContext context) =>
{
    var tokens = forgeryService.GetAndStoreTokens(context);
    var xsrfToken = tokens.RequestToken!;
    return TypedResults.Content(xsrfToken, "text/plain");
});

app.MapGet("/formats", () =>
{
    var formats = Enum.GetNames<MagickFormat>().ToList();
    
    formats.Remove("Unknown");
    return Results.Ok(formats);
});

app.Run();
