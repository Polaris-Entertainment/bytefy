using bytefy.image;
using ImageMagick;
using Microsoft.AspNetCore.Antiforgery;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAntiforgery(options => options.HeaderName = "2311d8d8-607d-4747-8939-1bde65643254");
builder.Services.AddSingleton<ConversionQueueService>();
builder.Services.AddHostedService(provider => provider.GetRequiredService<ConversionQueueService>());

var corsSettings = builder.Configuration.GetSection("Cors").Get<CorsSettings>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins(corsSettings.AllowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
var app = builder.Build();

app.UseAntiforgery();
app.UseCors("AllowSpecificOrigin"); // Use the CORS policy
var conversionQueue = app.Services.GetRequiredService<ConversionQueueService>();

app.MapPost("/convert/{format}", async (IFormFile file, string format) =>
{
    try
    {
        if (!Enum.TryParse(format, true, out MagickFormat magickFormat) || magickFormat == MagickFormat.Unknown)
            return Results.BadRequest("Invalid format");

        var formatInfo = MagickNET.SupportedFormats.FirstOrDefault(f => f.Format == magickFormat);
        if (formatInfo == null || !formatInfo.SupportsReading || !formatInfo.SupportsWriting)
            return Results.BadRequest("Unsupported format");

        if (file == null || file.Length == 0)
            return Results.BadRequest("No image provided");

        if (file.Length > 20 * 1024 * 1024)
            throw new Exception("Image size too large");

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var conversionTask = new ConversionTask
        {
            ImageData = memoryStream.ToArray(),
            Format = magickFormat
        };

        var tcs = new TaskCompletionSource<(byte[], string)>();
        conversionQueue.QueueConversion(conversionTask, tcs);

        var (imageData, mimeType) = await tcs.Task;
    
        return Results.File(new MemoryStream(imageData), mimeType, $"{Path.GetFileNameWithoutExtension(file.FileName)}.{magickFormat.ToString().ToLower()}");
    }
    catch (ImageMagick.MagickImageErrorException e)
    {
        Console.WriteLine(e);
        return Results.BadRequest("Invalid image");
    }
}).DisableAntiforgery(); // should get this removed by getting antiforgery working with angular. Doesn't find Cookie.

app.MapGet("/antiforgery/token", (IAntiforgery forgeryService, HttpContext context) =>
{
    var tokens = forgeryService.GetAndStoreTokens(context);
    var xsrfToken = tokens.RequestToken!;
    return TypedResults.Content(xsrfToken, "text/plain");
}).DisableAntiforgery();

app.MapGet("/formats", () =>
{
    var formats = MagickNET.SupportedFormats
        .Where(f => f.SupportsReading && f.SupportsWriting)
        .Select(f => f.Format.ToString())
        .ToList();

    return Results.Ok(formats);
});

app.MapGet("/mimetype/{format}", (string format) =>
{
    var mimeType = MimeTypes.MimeTypeMap.GetMimeType($".{format.ToLower()}");
    return Results.Ok(mimeType);
});

app.Run();