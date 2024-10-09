using KDOS_Web_API.Datas;
using KDOS_Web_API.Mappings;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(c =>
{
    // ALLOW ALL CROSS DOMAIN ACCESS - DANGER DON'T DO
    c.AddPolicy("AllowOrigin", option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
builder.Services.AddDbContext<KDOSDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 30))));
// Inject the Repository
builder.Services.AddScoped<IAccountRepository, SQLAccountRepository>();
builder.Services.AddScoped<ICustomerRepository, SQLCustomerRepository>();
builder.Services.AddScoped<IStaffRepository, SQLStaffRespository>();
builder.Services.AddScoped<IDeliveryStaffRepository, SQLDeliveryStaffRepository>();
//End Respository
//AutoMapper Service Inject
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
//End AutoMapping
// Password Hashing Inject
builder.Services.AddScoped<IPasswordHasher<Account>, PasswordHasher<Account>>();
//End Hashing
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// To Serve Swagger instance the momment it got accessed
builder.Services.ConfigureSwaggerGen(setup =>
{
    setup.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "KODS Api Service",
        Version = "v1"
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwaggerUI();
app.UseSwagger(); // Use Swagger in deployment, not just Dev mode

app.UseHttpsRedirection();
app.UseCors("AllowOrigin"); // Set Allow Cross Origins Connection
app.UseAuthorization();

app.MapControllers();

app.Run();
