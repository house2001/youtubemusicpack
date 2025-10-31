# Manual Steps to Complete Setup

I've prepared everything for your YouTube Music Coda Pack! Here are the manual steps you need to complete:

## ✅ Already Completed
- ✅ Pack code created with all features
- ✅ Validated and builds successfully
- ✅ Pushed to GitHub: https://github.com/house2001/youtubemusicpack
- ✅ README and documentation created
- ✅ All superhuman features implemented

## 📋 Steps You Need to Complete

### Step 1: Get Coda API Token (5 minutes)

1. Go to https://coda.io/account
2. Scroll to "API Settings"
3. Click "Generate API Token"
4. Name it "YouTube Music Pack"
5. Copy the token

Then in terminal:
```bash
cd /Users/mschaaf/code/youtubemusicpack
npx coda register YOUR_TOKEN_HERE
```

### Step 2: Upload Pack to Coda (2 minutes)

```bash
npx coda upload pack.ts
```

This will output a Pack ID - save it!

### Step 3: Create Google Cloud Project (10 minutes)

#### 3a. Create Project
1. Go to https://console.cloud.google.com/
2. Click "New Project"
3. Name: "YouTube Music Coda Pack"
4. Click "Create"

#### 3b. Enable YouTube Data API v3
1. Go to "APIs & Services" → "Library"
2. Search "YouTube Data API v3"
3. Click "Enable"

#### 3c. Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External"
3. Fill in:
   - App name: "YouTube Music Coda Pack"
   - User support email: Your email
   - Developer contact: Your email
4. Click "Save and Continue"
5. Add Scopes:
   - Click "Add or Remove Scopes"
   - Search and add:
     - `https://www.googleapis.com/auth/youtube.readonly`
     - `https://www.googleapis.com/auth/youtube`
   - Click "Update" then "Save and Continue"
6. Add Test Users:
   - Add your email address
   - Click "Save and Continue"

#### 3d. Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Application type: "Web application"
4. Name: "YouTube Music Coda Pack"
5. Authorized redirect URIs - Add both:
   ```
   https://coda.io/packsAuth/oauth2
   https://coda.io/packsAuth/oauth2/callback
   ```
6. Click "Create"
7. **IMPORTANT**: Copy both:
   - Client ID (starts with numbers)
   - Client Secret (random string)

### Step 4: Configure Pack in Coda (5 minutes)

1. Go to https://coda.io/packs
2. Find "YouTube Music" pack
3. Click on it
4. Go to "Settings" → "Authentication"
5. Select "OAuth2" as auth type
6. Fill in:
   - **Client ID**: Paste from Google
   - **Client Secret**: Paste from Google
   - **Authorization URL**: `https://accounts.google.com/o/oauth2/v2/auth`
   - **Token URL**: `https://oauth2.googleapis.com/token`
   - **Scopes**: `https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube`
7. Click "Save"

### Step 5: Test It! (5 minutes)

1. Create a new Coda doc
2. Type `/` and search for "YouTube Music"
3. Add the pack
4. Authenticate with Google
5. Try these:

```
=SearchMusic("your favorite song")
=GetTrendingMusic("US")
```

Or insert a sync table:
- Click "+" → "Table" → "Sync table"
- Choose "MyPlaylists"
- Click "Sync"

## 🎉 Success Indicators

You'll know it's working when:
- You can search for music and get results
- Sync tables populate with your playlists
- No authentication errors
- Formulas return data

## 🐛 Troubleshooting

### "Authentication failed"
- Double-check Client ID and Secret
- Verify redirect URIs are exact
- Make sure you're added as test user

### "Quota exceeded"
- Free tier: 10,000 units/day
- Each search = 100 units
- Wait until tomorrow or request increase

### "API not enabled"
- Go back to Google Cloud Console
- Enable YouTube Data API v3

## 📚 What You Can Do Next

Once it's working:

1. **Build a Music Dashboard**
   - Add multiple sync tables
   - Create views and filters
   - Track your music library

2. **Use AI Features**
   - Get recommendations with `=GetRelatedVideos()`
   - Analyze playlists with `=AnalyzePlaylist()`
   - Find duplicates with `=FindDuplicates()`

3. **Automate**
   - Set up Coda automations
   - Create buttons for quick actions
   - Build a music discovery system

4. **Share**
   - Invite team members to your doc
   - Publish the pack for others (optional)
   - Create templates

## 🆘 Need Help?

- GitHub Issues: https://github.com/house2001/youtubemusicpack/issues
- SETUP_INSTRUCTIONS.md (detailed guide)
- USAGE.md (examples and tips)

---

**Estimated Total Time**: 25-30 minutes

**Status**: Pack is ready to upload! Just need the tokens/credentials configured.
