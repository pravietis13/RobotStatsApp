FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /source

COPY RobotStats.slnx .
COPY RobotStats.API/*.csproj ./RobotStats.API/
RUN dotnet restore

COPY RobotStats.API/. ./RobotStats.API/
WORKDIR /source/RobotStats.API
RUN dotnet publish -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine as app
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "RobotStats.API.dll"]