using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDefaultAdminUserMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "PasswordHash", "PasswordSalt" },
                values: new object[] { "automation@digitaldiary.site", "27E212D81DAEF9C6DFE5133B92CE15E27B3A9319A128A8879CD748BD2BA3797BA45CBB2347F4AF2F268167A18315D2C1A8D2CC8091EF4EDB94C7FB79BE42DC3C", new byte[] { 234, 29, 227, 79, 176, 3, 140, 65, 7, 220, 1, 104, 63, 17, 12, 160 } });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "PasswordHash", "PasswordSalt" },
                values: new object[] { "automation@digitaldiary.ru", "5D3C089046FBB199FDC1C3D2F38F8E5CDC57EAEE06F6504FA8C15393564416E6706D8F771E3DC33D3134CC44BAEE76186DEA38B1C9DE297F407C180360570615", new byte[] { 130, 224, 89, 213, 133, 13, 21, 80, 177, 183, 80, 98, 153, 12, 208, 74 } });
        }
    }
}
