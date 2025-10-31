import * as coda from "@codahq/packs-sdk";

export const pack = coda.newPack();

// ===========================
// PACK METADATA
// ===========================

pack.addNetworkDomain("music.youtube.com");
pack.addNetworkDomain("youtube.com");
pack.addNetworkDomain("googleapis.com");

pack.setUserAuthentication({
  type: coda.AuthenticationType.HeaderBearerToken,
  instructionsUrl: "https://github.com/house2001/youtubemusicpack#authentication",
  networkDomain: "googleapis.com",
  getConnectionName: async function (context) {
    return "YouTube Music";
  },
});

// YouTube Data API v3 endpoint
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// ===========================
// SCHEMAS
// ===========================

const SongSchema = coda.makeObjectSchema({
  properties: {
    videoId: {
      type: coda.ValueType.String,
      description: "Unique identifier for the song",
      fromKey: "videoId",
    },
    title: {
      type: coda.ValueType.String,
      description: "Song title",
      required: true,
    },
    artist: {
      type: coda.ValueType.String,
      description: "Artist/Channel name",
    },
    duration: {
      type: coda.ValueType.String,
      description: "Song duration",
    },
    thumbnailUrl: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.ImageReference,
      description: "Thumbnail image",
    },
    publishedAt: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Published date",
    },
    viewCount: {
      type: coda.ValueType.Number,
      description: "View count",
    },
    url: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Url,
      description: "YouTube Music URL",
    },
  },
  displayProperty: "title",
  idProperty: "videoId",
  featuredProperties: ["artist", "duration", "viewCount"],
});

const PlaylistSchema = coda.makeObjectSchema({
  properties: {
    playlistId: {
      type: coda.ValueType.String,
      description: "Unique playlist identifier",
      fromKey: "playlistId",
    },
    title: {
      type: coda.ValueType.String,
      description: "Playlist title",
      required: true,
    },
    description: {
      type: coda.ValueType.String,
      description: "Playlist description",
    },
    trackCount: {
      type: coda.ValueType.Number,
      description: "Number of tracks",
    },
    thumbnailUrl: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.ImageReference,
      description: "Playlist thumbnail",
    },
    channelTitle: {
      type: coda.ValueType.String,
      description: "Channel/Creator name",
    },
    url: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Url,
      description: "Playlist URL",
    },
  },
  displayProperty: "title",
  idProperty: "playlistId",
  featuredProperties: ["channelTitle", "trackCount"],
});

const ChannelSchema = coda.makeObjectSchema({
  properties: {
    channelId: {
      type: coda.ValueType.String,
      description: "Unique channel identifier",
      fromKey: "channelId",
    },
    title: {
      type: coda.ValueType.String,
      description: "Channel name",
      required: true,
    },
    description: {
      type: coda.ValueType.String,
      description: "Channel description",
    },
    subscriberCount: {
      type: coda.ValueType.Number,
      description: "Subscriber count",
    },
    videoCount: {
      type: coda.ValueType.Number,
      description: "Video count",
    },
    thumbnailUrl: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.ImageReference,
      description: "Channel image",
    },
    url: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Url,
      description: "Channel URL",
    },
  },
  displayProperty: "title",
  idProperty: "channelId",
  featuredProperties: ["subscriberCount", "videoCount"],
});

// ===========================
// HELPER FUNCTIONS
// ===========================

