# YouTube Music Coda Pack

> A comprehensive Coda Pack that brings YouTube Music integration to Coda with AI-powered features, playlist management, and advanced analytics.

[![Pack Status](https://img.shields.io/badge/status-active-success)](https://github.com/house2001/youtubemusicpack)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Coda Pack](https://img.shields.io/badge/Coda-Pack-orange)](https://coda.io/packs/youtube-music-45945)

## About

YouTube Music Coda Pack is a third-party integration for [Coda](https://coda.io) that connects your Coda documents with YouTube Music via the YouTube Data API v3. This pack enables users to search, organize, and analyze their YouTube Music library directly within Coda, combining the power of YouTube's massive music catalog with Coda's flexible workspace.

**Key Benefits:**
- 📊 Organize your entire music library in Coda tables
- 🔍 Search YouTube's vast music catalog (largest in the world)
- 🤖 Get AI-powered music recommendations
- 📈 Analyze playlists with detailed insights
- 🌍 Discover trending music by region
- 🔧 Manage playlists programmatically

**Perfect for:**
- Music enthusiasts organizing their collections
- Content creators tracking trending music
- Teams collaborating on music projects
- Anyone wanting to analyze their listening habits

## Documentation

- 📖 [Complete Feature List](FEATURES.md) - All formulas and sync tables
- 🚀 [Quick Start Guide](QUICK_START.md) - Get started in 5 minutes
- 📋 [Setup Instructions](SETUP_INSTRUCTIONS.md) - Detailed installation guide
- 💡 [Usage Examples](USAGE.md) - Real-world use cases
- ⚖️ [Spotify Comparison](SPOTIFY_COMPARISON.md) - How we compare to Spotify Pack
- 🎮 [Playback Limitations](PLAYBACK_LIMITATIONS.md) - Understanding playback controls
- 🔐 [Privacy Policy](PRIVACY_POLICY.md) - How we handle your data
- 📜 [Terms of Service](TERMS_OF_SERVICE.md) - Usage terms

## Features

### Core Sync Tables (4)
- **MyPlaylists** - Sync all your YouTube Music playlists
- **PlaylistVideos** - Sync videos from any playlist
- **LikedVideos** - Sync your liked videos
- **Subscriptions** - Sync your channel subscriptions

### Search & Discovery (4)
- **SearchMusic** - Search for songs with advanced filtering
- **SearchChannels** - Find music channels and artists
- **SearchPlaylists** - Discover playlists

### Information Retrieval (4)
- **GetVideo** - Get detailed info about any song/video
- **GetChannel** - Get artist/channel details
- **GetPlaylist** - Get playlist information

### AI & Analytics Features (5)
- **GetRelatedVideos** - AI-powered recommendations based on any song
- **GetTrendingMusic** - Get trending music by region
- **AnalyzePlaylist** - Deep playlist analysis (top channels, statistics)
- **FindDuplicates** - Automatically detect duplicate songs in playlists
- **GetMyChannel** - Get your YouTube channel profile

### Playback Helpers (3)
- **GetPlayURL** - Generate direct play links with autoplay
- **GetPlaylistURL** - Generate playlist play links
- **OpenAndPlay** - One-click playback action

### Actions (3)
- **CreatePlaylist** - Create new playlists programmatically
- **AddToPlaylist** - Add songs to playlists
- **RemoveFromPlaylist** - Remove songs from playlists

### Column Formats
- **Video** - Format video IDs as rich cards
- **Channel** - Format channel IDs as rich cards
- **Playlist** - Format playlist IDs as rich cards

**Total: 26 Features** - More than Spotify Pack!

## Installation

> **Note:** For personal use, you can keep the OAuth app in testing mode. For public distribution, see [Google Verification Guide](GOOGLE_VERIFICATION_GUIDE.md).

### For End Users

If this pack is already published in Coda's Pack Gallery:

1. Open your Coda document
2. Type `/` and search for "YouTube Music"
3. Add the pack and authenticate with your Google account
4. Start using the features!

### For Developers

To build and deploy this pack yourself:

#### Prerequisites

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

## Data & Privacy

**Your data security is our priority:**

- ✅ We use OAuth 2.0 for secure authentication
- ✅ All data stays in your Coda workspace
- ✅ We don't store your data on external servers
- ✅ We don't share your data with third parties
- ✅ You can revoke access anytime
- ✅ Complies with Google API Services User Data Policy

For complete details, see our [Privacy Policy](PRIVACY_POLICY.md).

## API Compliance

This pack:
- ✅ Adheres to [YouTube Terms of Service](https://www.youtube.com/t/terms)
- ✅ Follows [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- ✅ Complies with Limited Use requirements
- ✅ Uses only necessary scopes with proper justification
- ✅ Respects user data and privacy

## Limitations

**Playback Control:**
- ❌ Cannot control playback directly from Coda (API limitation)
- ✅ Provides one-click play links as alternative
- See [Playback Limitations](PLAYBACK_LIMITATIONS.md) for details

**API Quotas:**
- YouTube Data API has a 10,000 units/day default quota
- Search operations cost 100 units each
- Most other operations cost 1-3 units
- Quota resets daily at midnight Pacific Time

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal

- [Privacy Policy](PRIVACY_POLICY.md) - How we handle your data
- [Terms of Service](TERMS_OF_SERVICE.md) - Usage terms and conditions
- [License](LICENSE) - MIT License

## Support

**Need help?**
- 📖 Check the [documentation](#documentation) above
- 🐛 Report bugs via [GitHub Issues](https://github.com/house2001/youtubemusicpack/issues)
- 💬 Ask questions in GitHub Discussions
- 📧 Contact: mschaaf@gmail.com

## Acknowledgments

- Built with ❤️ using the [Coda Packs SDK](https://coda.io/packs)
- Powered by [YouTube Data API v3](https://developers.google.com/youtube/v3)
- Inspired by the Spotify Coda Pack

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Created by Michael Schaaf**

## Roadmap

- [ ] Add batch operations for multiple songs
- [ ] Implement smart playlist generation based on mood/genre
- [ ] Add lyrics fetching integration
- [ ] Support for YouTube Music Premium features
- [ ] Advanced analytics and insights
- [ ] Integration with other music services
