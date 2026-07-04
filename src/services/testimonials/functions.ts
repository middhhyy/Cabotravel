import { createServerFn } from "@tanstack/react-start";
import { getDbLikeCounts, getLikedIdsForSession, toggleLikeDb } from "./database";

export const getLikesStateServerFn = createServerFn({ method: "GET" })
  .validator((sessionId: string) => sessionId)
  .handler(async ({ data: sessionId }) => {
    const likedIds = getLikedIdsForSession(sessionId);
    const dbCounts = getDbLikeCounts();
    return {
      likedIds,
      dbCounts,
    };
  });

export const toggleLikeServerFn = createServerFn({ method: "POST" })
  .validator((data: { testimonialId: string; sessionId: string }) => data)
  .handler(async ({ data }) => {
    return toggleLikeDb(data.testimonialId, data.sessionId);
  });