function parseDuration(isoDuration: string): string {
  if (!isoDuration) return "0:00";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getThumbnailUrl(thumbnails: any): string {
  if (!thumbnails) return "";
  return thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "";
}

async function makeYouTubeRequest(
  context: coda.ExecutionContext,
  endpoint: string,
  params: { [key: string]: string }
): Promise<any> {
  const url = coda.withQueryParams(`${YOUTUBE_API_BASE}/${endpoint}`, params);
  const response = await context.fetcher.fetch({
    method: "GET",
    url: url,
  });
  return response.body;
}

// ===========================
// SYNC TABLES
// ===========================

pack.addSyncTable({
  name: "MyPlaylists",
  description: "Sync playlists from your YouTube Music library",
  identityName: "Playlist",
  schema: PlaylistSchema,
  formula: {
    name: "SyncMyPlaylists",
    description: "Syncs your playlists",
    parameters: [],
    execute: async function ([], context) {
      const response = await makeYouTubeRequest(context, "playlists", {
        part: "snippet,contentDetails",
        mine: "true",
        maxResults: "50",
      });

      const playlists = response.items?.map((item: any) => ({
        playlistId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        trackCount: item.contentDetails.itemCount,
        thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
        channelTitle: item.snippet.channelTitle,
        url: `https://music.youtube.com/playlist?list=${item.id}`,
      })) || [];

      return {
        result: playlists,
      };
    },
  },
});

pack.addSyncTable({
  name: "PlaylistVideos",
  description: "Sync videos from a specific playlist",
  identityName: "PlaylistVideo",
  schema: SongSchema,
  formula: {
    name: "SyncPlaylistVideos",
    description: "Syncs videos from a playlist",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "playlistId",
        description: "The playlist ID to sync videos from",
      }),
    ],
    execute: async function ([playlistId], context) {
      const response = await makeYouTubeRequest(context, "playlistItems", {
        part: "snippet,contentDetails",
        playlistId: playlistId,
        maxResults: "50",
      });

      const videoIds = response.items?.map((item: any) => item.contentDetails.videoId).join(",");

      if (!videoIds) {
        return { result: [] };
      }

      // Get detailed video information
      const videosResponse = await makeYouTubeRequest(context, "videos", {
        part: "snippet,contentDetails,statistics",
        id: videoIds,
      });

      const videos = videosResponse.items?.map((item: any) => ({
        videoId: item.id,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        duration: parseDuration(item.contentDetails.duration),
        thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
        publishedAt: item.snippet.publishedAt,
        viewCount: parseInt(item.statistics?.viewCount || "0"),
        url: `https://music.youtube.com/watch?v=${item.id}`,
      })) || [];

      return {
        result: videos,
      };
    },
  },
});

pack.addSyncTable({
  name: "LikedVideos",
  description: "Sync your liked videos",
  identityName: "LikedVideo",
  schema: SongSchema,
  formula: {
    name: "SyncLikedVideos",
    description: "Syncs your liked videos",
    parameters: [],
    execute: async function ([], context) {
      // Get the user's liked videos playlist ID
      const channelResponse = await makeYouTubeRequest(context, "channels", {
        part: "contentDetails",
        mine: "true",
      });

      const likedPlaylistId = channelResponse.items?.[0]?.contentDetails?.relatedPlaylists?.likes;

      if (!likedPlaylistId) {
        throw new coda.UserVisibleError("Could not find your liked videos playlist");
      }

      const response = await makeYouTubeRequest(context, "playlistItems", {
        part: "snippet,contentDetails",
        playlistId: likedPlaylistId,
        maxResults: "50",
      });

      const videoIds = response.items?.map((item: any) => item.contentDetails.videoId).join(",");

      if (!videoIds) {
        return { result: [] };
      }

      const videosResponse = await makeYouTubeRequest(context, "videos", {
        part: "snippet,contentDetails,statistics",
        id: videoIds,
      });

      const videos = videosResponse.items?.map((item: any) => ({
        videoId: item.id,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        duration: parseDuration(item.contentDetails.duration),
        thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
        publishedAt: item.snippet.publishedAt,
        viewCount: parseInt(item.statistics?.viewCount || "0"),
        url: `https://music.youtube.com/watch?v=${item.id}`,
      })) || [];

      return {
        result: videos,
      };
    },
  },
});

// ===========================
// FORMULAS - SEARCH
// ===========================

