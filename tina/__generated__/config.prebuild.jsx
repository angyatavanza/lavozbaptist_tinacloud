var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// components/mermaid-renderer.tsx
var mermaid_renderer_exports = {};
__export(mermaid_renderer_exports, {
  default: () => MermaidElement
});
import { useIntersectionObserver } from "usehooks-ts";
import mermaid from "mermaid";
function MermaidElement({ value }) {
  const { ref } = useIntersectionObserver({
    threshold: 0.01,
    freezeOnceVisible: true,
    onChange(isIntersecting, entry) {
      if (isIntersecting) {
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({ nodes: [entry.target] });
      }
    }
  });
  return React.createElement("div", { contentEditable: false }, React.createElement("pre", { ref, suppressHydrationWarning: true }, value));
}
var init_mermaid_renderer = __esm({
  "components/mermaid-renderer.tsx"() {
  }
});

// tina/config.ts
import { defineConfig } from "tinacms";

// next.config.ts
var nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: ""
      }
    ]
  },
  async headers() {
    const headers = [
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN"
      },
      {
        key: "Content-Security-Policy",
        value: "frame-ancestors 'self'"
      }
    ];
    return [
      {
        source: "/(.*)",
        headers
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html"
      }
    ];
  }
};
var next_config_default = nextConfig;

// tina/collection/message.tsx
import React18 from "react";

// components/blocks/section-video.tsx
import * as React17 from "react";
import dynamic from "next/dynamic";

// components/layout/section.tsx
import React16 from "react";

// lib/utils.ts
import { clsx as clsx8 } from "clsx";
import { twMerge } from "tailwind-merge";

// tina/__generated__/client.ts
import { createClient as createClient2 } from "tinacms/dist/client";

