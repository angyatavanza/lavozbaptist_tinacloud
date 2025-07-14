import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import client from "@/tina/__generated__/client";
import { fetchFacebookVideos } from "@/app/messages/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLatestMessageUrl(): Promise<string> {
  try {
    // Fetch Tina messages
    let messages = await client.queries.messageConnection({
      sort: "date",
      last: 1,
    });
    const allMessages = messages;

    if (!allMessages.data.messageConnection.edges) {
      return "/messages";
    }

    while (messages.data?.messageConnection.pageInfo.hasPreviousPage) {
      messages = await client.queries.messageConnection({
        sort: "date",
        before: messages.data.messageConnection.pageInfo.endCursor,
      });

      if (!messages.data.messageConnection.edges) {
        break;
      }

      allMessages.data.messageConnection.edges.push(
        ...messages.data.messageConnection.edges.reverse()
      );
    }

    // Fetch Facebook videos
    const facebookVideos = await fetchFacebookVideos();

    const facebookEdges = facebookVideos.map((video) => {
      const dateSlug = video.date?.split("T")[0];
      const safeSlug = video.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 50);
      const customSlug = `${dateSlug}-${safeSlug}`;

      return {
        node: {
          id: video.id,
          title: video.title,
          date: video.date,
          image: {
            videoUrl: video.videoUrl,
            src: video.thumbnailUrl,
            embeddable: video.embeddableURL,
          },
          excerpt: video.excerpt,
          tags: [],
          _sys: {
            breadcrumbs: [customSlug],
          },
          coordinator: {
            name: "Facebook",
            avatar: null,
          },
          type: "facebook",
        },
      };
    });

    // Convert Tina messages to uniform shape
    const tinaEdges = allMessages.data.messageConnection.edges.map((edge) => ({
      node: {
        ...edge!.node!,
        type: "tina",
      },
    }));

    // Merge and sort by date descending
    const mergedEdges = [...tinaEdges, ...facebookEdges].sort((a, b) => {
      return new Date(b.node.date).getTime() - new Date(a.node.date).getTime();
    });

    // Get the most recent message
    const latestMessage = mergedEdges[0];
    if (latestMessage) {
      return `/messages/${latestMessage.node._sys.breadcrumbs.join("/")}`;
    }

    return "/messages";
  } catch (error) {
    console.error("Error fetching latest message:", error);
    return "/messages";
  }
}
