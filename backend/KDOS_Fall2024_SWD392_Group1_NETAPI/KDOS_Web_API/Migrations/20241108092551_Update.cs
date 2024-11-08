using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KDOS_Web_API.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LogTransport_Customer_TransportId",
                table: "LogTransport");

            migrationBuilder.CreateIndex(
                name: "IX_LogTransport_CustomerId",
                table: "LogTransport",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_LogTransport_Customer_CustomerId",
                table: "LogTransport",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LogTransport_Customer_CustomerId",
                table: "LogTransport");

            migrationBuilder.DropIndex(
                name: "IX_LogTransport_CustomerId",
                table: "LogTransport");

            migrationBuilder.AddForeignKey(
                name: "FK_LogTransport_Customer_TransportId",
                table: "LogTransport",
                column: "TransportId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
