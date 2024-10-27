using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class MeoMeo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "Transport",
                newName: "Status");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Transport",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "HealthCareStaffId",
                table: "Transport",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "Transport",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DistancePriceListId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeightPriceListId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DistancePriceList",
                columns: table => new
                {
                    DistancePriceListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MinRange = table.Column<float>(type: "float", nullable: false),
                    MaxRange = table.Column<float>(type: "float", nullable: false),
                    Price = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistancePriceList", x => x.DistancePriceListId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LogTransport",
                columns: table => new
                {
                    LogTransportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Time = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Location = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TransportId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogTransport", x => x.LogTransportId);
                    table.ForeignKey(
                        name: "FK_LogTransport_Transport_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transport",
                        principalColumn: "TransportId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WeightPriceList",
                columns: table => new
                {
                    WeightPriceListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MinRange = table.Column<float>(type: "float", nullable: false),
                    MaxRange = table.Column<float>(type: "float", nullable: false),
                    Price = table.Column<float>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeightPriceList", x => x.WeightPriceListId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Transport_StaffId",
                table: "Transport",
                column: "StaffId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DistancePriceListId",
                table: "Orders",
                column: "DistancePriceListId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_WeightPriceListId",
                table: "Orders",
                column: "WeightPriceListId");

            migrationBuilder.CreateIndex(
                name: "IX_LogTransport_TransportId",
                table: "LogTransport",
                column: "TransportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DistancePriceList_DistancePriceListId",
                table: "Orders",
                column: "DistancePriceListId",
                principalTable: "DistancePriceList",
                principalColumn: "DistancePriceListId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_WeightPriceList_WeightPriceListId",
                table: "Orders",
                column: "WeightPriceListId",
                principalTable: "WeightPriceList",
                principalColumn: "WeightPriceListId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transport_Staff_StaffId",
                table: "Transport",
                column: "StaffId",
                principalTable: "Staff",
                principalColumn: "StaffId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DistancePriceList_DistancePriceListId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_WeightPriceList_WeightPriceListId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Transport_Staff_StaffId",
                table: "Transport");

            migrationBuilder.DropTable(
                name: "DistancePriceList");

            migrationBuilder.DropTable(
                name: "LogTransport");

            migrationBuilder.DropTable(
                name: "WeightPriceList");

            migrationBuilder.DropIndex(
                name: "IX_Transport_StaffId",
                table: "Transport");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DistancePriceListId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_WeightPriceListId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "HealthCareStaffId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "Transport");

            migrationBuilder.DropColumn(
                name: "DistancePriceListId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "WeightPriceListId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Transport",
                newName: "status");

            migrationBuilder.AlterColumn<string>(
                name: "status",
                table: "Transport",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "location",
                table: "Transport",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
