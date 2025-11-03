# Quick Start - 3 Steps to Get Your Pack Running

✅ Pack is validated and built successfully!

## Step 1: Get Your Coda API Token (2 minutes)

1. **Open this link in your browser**: https://coda.io/account

2. **Scroll down** to "API Settings" section

3. **Click** "Generate API Token"

4. **Name it**: "YouTube Music Pack"

5. **Copy** the token (you'll only see it once!)

6. **Paste it here when I ask**

---

## Step 2: Get Google OAuth Credentials (10 minutes)

### A. Create Google Cloud Project

1. **Open**: https://console.cloud.google.com/projectcreate

2. **Project name**: `YouTube Music Coda Pack`

3. **Click**: "Create"

4. **Wait** for project to be created (about 10 seconds)

### B. Enable YouTube Data API v3

1. **Open**: https://console.cloud.google.com/apis/library/youtube.googleapis.com

2. **Select** your project (if prompted)

3. **Click**: "Enable"

### C. Configure OAuth Consent Screen

1. **Open**: https://console.cloud.google.com/apis/credentials/consent

2. **Select**: "External"

3. **Click**: "Create"

4. **Fill in**:
   - App name: `YouTube Music Coda Pack`
   - User support email: Your email
   - Developer contact: Your email

5. **Click**: "Save and Continue"

6. **Click**: "Add or Remove Scopes"

7. **Manually add these scopes** (paste in the box at bottom):
   ```
   https://www.googleapis.com/auth/youtube.readonly
   https://www.googleapis.com/auth/youtube
   ```

8. **Click**: "Update" → "Save and Continue"

9. **Add Test Users**: Your email address

10. **Click**: "Save and Continue" → "Back to Dashboard"

### D. Create OAuth Credentials

1. **Open**: https://console.cloud.google.com/apis/credentials

2. **Click**: "Create Credentials" → "OAuth 2.0 Client ID"

3. **Application type**: Web application

4. **Name**: `YouTube Music Coda Pack`

5. **Authorized redirect URIs** - Click "Add URI" and add both:
   ```
   https://coda.io/packsAuth/oauth2
   https://coda.io/packsAuth/oauth2/callback
   ```

6. **Click**: "Create"

7. **Copy both**:
   - Client ID (starts with numbers)
   - Client Secret (random string)

8. **Paste them when I ask**

---

## Step 3: Summary

Once you have:
- ✅ Coda API Token
- ✅ Google OAuth Client ID
- ✅ Google OAuth Client Secret

Tell me you have them and I'll:
1. Register your Coda token
2. Upload the pack
3. Give you the final configuration to paste into Coda

---

## Ready?

**Do you have all three credentials?**

If yes, tell me and I'll continue with the upload!

If you get stuck, check SETUP_INSTRUCTIONS.md for detailed screenshots and troubleshooting.
