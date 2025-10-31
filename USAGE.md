# Quick Start Guide

## Uploading to Coda

### Step 1: Install the Coda Pack CLI

If you haven't already:
```bash
npm install -g @codahq/packs-sdk
```

### Step 2: Authenticate with Coda

```bash
npx coda register
```

This will open a browser window for you to log in to your Coda account.

### Step 3: Upload the Pack

From the project directory:
```bash
npx coda upload pack.ts
```

The first time you run this, it will create a new pack in your Coda account.

### Step 4: Configure OAuth

1. Go to your Coda Pack settings
2. Navigate to the "Authentication" section
3. Add your Google OAuth credentials:
   - **Client ID**: Your Google OAuth 2.0 Client ID
   - **Client Secret**: Your Google OAuth 2.0 Client Secret
   - **Authorization URL**: `https://accounts.google.com/o/oauth2/v2/auth`
   - **Token URL**: `https://oauth2.googleapis.com/token`
   - **Scopes**: `https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube`

### Step 5: Test the Pack

1. Create a new Coda doc
2. Click "+" → "Packs & Tables"
3. Find your "YouTube Music" pack
4. Add it to your doc
5. Authenticate with your Google account
6. Try inserting a sync table or using a formula!

## Example Usage in Coda

### Search for Music
```
=SearchMusic("Bohemian Rhapsody")
```

### Get Recommendations
```
=GetRelatedVideos("dQw4w9WgXcQ", 10)
```

### Create a Sync Table
1. Insert → Table → Sync table
2. Select "YouTube Music" pack
3. Choose "MyPlaylists" or "PlaylistVideos"
4. Click "Sync"

### Analyze a Playlist
```
=AnalyzePlaylist("PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf")
```

## Updating the Pack

When you make changes to `pack.ts`:

1. Build the pack:
   ```bash
   npx coda build pack.ts
   ```

2. Upload the new version:
   ```bash
   npx coda upload pack.ts
   ```

3. Increment the version number if needed

## Publishing for Others

To make your pack available to other Coda users:

1. Go to your pack settings in Coda
2. Click "Publish"
3. Add a description, logo, and example images
4. Submit for review

Note: Published packs must follow Coda's Pack guidelines and be approved by Coda.

## Superhuman Features

### Smart Playlist Analysis
Use `=AnalyzePlaylist()` to get insights about any playlist:
- Top channels/artists
- Total videos
- Diversity metrics

### Duplicate Detection
Use `=FindDuplicates()` to find duplicate songs in your playlists and clean them up.

### Trending Discovery
Use `=GetTrendingMusic("US")` to discover what's trending in your region.

### AI Recommendations
Use `=GetRelatedVideos()` to get YouTube's AI-powered music recommendations based on any song.

## Pro Tips

1. **Batch Operations**: Use Coda's automation features to perform batch operations on your playlists
2. **Dashboard Creation**: Combine sync tables with formulas to create music dashboards
3. **Cross-Playlist Analysis**: Use multiple sync tables to compare playlists
4. **Smart Filters**: Use Coda's filtering features with the `viewCount` and `publishedAt` fields

## Troubleshooting

### "Pack failed to load"
- Check that you've uploaded the latest version
- Verify your OAuth credentials are correct
- Check the pack logs in Coda

### "Authentication failed"
- Re-authenticate with Google
- Check that your OAuth app has the correct scopes
- Ensure the YouTube Data API is enabled

### "Quota exceeded"
- You've hit the YouTube API quota limit (10,000 units/day)
- Optimize your queries or request a quota increase
- Consider caching results in Coda

## Advanced Usage

### Using with Automations

Create Coda automations that:
1. Monitor new videos in your playlists
2. Automatically add trending music to a playlist
3. Alert you when your favorite channels upload new music

### Integration with Other Packs

Combine with other Coda packs:
- **Spotify Pack**: Compare YouTube Music and Spotify libraries
- **Slack Pack**: Share music recommendations with your team
- **Gmail Pack**: Email playlist analyses

## Support

Need help? Check out:
- [GitHub Issues](https://github.com/house2001/youtubemusicpack/issues)
- [Coda Pack Documentation](https://coda.io/packs/docs)
- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
