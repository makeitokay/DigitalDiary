using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultAdminUserMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt" },
                values: new object[] { 1, "automation@digitaldiary.ru", "Automation", "Digital Diary", "5D3C089046FBB199FDC1C3D2F38F8E5CDC57EAEE06F6504FA8C15393564416E6706D8F771E3DC33D3134CC44BAEE76186DEA38B1C9DE297F407C180360570615", new byte[] { 130, 224, 89, 213, 133, 13, 21, 80, 177, 183, 80, 98, 153, 12, 208, 74 } });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
