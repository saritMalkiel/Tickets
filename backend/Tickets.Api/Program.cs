using System.Text.Json;
using System.Text.Json.Serialization;
using Tickets.Application;
using Tickets.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// ---- Services ----

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(builder.Configuration);

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();



// ---- Apply migrations + seed data on startup ----
InfrastructureServiceRegistration.MigrateAndSeedDatabase(app.Services);

// ---- Middleware pipeline ----

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");

app.UseMiddleware<GlobalExceptionMiddleware>();

app.MapControllers();

app.Run();
