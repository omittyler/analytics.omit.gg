// OMiT social analytics — transcribed from the screenshots in /data.
// One entry per channel. `months` is keyed YYYY-MM. `period` holds the
// longer-range snapshot from /data/Year To Date (label says what range it covers).
// Leave a metric out (or null) when the screenshot doesn't show it.
// See CLAUDE.md for the monthly update procedure.

window.OMIT_METRICS = {
  updated: "2026-09-26",
  channels: [
    {
      id: "x-omitgg",
      platform: "x",
      name: "@OMiTGG",
      months: {
        "2026-01": { impressions: 21855, engagementRate: 0.5, engagements: 110, profileVisits: 73, replies: 0, likes: 27, reposts: 2, bookmarks: 6, shares: 2, followers: 14700, verifiedFollowers: 1000 },
        "2026-02": { impressions: 28212, engagementRate: 0.5, engagements: 140, profileVisits: 57, replies: 8, likes: 47, reposts: 25, bookmarks: 2, shares: 1, followers: 14700, verifiedFollowers: 1000 },
        "2026-03": { impressions: 27035, engagementRate: 0.37, engagements: 100, profileVisits: 37, replies: 4, likes: 20, reposts: 32, bookmarks: 6, shares: 1, followers: 14700, verifiedFollowers: 1000 },
        "2026-04": { impressions: 39310, engagementRate: 0.77, engagements: 303, profileVisits: 102, replies: 15, likes: 151, reposts: 20, bookmarks: 12, shares: 3, followers: 14700, verifiedFollowers: 1000 },
        "2026-05": { impressions: 656766, engagementRate: 1.87, engagements: 12300, profileVisits: 4600, replies: 162, likes: 6800, reposts: 330, bookmarks: 238, shares: 91, followers: 14700, verifiedFollowers: 1000 },
        "2026-06": { impressions: 698336, engagementRate: 1.38, engagements: 9600, profileVisits: 3200, replies: 127, likes: 5700, reposts: 262, bookmarks: 158, shares: 52, followers: 14700, verifiedFollowers: 1000 },
        "2026-07": { impressions: 401973, engagementRate: 1.62, engagements: 6400, profileVisits: 2100, replies: 80, likes: 3900, reposts: 281, bookmarks: 63, shares: 35, followers: 14700, verifiedFollowers: 1000 },
        "2026-08": { impressions: 311038, engagementRate: 0.78, engagements: 2400, profileVisits: 915, replies: 48, likes: 1200, reposts: 115, bookmarks: 67, shares: 15, followers: 14700, verifiedFollowers: 1000 }
      },
      period: {
        label: "Year to date",
        asOf: "2026-09-26",
        video: { views: 199200, watchTimeHours: 956, completionRate: 8.7, avgWatchTimeSec: 9 },
        audience: {
          Age: [["13–17", 6.8], ["18–24", 32.3], ["25–34", 53.0], ["35–44", 5.7], ["45–54", 1.2], ["55–64", 0.5], ["65+", 0.4]],
          Country: [["United States", 51.9], ["United Kingdom", 19.8], ["France", 9.1], ["Canada", 5.3], ["Saudi Arabia", 2.4], ["Other", 11.5]],
          Gender: [["Male", 93.5], ["Female", 4.9], ["Not specified", 1.6]],
          Device: [["iOS", 84.8], ["Web", 8.2], ["Android", 7.0]],
          "Impressions from": [["Non-followers", 81.7], ["Followers", 18.3]]
        }
      }
    },
    {
      id: "x-omitbrooklyn",
      platform: "x",
      name: "@OMiTBrooklyn",
      months: {
        "2026-01": { impressions: 557631, engagementRate: 1.99, engagements: 11000, profileVisits: 3500, replies: 169, likes: 6600, reposts: 307, bookmarks: 369, shares: 28, followers: 8400, verifiedFollowers: 560 },
        "2026-02": { impressions: 183587, engagementRate: 1.39, engagements: 2500, profileVisits: 1000, replies: 22, likes: 1300, reposts: 58, bookmarks: 34, shares: 12, followers: 8400, verifiedFollowers: 560 },
        "2026-03": { impressions: 432863, engagementRate: 1.58, engagements: 6800, profileVisits: 2100, replies: 126, likes: 4000, reposts: 303, bookmarks: 160, shares: 16, followers: 8400, verifiedFollowers: 560 },
        "2026-04": { impressions: 266500, engagementRate: 1.6, engagements: 4300, profileVisits: 1300, replies: 67, likes: 2600, reposts: 202, bookmarks: 91, shares: 19, followers: 8400, verifiedFollowers: 561 },
        "2026-05": { impressions: 469542, engagementRate: 1.46, engagements: 6800, profileVisits: 2300, replies: 55, likes: 4100, reposts: 228, bookmarks: 73, shares: 29, followers: 8400, verifiedFollowers: 561 },
        "2026-06": { impressions: 417933, engagementRate: 1.07, engagements: 4400, profileVisits: 906, replies: 49, likes: 3100, reposts: 159, bookmarks: 177, shares: 37, followers: 8400, verifiedFollowers: 561 },
        "2026-07": { impressions: 42863, engagementRate: 1.71, engagements: 731, profileVisits: 242, replies: 7, likes: 429, reposts: 40, bookmarks: 10, shares: 3, followers: 8400, verifiedFollowers: 561 },
        "2026-08": { impressions: 9060, engagementRate: 0.22, engagements: 20, profileVisits: 10, replies: 0, likes: 7, reposts: 0, bookmarks: 3, shares: 0, followers: 8400, verifiedFollowers: 561 }
      },
      period: {
        label: "Last 12 months",
        asOf: "2026-09-26",
        metrics: { impressions: 3500000, engagementRate: 1.3, engagements: 46600, profileVisits: 16300, replies: 615, likes: 26900, reposts: 1400, bookmarks: 1000, shares: 168, followers: 8400, verifiedFollowers: 561 },
        video: { views: 347000, watchTimeHours: 1700, completionRate: 10.4, avgWatchTimeSec: 10 },
        audience: {
          Age: [["13–17", 7.3], ["18–24", 34.2], ["25–34", 50.5], ["35–44", 5.9], ["45–54", 1.2], ["55–64", 0.5], ["65+", 0.5]],
          Country: [["United States", 65.1], ["United Kingdom", 10.8], ["Canada", 6.4], ["France", 3.6], ["Saudi Arabia", 2.6], ["Other", 11.6]],
          Gender: [["Male", 95.1], ["Female", 3.8], ["Not specified", 1.1]],
          Device: [["iOS", 85.2], ["Web", 8.7], ["Android", 6.1]],
          "Impressions from": [["Non-followers", 83.5], ["Followers", 16.5]]
        }
      }
    },
    { id: "x-omitqueens", platform: "x", name: "@OMiTQueens", months: {} },
    {
      id: "x-omithalo",
      platform: "x",
      name: "@OMiTHalo",
      months: {
        "2026-01": { impressions: 1527, engagementRate: 0.98, engagements: 15, profileVisits: 10, replies: 0, likes: 1, reposts: 1, bookmarks: 1, shares: 2, followers: 856, verifiedFollowers: 104 },
        "2026-02": { impressions: 828, engagementRate: 0.72, engagements: 6, profileVisits: 6, replies: 0, likes: 0, reposts: 0, bookmarks: 0, shares: 0, followers: 856, verifiedFollowers: 104 },
        "2026-03": { impressions: 130735, engagementRate: 2.7, engagements: 3500, profileVisits: 987, replies: 75, likes: 2200, reposts: 177, bookmarks: 34, shares: 15, followers: 856, verifiedFollowers: 104 },
        "2026-04": { impressions: 14093, engagementRate: 0.99, engagements: 139, profileVisits: 125, replies: 0, likes: 12, reposts: 0, bookmarks: 2, shares: 0, followers: 856, verifiedFollowers: 104 },
        "2026-05": { impressions: 3851, engagementRate: 0.36, engagements: 14, profileVisits: 10, replies: 0, likes: 3, reposts: 0, bookmarks: 1, shares: 0, followers: 856, verifiedFollowers: 104 },
        "2026-06": { impressions: 1648, engagementRate: 0.42, engagements: 7, profileVisits: 5, replies: 0, likes: 1, reposts: 0, bookmarks: 1, shares: 0, followers: 856, verifiedFollowers: 104 },
        "2026-07": { impressions: 1305, engagementRate: 0.54, engagements: 7, profileVisits: 5, replies: 0, likes: 2, reposts: 0, bookmarks: 0, shares: 0, followers: 856, verifiedFollowers: 104 },
        "2026-08": { impressions: 1348, engagementRate: 0.37, engagements: 5, profileVisits: 3, replies: 0, likes: 2, reposts: 0, bookmarks: 0, shares: 0, followers: 856, verifiedFollowers: 104 }
      },
      period: {
        label: "Year to date",
        asOf: "2026-09-26",
        video: { views: 7200, watchTimeHours: 34.6, completionRate: 14.3, avgWatchTimeSec: 9 },
        videoLabel: "Last 12 months",
        audience: {
          Age: [["13–17", 5.3], ["18–24", 25.7], ["25–34", 54.1], ["35–44", 11.8], ["45–54", 1.7], ["55–64", 0.9], ["65+", 0.5]],
          Country: [["United States", 69.0], ["United Kingdom", 12.3], ["Canada", 5.9], ["Mexico", 3.0], ["France", 2.1], ["Other", 7.8]],
          Gender: [["Male", 94.5], ["Female", 5.3], ["Not specified", 0.2]],
          Device: [["iOS", 76.3], ["Web", 11.9], ["Android", 11.8]],
          "Impressions from": [["Non-followers", 83.0], ["Followers", 17.0]]
        }
      }
    },
    { id: "x-omitnoir", platform: "x", name: "@OMiTNoir", months: {} },
    {
      id: "x-affiliates",
      platform: "x",
      group: "affiliates",
      name: "Affiliates - Creators & Players",
      // X "Organic Analytics" for the affiliate badge program, "Include organization" off,
      // so these are the creators & players only (no OMiT org accounts).
      affiliateCount: 11,
      includesOrg: false,
      months: {
        "2026-01": { impressions: 5800000, engagementRate: 4, newFollows: 1463, replies: 1063, likes: 31300, reposts: 553 },
        "2026-02": { impressions: 3700000, engagementRate: 3.6, newFollows: 1240, replies: 852, likes: 27100, reposts: 406 },
        "2026-03": { impressions: 2100000, engagementRate: 2.9, newFollows: 1348, replies: 809, likes: 10500, reposts: 217 },
        "2026-04": { impressions: 1400000, engagementRate: 3.9, newFollows: 1230, replies: 643, likes: 10000, reposts: 237 },
        "2026-05": { impressions: 3100000, engagementRate: 4.2, newFollows: 2981, replies: 1015, likes: 34200, reposts: 556 },
        "2026-06": { impressions: 1900000, engagementRate: 4.7, newFollows: 2007, replies: 752, likes: 19200, reposts: 290 },
        "2026-07": { impressions: 2800000, engagementRate: 4.8, newFollows: 2339, replies: 869, likes: 24700, reposts: 376 },
        "2026-08": { impressions: 3700000, engagementRate: 3.5, newFollows: 1626, replies: 921, likes: 39100, reposts: 772 }
      }
    },
    {
      id: "instagram",
      platform: "instagram",
      name: "Instagram",
      months: {
        "2026-01": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, saves: 0, followsFromPosts: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-02": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, saves: 0, followsFromPosts: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-03": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, saves: 0, followsFromPosts: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-04": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, saves: 0, followsFromPosts: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-05": { posts: 14, reactions: 516, comments: 6, engagementRate: 5.99, views: 14500, shares: 64, saves: 26, followsFromPosts: 0, reach: 10500, watchTimeMin: 1904, avgWatchTimeSec: 10.15 },
        "2026-06": { posts: 10, reactions: 992, comments: 4, engagementRate: 6.64, views: 25700, shares: 7, saves: 14, followsFromPosts: 37, reach: 15600, watchTimeMin: 302.77, avgWatchTimeSec: 8.14 },
        "2026-07": { followers: 30200, followerChange: 12, posts: 19, reactions: 1100, comments: 21, engagementRate: 7.18, views: 32100, shares: 72, saves: 34, followsFromPosts: 38, reach: 17600, watchTimeMin: 898.18, avgWatchTimeSec: 7.74 },
        "2026-08": { followers: 30200, followerChange: 56, posts: 7, reactions: 302, comments: 5, engagementRate: 9.3, views: 5600, shares: 35, saves: 30, followsFromPosts: 0, reach: 4100, watchTimeMin: 740.86, avgWatchTimeSec: 8.96 }
      },
      period: {
        label: "Year to date",
        asOf: "2026-09-26",
        metrics: { followers: 30200, followerChange: 83, posts: 50, reactions: 2900, comments: 36, engagementRate: 6.93, views: 77800, shares: 178, saves: 104, followsFromPosts: 75, reach: 47700, watchTimeMin: 3800, avgWatchTimeSec: 8.72 }
      }
    },
    {
      id: "tiktok",
      platform: "tiktok",
      name: "TikTok",
      months: {
        "2026-01": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-02": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-03": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-04": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-05": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-06": { posts: 0, reactions: 0, comments: 0, engagementRate: 0, views: 0, shares: 0, reach: 0, watchTimeMin: 0, avgWatchTimeSec: 0 },
        "2026-07": { followers: 106200, followerChange: 36, posts: 17, reactions: 8700, comments: 154, engagementRate: 4.89, views: 193600, shares: 621, reach: 161000, watchTimeMin: 38400, avgWatchTimeSec: 10.41 },
        "2026-08": { followers: 106100, followerChange: -152, posts: 8, reactions: 1900, comments: 56, engagementRate: 4.57, views: 43900, shares: 92, reach: 37000, watchTimeMin: 9900, avgWatchTimeSec: 12.11 }
      },
      period: {
        label: "Year to date",
        asOf: "2026-09-26",
        metrics: { followers: 105900, followerChange: -311, posts: 25, reactions: 10600, comments: 210, engagementRate: 4.83, views: 237500, shares: 713, reach: 198000, watchTimeMin: 48200, avgWatchTimeSec: 10.96 }
      }
    },
    { id: "youtube", platform: "youtube", name: "YouTube", months: {} }
  ]
};
