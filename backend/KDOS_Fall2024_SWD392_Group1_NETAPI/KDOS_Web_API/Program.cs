using KDOS_Web_API.Datas;
using KDOS_Web_API.Mappings;
using KDOS_Web_API.Models.Domains;
using KDOS_Web_API.Repositories;
using KDOS_Web_API.Services.MailingService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

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
builder.Services.AddScoped<IOrderRepository, SQLOrderRepository>();
builder.Services.AddScoped<IOrderDetailsRepository, SQLOrderDetailsRepository>();
builder.Services.AddScoped<IAccountRepository, SQLAccountRepository>();
builder.Services.AddScoped<ICustomerRepository, SQLCustomerRepository>();
builder.Services.AddScoped<IStaffRepository, SQLStaffRespository>();
builder.Services.AddScoped<IHealthCareStaffRepository, SQLHealthCareStaffRepository>();
builder.Services.AddScoped<IDeliveryStaffRepository, SQLDeliveryStaffRepository>();
builder.Services.AddScoped<IKoiFishRepository, SQLKoiFishRepository>();
builder.Services.AddScoped<IFishProfileRepository, SQLFishProfileRepository>();
builder.Services.AddScoped<IFeedBackRepository, SQLFeedBackRepository>();
builder.Services.AddScoped<ITransportRepository, SQLTransportRepository>();
builder.Services.AddScoped<IWeightPriceListRepository, SQLWeightPriceListRepository>();
builder.Services.AddScoped<IHealthStatusRepository, SQLHealthStatusRepository>();
builder.Services.AddScoped<IDistancePriceListRepository, SQLDistancePriceListRepository>();
builder.Services.AddScoped<ILogTransportRepository, SQLLogTransportRepository>();
builder.Services.AddScoped<IPaymentRepository, SQLPaymentRepository>();
//Inject Mailing service
builder.Services.AddScoped<IMailingService, MailingService>();
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
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddAuthorization();

//// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Configure enums to be serialized as strings
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });


builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("")
    .AddEntityFrameworkStores<KDOSDbContext>()
    .AddDefaultTokenProviders();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
 

});
// Add Swagger and configure JWT Bearer authorization
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] { }
        }
    });
});




var app = builder.Build();



// Configure the HTTP request pipeline.
app.UseSwaggerUI();
app.UseSwagger(); // Use Swagger in deployment, not just Dev mode

app.UseHttpsRedirection();
app.UseCors("AllowOrigin"); // Set Allow Cross Origins Connection
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
