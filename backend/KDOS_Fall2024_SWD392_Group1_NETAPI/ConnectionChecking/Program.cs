using Microsoft.Extensions.Configuration;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        // Build configuration
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");

        IConfiguration config = builder.Build();

        // Create a ConnectionChecker object and check the MySQL connection
        ConnectionChecker checker = new ConnectionChecker(config);
        bool isConnected = checker.CheckConnection();

        Console.WriteLine(isConnected ? "MySQL database is connected." : "MySQL database connection failed.");
    }
}
