### build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY . ./
RUN dotnet restore "DigitalDiary.sln"
RUN dotnet build "DigitalDiary.sln"

### publish
FROM build as publish
RUN dotnet publish DigitalDiary -c Release -o out/DigitalDiary
RUN dotnet publish DigitalDiary.Admin -c Release -o out/DigitalDiary.Admin

### DigitalDiary
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as DigitalDiary
WORKDIR /app
COPY --from=publish /app/out/DigitalDiary .

EXPOSE 80

ENTRYPOINT ["dotnet", "DigitalDiary.dll"]

### DigitalDiary.Admin
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as DigitalDiary.Admin
WORKDIR /app
COPY --from=publish /app/out/DigitalDiary.Admin .

EXPOSE 8000

ENTRYPOINT ["dotnet", "DigitalDiary.Admin.dll"]