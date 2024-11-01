using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Certificate",
                table: "FishProfile",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Account",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Certificate",
                table: "FishProfile");

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Account");
        }
    }
}
