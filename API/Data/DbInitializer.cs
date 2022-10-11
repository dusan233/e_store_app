
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initalize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Bob",
                    Email = "bob@test.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd!");
                await userManager.AddToRoleAsync(user, "Member");


                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@test.com"
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd!");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Member" });
            }

            if (context.Products.Any()) return;

            var products = new List<Product> {
                new Product {
                    Name = "PS5 Resident Evil Village",
                    Description = "Resident Evil Village, osmi glavni nastavak čuvene Resident Evil franšize donosi nam horor kakav još nismo videli.Nova priča počinje par godina nakon događaja u Resident Evil 7. Ethan Winters i njegova žena Mia, žive mirnim životom, daleko od horora iz prošlosti.Nažalost porodična idila ne traje dugo.",
                    Price = 60,
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/ps5-Resident-Evil-Village-cena-prodaja-srbija-igra-PS50040_272_340px.jpg",
                    Type = "Game",
                    Type2 = "ps5",
                    Brand = "Capcon",
                    QuantityInStock = 100,
                },
                 new Product {
                    Name = "Konzola PlayStation 5 - 825GB + PS5 FIFA 23 + DualSense + Slušalice Pulse 3D White",
                    Description = "PlayStation konzola kao EA SPORTS FIFA 23 bundle donosi Svetsku igru u kuću sa HyperMotions 2 tehnologijom. Ove godine u FIFA 23 možeš igrati i sa muškim i sa ženskim timovima kao i Svetsko prvenstvo koje se održava u Kataru i to sve uz 3D zvuk koji se dobija putem Pulse 3D slušalica i heptičkim odzivom PS5 DualSense kontrolera.",
                    Price = 60,
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/PS5-Fifa-dualsense-pulse-3d-w-960x1200_272_340px.jpg",
                    Type = "Console",
                    Type2 = "ps5",
                    Brand = "Sony",
                    QuantityInStock = 24,
                },
                 new Product {
                    Name = "Spartan Gear Controller Silicon Skin Cover & Thumb Grips - Camo Green Playstation 5",
                    Description = "",
                    Price = 60,
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/Spartan-Gear-Controller-Silicon-Skin-Cover-Thumb-Grips---Camo-Green_272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "ps5",
                    Brand = "Sony",
                    QuantityInStock = 34,
                },
                  new Product {
                    Name = "PS4 Dragon Ball - The Breakers - Special Edition",
                    Description = "",
                    Price = 60,
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/PS4-Dragon-Ball-The-Breakers-Special-Edition-cena-prodaja-Srbija-PS41374_272_340px.jpg",
                    Type = "Game",
                    Type2 = "ps4",
                    Brand = "Dimps",
                    QuantityInStock = 55,
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}