#!/bin/bash

# YouTube Music Coda Pack Setup Script
# This automates as much as possible and prompts for manual steps

set -e

echo "🎵 YouTube Music Coda Pack Setup"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check Coda Authentication
echo -e "${BLUE}Step 1: Checking Coda Authentication...${NC}"
if npx coda whoami &>/dev/null; then
    echo -e "${GREEN}✓ Already authenticated with Coda${NC}"
    npx coda whoami
else
    echo -e "${YELLOW}⚠ Not authenticated with Coda${NC}"
    echo ""
    echo "To authenticate:"
    echo "1. Visit: https://coda.io/account"
    echo "2. Scroll to 'API Settings'"
    echo "3. Click 'Generate API Token'"
    echo "4. Copy the token"
    echo ""
    read -p "Paste your Coda API token here: " CODA_TOKEN

    if [ ! -z "$CODA_TOKEN" ]; then
        npx coda register "$CODA_TOKEN"
        echo -e "${GREEN}✓ Coda authentication successful${NC}"
    else
        echo -e "${RED}✗ No token provided, skipping...${NC}"
    fi
fi
echo ""

# Step 2: Validate Pack
echo -e "${BLUE}Step 2: Validating Pack...${NC}"
if npx coda validate pack.ts; then
    echo -e "${GREEN}✓ Pack validation successful${NC}"
else
    echo -e "${RED}✗ Pack validation failed${NC}"
    exit 1
fi
echo ""

# Step 3: Build Pack
echo -e "${BLUE}Step 3: Building Pack...${NC}"
if npx coda build pack.ts; then
    echo -e "${GREEN}✓ Pack built successfully${NC}"
else
    echo -e "${RED}✗ Pack build failed${NC}"
    exit 1
fi
echo ""

# Step 4: Upload Pack
echo -e "${BLUE}Step 4: Uploading Pack to Coda...${NC}"
if npx coda whoami &>/dev/null; then
    echo "Uploading..."
    npx coda upload pack.ts
    echo -e "${GREEN}✓ Pack uploaded successfully${NC}"
    echo ""
    echo "Your pack is now available at: https://coda.io/packs"
else
    echo -e "${YELLOW}⚠ Skipping upload (not authenticated)${NC}"
fi
echo ""

# Step 5: Google Cloud Setup Instructions
echo -e "${BLUE}Step 5: Google Cloud OAuth Setup${NC}"
echo -e "${YELLOW}⚠ This requires manual steps in your browser${NC}"
echo ""
echo "Follow these steps:"
echo ""
echo "A. Create Google Cloud Project:"
echo "   1. Visit: https://console.cloud.google.com/"
echo "   2. Click 'New Project'"
echo "   3. Name: 'YouTube Music Coda Pack'"
echo "   4. Click 'Create'"
echo ""
echo "B. Enable YouTube Data API v3:"
echo "   1. Go to 'APIs & Services' → 'Library'"
echo "   2. Search 'YouTube Data API v3'"
echo "   3. Click 'Enable'"
echo ""
echo "C. Configure OAuth Consent Screen:"
echo "   1. Go to 'APIs & Services' → 'OAuth consent screen'"
echo "   2. Choose 'External'"
echo "   3. App name: 'YouTube Music Coda Pack'"
echo "   4. Add your email for support and developer contact"
echo "   5. Click 'Save and Continue'"
echo "   6. Add Scopes:"
echo "      - https://www.googleapis.com/auth/youtube.readonly"
echo "      - https://www.googleapis.com/auth/youtube"
echo "   7. Add Test Users (your email)"
echo "   8. Click 'Save and Continue'"
echo ""
echo "D. Create OAuth Credentials:"
echo "   1. Go to 'APIs & Services' → 'Credentials'"
echo "   2. Click 'Create Credentials' → 'OAuth 2.0 Client ID'"
echo "   3. Application type: 'Web application'"
echo "   4. Name: 'YouTube Music Coda Pack'"
echo "   5. Authorized redirect URIs:"
echo "      - https://coda.io/packsAuth/oauth2"
echo "      - https://coda.io/packsAuth/oauth2/callback"
echo "   6. Click 'Create'"
echo "   7. Copy the Client ID and Client Secret"
echo ""

read -p "Press Enter when you've completed the Google Cloud setup..."

echo ""
echo "E. Enter your OAuth credentials:"
read -p "Google OAuth Client ID: " CLIENT_ID
read -p "Google OAuth Client Secret: " CLIENT_SECRET

if [ ! -z "$CLIENT_ID" ] && [ ! -z "$CLIENT_SECRET" ]; then
    echo ""
    echo -e "${GREEN}Credentials saved!${NC}"
    echo ""
    echo "OAuth Configuration for Coda:"
    echo "-----------------------------"
    echo "Client ID: $CLIENT_ID"
    echo "Client Secret: $CLIENT_SECRET"
    echo "Authorization URL: https://accounts.google.com/o/oauth2/v2/auth"
    echo "Token URL: https://oauth2.googleapis.com/token"
    echo "Scopes: https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube"
    echo ""

    # Save to file for reference
    cat > oauth_credentials.txt <<EOF
OAuth Credentials for YouTube Music Coda Pack
=============================================

Add these to your Coda Pack settings:

Client ID: $CLIENT_ID
Client Secret: $CLIENT_SECRET
Authorization URL: https://accounts.google.com/o/oauth2/v2/auth
Token URL: https://oauth2.googleapis.com/token
Scopes: https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube

Steps:
1. Go to https://coda.io/packs
2. Find "YouTube Music" pack
3. Click "Settings" → "Authentication"
4. Paste the credentials above
5. Click "Save"
EOF

    echo -e "${GREEN}✓ Credentials saved to oauth_credentials.txt${NC}"
fi
echo ""

# Step 6: Final Instructions
echo -e "${BLUE}Step 6: Configure Pack in Coda${NC}"
echo ""
echo "Final steps:"
echo "1. Go to: https://coda.io/packs"
echo "2. Find 'YouTube Music' pack"
echo "3. Click 'Settings' → 'Authentication'"
echo "4. Select 'OAuth2' as authentication type"
echo "5. Paste the credentials from above (or oauth_credentials.txt)"
echo "6. Click 'Save'"
echo ""

read -p "Press Enter when you've configured the pack in Coda..."

# Step 7: Test
echo ""
echo -e "${BLUE}Step 7: Testing${NC}"
echo ""
echo "To test your pack:"
echo "1. Create a new Coda doc: https://coda.io/"
echo "2. Type '/' and search for 'YouTube Music'"
echo "3. Add the pack to your doc"
echo "4. Authenticate with Google"
echo "5. Try these formulas:"
echo ""
echo "   =SearchMusic(\"Bohemian Rhapsody\")"
echo "   =GetTrendingMusic(\"US\", 10)"
echo ""
echo "Or insert a sync table:"
echo "   Click '+' → 'Table' → 'Sync table' → 'MyPlaylists'"
echo ""

echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Feature overview"
echo "   - FEATURES.md - Complete formula reference"
echo "   - USAGE.md - Examples and tips"
echo "   - GitHub: https://github.com/house2001/youtubemusicpack"
echo ""
echo "🎉 Your YouTube Music Coda Pack is ready to use!"
