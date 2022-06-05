# Dithery
Dither showcase for Blazor. Uses [CSharp-Dithering](https://github.com/mcraiha/CSharp-Dithering) and [ImageSharp](https://github.com/SixLabors/ImageSharp)

## Web link
[https://dithery.raiha.rocks](https://dithery.raiha.rocks)

## Requirements (use)

You have to have newish [internet browser](https://docs.microsoft.com/en-us/aspnet/core/blazor/supported-platforms?view=aspnetcore-6.0)

## Requirements (develop)

.NET 6 or newer

## How to run / develop
```
dotnet run
```
  
And then you can open http://localhost:5000 in your browser

## How to publish
```
dotnet publish -c Release
```
(you have to have wasm-tools installed, you can install it with following command `dotnet workload install wasm-tools` )
  
and content should be in **bin\Release\net6.0\publish\wwwroot** folder.