import type { Template } from "tinacms";
import { PageBlocksProfile, PageBlocksProfileProfiles } from "@/tina/__generated__/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";
import { Section, sectionBlockSchemaField } from '@/components/layout/section';

export const Profile = ({ data }: { data: PageBlocksProfile }) => {
  return (
    <Section  background={data.background!}>
      <div className="text-center">
        <h2 className="text-title text-3xl font-nunito font-medium" data-tina-field={tinaField(data, 'title')}>{data.title}</h2>
        <p className="text-body mt-6" data-tina-field={tinaField(data, 'description')}>{data.description}</p>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.profiles?.map((profile, index) => (
          <ProfileCard key={index} profile={profile!} />
        ))}
      </div>
    </Section>
  );
};

const ProfileCard = ({ profile }: { profile: PageBlocksProfileProfiles }) => {
  return (
    <Card className="mb-6 break-inside-avoid">
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <Avatar className="size-9" data-tina-field={tinaField(profile, 'avatar')}>
          {profile.avatar && (
            <AvatarImage alt={profile.coordinator!} src={profile.avatar} loading="lazy" width="120" height="120" />
          )}
          <AvatarFallback>{profile.coordinator!.split(" ").map((word) => word[0]).join("")}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-nunito font-medium" data-tina-field={tinaField(profile, 'coordinator')}>{profile.coordinator}</h3>

          <span className="text-muted-foreground block text-sm tracking-wide" data-tina-field={tinaField(profile, 'role')}>{profile.role}</span>

          <blockquote className="mt-3" data-tina-field={tinaField(profile, 'quote')}>
            <p className="text-gray-700 dark:text-gray-300">{profile.quote}</p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export const profileBlockSchema: Template = {
  name: "profile",
  label: "Profile",
  ui: {
    previewSrc: "/blocks/profile.png",
    defaultItem: {
      profiles: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton",
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      list: true,
      label: "Profiles",
      name: "profiles",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          coordinator: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.coordinator}`,
          };
        },
      },
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Coordinator",
          name: "coordinator",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        }
      ],
    },
  ],
};
