using Infrastructure.Config;
using Infrastructure.Extensions;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

builder.Configuration.AddEnvironmentVariables(prefix: "DIGITAL_DIARY_");
services.Configure<EmailConfig>(builder.Configuration.GetSection("Email"));

services.AddRazorPages();
services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("Default");
services.AddDbContext(connectionString);
services.AddRepositories();

services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
	.AddCookie(options =>
	{
		options.LoginPath = "/auth/login";
	});

services.AddScoped<IPasswordManager, PasswordManager>();
services.AddScoped<IEmailClient, EmailClientStub>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Error");
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();