import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { storyKeys } from "@/utils/stories";

export function useGuestStoriesRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channelName = `guest-stories-${Math.random().toString(36).substring(2, 9)}`;
    const channel = supabase.channel(channelName);

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "guest_stories",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: storyKeys.all,
          });
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("[REALTIME] Subscribed to guest_stories Postgres changes");
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.warn(`[REALTIME] guest_stories channel status: ${status}`);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