pack.addFormula({
  name: "SearchMusic",
  description: "Search for music on YouTube",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "query",
      description: "Search query",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maxResults",
      description: "Maximum number of results (default: 10, max: 50)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "category",
      description: "Search in Music category",
      optional: true,
      suggestedValue: "10",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: SongSchema,
  execute: async function ([query, maxResults = 10, category], context) {
    const params: any = {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: Math.min(maxResults, 50).toString(),
      videoCategoryId: category || "10", // Music category
    };

    const response = await makeYouTubeRequest(context, "search", params);

    const videoIds = response.items?.map((item: any) => item.id.videoId).join(",");

    if (!videoIds) {
      return [];
    }

    // Get detailed video information
    const videosResponse = await makeYouTubeRequest(context, "videos", {
      part: "snippet,contentDetails,statistics",
      id: videoIds,
    });

    return videosResponse.items?.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics?.viewCount || "0"),
      url: `https://music.youtube.com/watch?v=${item.id}`,
    })) || [];
  },
});

pack.addFormula({
  name: "SearchChannels",
  description: "Search for music channels/artists",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "query",
      description: "Search query",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maxResults",
      description: "Maximum number of results (default: 10)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: ChannelSchema,
  execute: async function ([query, maxResults = 10], context) {
    const searchResponse = await makeYouTubeRequest(context, "search", {
      part: "snippet",
      q: query,
      type: "channel",
      maxResults: Math.min(maxResults, 50).toString(),
    });

    const channelIds = searchResponse.items?.map((item: any) => item.id.channelId).join(",");

    if (!channelIds) {
      return [];
    }

    const channelsResponse = await makeYouTubeRequest(context, "channels", {
      part: "snippet,statistics",
      id: channelIds,
    });

    return channelsResponse.items?.map((item: any) => ({
      channelId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      subscriberCount: parseInt(item.statistics?.subscriberCount || "0"),
      videoCount: parseInt(item.statistics?.videoCount || "0"),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      url: `https://music.youtube.com/channel/${item.id}`,
    })) || [];
  },
});

pack.addFormula({
  name: "SearchPlaylists",
  description: "Search for music playlists",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "query",
      description: "Search query",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maxResults",
      description: "Maximum number of results (default: 10)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: PlaylistSchema,
  execute: async function ([query, maxResults = 10], context) {
    const searchResponse = await makeYouTubeRequest(context, "search", {
      part: "snippet",
      q: query,
      type: "playlist",
      maxResults: Math.min(maxResults, 50).toString(),
    });

    const playlistIds = searchResponse.items?.map((item: any) => item.id.playlistId).join(",");

    if (!playlistIds) {
      return [];
    }

    const playlistsResponse = await makeYouTubeRequest(context, "playlists", {
      part: "snippet,contentDetails",
      id: playlistIds,
    });

    return playlistsResponse.items?.map((item: any) => ({
      playlistId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      trackCount: item.contentDetails.itemCount,
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      channelTitle: item.snippet.channelTitle,
      url: `https://music.youtube.com/playlist?list=${item.id}`,
    })) || [];
  },
});

// ===========================
// FORMULAS - GET INFO
// ===========================

pack.addFormula({
  name: "GetVideo",
  description: "Get detailed information about a video/song",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "videoId",
      description: "Video ID",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: SongSchema,
  execute: async function ([videoId], context) {
    const response = await makeYouTubeRequest(context, "videos", {
      part: "snippet,contentDetails,statistics",
      id: videoId,
    });

    const item = response.items?.[0];
    if (!item) {
      throw new coda.UserVisibleError("Video not found");
    }

    return {
      videoId: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics?.viewCount || "0"),
      url: `https://music.youtube.com/watch?v=${item.id}`,
    };
  },
});

