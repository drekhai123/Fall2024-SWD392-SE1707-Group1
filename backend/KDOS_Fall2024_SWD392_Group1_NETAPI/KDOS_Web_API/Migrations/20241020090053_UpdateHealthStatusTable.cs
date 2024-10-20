using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateHealthStatusTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FishAge",
                table: "OrderDetails");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "HealthStatus",
                newName: "Notes");

            migrationBuilder.AddColumn<float>(
                name: "OxygenLevel",
                table: "HealthStatus",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "PHLevel",
                table: "HealthStatus",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Temperature",
                table: "HealthStatus",
                type: "float",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OxygenLevel",
                table: "HealthStatus");

            migrationBuilder.DropColumn(
                name: "PHLevel",
                table: "HealthStatus");

            migrationBuilder.DropColumn(
                name: "Temperature",
                table: "HealthStatus");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "HealthStatus",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "OrderStatus",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FishAge",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
