using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DigitalDiary.Admin.Pages.AuthPage;

public class LogoutModel : PageModel
{
	public async Task<IActionResult> OnPostAsync()
	{
		await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
		return LocalRedirect("/");
	}
}