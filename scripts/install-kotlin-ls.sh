#!/bin/bash
set -e

KOTLIN_LS_VERSION="1.3.13"
INSTALL_DIR="$HOME/.local/bin"
LS_HOME="$HOME/.kotlin-language-server"
DOWNLOAD_URL="https://github.com/fwcd/kotlin-language-server/releases/download/${KOTLIN_LS_VERSION}/server.zip"

echo "Installing Kotlin Language Server v${KOTLIN_LS_VERSION}..."

# Check Java is available (required by kotlin-language-server)
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is required but not found."
    echo "Install Java 17+ from: https://adoptium.net/"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
if [ -n "$JAVA_VERSION" ] && [ "$JAVA_VERSION" -lt "17" ] 2>/dev/null; then
    echo "WARNING: Java 17+ recommended. Found Java ${JAVA_VERSION}."
fi

# Check if already installed
if command -v kotlin-language-server &> /dev/null; then
    echo "kotlin-language-server is already installed at: $(which kotlin-language-server)"
    echo "Run with --force to reinstall."
    if [ "$1" != "--force" ]; then
        exit 0
    fi
fi

# Create install directories
mkdir -p "$INSTALL_DIR"
TEMP_DIR=$(mktemp -d)
trap "rm -rf '$TEMP_DIR'" EXIT

echo "Downloading kotlin-language-server..."
if command -v curl &> /dev/null; then
    curl -fsSL "$DOWNLOAD_URL" -o "$TEMP_DIR/server.zip"
elif command -v wget &> /dev/null; then
    wget -q "$DOWNLOAD_URL" -O "$TEMP_DIR/server.zip"
else
    echo "ERROR: curl or wget is required for download."
    exit 1
fi

echo "Extracting..."
unzip -q "$TEMP_DIR/server.zip" -d "$TEMP_DIR/kotlin-ls"

# Install to home directory
rm -rf "$LS_HOME"
mkdir -p "$LS_HOME"

# The zip extracts to a 'server' subdirectory
if [ -d "$TEMP_DIR/kotlin-ls/server" ]; then
    cp -r "$TEMP_DIR/kotlin-ls/server/"* "$LS_HOME/"
else
    cp -r "$TEMP_DIR/kotlin-ls/"* "$LS_HOME/"
fi

# Create the wrapper script in PATH
cat > "$INSTALL_DIR/kotlin-language-server" << EOF
#!/bin/bash
exec java -jar "\$HOME/.kotlin-language-server/bin/kotlin-language-server.jar" "\$@"
EOF
chmod +x "$INSTALL_DIR/kotlin-language-server"

echo ""
echo "Installation complete!"
echo "kotlin-language-server installed to: $INSTALL_DIR/kotlin-language-server"
echo ""

# Check if INSTALL_DIR is in PATH
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    echo "NOTE: $INSTALL_DIR is not in your PATH."
    echo "Add it by running:"
    echo ""
    echo "  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc && source ~/.zshrc"
    echo ""
    echo "  (replace .zshrc with .bashrc if you use bash)"
    echo ""
fi

echo "Verify installation:"
echo "  kotlin-language-server --version"
echo ""
echo "Then run /kotlinsense:status in Claude Code to confirm."
