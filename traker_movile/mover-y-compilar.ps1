# Script para mover el proyecto a una ruta sin espacios y compilar APK
# Esto resolverá los problemas de Gradle con las rutas

Write-Host "=== Moviendo proyecto a ruta sin espacios ===" -ForegroundColor Green
Write-Host ""

$origenProyecto = "C:\Users\sergu\OneDrive\Desktop\carpeta de ekotaker\traker_movile"
$destinoProyecto = "C:\EcoTracker-Mobile"

# Verificar si el destino ya existe
if (Test-Path $destinoProyecto) {
    Write-Host "✗ El directorio $destinoProyecto ya existe" -ForegroundColor Yellow
    $respuesta = Read-Host "¿Deseas eliminarlo y reemplazarlo? (S/N)"
    if ($respuesta -eq "S" -or $respuesta -eq "s") {
        Remove-Item $destinoProyecto -Recurse -Force
        Write-Host "✓ Directorio anterior eliminado" -ForegroundColor Green
    } else {
        Write-Host "Operación cancelada" -ForegroundColor Red
        exit 1
    }
}

# Copiar el proyecto
Write-Host "Copiando proyecto..."  -ForegroundColor Yellow
Write-Host "Origen: $origenProyecto" -ForegroundColor Cyan
Write-Host "Destino: $destinoProyecto" -ForegroundColor Cyan
Write-Host ""

Copy-Item -Path $origenProyecto -Destination $destinoProyecto -Recurse -Force

if ($LASTEXITCODE -eq 0 -or (Test-Path $destinoProyecto)) {
    Write-Host "✓ Proyecto copiado exitosamente" -ForegroundColor Green
    Write-Host ""
    
    # Actualizar local.properties con la nueva ruta
    $localPropertiesPath = "$destinoProyecto\android\local.properties"
    $localPropertiesContent = @"
## This file must *NOT* be checked into Version Control Systems,
# as it contains information specific to your local configuration.
#
# Location of the SDK. This is only used by Gradle.
# For customization when using a Version Control System, please read the
# header note.
sdk.dir=C:\\Users\\sergu\\AppData\\Local\\Android\\Sdk
"@
    
    Set-Content -Path $localPropertiesPath -Value $localPropertiesContent
    Write-Host "✓ Archivo local.properties actualizado" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "=== Ahora ejecuta estos comandos: ===" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "cd C:\EcoTracker-Mobile" -ForegroundColor Cyan
    Write-Host "cd android" -ForegroundColor Cyan
    Write-Host ".\gradlew assembleDebug" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "El APK estará en:" -ForegroundColor Yellow
    Write-Host "C:\EcoTracker-Mobile\android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Cyan
    
} else {
    Write-Host "✗ Error al copiar el proyecto" -ForegroundColor Red
    exit 1
}