pack.addFormula({
  name: "GetChannel",
  description: "Get detailed information about a channel/artist",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "channelId",
      description: "Channel ID",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: ChannelSchema,
  execute: async function ([channelId], context) {
    const response = await makeYouTubeRequest(context, "channels", {
      part: "snippet,statistics",
      id: channelId,
    });

    const item = response.items?.[0];
    if (!item) {
      throw new coda.UserVisibleError("Channel not found");
    }

    return {
      channelId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      subscriberCount: parseInt(item.statistics?.subscriberCount || "0"),
      videoCount: parseInt(item.statistics?.videoCount || "0"),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      url: `https://music.youtube.com/channel/${item.id}`,
    };
  },
});

pack.addFormula({
  name: "GetPlaylist",
  description: "Get detailed information about a playlist",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "playlistId",
      description: "Playlist ID",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: PlaylistSchema,
  execute: async function ([playlistId], context) {
    const response = await makeYouTubeRequest(context, "playlists", {
      part: "snippet,contentDetails",
      id: playlistId,
    });

    const item = response.items?.[0];
    if (!item) {
      throw new coda.UserVisibleError("Playlist not found");
    }

    return {
      playlistId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      trackCount: item.contentDetails.itemCount,
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      channelTitle: item.snippet.channelTitle,
      url: `https://music.youtube.com/playlist?list=${item.id}`,
    };
  },
});

// ===========================
// SUPERHUMAN FORMULAS
// ===========================

pack.addFormula({
  name: "GetRelatedVideos",
  description: "Get videos related to a given video (AI recommendations)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "videoId",
      description: "Video ID",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maxResults",
      description: "Maximum number of results (default: 10)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: SongSchema,
  execute: async function ([videoId, maxResults = 10], context) {
    const searchResponse = await makeYouTubeRequest(context, "search", {
      part: "snippet",
      relatedToVideoId: videoId,
      type: "video",
      maxResults: Math.min(maxResults, 50).toString(),
    });

    const videoIds = searchResponse.items?.map((item: any) => item.id.videoId).join(",");

    if (!videoIds) {
      return [];
    }

    const videosResponse = await makeYouTubeRequest(context, "videos", {
      part: "snippet,contentDetails,statistics",
      id: videoIds,
    });

    return videosResponse.items?.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics?.viewCount || "0"),
      url: `https://music.youtube.com/watch?v=${item.id}`,
    })) || [];
  },
});

pack.addFormula({
  name: "AnalyzePlaylist",
  description: "Analyze a playlist and get insights (top channels, stats)",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "playlistId",
      description: "Playlist ID to analyze",
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function ([playlistId], context) {
    const response = await makeYouTubeRequest(context, "playlistItems", {
      part: "snippet,contentDetails",
      playlistId: playlistId,
      maxResults: "50",
    });

    const items = response.items || [];
    const channels: { [key: string]: number } = {};

    items.forEach((item: any) => {
      const channel = item.snippet.channelTitle;
      channels[channel] = (channels[channel] || 0) + 1;
    });

    const topChannels = Object.entries(channels)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => `${name} (${count} videos)`);

    const uniqueChannels = Object.keys(channels).length;

    return `**Playlist Analysis**
- Total videos: ${items.length}
- Unique channels: ${uniqueChannels}
- Top channels: ${topChannels.join(", ")}
- Average videos per channel: ${(items.length / uniqueChannels).toFixed(1)}`;
  },
});

