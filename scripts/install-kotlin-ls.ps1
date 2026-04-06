#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$KOTLIN_LS_VERSION = "1.3.13"
$INSTALL_DIR = "$env:LOCALAPPDATA\Programs\kotlin-language-server"
$DOWNLOAD_URL = "https://github.com/fwcd/kotlin-language-server/releases/download/$KOTLIN_LS_VERSION/server.zip"

Write-Host "Installing Kotlin Language Server v$KOTLIN_LS_VERSION..."

# Check Java
try {
    $javaOutput = (java -version 2>&1) | Select-Object -First 1
    Write-Host "Found Java: $javaOutput"
} catch {
    Write-Error "Java is required but not found. Install Java 17+ from https://adoptium.net/"
    exit 1
}

# Check if already installed
$existing = Get-Command "kotlin-language-server" -ErrorAction SilentlyContinue
if ($existing -and $args -notcontains "--force") {
    Write-Host "kotlin-language-server is already installed at: $($existing.Source)"
    Write-Host "Run with -Force to reinstall."
    exit 0
}

# Create install directory
New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
$TEMP_DIR = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
New-Item -ItemType Directory -Force -Path $TEMP_DIR | Out-Null

try {
    Write-Host "Downloading kotlin-language-server..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile "$TEMP_DIR\server.zip" -UseBasicParsing

    Write-Host "Extracting..."
    Expand-Archive -Path "$TEMP_DIR\server.zip" -DestinationPath "$TEMP_DIR\kotlin-ls" -Force

    # Copy server files to install directory
    $serverDir = "$TEMP_DIR\kotlin-ls\server"
    if (Test-Path $serverDir) {
        Copy-Item -Path "$serverDir\*" -Destination $INSTALL_DIR -Recurse -Force
    } else {
        Copy-Item -Path "$TEMP_DIR\kotlin-ls\*" -Destination $INSTALL_DIR -Recurse -Force
    }

    # Create batch wrapper
    $jarPath = "$INSTALL_DIR\bin\kotlin-language-server.jar"
    $wrapperContent = "@echo off`r`njava -jar `"$jarPath`" %*"
    Set-Content -Path "$INSTALL_DIR\kotlin-language-server.bat" -Value $wrapperContent -Encoding ASCII

    # Add to user PATH if not already there
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($currentPath -notlike "*$INSTALL_DIR*") {
        [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$INSTALL_DIR", "User")
        Write-Host "Added $INSTALL_DIR to your user PATH."
        Write-Host "Restart your terminal for the PATH change to take effect."
    }

    Write-Host ""
    Write-Host "Installation complete!"
    Write-Host "kotlin-language-server installed to: $INSTALL_DIR"
    Write-Host ""
    Write-Host "Restart your terminal, then verify with:"
    Write-Host "  kotlin-language-server --version"
    Write-Host ""
    Write-Host "Then run /kotlinsense:status in Claude Code to confirm."

} finally {
    Remove-Item -Recurse -Force $TEMP_DIR -ErrorAction SilentlyContinue
}
