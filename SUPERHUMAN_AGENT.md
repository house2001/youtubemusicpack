# YouTube Music Superhuman Agent - Simple Setup

Transform your YouTube Music Pack into a simple AI agent that tracks trending music and provides stats.

## 🎯 What This Agent Does

- 📈 **Tracks trending music** across multiple regions daily
- 📊 **Provides statistics** on your music library
- 🤖 **Auto-updates** with fresh data
- 🌍 **Monitors global trends** automatically

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Your Agent Doc

1. Go to: https://coda.io/
2. Create new doc
3. Name it: "Music Trends Agent"
4. Add YouTube Music Pack

---

### Step 2: Create Trending Music Table

1. **Insert new table**
2. **Name it:** "Trending Music"
3. **Add these columns:**

   **A. Region** (Select list)
   - Options: US, GB, JP, KR, IN, CA, AU

   **B. Last Updated** (Formula)
   ```
   =Today()
   ```

   **C. Trending Videos** (Formula)
   ```
   =GetTrendingMusic(Account, [Region], 20)
   ```

   **D. #1 Song** (Formula)
   ```
   =[Trending Videos].First().title
   ```

   **E. #1 Artist** (Formula)
   ```
   =[Trending Videos].First().artist
   ```

4. **Add regions:** US, GB, JP (or your favorites)

---

### Step 3: Create Stats Table

1. **Insert new table**
2. **Name it:** "My Music Stats"
3. **Single row with these columns:**

   **A. Metric** (Text)
   - "Library Stats"

   **B. Total Playlists** (Formula)
   ```
   =MyPlaylists.Count()
   ```
   (First insert MyPlaylists sync table)

   **C. Total Liked Videos** (Formula)
   ```
   =LikedVideos.Count()
   ```
   (First insert LikedVideos sync table)

   **D. Subscriptions** (Formula)
   ```
   =Subscriptions.Count()
   ```
   (First insert Subscriptions sync table)

---

### Step 4: Set Up Daily Automation

1. Click **Automations** in sidebar
2. **New automation**
3. **Trigger:** Every day at 9:00 AM
4. **Action:** Modify rows in Trending Music table
5. **Update:** Last Updated = Today()

This refreshes trending music daily!

---

## ✅ Done! Your Agent is Running

**What it does automatically:**
- 🌅 Every morning at 9 AM: Updates trending music
- 📊 Always shows: Current stats on your library
- 🌍 Tracks: Trending music in your selected regions

---

## 📊 How to Use

**Check trending music:**
- Open your doc
- View "Trending Music" table
- See what's hot right now in each region

**View your stats:**
- Check "My Music Stats" table
- See totals at a glance

**That's it!** Simple, clean, and automatically updates.

---

## 💡 Optional Enhancements

Want to add more? You can optionally:

- Add more regions to track
- Create a chart of #1 songs over time
- Set up Slack notifications for new trending songs
- Add buttons to play trending music

But the core agent works perfectly with just the setup above!
