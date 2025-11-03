# Google OAuth Verification Guide

## ✅ Prerequisites Completed

You already have:
- ✅ Working OAuth app in Google Cloud Console
- ✅ Privacy Policy (on GitHub)
- ✅ Terms of Service (on GitHub)
- ✅ Public GitHub repository with documentation
- ✅ Functioning Coda Pack

## 📋 Documents You'll Need

### 1. Privacy Policy URL
```
https://github.com/house2001/youtubemusicpack/blob/main/PRIVACY_POLICY.md
```

### 2. Terms of Service URL
```
https://github.com/house2001/youtubemusicpack/blob/main/TERMS_OF_SERVICE.md
```

### 3. App Homepage URL
```
https://github.com/house2001/youtubemusicpack
```

### 4. Coda Pack URL
```
https://coda.io/packs/youtube-music-45945
```
(Or whatever your public pack URL is once published)

---

## 🚀 Step-by-Step Verification Process

### Step 1: Prepare Your OAuth Consent Screen

1. Go to: https://console.cloud.google.com/apis/credentials/consent

2. Make sure these are filled in:
   - **App name**: YouTube Music Coda Pack
   - **User support email**: mschaaf@gmail.com
   - **App logo**: (Optional, but recommended - add a 120x120 image)
   - **App domain**:
     - Homepage: `https://github.com/house2001/youtubemusicpack`
     - Privacy Policy: `https://github.com/house2001/youtubemusicpack/blob/main/PRIVACY_POLICY.md`
     - Terms of Service: `https://github.com/house2001/youtubemusicpack/blob/main/TERMS_OF_SERVICE.md`
   - **Authorized domains**: `coda.io`, `github.com`
   - **Developer contact**: mschaaf@gmail.com

3. Click **"Save and Continue"**

---

### Step 2: Configure Scopes

1. In the "Scopes" section, verify these are added:
   ```
   https://www.googleapis.com/auth/youtube.readonly
   https://www.googleapis.com/auth/youtube
   ```

2. For each scope, you'll need to justify why you need it

3. Click **"Save and Continue"**

---

### Step 3: Prepare Your Verification Request

Before clicking "Publish App", prepare these materials:

#### A. YouTube Video Demo (REQUIRED)
Create a 1-3 minute screen recording showing:

1. **Opening your Coda doc**
2. **Adding the YouTube Music Pack**
3. **Authenticating with Google**
4. **Using key features:**
   - Search for music
   - Sync a playlist
   - View results

**Tools to record:**
- Mac: QuickTime Player (built-in screen recording)
- Windows: Xbox Game Bar or OBS Studio
- Upload to YouTube (can be unlisted)

#### B. Scope Justifications (Copy these!)

**For `youtube.readonly` scope:**
```
This scope is required to read the user's YouTube Music data including:
- Playlists for display in Coda sync tables
- Liked videos to show user's music library
- Channel subscriptions to display followed artists
- Playlist contents to enable music management

This data is displayed in the user's Coda workspace and not stored on external servers. Users control this data through Coda's interface.
```

**For `youtube` scope:**
```
This scope is required to enable playlist management features:
- Creating new playlists from Coda
- Adding songs to existing playlists
- Removing songs from playlists
- Organizing the user's music library

All modifications are user-initiated through Coda actions. No automated changes are made without explicit user interaction.
```

#### C. App Description
```
YouTube Music Coda Pack is a Coda integration that brings YouTube Music functionality into Coda documents. It enables users to:

- Search for music, artists, channels, and playlists
- Sync their YouTube Music library (playlists, liked videos, subscriptions) into Coda tables
- Analyze playlists with AI-powered insights
- Discover trending music by region
- Manage their music library (create/edit playlists)
- Find duplicate songs and optimize playlists

The pack uses YouTube Data API v3 to provide read access to user data and playlist management capabilities. All data remains within the user's Coda workspace. The pack does not store user data externally or share it with third parties.

This is a productivity tool that helps users organize and analyze their YouTube Music library alongside other data in Coda.
```

---

### Step 4: Submit for Verification

1. In the OAuth consent screen, click **"PUBLISH APP"**

2. You'll see a warning: **"Your app will need to be verified"**

3. Click **"CONFIRM"**

4. Google will prompt you to **"Prepare for Verification"**

5. Click **"Prepare for Verification"** button

6. Fill out the verification form:

#### Verification Form Fields:

**Official app name:**
```
YouTube Music Coda Pack
```

**App website:**
```
https://github.com/house2001/youtubemusicpack
```

**App logo/icon:**
- Upload a 120x120 pixel logo (optional but recommended)

**Privacy Policy URL:**
```
https://github.com/house2001/youtubemusicpack/blob/main/PRIVACY_POLICY.md
```

**Terms of Service URL:**
```
https://github.com/house2001/youtubemusicpack/blob/main/TERMS_OF_SERVICE.md
```

**YouTube Video Demo URL:**
```
https://www.youtube.com/watch?v=YOUR_VIDEO_ID
```
(Create and upload your demo video first!)

**Why does your app need these scopes?**
(Copy the justifications from Step 3B above)

