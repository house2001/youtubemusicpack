# Superhuman Music Agent - Step-by-Step Setup

Follow these exact steps to build your AI music agent in Coda.

## 🎯 What You're Building

A self-running music assistant that:
- Discovers new music daily based on your tastes
- Cleans and optimizes your playlists automatically
- Tracks trending music worldwide
- Provides weekly insights on your music habits
- Recommends songs you'll love

---

## 📝 STEP 1: Create Your Command Center Doc

1. **Go to:** https://coda.io/
2. **Click:** "New doc"
3. **Name it:** "Music Command Center"
4. **Add your pack:** Type `/` → Search "YouTube Music" → Add pack

---

## 🎵 STEP 2: Build Music Library (5 minutes)

### Table 1: My Playlists
1. Type `/table`
2. Choose **"Sync table"**
3. Select **"YouTube Music"** pack
4. Choose **"MyPlaylists"**
5. Click **"Sync"**

### Table 2: Liked Videos
1. Insert another sync table
2. Choose **"LikedVideos"**
3. Click **"Sync"**

### Table 3: Subscriptions
1. Insert another sync table
2. Choose **"Subscriptions"**
3. Click **"Sync"**

**You now have your complete music library in Coda!** ✅

---

## 🔍 STEP 3: Build Discovery Engine (10 minutes)

### Create "Discovery Queue" Table

1. **Insert a new table** (not sync table - regular table)
2. **Name it:** "Discovery Queue"
3. **Add these columns:**

   **Column A: Seed Song** (Text)
   - Manual entry - songs you love

   **Column B: Video ID** (Text)
   - Get from search results

   **Column C: Recommendations** (Formula)
   ```
   =GetRelatedVideos(Account, [Video ID], 10)
   ```

   **Column D: Top Pick** (Formula)
   ```
   =[Recommendations].First()
   ```

   **Column E: Top Pick Title** (Formula)
   ```
   =[Top Pick].title
   ```

   **Column F: Play URL** (Formula)
   ```
   =GetPlayURL([Top Pick].videoId)
   ```

### How to Use:
1. Add your 5-10 favorite songs to "Seed Song"
2. Get their video IDs (from search)
3. Watch as the agent finds 10 related songs for each!
4. Click "Play URL" to listen

---

## 🧹 STEP 4: Build Playlist Optimizer (5 minutes)

### Create "Playlist Health" Table

1. **Insert new table**
2. **Name it:** "Playlist Health"
3. **Add these columns:**

   **Column A: Playlist Name** (Relation)
   - Link to "My Playlists" table
   - Select from dropdown

   **Column B: Playlist ID** (Formula)
   ```
   =[Playlist Name].playlistId
   ```

   **Column C: Track Count** (Formula)
   ```
   =[Playlist Name].trackCount
   ```

   **Column D: Duplicates** (Formula)
   ```
   =FindDuplicates(Account, [Playlist ID])
   ```

   **Column E: Duplicate Count** (Formula)
   ```
   =[Duplicates].Count()
   ```

   **Column F: Health Status** (Formula)
   ```
   =If([Duplicate Count] = 0, "✅ Healthy",
      If([Duplicate Count] <= 3, "⚠️ Minor Issues",
      "❌ Needs Cleanup"))
   ```

   **Column G: Full Analysis** (Formula)
   ```
   =AnalyzePlaylist(Account, [Playlist ID])
   ```

### Add Your Playlists:
1. Click "Add row"
2. Select each of your playlists
3. Watch the agent analyze them automatically!

---

## 📈 STEP 5: Build Trend Tracker (5 minutes)

### Create "Trending Music" Table

1. **Insert new table**
2. **Name it:** "Trending Music"
3. **Add these columns:**

   **Column A: Region** (Select list)
   - Options: US, GB, JP, KR, IN, CA, AU, BR, MX, DE

   **Column B: Last Updated** (Formula)
   ```
   =Today()
   ```

   **Column C: Trending Videos** (Formula)
   ```
   =GetTrendingMusic(Account, [Region], 20)
   ```

   **Column D: #1 Song** (Formula)
   ```
   =[Trending Videos].First().title
   ```

   **Column E: #1 Artist** (Formula)
   ```
   =[Trending Videos].First().artist
   ```

   **Column F: Play #1** (Formula)
   ```
   =GetPlayURL([Trending Videos].First().videoId)
   ```

### Add Regions:
1. Add rows for: US, GB, JP
2. Agent instantly shows trending music for each!

---

## 📊 STEP 6: Create Analytics Dashboard (10 minutes)

### Create a new page: "Dashboard"

Add these sections:

#### Section 1: Quick Stats
Create a table with these stats:

