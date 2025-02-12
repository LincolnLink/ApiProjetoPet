using Dev.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Pet.Api.Controllers;
using Pet.Api.Extensions;
using Pet.Api.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Pet.Api.V1.Controllers
{
    [Route("api/v{version:apiVersion}")]//[Route("api")]
    [ApiController]
    public class AuthController : MainController
    {
        private readonly ILogger _logger;
        private readonly AppSettings _appSettings;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(
            INotificador notificador, IUser user,
            ILogger<AuthController> logger,
            IOptions<AppSettings> appSettings,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager) : base(notificador, user)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost("nova-conta")]
        public async Task<ActionResult> Registrar(RegisterUserViewModel registerUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var user = new IdentityUser
            {
                UserName = registerUser.Email,
                Email = registerUser.Email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (result.Succeeded)
            {
                var verificaMensagem =  CustomResponse();

                return Ok(new
                {
                    success = true,
                    message = "Usuário criado com sucesso."
                });

                //await _signInManager.SignInAsync(user, false);
                // Gerando o token e devolve ele !
                //return CustomResponse(await GerarJwt(user.Email));
                //return CustomResponse(GerarJwt());
            }
            foreach (var error in result.Errors)
            {
                NotificarErro($"Erro ao criar usuário: {error.Description}");
            }

            return CustomResponse(registerUser);
        }

        [HttpPost("entrar")]
        public async Task<ActionResult> Login(LoginUserViewModel loginUser)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            // verificando se está pegando a configuração de login
            if (_appSettings == null || string.IsNullOrEmpty(_appSettings.Secret) || string.IsNullOrEmpty(_appSettings.Emissor))
            {
                _logger.LogError("Configurações de AppSettings inválidas. Verifique o arquivo de configuração.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Configuração inválida.");
            }

            var result = await _signInManager.PasswordSignInAsync(loginUser.Email, loginUser.Password, false, true);

            if (result.Succeeded)
            {
                _logger.LogInformation("Usuario " + loginUser.Email + " logado com sucesso");
                return CustomResponse(await GerarJwt(loginUser.Email));
                //return CustomResponse(GerarJwt());
            }
            if (result.IsLockedOut)
            {
                NotificarErro("Usuário temporariamente bloqueado por tentativas inválidas");
                return CustomResponse(loginUser);
            }

            NotificarErro("Usuário ou Senha incorretos");
            return CustomResponse(loginUser);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Simplesmente registrar o logout, se necessário.
            _logger.LogInformation("Usuário fez logout.");
            return NoContent();
        }

        //private async Task<LoginResponseViewModel> GerarJwt(string email)//string email
        //private string GerarJwt()
        private async Task<LoginResponseViewModel> GerarJwt(string email)
        {

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new Exception("Usuário não encontrado");
            }
            var claims = await _userManager.GetClaimsAsync(user);           
            var userRoles = await _userManager.GetRolesAsync(user);
            try
            {


                // Adicionando claims do token.
                claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
                claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
                claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
                claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(), ClaimValueTypes.Integer64));

                // Passando as Roles para a listagem de claims
                foreach (var userRole in userRoles)
                {
                    claims.Add(new Claim("role", userRole));
                }

                // Convertendo para "ClaimsIdentity"
                var identityClaims = new ClaimsIdentity();
                identityClaims.AddClaims(claims);

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
                {
                    Issuer = _appSettings.Emissor,
                    Audience = _appSettings.ValidoEm,
                    Expires = DateTime.UtcNow.AddHours(_appSettings.ExpiracaoHoras),
                    Subject = identityClaims, // configura as Claims no token.
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

                });

                var encodedToken = tokenHandler.WriteToken(token);

                // Uma forma de retorno aonde é possivel passar mais informações alem do token.
                var response = new LoginResponseViewModel
                {
                    AccessToken = encodedToken,
                    ExpiresIn = TimeSpan.FromHours(_appSettings.ExpiracaoHoras).TotalSeconds,
                    UserToken = new UserTokenViewModel
                    {
                        Id = user.Id,
                        Email = user.Email,
                        Claims = claims.Select(c => new ClaimViewModel { Type = c.Type, Value = c.Value })
                    }
                };

                return response;

                //return encodedToken //forma antiga que passa só o token;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar token JWT");
                throw;
            }
        }


        private static long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);


    }
}
