using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class FixedTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KoiFish_OrderDetails_OrderDetailsId",
                table: "KoiFish");

            migrationBuilder.DropIndex(
                name: "IX_KoiFish_OrderDetailsId",
                table: "KoiFish");

            migrationBuilder.DropColumn(
                name: "HealthStatus",
                table: "KoiFish");

            migrationBuilder.DropColumn(
                name: "OrderDetailsId",
                table: "KoiFish");

            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "OrderDetails",
                newName: "FishWeight");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "OrderDetails",
                newName: "KoiFishId");

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "RecipientPhoneNumber",
                keyValue: null,
                column: "RecipientPhoneNumber",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientPhoneNumber",
                table: "Orders",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "RecipientName",
                keyValue: null,
                column: "RecipientName",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientName",
                table: "Orders",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "RecipientEmail",
                keyValue: null,
                column: "RecipientEmail",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientEmail",
                table: "Orders",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "RecipientAddress",
                keyValue: null,
                column: "RecipientAddress",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientAddress",
                table: "Orders",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "DeliveryNote",
                keyValue: null,
                column: "DeliveryNote",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryNote",
                table: "Orders",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SenderAddress",
                table: "Orders",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SenderName",
                table: "Orders",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SenderPhoneNumber",
                table: "Orders",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "FishAge",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "KoiFish",
                keyColumn: "FishType",
                keyValue: null,
                column: "FishType",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "FishType",
                table: "KoiFish",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "KoiFish",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HealthStatus",
                columns: table => new
                {
                    HealthStatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderDetailsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthStatus", x => x.HealthStatusId);
                    table.ForeignKey(
                        name: "FK_HealthStatus_OrderDetails_OrderDetailsId",
                        column: x => x.OrderDetailsId,
                        principalTable: "OrderDetails",
                        principalColumn: "OrderDetailsId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_KoiFishId",
                table: "OrderDetails",
                column: "KoiFishId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HealthStatus_OrderDetailsId",
                table: "HealthStatus",
                column: "OrderDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_KoiFish_KoiFishId",
                table: "OrderDetails",
                column: "KoiFishId",
                principalTable: "KoiFish",
                principalColumn: "KoiFishId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_KoiFish_KoiFishId",
                table: "OrderDetails");

            migrationBuilder.DropTable(
                name: "HealthStatus");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_KoiFishId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "SenderAddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SenderName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SenderPhoneNumber",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FishAge",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "KoiFish");

            migrationBuilder.RenameColumn(
                name: "KoiFishId",
                table: "OrderDetails",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "FishWeight",
                table: "OrderDetails",
                newName: "Weight");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientPhoneNumber",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientName",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientEmail",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "RecipientAddress",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "DeliveryNote",
                table: "Orders",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "FishType",
                table: "KoiFish",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "HealthStatus",
                table: "KoiFish",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "OrderDetailsId",
                table: "KoiFish",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_KoiFish_OrderDetailsId",
                table: "KoiFish",
                column: "OrderDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_KoiFish_OrderDetails_OrderDetailsId",
                table: "KoiFish",
                column: "OrderDetailsId",
                principalTable: "OrderDetails",
                principalColumn: "OrderDetailsId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