pack.addFormula({
  name: "FindDuplicates",
  description: "Find duplicate videos in a playlist",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "playlistId",
      description: "Playlist ID to check for duplicates",
    }),
  ],
  resultType: coda.ValueType.Array,
  items: SongSchema,
  execute: async function ([playlistId], context) {
    const response = await makeYouTubeRequest(context, "playlistItems", {
      part: "snippet,contentDetails",
      playlistId: playlistId,
      maxResults: "50",
    });

    const seen = new Map<string, any>();
    const duplicateVideoIds: string[] = [];

    response.items?.forEach((item: any) => {
      const videoId = item.contentDetails.videoId;
      const key = `${item.snippet.title}-${item.snippet.channelTitle}`.toLowerCase();

      if (seen.has(key)) {
        duplicateVideoIds.push(videoId);
      } else {
        seen.set(key, videoId);
      }
    });

    if (duplicateVideoIds.length === 0) {
      return [];
    }

    const videosResponse = await makeYouTubeRequest(context, "videos", {
      part: "snippet,contentDetails,statistics",
      id: duplicateVideoIds.join(","),
    });

    return videosResponse.items?.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics?.viewCount || "0"),
      url: `https://music.youtube.com/watch?v=${item.id}`,
    })) || [];
  },
});

pack.addFormula({
  name: "GetTrendingMusic",
  description: "Get trending music videos in a specific region",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "regionCode",
      description: "Two-letter country code (e.g., US, GB, JP)",
      suggestedValue: "US",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "maxResults",
      description: "Maximum number of results (default: 10)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Array,
  items: SongSchema,
  execute: async function ([regionCode, maxResults = 10], context) {
    const response = await makeYouTubeRequest(context, "videos", {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      videoCategoryId: "10", // Music category
      regionCode: regionCode,
      maxResults: Math.min(maxResults, 50).toString(),
    });

    return response.items?.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: parseDuration(item.contentDetails.duration),
      thumbnailUrl: getThumbnailUrl(item.snippet.thumbnails),
      publishedAt: item.snippet.publishedAt,
      viewCount: parseInt(item.statistics?.viewCount || "0"),
      url: `https://music.youtube.com/watch?v=${item.id}`,
    })) || [];
  },
});

// ===========================
// ACTIONS
// ===========================

pack.addFormula({
  name: "CreatePlaylist",
  description: "Create a new playlist",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "title",
      description: "Playlist title",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "description",
      description: "Playlist description",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "privacyStatus",
      description: "Privacy status (public, private, unlisted)",
      suggestedValue: "private",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([title, description, privacyStatus = "private"], context) {
    const response = await context.fetcher.fetch({
      method: "POST",
      url: `${YOUTUBE_API_BASE}/playlists?part=snippet,status`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          title: title,
          description: description || "",
        },
        status: {
          privacyStatus: privacyStatus,
        },
      }),
    });

    return `Created playlist: ${response.body.id}`;
  },
});

pack.addFormula({
  name: "AddToPlaylist",
  description: "Add a video to a playlist",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "playlistId",
      description: "Playlist ID",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "videoId",
      description: "Video ID to add",
    }),
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([playlistId, videoId], context) {
    await context.fetcher.fetch({
      method: "POST",
      url: `${YOUTUBE_API_BASE}/playlistItems?part=snippet`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          playlistId: playlistId,
          resourceId: {
            kind: "youtube#video",
            videoId: videoId,
          },
        },
      }),
    });

    return `Added video ${videoId} to playlist ${playlistId}`;
  },
});

pack.addFormula({
  name: "RemoveFromPlaylist",
  description: "Remove a video from a playlist",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "playlistItemId",
      description: "Playlist item ID (from PlaylistVideos sync table)",
    }),
  ],
  resultType: coda.ValueType.String,
  isAction: true,
  execute: async function ([playlistItemId], context) {
    await context.fetcher.fetch({
      method: "DELETE",
      url: `${YOUTUBE_API_BASE}/playlistItems?id=${playlistItemId}`,
    });

    return `Removed item ${playlistItemId} from playlist`;
  },
});

// ===========================
// COLUMN FORMATS
// ===========================

pack.addColumnFormat({
  name: "Video",
  formulaName: "GetVideo",
});

pack.addColumnFormat({
  name: "Channel",
  formulaName: "GetChannel",
});

pack.addColumnFormat({
  name: "Playlist",
  formulaName: "GetPlaylist",
});
