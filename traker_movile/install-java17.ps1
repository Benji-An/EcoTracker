# Script para instalar Java 17 LTS usando winget
# Ejecutar como Administrador

Write-Host "=== Instalador de Java 17 LTS ===" -ForegroundColor Green
Write-Host ""

# Verificar si winget está disponible
try {
    $wingetVersion = winget --version
    Write-Host "✓ winget está disponible: $wingetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ winget no está disponible" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, descarga Java 17 manualmente desde:" -ForegroundColor Yellow
    Write-Host "https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "Instalando Eclipse Adoptium Java 17 JDK..." -ForegroundColor Yellow
Write-Host ""

# Instalar Java 17
winget install EclipseAdoptium.Temurin.17.JDK --accept-package-agreements --accept-source-agreements

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Java 17 instalado correctamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ahora debes:" -ForegroundColor Yellow
    Write-Host "1. Cerrar TODAS las ventanas de PowerShell" -ForegroundColor Cyan
    Write-Host "2. Abrir una nueva PowerShell" -ForegroundColor Cyan
    Write-Host "3. Ejecutar: java -version" -ForegroundColor Cyan
    Write-Host "4. Debe mostrar Java 17" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Si sigue mostrando Java 25, ejecuta:" -ForegroundColor Yellow
    Write-Host '$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.13.11-hotspot"' -ForegroundColor Cyan
    Write-Host '$env:PATH = "$env:JAVA_HOME\bin;" + $env:PATH' -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ Error al instalar Java 17" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, descarga Java 17 manualmente desde:" -ForegroundColor Yellow
    Write-Host "https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Cyan
}