// tina/__generated__/types.ts
import { createClient } from "tinacms/dist/client";
function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
var GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  __typename
  header {
    __typename
    icon {
      __typename
      name
      color
      style
    }
    name
    color
    nav {
      __typename
      href
      label
    }
  }
  footer {
    __typename
    social {
      __typename
      icon {
        __typename
        name
        color
        style
      }
      url
    }
  }
  theme {
    __typename
    color
    font
    darkMode
  }
}
    `;
var LayoutQueryFragmentFragmentDoc = gql`
    fragment LayoutQueryFragment on Query {
  global(relativePath: "index.json") {
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
var PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  blocks {
    __typename
    ... on PageBlocksHero {
      background
      headline
      tagline
      actions {
        __typename
        label
        type
        link
      }
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksCtalinks {
      background
      items {
        __typename
        icon {
          __typename
          name
          color
          style
        }
        title
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksAboutsectionsinfo {
      background
      headline
      description
      items {
        __typename
        cover
        title
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksAboutus {
      background
      headline
      tagline
      description
      actions {
        __typename
        label
        type
        link
      }
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksCallout {
      background
      text
      url
    }
    ... on PageBlocksConnections {
      background
      headline
      tagline
      description
      items {
        __typename
        cover
        title
        text
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksFeatures {
      background
      headline
      items {
        __typename
        icon {
          __typename
          name
          color
          style
        }
        title
        text
      }
    }
    ... on PageBlocksGroupsinfo {
      background
      headline
      tagline
      description
      items {
        __typename
        cover
        title
        text
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksLatestevents {
      background
      headline
      tagline
      description
      limit
      actions {
        __typename
        label
        type
        link
      }
    }
    ... on PageBlocksLatestmessages {
      background
      headline
      tagline
      description
      limit
      actions {
        __typename
        label
        type
        link
      }
    }
    ... on PageBlocksContent {
      background
      body
    }
    ... on PageBlocksCta {
      background
      headline
      description
      image {
        __typename
        src
        alt
        videoUrl
      }
      actions {
        __typename
        label
        type
        link
      }
    }
    ... on PageBlocksGroup {
      background
      headline
      description
      groups {
        __typename
        title
        description
        icon {
          __typename
          name
          color
          style
        }
        image {
          __typename
          src
          alt
          videoUrl
        }
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksVideo {
      background
      color
      url
      autoPlay
      loop
    }
    ... on PageBlocksHerocontent {
      background
      headline
      tagline
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksHerodonation {
      background
      headline
      tagline
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksProfile {
      background
      headline
      tagline
      description
      actions {
        __typename
        label
        type
        link
      }
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksTeammember {
      background
      headline
      description
      teammembers {
        __typename
        quote
        coordinator
        role
        avatar
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksContentandimagevariant {
      background
      headline
      description
      contentandimagevariants {
        __typename
        title
        description
        icon {
          __typename
          name
          color
          style
        }
        details
        image {
          __typename
          src
          alt
        }
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksFreqaskedquestions {
      background
      headline
      tagline
      description
      image {
        __typename
        src
        alt
        videoUrl
      }
      items {
        __typename
        icon {
          __typename
          name
          color
          style
        }
        title
        text
      }
    }
    ... on PageBlocksContentandimage {
      background
      headline
      description
      contentandimages {
        __typename
        title
        description
        requirements
        image {
          __typename
          src
          alt
        }
        actions {
          __typename
          label
          type
          link
        }
      }
    }
    ... on PageBlocksVision {
      title
      description
    }
    ... on PageBlocksValues {
      headline
      description
    }
    ... on PageBlocksListcontent {
      title
      description1
      description2
    }
    ... on PageBlocksLeadership {
      background
      headline
      tagline
      description
      actions {
        __typename
        label
        type
        link
      }
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksNextsteps {
      title
      description
      title2
      description2
      title3
      description3
      title4
      description4
    }
    ... on PageBlocksContactsection {
      headline
      actions {
        __typename
        label
        type
        link
      }
    }
  }
  _body
}
    `;
var MessagePartsFragmentDoc = gql`
    fragment MessageParts on Message {
  __typename
  color
  title
  image {
    __typename
    src
    alt
    videoUrl
    embeddable
    autoPlay
    loop
  }
  excerpt
  coordinator {
    ... on Coordinator {
      __typename
      name
      avatar
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  date
  tags {
    __typename
    tag {
      ... on Tag {
        __typename
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  _body
}
    `;
var EventPartsFragmentDoc = gql`
    fragment EventParts on Event {
  __typename
  title
  heroImg
  description
  actions {
    __typename
    label
    type
    icon {
      __typename
      name
      color
      style
    }
    link
  }
  date
  endtime
  icon {
    __typename
    name
    color
    style
  }
  icon2 {
    __typename
    name
    color
    style
  }
  reccuringeventdetails {
    __typename
    recurring
    frequency
    recstartdate
    recenddate
    icon2 {
      __typename
      name
      color
      style
    }
    label
    type
    icon {
      __typename
      name
      color
      style
    }
    link
  }
  coordinator {
    ... on Coordinator {
      __typename
      name
      avatar
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  locationdetails {
    __typename
    location
    label
    type
    icon {
      __typename
      name
      color
      style
    }
    link
  }
  tags {
    __typename
    tag {
      ... on Tag {
        __typename
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  _body
}
    `;
var CoordinatorPartsFragmentDoc = gql`
    fragment CoordinatorParts on Coordinator {
  __typename
  name
  avatar
}
    `;
var TagPartsFragmentDoc = gql`
    fragment TagParts on Tag {
  __typename
  name
}
    `;
var PageQueryDocument = gql`
    query pageQuery {
  ...LayoutQueryFragment
  messageConnection {
    edges {
      node {
        id
        date
        title
        excerpt
        coordinator {
          ... on Coordinator {
            ...CoordinatorParts
          }
        }
        _sys {
          filename
        }
      }
    }
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${CoordinatorPartsFragmentDoc}`;
var ContentQueryDocument = gql`
    query contentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  page(relativePath: $relativePath) {
    ...PageParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${PagePartsFragmentDoc}`;
var BlogMessageQueryDocument = gql`
    query blogMessageQuery($relativePath: String!) {
  ...LayoutQueryFragment
  message(relativePath: $relativePath) {
    ...MessageParts
    coordinator {
      ... on Coordinator {
        name
        avatar
      }
    }
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${MessagePartsFragmentDoc}`;
var PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
var PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
var MessageDocument = gql`
    query message($relativePath: String!) {
  message(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MessageParts
  }
}
    ${MessagePartsFragmentDoc}`;
var MessageConnectionDocument = gql`
    query messageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MessageFilter) {
  messageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MessageParts
      }
    }
  }
}
    ${MessagePartsFragmentDoc}`;
var EventDocument = gql`
    query event($relativePath: String!) {
  event(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventParts
  }
}
    ${EventPartsFragmentDoc}`;
var EventConnectionDocument = gql`
    query eventConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventFilter) {
  eventConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventParts
      }
    }
  }
}
    ${EventPartsFragmentDoc}`;
var CoordinatorDocument = gql`
    query coordinator($relativePath: String!) {
  coordinator(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CoordinatorParts
  }
}
    ${CoordinatorPartsFragmentDoc}`;
var CoordinatorConnectionDocument = gql`
    query coordinatorConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CoordinatorFilter) {
  coordinatorConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CoordinatorParts
      }
    }
  }
}
    ${CoordinatorPartsFragmentDoc}`;
var TagDocument = gql`
    query tag($relativePath: String!) {
  tag(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TagParts
  }
}
    ${TagPartsFragmentDoc}`;
var TagConnectionDocument = gql`
    query tagConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TagFilter) {
  tagConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TagParts
      }
    }
  }
}
    ${TagPartsFragmentDoc}`;
var GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
var GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
function getSdk(requester) {
  return {
    pageQuery(variables, options) {
      return requester(PageQueryDocument, variables, options);
    },
    contentQuery(variables, options) {
      return requester(ContentQueryDocument, variables, options);
    },
    blogMessageQuery(variables, options) {
      return requester(BlogMessageQueryDocument, variables, options);
    },
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    message(variables, options) {
      return requester(MessageDocument, variables, options);
    },
    messageConnection(variables, options) {
      return requester(MessageConnectionDocument, variables, options);
    },
    event(variables, options) {
      return requester(EventDocument, variables, options);
    },
    eventConnection(variables, options) {
      return requester(EventConnectionDocument, variables, options);
    },
    coordinator(variables, options) {
      return requester(CoordinatorDocument, variables, options);
    },
    coordinatorConnection(variables, options) {
      return requester(CoordinatorConnectionDocument, variables, options);
    },
    tag(variables, options) {
      return requester(TagDocument, variables, options);
    },
    tagConnection(variables, options) {
      return requester(TagConnectionDocument, variables, options);
    },
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    }
  };
}
var generateRequester = (client2) => {
  const requester = async (doc, vars, options) => {
    let url = client2.apiUrl;
    if (options?.branch) {
      const index = client2.apiUrl.lastIndexOf("/");
      url = client2.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client2.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
var queries = (client2) => {
  const requester = generateRequester(client2);
  return getSdk(requester);
};

// tina/__generated__/client.ts
var client = createClient2({ cacheDir: "/Users/angyaguilar/Documents/GitHub/tina-cloud-starter/tina/__generated__/.cache/1755321916239", url: "https://content.tinajs.io/1.6/content/49245b1e-a7ee-4385-98f5-befbf4d19b59/github/la_voz_tinaCMS", token: "a85d5ee699ff1356512bdde5c2565bf1e435053f", queries });

// components/layout/layout.tsx
import React10 from "react";

// components/layout/layout-context.tsx
import React2, { useState, useContext } from "react";
var LayoutContext = React2.createContext(void 0);
var useLayout = () => {
  const context = useContext(LayoutContext);
  return context || {
    theme: {
      color: "blue",
      darkMode: "default"
    },
    globalSettings: void 0,
    pageData: void 0
  };
};

// components/layout/root-layout.tsx
import { usePathname } from "next/navigation";
import { useEffect as useEffect2, useId, useRef, useState as useState3 } from "react";
import { motion as motion3, MotionConfig, useReducedMotion as useReducedMotion2 } from "framer-motion";

// components/layout/container.tsx
import React3 from "react";
import clsx from "clsx";

// components/layout/root-layout.tsx
import Link7 from "next/link";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

// components/layout/nav/service-times.tsx
import clsx2 from "clsx";
import React4 from "react";

// components/layout/nav/social-media.tsx
import Link from "next/link";
import clsx3 from "clsx";
import {
  BsFacebook,
  BsYoutube,
  BsInstagram
} from "react-icons/bs";

// components/layout/nav/footer.tsx
import React8 from "react";
import Link4 from "next/link";

// components/motion-primitives/fade-in.tsx
import { createContext, useContext as useContext2 } from "react";
import { motion, useReducedMotion } from "framer-motion";
var FadeInStaggerContext = createContext(false);

// components/ui/icon.tsx
import * as BoxIcons from "react-icons/bi";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import React5 from "react";
var IconOptions = {
  Tina: (props) => React5.createElement(
    "svg",
    {
      ...props,
      viewBox: "0 0 66 80",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    React5.createElement("title", null, "Tina"),
    React5.createElement(
      "path",
      {
        d: "M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z",
        fill: "currentColor"
      }
    ),
    React5.createElement(
      "path",
      {
        d: "M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z",
        fill: "currentColor"
      }
    )
  ),
  ...BoxIcons,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  AiFillInstagram
};
var iconColorClass = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50"
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50"
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50"
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50"
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50"
  },
  purple: {
    regular: "text-primary-button",
    circle: "bg-primary-button dark:bg-primary-bold text-primary-muted-200"
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50"
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50"
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50"
  },
  black: {
    regular: "text-foreground",
    circle: "bg-black-400 dark:bg-black-500 text-black-50"
  }
};
var iconSizeClass = {
  xs: "w-6 h-6 shrink-0",
  small: "w-8 h-8 shrink-0",
  medium: "w-12 h-12 shrink-0",
  large: "w-14 h-14 shrink-0",
  xl: "w-16 h-16 shrink-0",
  custom: "w-4 h-4 shrink-0"
};
var TinaIcon = ({
  data,
  parentColor = "",
  className = "",
  tinaField: tinaField27 = ""
}) => {
  const { theme } = useLayout();
  if (IconOptions[data.name] === null || IconOptions[data.name] === void 0) {
    return null;
  }
  const { name, color, size = "medium", style = "regular" } = data;
  const IconSVG = IconOptions[name];
  const iconSizeClasses = typeof size === "string" ? iconSizeClass[size] : iconSizeClass[Object.keys(iconSizeClass)[size]];
  const iconColor = color ? color === "primary" ? theme.color : color : theme.color;
  if (style == "circle") {
    return React5.createElement(
      "div",
      {
        ...tinaField27 ? { "data-tina-field": tinaField27 } : {},
        className: `relative z-10 inline-flex items-center justify-center shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`
      },
      React5.createElement(IconSVG, { className: "w-2/3 h-2/3" })
    );
  } else {
    const iconColorClasses = iconColorClass[parentColor === "primary" && (iconColor === theme.color || iconColor === "primary") ? "white" : iconColor].regular;
    return React5.createElement(
      IconSVG,
      {
        ...tinaField27 ? { "data-tina-field": tinaField27 } : {},
        className: `${iconSizeClasses} ${iconColorClasses} ${className}`
      }
    );
  }
};

// components/motion-primitives/text-effect.tsx
import {
  AnimatePresence,
  motion as motion2
} from "motion/react";
import React6 from "react";
var AnimationComponent = React6.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content = per === "line" ? React6.createElement(motion2.span, { variants, className: "block" }, segment) : per === "word" ? React6.createElement(
    motion2.span,
    {
      "aria-hidden": "true",
      variants,
      className: "inline-block whitespace-pre"
    },
    segment
  ) : React6.createElement(motion2.span, { className: "inline-block whitespace-pre" }, segment.split("").map((char, charIndex) => React6.createElement(
    motion2.span,
    {
      key: `char-${charIndex}`,
      "aria-hidden": "true",
      variants,
      className: "inline-block whitespace-pre"
    },
    char
  )));
  if (!segmentWrapperClassName) {
    return content;
  }
  const defaultWrapperClassName = per === "line" ? "block" : "inline-block";
  return React6.createElement("span", { className: cn(defaultWrapperClassName, segmentWrapperClassName) }, content);
});
AnimationComponent.displayName = "AnimationComponent";

// components/layout/nav/nav-section.tsx
import React7 from "react";
var createNavigation = (latestMessageUrl) => [
  {
    title: "Qui\xE9nes somos",
    links: [
      { title: "Sobre nosotros", href: "/about" },
      { title: "Prop\xF3sito, misi\xF3n y valores", href: "/purpose" },
      { title: "Nuestro pastor", href: "/our-pastor" },
      { title: "Nuestro equipo", href: "/staff" }
    ]
  },
  {
    title: "Experiencias",
    links: [
      { title: "Mensajes", href: "/messages" },
      { title: React7.createElement(React7.Fragment, null, "Mensaje m\xE1s reciente ", React7.createElement("span", { "aria-hidden": "true" }, "\u2192")), href: latestMessageUrl || "/messages" },
      { title: "Horario de servicios", href: "/service-times" }
    ]
  },
  {
    title: "Con\xE9ctate",
    links: [
      { title: "Primeros pasos", href: "/first-steps" },
      { title: "Grupos", href: "/groups" },
      { title: "Servir", href: "/serve" },
      { title: "Eventos", href: "/events" }
    ]
  },
  {
    title: "Recursos comunitarios",
    links: [
      { title: "Recursos comunitarios", href: "/community-resources" },
      { title: "Haz tu donaci\xF3n en l\xEDnea", href: "/donations" }
    ]
  }
];
var navigation = createNavigation();

// components/layout/nav/footer-navigation.tsx
import Link2 from "next/link";
import { useEffect, useState as useState2 } from "react";

// components/ui/logo.tsx
import clsx4 from "clsx";
import Link3 from "next/link";
import Image from "next/image";

// components/layout/nav/header.tsx
import Link6 from "next/link";

// components/ui/second-button.tsx
import Link5 from "next/link";
import clsx5 from "clsx";
import React9 from "react";

// components/layout/nav/header.tsx
import clsx6 from "clsx";

// components/facebook-sdk-loader.tsx
import { useEffect as useEffect3 } from "react";

// app/messages/client-page.tsx
import * as React15 from "react";
import Link8 from "next/link";
import { format } from "date-fns";

// components/ui/latest-messages-video-dialog.tsx
import { Play } from "lucide-react";

// components/ui/video-dialog-context.tsx
import { createContext as createContext2, useContext as useContext3, useState as useState4 } from "react";
var VideoDialogContext = createContext2(void 0);

// components/ui/avatar.tsx
import * as React11 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
function Avatar({
  className,
  ...props
}) {
  return React11.createElement(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return React11.createElement(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return React11.createElement(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}

// components/ui/latest-messages-video-dialog.tsx
import { UserRound } from "lucide-react";

// components/ui/messages-video-dialog.tsx
import { Play as Play2 } from "lucide-react";
import { UserRound as UserRound2 } from "lucide-react";

// components/error-boundary.tsx
import React12 from "react";
var ErrorBoundary = class extends React12.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return React12.createElement("h1", null, "Something went wrong.");
    }
    return this.props.children;
  }
};

// app/messages/client-page.tsx
import { ArrowRight as ArrowRight3 } from "lucide-react";

// components/ui/card.tsx
import * as React13 from "react";
{
}

// components/layout/page-intro.tsx
import React14 from "react";
import clsx7 from "clsx";

// app/messages/client-page.tsx
import { es } from "date-fns/locale";

// lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx8(inputs));
}

// components/layout/section.tsx
var tailwindBackgroundOptions = [
  { label: "Default", value: "bg-primary-background" },
  { label: "Peach", value: "bg-primary-background-peach" },
  { label: "White", value: "bg-secondary-background-white" },
  { label: "OffWhite", value: "bg-secondary-background-offwhite" },
  { label: "Gray", value: "bg-secondary-background-gray" },
  { label: "DarkGray", value: "bg-secondary-background-darkgray" },
  { label: "LVBlue", value: "bg-secondary-background-blue" },
  { label: "LVPurple", value: "bg-secondary-background-purple" },
  { label: "LaVozPurple", value: "bg-primary" },
  { label: "LaVozPurple1", value: "bg-primary-muted-100" },
  { label: "LaVozPurple2", value: "bg-primary-muted-200" },
  { label: "LaVozPurple3", value: "bg-primary-muted-300" },
  { label: "LaVozPurple4", value: "bg-primary-muted-400" },
  { label: "LaVozOrange", value: "bg-secondary" },
  { label: "LaVozOrange1", value: "bg-secondary-muted-100" },
  { label: "LaVozOrange2", value: "bg-secondary-muted-200" },
  { label: "LaVozOrange3", value: "bg-secondary-muted-300" },
  { label: "LaVozOrange4", value: "bg-secondary-muted-400" },
  { label: "Zinc", value: "bg-zinc-50" },
  { label: "Black", value: "bg-black/80" },
  { label: "Red", value: "bg-red-50/80" },
  { label: "Orange", value: "bg-orange-50/80" },
  { label: "Fuchsia", value: "bg-fuchsia-50/80" },
  { label: "Pink", value: "bg-pink-50/80" },
  { label: "Rose", value: "bg-rose-50/80" },
  { label: "Yellow", value: "bg-yellow-50/80" },
  { label: "Green", value: "bg-green-50/80" },
  { label: "Lime", value: "bg-lime-50/80" },
  { label: "Emerald", value: "bg-emerald-50/80" },
  { label: "Teal", value: "bg-teal-50/80" },
  { label: "Cyan", value: "bg-cyan-50/80" },
  { label: "Blue", value: "bg-blue-50/80" },
  { label: "Purple", value: "bg-purple-50/80" },
  { label: "Sky", value: "bg-sky-50/80" },
  { label: "Indigo", value: "bg-indigo-50/80" },
  { label: "Violet", value: "bg-violet-50/80" }
];
var sectionBlockSchemaField = {
  type: "string",
  label: "Background",
  name: "background",
  options: tailwindBackgroundOptions
};

// components/blocks/section-video.tsx
var ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
var videoBlockSchema = {
  name: "video",
  label: "Video",
  ui: {
    previewSrc: "/blocks/video.png",
    defaultItem: {
      url: "https://www.youtube.com/watch?v=j8egYW7Jpgk"
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    },
    {
      type: "string",
      label: "Url",
      name: "url"
    },
    {
      type: "boolean",
      label: "Auto Play",
      name: "autoPlay"
    },
    {
      type: "boolean",
      label: "Loop",
      name: "loop"
    }
  ]
};

// tina/collection/message.tsx
var Message = {
  label: "Mensajes Recientes",
  name: "message",
  path: "content/messages",
  format: "mdx",
  ui: {
    router: ({ document: document2 }) => {
      return `/messages/${document2._sys.breadcrumbs.join("/")}`;
    }
  },
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      // @ts-ignore
      uploadDir: () => "messages",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        },
        {
          type: "boolean",
          label: "Embeddable",
          name: "embeddable"
        },
        {
          type: "boolean",
          label: "Auto Play",
          name: "autoPlay"
        },
        {
          type: "boolean",
          label: "Loop",
          name: "loop"
        }
      ]
    },
    {
      type: "rich-text",
      label: "Excerpt",
      name: "excerpt",
      overrides: {
        toolbar: ["bold", "italic", "link"]
      }
    },
    {
      type: "reference",
      label: "Coordinator",
      name: "coordinator",
      collections: ["coordinator"],
      ui: {
        optionComponent: (props, _internalSys) => {
          const { name, avatar } = props;
          if (!name) return _internalSys.path;
          return React18.createElement("p", { className: "flex min-h-8 items-center gap-5" }, React18.createElement(Avatar, null, avatar && React18.createElement(AvatarImage, { src: avatar, alt: `${name} Profile` }), React18.createElement(AvatarFallback, null, name.split(" ").map((part) => part[0]?.toUpperCase() || "").join(""))), name);
        }
      }
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      required: true,
      //this is required to display the event date in the frontend
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A"
      }
    },
    {
      type: "object",
      label: "Tags",
      name: "tags",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Tag",
          name: "tag",
          collections: ["tag"],
          ui: {
            optionComponent: (props, _internalSys) => props.name || _internalSys.path
          }
        }
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.tag };
        }
      }
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            },
            {
              name: "coordinatorName",
              label: "Coordinator",
              type: "string"
            }
          ]
        },
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"]
            }
          ]
        },
        {
          name: "ContactSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me"
            }
          }
        },
        videoBlockSchema
      ],
      isBody: true
    }
  ]
};
var message_default = Message;

// tina/collection/event.tsx
import React21 from "react";

// tina/fields/icon.tsx
import React20 from "react";
import { Button as Button2, wrapFieldsWithMeta as wrapFieldsWithMeta2 } from "tinacms";
import { BiChevronRight } from "react-icons/bi";
import { GoCircleSlash } from "react-icons/go";
import {
  Popover,
  PopoverButton,
  Transition as Transition2,
  PopoverPanel
} from "@headlessui/react";

// tina/fields/color.tsx
import React19 from "react";
import { wrapFieldsWithMeta } from "tinacms";
var colorOptions = [
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "white"
];
var ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  const inputClasses = {
    blue: "bg-blue-500 border-blue-600",
    teal: "bg-teal-500 border-teal-600",
    green: "bg-green-500 border-green-600",
    yellow: "bg-yellow-500 border-yellow-600",
    orange: "bg-orange-500 border-orange-600",
    red: "bg-red-500 border-red-600",
    pink: "bg-pink-500 border-pink-600",
    purple: "bg-purple-500 border-purple-600",
    white: "bg-white border-gray-150"
  };
  return React19.createElement(React19.Fragment, null, React19.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React19.createElement("div", { className: "flex gap-5 flex-wrap" }, colorOptions.map((color) => {
    return React19.createElement(
      "button",
      {
        key: color,
        className: `w-9 h-9 rounded-full shadow border ${inputClasses[color]} ${input.value === color ? "ring-[3px] ring-offset-2 ring-blue-400" : ""}`,
        onClick: () => {
          input.onChange(color);
        }
      }
    );
  })));
});

// tina/fields/icon.tsx
var parseIconName = (name) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};
var IconPickerInput = wrapFieldsWithMeta2(({ input }) => {
  const [filter, setFilter] = React20.useState("");
  const filteredBlocks = React20.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);
  const inputLabel = Object.keys(IconOptions).includes(input.value) ? parseIconName(input.value) : "Select Icon";
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;
  return React20.createElement("div", { className: "relative z-[1000]" }, React20.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React20.createElement(Popover, null, ({ open }) => React20.createElement(React20.Fragment, null, React20.createElement(PopoverButton, null, React20.createElement(
    Button2,
    {
      className: `text-sm h-11 px-4 ${InputIcon ? "h-11" : "h-10"}`,
      size: "custom",
      rounded: "full",
      variant: open ? "secondary" : "white"
    },
    InputIcon && React20.createElement(InputIcon, { className: "w-7 mr-1 h-auto fill-current text-blue-500" }),
    inputLabel,
    !InputIcon && React20.createElement(BiChevronRight, { className: "w-5 h-auto fill-current opacity-70 ml-1" })
  )), React20.createElement(
    "div",
    {
      className: "absolute w-full min-w-[192px] max-w-2xl -bottom-2 left-0 translate-y-full",
      style: { zIndex: 1e3 }
    },
    React20.createElement(
      Transition2,
      {
        enter: "transition duration-150 ease-out",
        enterFrom: "transform opacity-0 -translate-y-2",
        enterTo: "transform opacity-100 translate-y-0",
        leave: "transition duration-75 ease-in",
        leaveFrom: "transform opacity-100 translate-y-0",
        leaveTo: "transform opacity-0 -translate-y-2"
      },
      React20.createElement(PopoverPanel, { className: "relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50" }, ({ close }) => React20.createElement("div", { className: "max-h-[24rem] flex flex-col w-full h-full" }, React20.createElement("div", { className: "bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm" }, React20.createElement(
        "input",
        {
          type: "text",
          className: "bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200",
          onClick: (event) => {
            event.stopPropagation();
            event.preventDefault();
          },
          value: filter,
          onChange: (event) => {
            setFilter(event.target.value);
          },
          placeholder: "Filter..."
        }
      )), filteredBlocks.length === 0 && React20.createElement("span", { className: "relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic" }, "No matches found"), filteredBlocks.length > 0 && React20.createElement("div", { className: "w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto" }, React20.createElement(
        "button",
        {
          className: "relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
          key: "clear-input",
          onClick: () => {
            input.onChange("");
            setFilter("");
            close();
          }
        },
        React20.createElement(GoCircleSlash, { className: "w-6 h-auto text-gray-200" })
      ), filteredBlocks.map((name) => {
        return React20.createElement(
          "button",
          {
            className: "relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
            key: name,
            onClick: () => {
              input.onChange(name);
              setFilter("");
              close();
            }
          },
          React20.createElement(
            TinaIcon,
            {
              data: {
                name,
                size: "custom",
                color: "blue"
              },
              className: "w-7 h-auto"
            }
          )
        );
      }))))
    )
  ))));
});
var iconSchema = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Icon",
      name: "name",
      ui: {
        component: IconPickerInput
      }
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      ui: {
        component: ColorPickerInput
      }
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle"
        },
        {
          label: "Float",
          value: "float"
        }
      ]
    }
  ]
};

// tina/collection/event.tsx
var Event = {
  label: "Eventos",
  name: "event",
  path: "content/events",
  format: "mdx",
  ui: {
    router: ({ document: document2 }) => {
      return `/events/${document2._sys.breadcrumbs.join("/")}`;
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image",
      // @ts-ignore
      uploadDir: () => "events"
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      overrides: {
        toolbar: ["bold", "italic", "link"]
      }
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: {
            name: "",
            color: ""
          },
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        iconSchema,
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "datetime",
      label: "Event Date and Time",
      name: "date",
      required: true,
      //this is required to display the event date in the frontend
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A"
      }
    },
    {
      type: "datetime",
      label: "Event End Time",
      name: "endtime",
      ui: {
        timeFormat: "hh:mm A"
      }
    },
    iconSchema,
    {
      ...iconSchema,
      name: "icon2"
    },
    {
      label: "Reccuring Event Details",
      name: "reccuringeventdetails",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          recurring: false,
          date: (/* @__PURE__ */ new Date()).toISOString(),
          enddate: (/* @__PURE__ */ new Date()).toISOString(),
          label: "Date Label",
          type: "button",
          icon: {
            name: "",
            color: ""
          },
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          type: "boolean",
          label: "Recurring Event",
          name: "recurring"
        },
        {
          type: "string",
          label: "Recurrence",
          name: "frequency"
        },
        {
          type: "datetime",
          label: "Recurring Event Start Date",
          name: "recstartdate",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A"
          }
        },
        {
          type: "datetime",
          label: "Recurring Event End Date",
          name: "recenddate",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A"
          }
        },
        {
          ...iconSchema,
          name: "icon2"
        },
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        iconSchema,
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "reference",
      label: "Coordinator",
      name: "coordinator",
      collections: ["coordinator"],
      ui: {
        optionComponent: (props, _internalSys) => {
          const { name, avatar } = props;
          if (!name) return _internalSys.path;
          return React21.createElement("p", { className: "flex min-h-8 items-center gap-5" }, React21.createElement(Avatar, null, avatar && React21.createElement(AvatarImage, { src: avatar, alt: `${name} Profile` }), React21.createElement(AvatarFallback, null, name.split(" ").map((part) => part[0]?.toUpperCase() || "").join(""))), name);
        }
      }
    },
    {
      label: "Location Details",
      name: "locationdetails",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          location: "La Voz de la Esperanza",
          label: "Address Label",
          type: "button",
          icon: {
            name: "",
            color: ""
          },
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          type: "string",
          label: "Location",
          name: "location",
          required: true
        },
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        iconSchema,
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Tags",
      name: "tags",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Tag",
          name: "tag",
          collections: ["tag"],
          ui: {
            optionComponent: (props, _internalSys) => props.name || _internalSys.path
          }
        }
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.tag };
        }
      }
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            },
            {
              name: "coordinatorName",
              label: "Coordinator",
              type: "string"
            }
          ]
        },
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"]
            }
          ]
        },
        {
          name: "ContactSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me"
            }
          }
        },
        videoBlockSchema
      ],
      isBody: true
    }
  ]
};
var event_default = Event;

// tina/collection/global.ts
var Global = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Name",
          name: "name"
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" }
          ]
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home"
            }
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href"
            },
            {
              type: "string",
              label: "Label",
              name: "label"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || "undefined" };
            }
          },
          fields: [
            iconSchema,
            {
              type: "string",
              label: "Url",
              name: "url"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput
          }
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans"
            },
            {
              label: "Nunito",
              value: "nunito"
            },
            {
              label: "Lato",
              value: "lato"
            },
            {
              label: "Roboto",
              value: "roboto"
            }
          ]
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system"
            },
            {
              label: "Light",
              value: "light"
            },
            {
              label: "Dark",
              value: "dark"
            }
          ]
        }
      ]
    }
  ]
};
var global_default = Global;

// tina/collection/coordinator.ts
var Coordinator = {
  label: "Coordinators",
  name: "coordinator",
  path: "content/coordinators",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      // @ts-ignore
      uploadDir: () => "coordinators"
    }
  ]
};
var coordinator_default = Coordinator;

// components/blocks/section-herocontent.tsx
import * as React22 from "react";
import Image3 from "next/image";
import { tinaField } from "tinacms/dist/react";
var herocontentBlockSchema = {
  name: "herocontent",
  label: "Herocontent",
  ui: {
    previewSrc: "/blocks/herocontent.png",
    defaultItem: {
      tagline: "HERE'S SOME TEXT ABOVE THE OTHER TEXT",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/section-cta-links.tsx
import Link9 from "next/link";
import { tinaField as tinaField2 } from "tinacms/dist/react";

// components/ui/button.tsx
import * as React23 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
var buttonVariants = cva(
  "font-roboto inline-flex items-center justify-center min-w-25 gap-3 whitespace-nowrap rounded-sm font-semibold text-sm leading-[20px] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary-button text-primary-button-foreground shadow-xs hover:bg-primary-button/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        //Outline button is currently used for the hero component
        outline: "border bg-transparent border-secondary-background-white text-primary-button-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        defaultvariant: "bg-primary-button-variant text-primary-button-foreground shadow-xs hover:bg-primary-button-variant/90",
        secondary: "bg-secondary-button text-secondary-button-foreground shadow-xs hover:bg-secondary-button/80",
        ghost: "bg-transparent text-primary-button hover:bg-transparent hover:underline dark:text-primary-foreground min-w-0",
        link: "text-primary-button underline-offset-4 hover:underline"
      },
      size: {
        //default is 40px height (section, component, nav bar), sm is 36px, lg is 44px (primary actions)
        default: "h-10 md:text-base md:leading-[24px] px-5 has-[>svg]:px-4.5",
        sm: "h-9 rounded-sm gap-3 px-4.5 has-[>svg]:px-4",
        lg: "h-11 rounded-sm md:text-base md:leading-[24px] gap-3 px-5.5 has-[>svg]:px-5",
        // lg: "h-12 rounded-sm text-base leading-[24px] md:text-base md:leading-[24px] gap-3 px-7.5 has-[>svg]:px-7",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// components/blocks/section-cta-links.tsx
var defaultCtalink = {
  title: "Recursos comunitarios",
  icon: {
    color: "purple",
    style: "float",
    name: "BiHomeSmile"
  }
};
var ctalinkBlockSchema = {
  name: "ctalinks",
  label: "Ctalinks",
  ui: {
    previewSrc: "/blocks/ctalinks.png",
    defaultItem: {
      items: [defaultCtalink, defaultCtalink, defaultCtalink]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "object",
      label: "Ctalink Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultCtalink
        }
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/section-our-team.tsx
import Link10 from "next/link";
import Image4 from "next/image";
import { tinaField as tinaField3 } from "tinacms/dist/react";
var teammemberBlockSchema = {
  name: "teammember",
  label: "Teammember",
  ui: {
    previewSrc: "/blocks/teammember.png",
    defaultItem: {
      teammembers: [
        {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton"
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      list: true,
      label: "Teammembers",
      name: "teammembers",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton"
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.coordinator}`
          };
        }
      },
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea"
          },
          label: "Quote",
          name: "quote"
        },
        {
          type: "string",
          label: "Coordinator",
          name: "coordinator"
        },
        {
          type: "string",
          label: "Role",
          name: "role"
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar"
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/section-profile.tsx
import React25 from "react";
import Image5 from "next/image";
import Link11 from "next/link";
import { tinaField as tinaField4 } from "tinacms/dist/react";

// components/motion-primitives/animated-group.tsx
import { motion as motion4 } from "motion/react";
import React24 from "react";

// components/blocks/section-profile.tsx
var profileBlockSchema = {
  name: "profile",
  label: "Profile",
  ui: {
    previewSrc: "/blocks/profile.png",
    defaultItem: {
      title: "Start Building",
      description: "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/"
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/"
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/landing-hero.tsx
import * as React26 from "react";
import Image6 from "next/image";
import Link12 from "next/link";
import { tinaField as tinaField5 } from "tinacms/dist/react";
var heroBlockSchema = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "HERE'S SOME TEXT ABOVE THE OTHER TEXT",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/section-herodonation.tsx
import * as React27 from "react";
import Image7 from "next/image";
import { tinaField as tinaField6 } from "tinacms/dist/react";
var herodonationBlockSchema = {
  name: "herodonation",
  label: "Herodonation",
  ui: {
    previewSrc: "/blocks/herodonation.png",
    defaultItem: {
      tagline: "HERE'S SOME TEXT ABOVE THE OTHER TEXT",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/section-about.tsx
import * as React28 from "react";
import Image8 from "next/image";
import Link13 from "next/link";
import { tinaField as tinaField7 } from "tinacms/dist/react";
var defaultAboutsectioninfo = {
  title: "Aqu\xED hay otro grupo",
  text: "Aqu\xED puedes proveer m\xE1s informaci\xF3n sobre un grupo.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var aboutsectioninfoBlockSchema = {
  name: "aboutsectionsinfo",
  label: "Aboutsectionsinfo",
  ui: {
    previewSrc: "/blocks/aboutsectionsinfo.png",
    defaultItem: {
      headline: "Grupos",
      description: "En La Iglesia La Voz, hay algo para todos. Ofrecemos los siguientes Ministerios: Varones, Mujeres, Jovenes, y Ni\xF1os",
      items: [
        defaultAboutsectioninfo,
        defaultAboutsectioninfo,
        defaultAboutsectioninfo
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "object",
      label: "Aboutsection Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultAboutsectioninfo
        }
      },
      fields: [
        //iconSchema as any,
        {
          type: "image",
          label: "CoverImg",
          name: "cover"
        },
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/landing-about-us.tsx
import * as React29 from "react";
import Image9 from "next/image";
import Link14 from "next/link";
import { tinaField as tinaField8 } from "tinacms/dist/react";
var aboutusBlockSchema = {
  name: "aboutus",
  label: "Aboutus",
  ui: {
    previewSrc: "/blocks/aboutus.png",
    defaultItem: {
      tagline: "HERE'S SOME TEXT ABOVE THE OTHER TEXT",
      headline: "This Big Text is Totally Awesome",
      description: "This Desc is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/section-content.tsx
import React30 from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField as tinaField9 } from "tinacms/dist/react";

// components/blocks/mermaid.tsx
import dynamic2 from "next/dynamic";
var MermaidElement2 = dynamic2(() => Promise.resolve().then(() => (init_mermaid_renderer(), mermaid_renderer_exports)), {
  ssr: false,
  loading: () => React.createElement("div", null, "Loading diagram...")
});

// components/magicui/script-copy-btn.tsx
import { Check, Copy } from "lucide-react";
import { motion as motion5 } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect as useEffect4, useState as useState5 } from "react";
var scriptCopyBlockSchema = {
  name: "scriptCopyBlock",
  label: "Script Copy Block",
  ui: {
    defaultItem: {
      codeLanguage: "bash",
      lightTheme: "catppuccin-latte",
      darkTheme: "catppuccin-mocha",
      commandMap: "npm|npm install\npnpm|pnpm install\nyarn|yarn install\nbun|bun install"
    }
  },
  fields: [
    {
      name: "codeLanguage",
      label: "Code Language",
      type: "string",
      description: "The language used for syntax highlighting."
    },
    {
      name: "lightTheme",
      label: "Light Theme",
      type: "string",
      description: "The light theme used for syntax highlighting."
    },
    {
      name: "darkTheme",
      label: "Dark Theme",
      type: "string",
      description: "The dark theme used for syntax highlighting."
    },
    {
      name: "commandMap",
      label: "Command Map",
      type: "string",
      description: 'A list of package managers and their corresponding commands, separated by "|". Example:\n"npm|npm install\npnpm|pnpm install"',
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/section-content.tsx
var contentBlockSchema = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        scriptCopyBlockSchema
      ]
    }
  ]
};

// components/blocks/section-call-to-action.tsx
import Link15 from "next/link";
import Image10 from "next/image";
import { tinaField as tinaField10 } from "tinacms/dist/react";
var ctaBlockSchema = {
  name: "cta",
  label: "CTA",
  ui: {
    previewSrc: "/blocks/cta.png",
    defaultItem: {
      headline: "Start Building",
      description: "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/"
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/"
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    }
  ]
};

// components/blocks/landing-connect.tsx
import { tinaField as tinaField11 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown2 } from "tinacms/dist/rich-text";
import Link16 from "next/link";
import Image11 from "next/image";
var defaultConnection = {
  title: "Here's Another Connection",
  text: "This is where you might talk about the connection, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var connectionBlockSchema = {
  name: "connections",
  label: "Connections",
  ui: {
    previewSrc: "/blocks/connections.png",
    defaultItem: {
      title: "Built to cover your needs",
      description: "We have a lot of connections to cover your needs",
      items: [defaultConnection, defaultConnection, defaultConnection]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "object",
      label: "Connection Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultConnection
        }
      },
      fields: [
        //iconSchema as any,
        {
          type: "image",
          label: "CoverImg",
          name: "cover"
        },
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text"
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/section-features.tsx
import { tinaField as tinaField12 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown3 } from "tinacms/dist/rich-text";
var defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      headline: "Built to cover your needs",
      description: "We have a lot of features to cover your needs",
      items: [defaultFeature, defaultFeature, defaultFeature]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultFeature
        }
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text"
        }
      ]
    }
  ]
};

// components/blocks/section-leadership.tsx
import React31 from "react";
import Image12 from "next/image";
import Link17 from "next/link";
import { tinaField as tinaField13 } from "tinacms/dist/react";
var leadershipBlockSchema = {
  name: "leadership",
  label: "Leadership",
  ui: {
    previewSrc: "/blocks/leadership.png",
    defaultItem: {
      title: "Start Building",
      description: "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/"
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/"
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/section-vision.tsx
import React33 from "react";
import { tinaField as tinaField14 } from "tinacms/dist/react";

// components/ui/grid-list.tsx
import clsx10 from "clsx";

// components/ui/border.tsx
import clsx9 from "clsx";
import React32 from "react";

// components/blocks/section-vision.tsx
var visionBlockSchema = {
  name: "vision",
  label: "Vision",
  ui: {
    previewSrc: "/blocks/vision.png",
    defaultItem: {
      title: "Nuestra Visi\xF3n",
      description: "So\xF1amos con iniciar ministerios enfocados a suplir necesidades emocionales, f\xEDsicas y espirituales de la comunidad que rodea a la iglesia y m\xE1s all\xE1."
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/landing-groups.tsx
import { tinaField as tinaField15 } from "tinacms/dist/react";
import Link18 from "next/link";
import Image13 from "next/image";
var defaultGroupinfo = {
  title: "Aqu\xED hay otro grupo",
  text: "Aqu\xED puedes proveer m\xE1s informaci\xF3n sobre un grupo.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var groupinfoBlockSchema = {
  name: "groupsinfo",
  label: "Groupsinfo",
  ui: {
    previewSrc: "/blocks/groupsinfo.png",
    defaultItem: {
      title: "Grupos",
      description: "En La Iglesia La Voz, hay algo para todos. Ofrecemos los siguientes Ministerios: Varones, Mujeres, Jovenes, y Ni\xF1os",
      items: [defaultGroupinfo, defaultGroupinfo, defaultGroupinfo]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "object",
      label: "Group Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultGroupinfo
        }
      },
      fields: [
        //iconSchema as any,
        {
          type: "image",
          label: "CoverImg",
          name: "cover"
        },
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text"
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/landing-callout.tsx
import React34 from "react";
import Link19 from "next/link";
import { tinaField as tinaField16 } from "tinacms/dist/react";
import { ArrowRight as ArrowRight4 } from "lucide-react";
var calloutBlockSchema = {
  name: "callout",
  label: "Callout",
  ui: {
    previewSrc: "/blocks/callout.png",
    defaultItem: {
      url: "https://tina.io/editorial-workflow",
      text: "Support for live editing and editorial workflow"
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Text",
      name: "text"
    },
    {
      type: "string",
      label: "Url",
      name: "url"
    }
  ]
};

// components/blocks/landing-faqcontent.tsx
import React37, { useState as useState6 } from "react";
import { TinaMarkdown as TinaMarkdown4 } from "tinacms/dist/rich-text";
import { tinaField as tinaField17 } from "tinacms/dist/react";

// components/ui/accordion-item.tsx
import React35 from "react";

// components/blocks/landing-faqcontent.tsx
import Image14 from "next/image";

// components/ui/decorative-icon.tsx
import React36 from "react";

// components/blocks/landing-faqcontent.tsx
var defaultQuestion = {
  title: "Here's Another Question",
  text: "This is where you might talk about the question, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var freqaskedquestionsBlockSchema = {
  name: "freqaskedquestions",
  label: "Freqaskedquestions",
  ui: {
    previewSrc: "/blocks/freqaskedquestions.png",
    defaultItem: {
      headline: "Frequently Asked Questions",
      tagline: "We have a lot of questions to cover your needs",
      image: {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fa3a68a541052d3b421c33ebf1fcbc32eae6398?width=1420",
        alt: "FAQ Image"
      },
      items: [defaultQuestion, defaultQuestion, defaultQuestion]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    },
    {
      type: "object",
      label: "Question Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultQuestion
        }
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text"
        }
      ]
    }
  ]
};

// components/blocks/section-imgcontent.tsx
import Link20 from "next/link";
import Image15 from "next/image";
import { tinaField as tinaField18 } from "tinacms/dist/react";
import { ArrowRight as ArrowRight5 } from "lucide-react";
var contentandimageBlockSchema = {
  name: "contentandimage",
  label: "Contentandimage",
  ui: {
    previewSrc: "/blocks/contentandimage.png",
    defaultItem: {
      headline: "Built to cover your needs",
      description: "We have a lot of features to cover your needs",
      icon: {
        color: "",
        style: "float",
        name: ""
      },
      contentandimages: [
        {
          title: "Ni\xF1os",
          description: "Un espacio seguro y divertido donde los m\xE1s peque\xF1os aprenden sobre el amor de Dios a trav\xE9s de historias b\xEDblicas, juegos y actividades que fortalecen su fe desde temprana edad.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "/uploads/groups/kids/kidz-IMG-1173.jpg",
            alt: "Kids group image"
          },
          actions: [
            {
              label: "Get Started",
              type: "button",
              link: "/"
            },
            {
              label: "Placeholder Button",
              type: "link",
              link: "/"
            }
          ]
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      list: true,
      label: "Contentandimages",
      name: "contentandimages",
      ui: {
        defaultItem: {
          title: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          description: "Phil Karlton",
          actions: [
            {
              label: "Get Started",
              type: "button",
              link: "/"
            },
            {
              label: "Placeholder Button",
              type: "link",
              link: "/"
            }
          ]
        },
        itemProps: (item) => {
          return {
            label: `${item.title} - ${item.description}`
          };
        }
      },
      fields: [
        {
          type: "string",
          label: "Section Img Content Title",
          name: "title"
        },
        {
          type: "string",
          ui: {
            component: "textarea"
          },
          label: "Section Img Content Description",
          name: "description"
        },
        {
          type: "string",
          label: "Requirements",
          name: "requirements"
        },
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image"
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string"
            }
          ]
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/section-imgcontent2.tsx
import Image16 from "next/image";
import { tinaField as tinaField19 } from "tinacms/dist/react";
import { ArrowRight as ArrowRight6 } from "lucide-react";
var contentandimagevariantBlockSchema = {
  name: "contentandimagevariant",
  label: "Contentandimagevariant",
  ui: {
    previewSrc: "/blocks/contentandimagevariant.png",
    defaultItem: {
      headline: "Built to cover your needs",
      description: "We have a lot of features to cover your needs",
      icon: {
        color: "",
        style: "float",
        name: ""
      },
      contentandimagevariants: [
        {
          title: "Ni\xF1os",
          description: "Un espacio seguro y divertido donde los m\xE1s peque\xF1os aprenden sobre el amor de Dios a trav\xE9s de historias b\xEDblicas, juegos y actividades que fortalecen su fe desde temprana edad.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "/uploads/groups/kids/kidz-IMG-1173.jpg",
            alt: "Kids group image"
          },
          actions: [
            {
              label: "Get Started",
              type: "button",
              link: "/"
            },
            {
              label: "Placeholder Button",
              type: "link",
              link: "/"
            }
          ]
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      list: true,
      label: "Contentandimagevariants",
      name: "contentandimagevariants",
      ui: {
        defaultItem: {
          title: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          description: "Phil Karlton",
          actions: [
            {
              label: "Get Started",
              type: "button",
              link: "/"
            },
            {
              label: "Placeholder Button",
              type: "link",
              link: "/"
            }
          ]
        },
        itemProps: (item) => {
          return {
            label: `${item.title} - ${item.description}`
          };
        }
      },
      fields: [
        {
          type: "string",
          label: "Section Img Content Title",
          name: "title"
        },
        {
          type: "string",
          ui: {
            component: "textarea"
          },
          label: "Section Img Content Description",
          name: "description"
        },
        iconSchema,
        {
          type: "string",
          label: "Details",
          name: "details"
        },
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image"
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string"
            }
          ]
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/landing-latest-events.tsx
import React38 from "react";
import Link21 from "next/link";
import Image17 from "next/image";
import { format as format2 } from "date-fns";
import { es as es2 } from "date-fns/locale";
import { ArrowRight as ArrowRight7 } from "lucide-react";
import { tinaField as tinaField20 } from "tinacms/dist/react";
var latesteventsBlockSchema = {
  name: "latestevents",
  label: "Latest Events",
  ui: {
    previewSrc: "/blocks/latest-events.png",
    defaultItem: {
      title: "Upcoming Events",
      limit: 3
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "number",
      label: "Number of Events to Show",
      name: "limit"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    }
  ]
};

// components/blocks/landing-latest-messages.tsx
import React39 from "react";
import { tinaField as tinaField21 } from "tinacms/dist/react";
import { ArrowRight as ArrowRight8 } from "lucide-react";
import { format as format3 } from "date-fns";
import { es as es3 } from "date-fns/locale";
import Link22 from "next/link";
var latestmessagesBlockSchema = {
  name: "latestmessages",
  label: "Latest Messages",
  ui: {
    previewSrc: "/blocks/latest-messages.png",
    defaultItem: {
      title: "Upcoming Messages",
      limit: 3
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "number",
      label: "Number of Messages to Show",
      name: "limit"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    }
  ]
};

// components/blocks/section-groups.tsx
import Link23 from "next/link";
import Image18 from "next/image";
import { tinaField as tinaField22 } from "tinacms/dist/react";
import { ArrowRight as ArrowRight9 } from "lucide-react";
var groupBlockSchema = {
  name: "group",
  label: "Groups Section",
  ui: {
    previewSrc: "/blocks/group.png",
    defaultItem: {
      headline: "Una Iglesia, Un Lugar Para Todos",
      description: "We provide a range of resources and guidance to support their physical, cognitive, emotional, and social growth.",
      groups: [
        {
          title: "Ni\xF1os",
          description: "Un espacio seguro y divertido donde los m\xE1s peque\xF1os aprenden sobre el amor de Dios a trav\xE9s de historias b\xEDblicas, juegos y actividades que fortalecen su fe desde temprana edad.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "/uploads/groups/kids/kidz-IMG-1173.jpg",
            alt: "Kids group image"
          }
        },
        {
          title: "J\xF3venes",
          description: "Un lugar donde los j\xF3venes pueden crecer en su identidad en Cristo, conectar con otros de su edad y ser equipados para enfrentar los retos de hoy con una fe firme y aut\xE9ntica.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "/uploads/groups/teens/jovenes-IMG-1159.jpg",
            alt: "Teens group image"
          }
        },
        {
          title: "Mujeres",
          description: "Un espacio de conexi\xF3n entre mujeres donde se comparten experiencias, se ora juntas y se fortalece la fe, mientras aprendemos a vivir con prop\xF3sito cada etapa de la vida.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "/uploads/groups/women/mujeres-IMG-1169.jpg",
            alt: "Women group image"
          }
        },
        {
          title: "Hombres",
          description: "Encuentros donde se busca formar hombres conforme al coraz\xF3n de Dios, comprometidos con su fe, sus familias y su comunidad, mediante ense\xF1anzas, compa\xF1erismo y servicio.",
          icon: {
            name: "BiBookmarks",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "/uploads/groups/men/varones-IMG-1188.jpg",
            alt: "Men group image"
          }
        }
      ]
    }
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      list: true,
      label: "Groups Cards",
      name: "groups",
      ui: {
        defaultItem: {
          title: "Groups Title",
          description: "Groups description goes here...",
          icon: {
            name: "BiHeart",
            color: "primary",
            size: "medium"
          },
          image: {
            src: "",
            alt: ""
          }
        },
        itemProps: (item) => {
          return {
            label: item.title || "Groups Card"
          };
        }
      },
      fields: [
        {
          type: "string",
          label: "Groups Title",
          name: "title"
        },
        {
          type: "string",
          ui: {
            component: "textarea"
          },
          label: "Groups Description",
          name: "description"
        },
        iconSchema,
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image"
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string"
            },
            {
              name: "videoUrl",
              label: "Video URL",
              type: "string",
              description: "If using a YouTube video, make sure to use the embed version of the video URL"
            }
          ]
        },
        {
          label: "Actions",
          name: "actions",
          type: "object",
          list: true,
          ui: {
            defaultItem: {
              label: "Action Label",
              type: "button",
              link: "/"
            },
            itemProps: (item) => ({ label: item.label })
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string"
            },
            {
              label: "Type",
              name: "type",
              type: "string",
              options: [
                { label: "Button", value: "button" },
                { label: "Link", value: "link" }
              ]
            },
            {
              label: "Link",
              name: "link",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

// components/blocks/section-values.tsx
import React40 from "react";
import { tinaField as tinaField23 } from "tinacms/dist/react";
var valuesBlockSchema = {
  name: "values",
  label: "Values",
  ui: {
    previewSrc: "/blocks/values.png",
    defaultItem: {
      headline: "Start Building",
      description: "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/"
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/"
        }
      ]
    }
  },
  fields: [
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/section-listcontent.tsx
import React42 from "react";

// components/ui/stylized-image.tsx
import clsx11 from "clsx";
import Image19 from "next/image";
import { useId as useId2 } from "react";

// components/blocks/section-listcontent.tsx
import { tinaField as tinaField24 } from "tinacms/dist/react";

// components/ui/tag-list.tsx
import clsx12 from "clsx";

// components/ui/list.tsx
import React41 from "react";
import clsx13 from "clsx";

// components/blocks/section-listcontent.tsx
var listcontentBlockSchema = {
  name: "listcontent",
  label: "Listcontent",
  ui: {
    previewSrc: "/blocks/listcontent.png",
    defaultItem: {
      title: "Servicio comunitario",
      description1: "En La Voz de la Esperanza, creemos en mostrar el amor de Cristo a trav\xE9s de acciones concretas.",
      description2: "Nuestro deseo es ser un puente de ayuda en los momentos m\xE1s importantes de la vida."
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description1",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Description",
      name: "description2",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/section-first-steps.tsx
import React46 from "react";
import { tinaField as tinaField25 } from "tinacms/dist/react";

// components/mdx-components.tsx
import { format as format4 } from "date-fns";
import React45 from "react";
import {
  TinaMarkdown as TinaMarkdown5
} from "tinacms/dist/rich-text";
import Image20 from "next/image";
import { Prism } from "tinacms/dist/rich-text/prism";

// components/forms/contact-details.tsx
import Link24 from "next/link";

// components/forms/serve-details.tsx
import Link25 from "next/link";

// components/forms/resources-details.tsx
import Link26 from "next/link";

// components/forms/visitor-details.tsx
import Link27 from "next/link";

// components/forms/contact-form.tsx
import { useForm } from "react-hook-form";

// components/forms/text-input.tsx
import React43, { useId as useId3 } from "react";

// components/layout/wrapper.tsx
import React44 from "react";

// components/forms/contact-form.tsx
import { useState as useState7 } from "react";

// components/forms/resources-form.tsx
import { useForm as useForm2 } from "react-hook-form";
import { useState as useState8 } from "react";

// components/forms/serve-form.tsx
import { useForm as useForm3 } from "react-hook-form";
import { useState as useState9 } from "react";

// components/forms/visitor-form.tsx
import { useForm as useForm4 } from "react-hook-form";
import { useState as useState10 } from "react";

// components/blocks/section-first-steps.tsx
var nextstepsBlockSchema = {
  name: "nextsteps",
  label: "Nextsteps",
  ui: {
    previewSrc: "/blocks/nextsteps.png",
    defaultItem: {
      title: "Start Building",
      description: "Get started with TinaCMS today and take your content management to the next level."
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Title",
      name: "title2"
    },
    {
      type: "string",
      label: "Description",
      name: "description2",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Title",
      name: "title3"
    },
    {
      type: "string",
      label: "Description",
      name: "description3",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Title",
      name: "title4"
    },
    {
      type: "string",
      label: "Description",
      name: "description4",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/section-contact.tsx
import Link28 from "next/link";
import { tinaField as tinaField26 } from "tinacms/dist/react";
var contactsectionBlockSchema = {
  name: "contactsection",
  label: "Contactsection",
  ui: {
    previewSrc: "/blocks/contactsection.png",
    defaultItem: {
      headline: "Start Building",
      description: "Get started with TinaCMS today and take your content management to the next level.",
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/"
        },
        {
          label: "Placeholder Button",
          type: "link",
          link: "/"
        }
      ]
    }
  },
  fields: [
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    }
  ]
};

// tina/collection/page.ts
var Page = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document: document2 }) => {
      const filepath = document2._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    }
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true
      },
      templates: [
        heroBlockSchema,
        ctalinkBlockSchema,
        aboutsectioninfoBlockSchema,
        aboutusBlockSchema,
        calloutBlockSchema,
        connectionBlockSchema,
        featureBlockSchema,
        groupinfoBlockSchema,
        latesteventsBlockSchema,
        latestmessagesBlockSchema,
        contentBlockSchema,
        ctaBlockSchema,
        groupBlockSchema,
        videoBlockSchema,
        herocontentBlockSchema,
        herodonationBlockSchema,
        profileBlockSchema,
        teammemberBlockSchema,
        contentandimagevariantBlockSchema,
        freqaskedquestionsBlockSchema,
        contentandimageBlockSchema,
        visionBlockSchema,
        valuesBlockSchema,
        listcontentBlockSchema,
        leadershipBlockSchema,
        nextstepsBlockSchema,
        contactsectionBlockSchema
      ]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            },
            {
              name: "coordinatorName",
              label: "Coordinator",
              type: "string"
            }
          ]
        },
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"]
            }
          ]
        },
        {
          name: "FTVisitorSignup",
          label: "FTVisitor Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me"
            }
          }
        },
        {
          name: "ResourcesSignup",
          label: "Resources Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me"
            }
          }
        },
        {
          name: "ServeSignup",
          label: "Serve Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me"
            }
          }
        },
        {
          name: "ContactSignup",
          label: "Contact Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "",
              buttonText: "Notify Me"
            }
          }
        },
        videoBlockSchema
      ],
      isBody: true
    }
  ]
};
var page_default = Page;

// tina/collection/tag.ts
var Tag = {
  label: "Tags",
  name: "tag",
  path: "content/tags",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    }
  ]
};
var tag_default = Tag;

// tina/config.ts
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
process.env.HEAD;
var config = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin",
    // within the public folder
    basePath: next_config_default.basePath?.replace(/^\//, "") || ""
    // The base path of the app (could be /blog)
  },
  schema: {
    collections: [page_default, message_default, event_default, coordinator_default, tag_default, global_default]
  }
});
var config_default = config;
export {
  config_default as default
};
