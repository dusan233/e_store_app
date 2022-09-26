using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            _config = config;
            _userManager = userManager;
        }


        public async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>{
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName),
          };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // secret key za citanje i kreiranje tokena.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));

            //algoritam koji se koristi za hasovanje.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            //config za kreiranje tokena,
            var tokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
              );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}