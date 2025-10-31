# Setup Instructions for YouTube Music Coda Pack

## Step 1: Get Your Coda API Token

1. Visit https://coda.io/account
2. Scroll down to "API Settings"
3. Click "Generate API Token"
4. Give it a name like "YouTube Music Pack"
5. Copy the token (you'll only see it once!)

## Step 2: Register the Token

Once you have your token, run:
```bash
cd /Users/mschaaf/code/youtubemusicpack
npx coda register YOUR_API_TOKEN_HERE
```

## Step 3: Upload the Pack

```bash
npx coda upload pack.ts
```

This will create a new pack in your Coda account and give you a Pack ID.

## Step 4: Set Up Google Cloud Project

### 4.1 Create a Project
1. Go to https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Name it "YouTube Music Coda Pack"
4. Click "Create"

### 4.2 Enable YouTube Data API v3
1. In your project, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it and click "Enable"

### 4.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: "YouTube Music Coda Pack"
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: Add these manually later
   - Test users: Add your email
4. Back to "Create OAuth client ID":
   - Application type: Web application
   - Name: "YouTube Music Coda Pack"
   - Authorized redirect URIs: Add these:
     - `https://coda.io/packsAuth/oauth2`
     - `https://coda.io/packsAuth/oauth2/callback`
5. Click "Create"
6. Copy the Client ID and Client Secret

### 4.4 Configure OAuth Consent Screen Scopes
1. Go to "OAuth consent screen"
2. Click "Edit App"
3. Click "Add or Remove Scopes"
4. Add these scopes:
   - `https://www.googleapis.com/auth/youtube.readonly`
   - `https://www.googleapis.com/auth/youtube`
5. Save and continue

## Step 5: Configure Pack Authentication in Coda

1. Go to https://coda.io/packs
2. Find your "YouTube Music" pack
3. Click on it to open settings
4. Go to "Settings" → "Authentication"
5. Configure OAuth 2.0:
   - **Client ID**: Paste your Google OAuth Client ID
   - **Client Secret**: Paste your Google OAuth Client Secret
   - **Authorization URL**: `https://accounts.google.com/o/oauth2/v2/auth`
   - **Token URL**: `https://oauth2.googleapis.com/token`
   - **Scopes**: `https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube`
6. Save

## Step 6: Test the Pack

1. Create a new Coda doc: https://coda.io/
2. In the doc, type `/` and search for "YouTube Music"
3. Add the pack to your doc
4. You'll be prompted to authenticate with Google
5. After authenticating, try these:

### Test 1: Search for Music
```
=SearchMusic("Bohemian Rhapsody", 5)
```

### Test 2: Insert a Sync Table
- Click "+" → "Table" → "Sync table"
- Select "YouTube Music" pack
- Choose "MyPlaylists"
- Click "Sync"

### Test 3: Get Recommendations
```
=GetRelatedVideos("dQw4w9WgXcQ", 10)
```

### Test 4: Get Trending Music
```
=GetTrendingMusic("US", 20)
```

## Troubleshooting

### "Invalid OAuth credentials"
- Make sure you copied the Client ID and Secret correctly
- Verify the redirect URIs are exact matches
- Check that YouTube Data API v3 is enabled

### "Access denied"
- Make sure you're added as a test user in OAuth consent screen
- Check that the correct scopes are configured
- Try re-authenticating

### "Quota exceeded"
- You've hit the 10,000 units/day limit
- Wait until tomorrow
- Or request quota increase in Google Cloud Console

## What's Next?

After successful setup:

1. **Explore the Features**: Try all the formulas and sync tables
2. **Build Dashboards**: Create music analytics dashboards in Coda
3. **Share with Team**: Invite others to use your pack
4. **Publish** (Optional): Submit your pack for public use

## Quick Command Reference

```bash
# Check authentication status
npx coda whoami

# Build the pack (after making changes)
npx coda build pack.ts

# Upload a new version
npx coda upload pack.ts

# Validate the pack
npx coda validate pack.ts

# Execute a formula (for testing)
npx coda execute pack.ts SearchMusic "test query"
```

## Support

- GitHub Issues: https://github.com/house2001/youtubemusicpack/issues
- Coda Pack Docs: https://coda.io/packs/docs
- YouTube API Docs: https://developers.google.com/youtube/v3
