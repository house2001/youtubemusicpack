# YouTube Music Coda Pack

A comprehensive Coda Pack for YouTube Music that goes beyond Spotify's capabilities with AI-powered features and superhuman agent functionality.

## Features

### Core Sync Tables
- **MyPlaylists** - Sync all your YouTube Music playlists
- **PlaylistVideos** - Sync videos from any playlist
- **LikedVideos** - Sync your liked videos

### Search & Discovery
- **SearchMusic** - Search for songs with advanced filtering
- **SearchChannels** - Find music channels and artists
- **SearchPlaylists** - Discover playlists

### Information Retrieval
- **GetVideo** - Get detailed info about any song/video
- **GetChannel** - Get artist/channel details
- **GetPlaylist** - Get playlist information

### Superhuman Agent Features
- **GetRelatedVideos** - AI-powered recommendations based on any song
- **GetTrendingMusic** - Get trending music by region
- **AnalyzePlaylist** - Deep playlist analysis (top channels, statistics)
- **FindDuplicates** - Automatically detect duplicate songs in playlists

### Actions
- **CreatePlaylist** - Create new playlists programmatically
- **AddToPlaylist** - Add songs to playlists
- **RemoveFromPlaylist** - Remove songs from playlists

### Column Formats
- **Video** - Format video IDs as rich cards
- **Channel** - Format channel IDs as rich cards
- **Playlist** - Format playlist IDs as rich cards

## Installation

### Prerequisites

1. **Google Cloud Project**: Create a project at [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable YouTube Data API v3**: In your project, enable the YouTube Data API v3
3. **Create OAuth 2.0 Credentials**:
   - Go to "Credentials" in your Google Cloud Console
   - Create OAuth 2.0 Client ID (Web application)
   - Add authorized redirect URIs:
     - `https://coda.io/packsAuth/oauth2`
     - `http://localhost:3000/oauth` (for testing)
   - Copy the Client ID and Client Secret

### Setup Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/house2001/youtubemusicpack.git
   cd youtubemusicpack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the pack:
   ```bash
   npx coda build pack.ts
   ```

4. Upload to Coda:
   ```bash
   npx coda upload pack.ts
   ```

5. Configure authentication in Coda:
   - Go to your pack settings
   - Add your Google API OAuth credentials
   - Users will be prompted to authenticate with their Google account

## Authentication

This pack uses OAuth 2.0 authentication with the YouTube Data API v3. Users need to:

1. Have a Google account
2. Grant the pack permission to access their YouTube data
3. The pack will automatically handle token refresh

## Usage Examples

### Sync Your Playlists
```
Insert a sync table → Select "MyPlaylists"
```

### Search for Music
```
=SearchMusic("Bohemian Rhapsody", 10)
```

### Get AI Recommendations
```
=GetRelatedVideos("dQw4w9WgXcQ", 20)
```

### Analyze a Playlist
```
=AnalyzePlaylist("PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf")
```

### Find Duplicates
```
=FindDuplicates("YOUR_PLAYLIST_ID")
```

### Get Trending Music
```
=GetTrendingMusic("US", 20)
```

### Create a Playlist
```
=CreatePlaylist("My New Playlist", "Created from Coda!", "private")
```

## Comparison with Spotify Pack

| Feature | Spotify Pack | YouTube Music Pack |
|---------|--------------|-------------------|
| Sync Playlists | ✅ | ✅ |
| Sync Tracks | ✅ | ✅ |
| Search | ⚠️ Limited | ✅ Advanced |
| Liked Songs | ✅ | ✅ |
| Create Playlists | ✅ | ✅ |
| AI Recommendations | ❌ | ✅ |
| Trending Music | ❌ | ✅ |
| Playlist Analysis | ❌ | ✅ |
| Duplicate Detection | ❌ | ✅ |
| Channel/Artist Search | ❌ | ✅ |
| Regional Trending | ❌ | ✅ |

## Development

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build: `npx coda build pack.ts`
4. Test: `npx coda execute pack.ts SearchMusic "test query"`

### Testing

The pack includes TypeScript types and can be tested using the Coda CLI:

```bash
npx coda execute pack.ts <FormulaName> <param1> <param2>
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## API Limits

The YouTube Data API v3 has quota limits:
- Default quota: 10,000 units per day
- Search costs: 100 units
- Video details: 1 unit
- Playlist items: 1 unit

To increase your quota, apply for higher limits in Google Cloud Console.

## Troubleshooting

### "Invalid credentials" error
- Check that your OAuth credentials are correctly configured
- Ensure the YouTube Data API v3 is enabled
- Verify redirect URIs are correct

### "Quota exceeded" error
- You've hit the daily API quota limit
- Wait until the next day or request a quota increase
- Optimize your queries to use fewer API calls

### "Video not found" error
- The video ID might be incorrect
- The video might be private or deleted
- Some videos may not be accessible in your region

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with the [Coda Packs SDK](https://coda.io/packs)
- Uses the [YouTube Data API v3](https://developers.google.com/youtube/v3)
- Inspired by the Spotify Coda Pack

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/house2001/youtubemusicpack/issues) page.

## Roadmap

- [ ] Add batch operations for multiple songs
- [ ] Implement smart playlist generation based on mood/genre
- [ ] Add lyrics fetching integration
- [ ] Support for YouTube Music Premium features
- [ ] Advanced analytics and insights
- [ ] Integration with other music services
