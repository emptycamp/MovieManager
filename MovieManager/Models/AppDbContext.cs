using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MovieManager.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
    }
}
