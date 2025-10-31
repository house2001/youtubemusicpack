# YouTube Music Coda Pack - Feature Reference

## 📊 Sync Tables

### MyPlaylists
Syncs all your YouTube playlists from your library.

**Usage**: Insert → Table → Sync table → MyPlaylists

**Columns**:
- playlistId - Unique identifier
- title - Playlist name
- description - Playlist description
- trackCount - Number of tracks
- thumbnailUrl - Playlist image
- channelTitle - Creator name
- url - Direct link to playlist

---

### PlaylistVideos
Syncs all videos from a specific playlist.

**Usage**: Insert → Table → Sync table → PlaylistVideos
**Parameter**: playlistId (get from MyPlaylists table)

**Columns**:
- videoId - Unique identifier
- title - Song/video title
- artist - Channel name
- duration - Length (MM:SS)
- thumbnailUrl - Video thumbnail
- publishedAt - Upload date
- viewCount - Number of views
- url - Direct link

---

### LikedVideos
Syncs your liked videos.

**Usage**: Insert → Table → Sync table → LikedVideos

**Columns**: Same as PlaylistVideos

---

## 🔍 Search Formulas

### SearchMusic
Search for music videos on YouTube.

```
=SearchMusic(query, [maxResults], [category])
```

**Examples**:
```
=SearchMusic("Bohemian Rhapsody")
=SearchMusic("Beatles", 20)
=SearchMusic("jazz", 10, "10")
```

---

### SearchChannels
Find music channels and artists.

```
=SearchChannels(query, [maxResults])
```

**Examples**:
```
=SearchChannels("Taylor Swift")
=SearchChannels("classical music", 15)
```

---

### SearchPlaylists
Discover public playlists.

```
=SearchPlaylists(query, [maxResults])
```

**Examples**:
```
=SearchPlaylists("workout music")
=SearchPlaylists("90s rock", 25)
```

---

## 📖 Info Formulas

### GetVideo
Get detailed information about any video.

```
=GetVideo(videoId)
```

**Example**:
```
=GetVideo("dQw4w9WgXcQ")
```

---

### GetChannel
Get artist/channel details.

```
=GetChannel(channelId)
```

**Example**:
```
=GetChannel("UC-9-kyTW8ZkZNDHQJ6FgpwQ")
```

---

### GetPlaylist
Get playlist information.

```
=GetPlaylist(playlistId)
```

**Example**:
```
=GetPlaylist("PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf")
```

---

## 🤖 Superhuman Features

### GetRelatedVideos
AI-powered music recommendations based on any song.

```
=GetRelatedVideos(videoId, [maxResults])
```

**Examples**:
```
=GetRelatedVideos("dQw4w9WgXcQ", 10)
=GetRelatedVideos(ThisRow.videoId, 20)
```

**Use Case**: Build a recommendation engine, discover similar artists

---

### AnalyzePlaylist
Deep analysis of any playlist.

```
=AnalyzePlaylist(playlistId)
```

**Example**:
```
=AnalyzePlaylist("PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf")
```

**Returns**:
- Total videos
- Unique channels
- Top 5 channels
- Average videos per channel

**Use Case**: Understand playlist diversity, find top contributors

---

### FindDuplicates
Detect duplicate songs in playlists.

```
=FindDuplicates(playlistId)
```

**Example**:
```
=FindDuplicates(ThisRow.playlistId)
```

**Returns**: Array of duplicate videos

**Use Case**: Clean up playlists, find redundant tracks

---

### GetTrendingMusic
Discover trending music by region.

```
=GetTrendingMusic(regionCode, [maxResults])
```

**Examples**:
```
=GetTrendingMusic("US", 20)
=GetTrendingMusic("GB", 10)
=GetTrendingMusic("JP", 50)
```

**Region Codes**: US, GB, JP, KR, IN, CA, AU, etc. (ISO 3166-1 alpha-2)

**Use Case**: Discover popular music, track trends

---

## ⚡ Actions

### CreatePlaylist
Create a new playlist programmatically.

```
=CreatePlaylist(title, [description], [privacyStatus])
```

**Examples**:
```
=CreatePlaylist("My Workout Mix")
=CreatePlaylist("Road Trip", "Best songs for driving", "private")
```

**Privacy**: "public", "private", or "unlisted"

---

### AddToPlaylist
Add videos to a playlist.

```
=AddToPlaylist(playlistId, videoId)
```

**Example**:
```
=AddToPlaylist("PLrAXtmErZgOe...", "dQw4w9WgXcQ")
```

**Tip**: Use with buttons for one-click adding

---

### RemoveFromPlaylist
Remove videos from a playlist.

```
=RemoveFromPlaylist(playlistItemId)
```

**Note**: Use the playlistItemId from the PlaylistVideos sync table, not the videoId

---

## 🎨 Column Formats

Apply these to columns to get rich formatting:

- **Video** - Formats videoId as a rich card
- **Channel** - Formats channelId as a rich card
- **Playlist** - Formats playlistId as a rich card

**How to Apply**:
1. Click column header
2. Select "Column Options"
3. Change "Display as" to Video/Channel/Playlist

---

## 💡 Pro Tips

### Build a Recommendation System
```
1. Create a "Seed Songs" table
2. Add formula column: =GetRelatedVideos(ThisRow.videoId, 5)
3. Get personalized recommendations for your library
```

### Track Playlist Health
```
1. Sync MyPlaylists
2. Add formula: =FindDuplicates(ThisRow.playlistId).Count()
3. Filter to find playlists with duplicates
```

### Discover New Music Daily
```
1. Create table with regions: ["US", "GB", "JP", "KR"]
2. Add column: =GetTrendingMusic(ThisRow.region, 10)
3. Set up daily automation to refresh
```

### Smart Playlist Builder
```
1. Search for genre: =SearchMusic("indie rock", 50)
2. Analyze results with formulas
3. Use AddToPlaylist() action to create custom playlists
```

### Music Analytics Dashboard
```
1. Sync multiple playlists
2. Use AnalyzePlaylist() for each
3. Compare diversity metrics across playlists
4. Identify your listening patterns
```

---

## 🔢 API Quota Usage

YouTube API has a quota system (10,000 units/day default):

| Operation | Cost |
|-----------|------|
| SearchMusic | 100 units |
| SearchChannels | 100 units |
| SearchPlaylists | 100 units |
| GetVideo | 1 unit |
| GetChannel | 1 unit |
| GetPlaylist | 1 unit |
| GetRelatedVideos | 100 units |
| Sync tables | 1-3 units per row |

**Tip**: Use sync tables for bulk operations (more efficient than formulas)

---

## 🆚 Comparison with Spotify Pack

| Feature | Spotify | YouTube Music |
|---------|---------|---------------|
| Search | ⚠️ Limited | ✅ Full |
| AI Recommendations | ❌ | ✅ |
| Trending | ❌ | ✅ Regional |
| Playlist Analysis | ❌ | ✅ Deep |
| Duplicate Detection | ❌ | ✅ |
| Sync Liked Songs | ✅ | ✅ |
| Create Playlists | ✅ | ✅ |
| View Counts | ❌ | ✅ |
| Channel Search | ❌ | ✅ |

---

## 📚 Resources

- **GitHub**: https://github.com/house2001/youtubemusicpack
- **Setup Guide**: SETUP_INSTRUCTIONS.md
- **Usage Examples**: USAGE.md
- **Manual Steps**: MANUAL_STEPS.md
- **YouTube API Docs**: https://developers.google.com/youtube/v3
