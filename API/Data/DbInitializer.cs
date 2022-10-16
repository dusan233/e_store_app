
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
                    Price = 6999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_960/ps5-Resident-Evil-Village-cena-prodaja-srbija-igra-PS50040_960_1200px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/ps5-Resident-Evil-Village-cena-prodaja-srbija-igra-PS50040_272_340px.jpg",
                    Type = "Game",
                    Type2 = "ps5",
                    Brand = "Capcon",
                    QuantityInStock = 100,
                },
                 new Product {
                    Name = "Konzola PlayStation 5 - 825GB + PS5 FIFA 23 + DualSense + Slušalice Pulse 3D White",
                    Description = "PlayStation konzola kao EA SPORTS FIFA 23 bundle donosi Svetsku igru u kuću sa HyperMotions 2 tehnologijom. Ove godine u FIFA 23 možeš igrati i sa muškim i sa ženskim timovima kao i Svetsko prvenstvo koje se održava u Kataru i to sve uz 3D zvuk koji se dobija putem Pulse 3D slušalica i heptičkim odzivom PS5 DualSense kontrolera.",
                    Price = 72000,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/PS5-Fifa-dualsense-pulse-3d-w-960x1200_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/PS5-Fifa-dualsense-pulse-3d-w-960x1200_272_340px.jpg",
                    Type = "Console",
                    Type2 = "ps5",
                    Brand = "Sony",
                    QuantityInStock = 24,
                },
                 new Product {
                    Name = "Spartan Gear Controller Silicon Skin Cover & Thumb Grips - Camo Green Playstation 5",
                    Description = "",
                    Price = 9125,
                    Poster = "",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/Spartan-Gear-Controller-Silicon-Skin-Cover-Thumb-Grips---Camo-Green_272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "ps5",
                    Brand = "Sony",
                    QuantityInStock = 34,
                },
                  new Product {
                    Name = "PS4 Dragon Ball - The Breakers - Special Edition",
                    Description = "",
                    Price = 6999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/PS4-Dragon-Ball-The-Breakers-Special-Edition-cena-prodaja-Srbija-PS41374_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/PS4-Dragon-Ball-The-Breakers-Special-Edition-cena-prodaja-Srbija-PS41374_272_340px.jpg",
                    Type = "Game",
                    Type2 = "ps4",
                    Brand = "Dimps",
                    QuantityInStock = 55,
                },
                 new Product {
                    Name = "Konzola Playstation 4 500GB Black Slim + HZD Complete edition + Last Of Us + Gran Turismo 7",
                    Description = @"PS4 je najbolje mesto za igranje!
                                    PS4 konzola, pruža izuzetnu snagu za igranje, neverovatnu zabavu i živopisnu HDR tehnologiju.
                                    Sony Playstation 4 Slim, manja i lakša verzija konzole dolazi sa 500GB memorije i jednim Dualshock 4 bežičnim kontrolerom.
                                    Ekskluzivne igre odvešće te na neverovatna putovanja, od najzanimljivijih indie igara, do nagrađivanih AAA naslova.",
                    Price = 40000,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/ps4bindle_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/ps4bindle_272_340px.jpg",
                    Type = "Console",
                    Type2 = "ps4",
                    Brand = "Sony",
                    QuantityInStock = 20,
                },
                 new Product {
                    Name = "Tastatura Playstation 4 Bluetooth",
                    Description = "",
                    Price = 1999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/Tastatura-Playstation-4-Bluetooth-cena-prodaja-Srbija-HAC1646-0_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/Tastatura-Playstation-4-Bluetooth-cena-prodaja-Srbija-HAC1646-0_272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "ps4",
                    Brand = "Sony",
                    QuantityInStock = 23,
                },
                  new Product {
                    Name = "Konzola XBOX Series X 1TB + FIFA 22 + GTA V Next Gen + Devil May Cry 5 Special Edition",
                    Description = @"Predstavljamo Xbox Series X. Reprodukujte hiljade naslova iz četiri generacije konzola - sve igre izgledaju najbolje na Xbox Series X. U središtu Series X je Xbox Velocity Architecture, koja spaja prilagođeni SSD sa integrisanim softverom za brže igranje sa znatno smanjenim vremenom učitavanja. Brzo se prebacujte između više igara pomoću funkcije  Quick Resume (Brzi nastavak).

XBSX je najbrža i najbolja konzola ikada proizvedena od strane Microsoft-a.",
                    Price = 94999,
                    Poster = "",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/GameS_XBOX_Series_X_900x1200_272_340px.jpg",
                    Type = "Console",
                    Type2 = "Xbox Series X/S",
                    Brand = "Microsoft",
                    QuantityInStock = 23,
                },
                 new Product {
                    Name = "XBOX Series X Hogwarts Legacy Deluxe Edition",
                    Description = @"Hogvorts Legacy je impresivna, open-world akciona RPG igra . Sada možeš da iskušiš kako je to biti učenik u školi za čarobnjake i veštiće.",
                    Price = 9999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_960/XBOX-Series-X-Hogwards-Legacy-Deluxe-Edition_960_1200px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/XBOX-Series-X-Hogwards-Legacy-Deluxe-Edition_272_340px.jpg",
                    Type = "Game",
                    Type2 = "Xbox Series X/S",
                    Brand = "Avalance Software",
                    QuantityInStock = 23,
                },
                new Product {
                    Name = "Numskull XBOX Series X - Dual Charging Dock",
                    Description = "",
                    Price = 1999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/819J6dkfCUL-_AC_SL1500__800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/819J6dkfCUL-_AC_SL1500__272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "Xbox Series X/S",
                    Brand = "",
                    QuantityInStock = 59,
                },
                new Product {
                    Name = "XBOX ONE Mass Effect Andromeda",
                    Description = "",
                    Price = 1999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_800/XBO223_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_272/XBO223_272_340px.jpg",
                    Type = "Game",
                    Type2 = "Xbox One",
                    Brand = "EA",
                    QuantityInStock = 18,
                },
                 new Product {
                    Name = "Pro Soft Silicone Protective Cover Green",
                    Description = "",
                    Price = 1999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_800/HAC1045_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_272/HAC1045_272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "Xbox One",
                    Brand = "",
                    QuantityInStock = 181,
                },
                  new Product {
                    Name = "Switch Brawlout",
                    Description = "",
                    Price = 1999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/Switch-Brawlout-cena-prodaja-Srbija-NSW619_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/Switch-Brawlout-cena-prodaja-Srbija-NSW619_272_340px.jpg",
                    Type = "Game",
                    Type2 = "Nintendo Switch",
                    Brand = "",
                    QuantityInStock = 21,
                },
                   new Product {
                    Name = "Konzola Nintendo Switch (Gray Joy-Con)",
                    Description = "",
                    Price = 44999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_800/HKO0319_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_272/HKO0319_272_340px.jpg",
                    Type = "Console",
                    Type2 = "Nintendo Switch",
                    Brand = "",
                    QuantityInStock = 41,
                },
                    new Product {
                    Name = "Joy-Con Strap Grey",
                    Description = "",
                    Price = 999,
                    Poster = "",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/slike_proizvoda/thumbs_272/HAC1390_272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "Nintendo Switch",
                    Brand = "",
                    QuantityInStock = 41,
                },
                new Product {
                    Name = "PC FIFA 23",
                    Description = @"FIFA 23 za PC donosi nam najautentičnije fudbalsko iskustvo u jednoj video igri sa najvećim timovima i zvezdama. Ove godine tu je preko 19.000 igrača iz 700 timova, više od 100 stadiona i 30 zvaničnih liga.
Vaši omiljeni modovi za igru su opet tu, FIFA ULTIMATE TEAM gde raviš svoj savršeni tim, CAREER  mod, PRO CLUBS i VOLTA FOOTBALL

",
                    Price = 8999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/nova-PC-fifa23-cena-srbija-prodaja-kupi_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/nova-PC-fifa23-cena-srbija-prodaja-kupi_272_340px.jpg",
                    Type = "Game",
                    Type2 = "PC",
                    Brand = "",
                    QuantityInStock = 41,
                },
                  new Product {
                    Name = "Miš Marvo M115",
                    Description = "",
                    Price = 999,
                    Poster = "https://www.games.rs/files/thumbs/files/images/product/thumbs_800/Mis-Marvo-M115-cena-prodaja-Srbija-HMI00365_800_1000px.jpg",
                    PictureUrl = "https://www.games.rs/files/thumbs/files/images/product/thumbs_272/Mis-Marvo-M115-cena-prodaja-Srbija-HMI00365_272_340px.jpg",
                    Type = "Equipment",
                    Type2 = "PC",
                    Brand = "",
                    QuantityInStock = 41,
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