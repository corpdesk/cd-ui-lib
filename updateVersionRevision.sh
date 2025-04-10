#!/bin/bash

# Function to increment the revision part of a version string
increment_revision() {
    local version=$1
    local major minor revision

    # Extract major, minor, and revision parts
    IFS='.' read -r major minor revision <<EOF
$version
EOF

    # Increment the revision part
    revision=$((revision + 1))

    # Combine the parts back into a version string
    new_version="$major.$minor.$revision"

    echo "$new_version"
}

# Check if package.json exists in the current directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in the current directory."
    exit 1
fi

# Extract the current version from package.json
current_version=$(grep -oP '"version":\s*"\K[0-9]+\.[0-9]+\.[0-9]+' projects/core/package.json)

if [ -z "$current_version" ]; then
    echo "Error: Version not found in package.json."
    exit 1
fi

# Increment the revision part of the version
new_version=$(increment_revision "$current_version")

# Update package.json with the new version
sed -i "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" projects/core/package.json

echo "Current version: $current_version"
echo "New version: $new_version"
echo "package.json updated successfully."
