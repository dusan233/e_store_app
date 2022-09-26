using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                    Name = "Net Core Super Board",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/medium/image626be20798893.webp",
                    Type = "Boards",
                     Brand = "Brand",
                    QuantityInStock = 100,
                },
                new Product {
                    Name = "Net Core Super Board1",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/large/image615ffff51cd63.png",
                    Type = "Boards",
                     Brand = "Brand",
                    QuantityInStock = 100,
                },
                  new Product {
                    Name = "Net Core Super Board1",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/large/image615ffff51cd63.png",
                    Type = "Boards",
                     Brand = "Brand",
                    QuantityInStock = 100,
                },
                  new Product {
                    Name = "Net Core Super Board1",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/large/image615ffff51cd63.png",
                    Type = "Boards",
                     Brand = "Brand",
                    QuantityInStock = 100,
                },
                  new Product {
                    Name = "Net Core Super Board1",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/large/image615ffff51cd63.png",
                    Type = "Boards",
                     Brand = "Brand",
                    QuantityInStock = 100,
                },
                  new Product {
                    Name = "Net Core Super Board1",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/large/image615ffff51cd63.png",
                    Type = "Boards",
                     Brand = "Brand",
                    QuantityInStock = 100,
                },
                  new Product {
                    Name = "Net Core Super Board1",
                    Description = "Pellentesque habitant morbi horbi.",
                    Price = 30000,
                    PictureUrl = "https://img.gigatron.rs/img/products/large/image615ffff51cd63.png",
                    Type = "Boards",
                    Brand = "Brand",
                    QuantityInStock = 100,
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