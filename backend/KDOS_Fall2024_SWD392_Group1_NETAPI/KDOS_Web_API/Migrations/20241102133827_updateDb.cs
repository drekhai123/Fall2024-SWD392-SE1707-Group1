using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class updateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "DeliveryStaff");

            migrationBuilder.AddColumn<DateOnly>(
                name: "Dob",
                table: "Staff",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "Dob",
                table: "DeliveryStaff",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dob",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "Dob",
                table: "DeliveryStaff");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Staff",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "DeliveryStaff",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