**Additional information:**
```
This is a Coda Pack (a third-party extension for Coda.io) that integrates YouTube Music data into Coda documents for organizational and analytical purposes.

The pack is used by individuals and teams to:
- Track their music library in Coda
- Analyze listening habits
- Organize playlists efficiently
- Discover new music through trends and recommendations

The pack follows Google's API Services User Data Policy and adheres to Limited Use requirements. User data is only used for the functionality described and is not shared with third parties.

Technical details:
- Built with Coda Packs SDK
- Uses YouTube Data API v3
- OAuth 2.0 authentication
- Open source: https://github.com/house2001/youtubemusicpack
```

---

### Step 5: Submit and Wait

1. Review all information carefully

2. Click **"Submit for Verification"**

3. You'll receive a confirmation email

4. **Timeline**: 2-6 weeks (sometimes longer)

5. Google may ask for clarifications or additional info

---

## 📧 What to Expect

### Email Communications:

1. **Confirmation Email** (immediate)
   - Confirms receipt of verification request
   - Provides a case ID

2. **Verification Team Questions** (optional, 1-2 weeks)
   - May ask for clarifications
   - May request additional documentation
   - Respond promptly to avoid delays

3. **Approval/Rejection Email** (2-6 weeks)
   - If approved: App is verified!
   - If rejected: Reason provided, can reapply

---

## ✅ Tips for Approval

### DO:
✅ Be clear and specific in justifications
✅ Show the actual user benefit
✅ Demonstrate data is user-controlled
✅ Explain you don't store data externally
✅ Mention you follow Google's policies
✅ Provide a clear, professional demo video
✅ Respond quickly to any questions
✅ Use professional language

### DON'T:
❌ Request scopes you don't use
❌ Be vague about data usage
❌ Mention data storage if you don't store it
❌ Ignore their questions/requests
❌ Rush your video demo
❌ Forget to test all features before submitting
❌ Use broken links or URLs

---

## 🎬 Creating Your Demo Video

### Script Example:

**Introduction (10 seconds):**
> "Hi, I'm demonstrating YouTube Music Coda Pack, a Coda integration for managing YouTube Music data."

**Authentication (20 seconds):**
> "First, I'll connect my Google account to the pack. I grant permissions for YouTube data access."
> [Show OAuth flow, permission screen]

**Feature Demo (60-90 seconds):**
> "Now I can search for music..."
> [Show SearchMusic formula]

> "Sync my playlists into a table..."
> [Show MyPlaylists sync table]

> "View detailed information..."
> [Show playlist contents, analytics]

> "And get AI-powered recommendations..."
> [Show GetRelatedVideos]

**Conclusion (10 seconds):**
> "This pack helps users organize their YouTube Music library efficiently within Coda. All data stays in the user's workspace."

### Recording Tips:
- Use 1080p resolution
- Clear audio (or add captions)
- Show cursor movements clearly
- Don't rush - viewers need to follow
- Upload as unlisted (private won't work)

---

## 🔄 If You Get Rejected

### Common Rejection Reasons:

1. **Insufficient justification**
   - Solution: Be more specific about why you need each scope

2. **Missing/broken links**
   - Solution: Test all URLs before submitting

3. **Unclear data usage**
   - Solution: Clearly explain data flow and storage

4. **Poor demo video**
   - Solution: Remake video showing clear feature usage

5. **Privacy policy issues**
   - Solution: Ensure policy addresses all Google requirements

### Reapplication:
- Fix the issues mentioned
- Wait 7 days
- Resubmit with improvements
- Reference previous case ID

---

## 📊 Verification Status Tracking

Check status at:
https://console.cloud.google.com/apis/credentials/consent

You'll see:
- **Pending**: Under review
- **Needs Attention**: Google has questions
- **Verified**: Approved!
- **Not Verified**: Rejected (can reapply)

---

## 🎯 What Happens After Approval

### Once Verified:

✅ **No more "unverified app" warning**
✅ **Anyone can use your pack**
✅ **No 100-user limit**
✅ **Professional appearance**
✅ **Can publish Pack publicly on Coda**

### In Coda:

You can then:
1. Publish your pack on Coda's Pack Gallery
2. Share publicly without restrictions
3. Others can discover and install it

---

## 📞 Need Help?

### Google OAuth Support:
- https://support.google.com/cloud/contact/oauth_app_verification

### Documentation:
- [OAuth Verification Process](https://support.google.com/cloud/answer/9110914)
- [API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)

---

## ✅ Checklist Before Submitting

- [ ] Privacy Policy is public and accessible
- [ ] Terms of Service is public and accessible
- [ ] OAuth consent screen is completely filled out
- [ ] All URLs are tested and working
- [ ] Demo video is created and uploaded to YouTube
- [ ] Scope justifications are prepared
- [ ] App description is clear and professional
- [ ] You've tested all features recently
- [ ] Email address is correct for notifications
- [ ] You're ready to respond to questions within 48 hours

---

**Good luck with your verification! The process takes time but your pack is well-built and should get approved.** 🚀
