using System;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

public class ConnectionChecker
{
    private readonly string _connectionString;

    public ConnectionChecker(IConfiguration configuration)
    {
        // Get the connection string from appsettings.json
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public bool CheckConnection()
    {
        try
        {
            using (MySqlConnection connection = new MySqlConnection(_connectionString))
            {
                connection.Open();
                Console.WriteLine("Connection to MySQL successful.");
                return true;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Connection to MySQL failed: {ex.Message}");
            return false;
        }
    }
}
