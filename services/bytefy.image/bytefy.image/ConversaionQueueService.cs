using System.Collections.Concurrent;
using ImageMagick;

namespace bytefy.image;

public class ConversionTask
{
    public byte[] ImageData { get; set; }
    public MagickFormat Format { get; set; }
}

public class ConversionQueueService : BackgroundService
{
    private readonly ConcurrentQueue<(ConversionTask Task, TaskCompletionSource<(byte[], string)> CompletionSource)> _queue = new();

    public void QueueConversion(ConversionTask task, TaskCompletionSource<(byte[], string)> completionSource)
    {
        _queue.Enqueue((task, completionSource));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            if (_queue.TryDequeue(out var item))
            {
                var result = await ProcessConversionAsync(item.Task);
                item.CompletionSource.SetResult(result);
            }
            else
            {
                await Task.Delay(50, stoppingToken); // Shorten the delay to check the queue more frequently
            }
        }
    }

    private Task<(byte[], string)> ProcessConversionAsync(ConversionTask task)
    {
        try
        {
            using var magickImage = new MagickImage(task.ImageData);
            magickImage.Format = task.Format;
            var resultStream = new MemoryStream();
            magickImage.Write(resultStream);
            resultStream.Position = 0;

            var mimeType = MimeTypes.MimeTypeMap.GetMimeType($"image/{task.Format.ToString().ToLower()}");
            return Task.FromResult((resultStream.ToArray(), mimeType));
        }
        catch (MagickImageErrorException ex)
        {
            // Log the error message
            Console.WriteLine($"Image conversion failed: {ex.Message}");

            // Return a default value or handle the error as appropriate for your application
            return Task.FromResult<(byte[], string)>((null, null));
        }
    }
}