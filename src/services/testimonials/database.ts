import fs from "fs";
import path from "path";

const LIKES_DB_PATH = path.join(process.cwd(), "testimonial_likes_db.json");

interface LikeRecord {
  testimonialId: string;
  sessionId: string;
  createdAt: number;
}

export function initLikesDB() {
  if (!fs.existsSync(LIKES_DB_PATH)) {
    fs.writeFileSync(LIKES_DB_PATH, JSON.stringify([]));
  }
}

export function getLikes(): LikeRecord[] {
  initLikesDB();
  try {
    const data = fs.readFileSync(LIKES_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveLikes(likes: LikeRecord[]) {
  initLikesDB();
  fs.writeFileSync(LIKES_DB_PATH, JSON.stringify(likes, null, 2));
}

// Get the extra like count for each testimonial
export function getDbLikeCounts(): Record<string, number> {
  const likes = getLikes();
  const counts: Record<string, number> = {};
  for (const like of likes) {
    counts[like.testimonialId] = (counts[like.testimonialId] || 0) + 1;
  }
  return counts;
}

// Get testimonial IDs liked by a specific session
export function getLikedIdsForSession(sessionId: string): string[] {
  const likes = getLikes();
  return likes
    .filter((like) => like.sessionId === sessionId)
    .map((like) => like.testimonialId);
}

// Toggle a like
export function toggleLikeDb(testimonialId: string, sessionId: string): { liked: boolean; newCount: number } {
  const likes = getLikes();
  const existingIndex = likes.findIndex(
    (like) => like.testimonialId === testimonialId && like.sessionId === sessionId
  );

  let liked = false;
  if (existingIndex !== -1) {
    // Unlike
    likes.splice(existingIndex, 1);
  } else {
    // Like
    likes.push({
      testimonialId,
      sessionId,
      createdAt: Date.now(),
    });
    liked = true;
  }

  saveLikes(likes);

  // Compute new count: base likes from DEFAULT_STORIES + database likes
  const baseLikes: Record<string, number> = {
    "1": 512,
    "2": 342,
    "3": 189,
    "4": 295,
    "5": 410,
    "6": 254,
  };
  const base = baseLikes[testimonialId] || 0;
  const dbLikesCount = likes.filter((like) => like.testimonialId === testimonialId).length;

  return {
    liked,
    newCount: base + dbLikesCount,
  };
}