| Metric | Formula |
|--------|---------|
| Total Playlists | `=MyPlaylists.Count()` |
| Total Liked Videos | `=LikedVideos.Count()` |
| Total Subscriptions | `=Subscriptions.Count()` |
| Healthy Playlists | `=PlaylistHealth.Filter([Health Status]="✅ Healthy").Count()` |
| Songs in Discovery | `=DiscoveryQueue.Sum([Recommendations].Count())` |
| Trending Tracked | `=TrendingMusic.Count()` |

#### Section 2: Top Artists
```
=Subscriptions.Sort(False, subscriberCount).Slice(1, 10)
```

#### Section 3: Most Popular Playlists
```
=MyPlaylists.Sort(False, trackCount).Slice(1, 10)
```

#### Section 4: Recent Discoveries
```
=DiscoveryQueue.Sort(False, ModifiedOn()).Slice(1, 5)
```

---

## 🤖 STEP 7: Set Up Automations

### Automation 1: Daily Music Discovery

1. Click **"Automations"** in doc menu
2. Click **"New automation"**
3. **Trigger:** Time-based → Every day at 8:00 AM
4. **Condition:** Always
5. **Action:** Modify rows
   - Table: Trending Music
   - Which rows: All rows
   - What to modify: Update "Last Updated" to Today()

This refreshes trending music daily!

### Automation 2: Weekly Playlist Health Check

1. **New automation**
2. **Trigger:** Time-based → Every Sunday at 10:00 AM
3. **Action:** Send email/notification
   - To: You
   - Subject: "Weekly Playlist Health Report"
   - Body: Show playlists needing cleanup

### Automation 3: New Discovery Alert

1. **New automation**
2. **Trigger:** Row added to Discovery Queue
3. **Action:** Automatically get recommendations
   - Updates the Recommendations column
   - Sends you notification of new finds

---

## 🎨 STEP 8: Add Quick Action Buttons

On your dashboard, add these buttons:

### Button 1: "Discover New Music Now"
**Action:**
```
AddRow(DiscoveryQueue, {
  Seed Song: TrendingMusic.First().[#1 Song],
  Video ID: TrendingMusic.First().[Trending Videos].First().videoId
})
```

### Button 2: "Clean All Playlists"
**Action:**
```
ShowMessage("Found " & PlaylistHealth.Sum([Duplicate Count]) & " duplicates to clean!")
```

### Button 3: "Refresh Everything"
**Action:**
```
ModifyRows(TrendingMusic, TrendingMusic, {Last Updated: Today()})
```

---

## 🌟 STEP 9: Advanced AI Features

### Smart Scoring System

Add a column to Discovery Queue:

**Column: AI Score** (Formula)
```
=Round(
  ([Top Pick].viewCount / 1000000) * 30 +
  If(Contains([Top Pick].title, "official"), 20, 0) +
  If([Top Pick].viewCount > 1000000, 30, 0) +
  20
, 0)
```

This scores recommendations based on:
- Popularity (view count)
- Official releases bonus
- Quality indicators

### Auto-Playlist Builder

Create button: **"Build Smart Playlist from Top Discoveries"**

**Action:**
```
CreatePlaylist(
  Account,
  "AI Discovered - " & Today(),
  "Auto-generated playlist from top-scored discoveries",
  "private"
)
```

Then add top-scoring songs automatically!

---

## 📅 STEP 10: Weekly Automation Schedule

Set up these recurring automations:

| Time | Day | Action |
|------|-----|--------|
| 8:00 AM | Daily | Refresh trending music |
| 9:00 AM | Daily | Update discovery recommendations |
| 10:00 AM | Sunday | Generate weekly report |
| 8:00 PM | Friday | Find weekend music suggestions |
| 11:00 PM | Daily | Sync liked videos (catch today's likes) |

---

## 🎯 Your Agent is Now Running!

Once set up, your agent will:

✅ **Automatically discover** 100+ new songs per week
✅ **Monitor trending** music in multiple regions daily
✅ **Analyze playlists** and flag issues
✅ **Track your library** growth over time
✅ **Recommend** personalized music continuously
✅ **Report** insights weekly

---

## 💡 Next Level Features

### Add These for Maximum Power:

1. **Sentiment Analysis**
   - Track which recommendations you actually like
   - Improve scoring over time

2. **Genre Mapping**
   - Tag songs by genre automatically
   - Create genre-specific discovery queues

3. **Collaboration Mode**
   - Share discovery queue with team
   - Collaborative playlist building

4. **Historical Tracking**
   - Archive trending music weekly
   - Track chart movements over time

---

## 🚀 Ready to Build?

**Start with Steps 1-4** to get the core agent running. That gives you:
- Your complete library synced
- Automatic music discovery
- Playlist optimization
- Real-time trending music

**Then add Steps 5-10** for full superhuman capabilities!

**Let me know when you're ready to start building, and I'll walk you through each step in detail!**
