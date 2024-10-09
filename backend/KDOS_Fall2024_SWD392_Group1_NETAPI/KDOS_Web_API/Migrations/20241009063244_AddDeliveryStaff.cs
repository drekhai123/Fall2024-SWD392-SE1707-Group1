using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryStaff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_KoiFish_KoiFishId",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Customer_SenderId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_KoiFishId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "KoiFishId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Customer");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Orders",
                newName: "TransportId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_SenderId",
                table: "Orders",
                newName: "IX_Orders_TransportId");

            migrationBuilder.AddColumn<int>(
                name: "OrderDetailsId",
                table: "KoiFish",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DeliveryStaff",
                columns: table => new
                {
                    StaffId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    StaffName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Gender = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryStaff", x => x.StaffId);
                    table.ForeignKey(
                        name: "FK_DeliveryStaff_Account_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Account",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Transport",
                columns: table => new
                {
                    TransportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    location = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DeliveryStaffId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transport", x => x.TransportId);
                    table.ForeignKey(
                        name: "FK_Transport_DeliveryStaff_DeliveryStaffId",
                        column: x => x.DeliveryStaffId,
                        principalTable: "DeliveryStaff",
                        principalColumn: "StaffId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_KoiFish_OrderDetailsId",
                table: "KoiFish",
                column: "OrderDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryStaff_AccountId",
                table: "DeliveryStaff",
                column: "AccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transport_DeliveryStaffId",
                table: "Transport",
                column: "DeliveryStaffId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_KoiFish_OrderDetails_OrderDetailsId",
                table: "KoiFish",
                column: "OrderDetailsId",
                principalTable: "OrderDetails",
                principalColumn: "OrderDetailsId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Transport_TransportId",
                table: "Orders",
                column: "TransportId",
                principalTable: "Transport",
                principalColumn: "TransportId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KoiFish_OrderDetails_OrderDetailsId",
                table: "KoiFish");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Transport_TransportId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Transport");

            migrationBuilder.DropTable(
                name: "DeliveryStaff");

            migrationBuilder.DropIndex(
                name: "IX_KoiFish_OrderDetailsId",
                table: "KoiFish");

            migrationBuilder.DropColumn(
                name: "OrderDetailsId",
                table: "KoiFish");

            migrationBuilder.RenameColumn(
                name: "TransportId",
                table: "Orders",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_TransportId",
                table: "Orders",
                newName: "IX_Orders_SenderId");

            migrationBuilder.AddColumn<int>(
                name: "KoiFishId",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Customer",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_KoiFishId",
                table: "OrderDetails",
                column: "KoiFishId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_KoiFish_KoiFishId",
                table: "OrderDetails",
                column: "KoiFishId",
                principalTable: "KoiFish",
                principalColumn: "KoiFishId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Customer_SenderId",
                table: "Orders",
                column: "SenderId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
