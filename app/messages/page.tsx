import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import MessagesClientPage from "./client-page";

export const revalidate = 300;

export async function fetchFacebookVideos() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  console.log("PAGE_ID", pageId, "TOKEN present?", accessToken);

  if (!pageId || !accessToken) {
    console.error("Missing FACEBOOK_PAGE_ID or FACEBOOK_ACCESS_TOKEN.");
    return [];
  }

  const res = await fetch(
    `https://graph.facebook.com/v23.0/${pageId}/videos?fields=length,created_time,description,title,id,picture&access_token=${accessToken}`
  );
  console.log("FB response status", res.status);

  const data = await res.json();

  if (!res.ok) {
    console.error("Facebook API error:", data);
    return [];
  }
  console.log("FB raw data", data);
  const longVideos = data.data.filter((video: any) => video.length >= 2700);
  console.log("Filtered long videos:", longVideos.length);

  return longVideos.map((video: any) => ({
    id: video.id,
    title: video.title || "Facebook Video",
    date: video.created_time,
    excerpt: video.description || "No descripcion",
    videoUrl: `https://www.facebook.com/video.php?v=${video.id}`,
    thumbnailUrl: video.picture,
    type: "facebook",
  }));
}

export default async function MessagesPage() {
  let messages = await client.queries.messageConnection({
    sort: "date",
    last: 1,
  });
  const allMessages = messages;

  if (!allMessages.data.messageConnection.edges) {
    return [];
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

  const facebookVideos = await fetchFacebookVideos();

  const facebookEdges = facebookVideos.map((video) => {
    const dateSlug = video.date?.split("T")[0]; // e.g., "2024-06-21"
    const safeSlug = video.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);

    return {
      node: {
        id: video.id,
        title: video.title,
        date: video.date,
        image: {
          videoUrl: video.videoUrl,
          src: video.thumbnailUrl,
        },
        excerpt: video.excerpt,
        tags: [],
        _sys: {
          breadcrumbs: [dateSlug + "-" + safeSlug],
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

  const hybridData = {
    data: {
      messageConnection: {
        edges: mergedEdges,
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
          startCursor: "",
          endCursor: "",
        },
        totalCount: mergedEdges.length,
      },
    },
  };

  return (
    <Layout rawPageData={allMessages.data}>
      <MessagesClientPage
        data={hybridData.data}
        variables={allMessages.variables}
        query={allMessages.query}
      />
    </Layout>
  );
}
