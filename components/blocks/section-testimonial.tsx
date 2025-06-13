import Link from "next/link";
import { TinaIcon } from "../icon";
import type { Template } from "tinacms";
import {
  PageBlocksTestimonial,
  PageBlocksTestimonialTestimonials,
} from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Button } from "@/components/ui/button";
import { iconSchema } from '@/tina/fields/icon';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from "../layout/section";
//to-do 20: add text to testimonial in homepage

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section background={data.background!}>
      <div className="text-center">
        <h2
          className="text-balance text-4xl font-semibold lg:text-5xl"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
        <p className="mt-4" data-tina-field={tinaField(data, "description")}>
          {data.description}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {data.actions &&
            data.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <Button
                  asChild
                  size="lg"
                  variant={action!.type === "link" ? "outline" : "default"}
                  className="rounded-xl px-5 text-base"
                >
                  <Link href={action!.link!}>
                    {action?.icon && <TinaIcon data={action?.icon} />}
                    <span className="text-nowrap">{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.testimonials?.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial!} />
        ))}
      </div>
    </Section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: PageBlocksTestimonialTestimonials }) => {
  return (
    <Card className="mb-6 break-inside-avoid">
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <Avatar
          className="size-9"
          data-tina-field={tinaField(testimonial, "avatar")}
        >
          {testimonial.avatar && (
            <AvatarImage
              alt={testimonial.coordinator!}
              src={testimonial.avatar}
              loading="lazy"
              width="120"
              height="120"
            />
          )}
          <AvatarFallback>
            {testimonial
              .coordinator!.split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3
            className="font-medium"
            data-tina-field={tinaField(testimonial, "coordinator")}
          >
            {testimonial.coordinator}
          </h3>

          <span
            className="text-muted-foreground block text-sm tracking-wide"
            data-tina-field={tinaField(testimonial, "role")}
          >
            {testimonial.role}
          </span>

          <blockquote
            className="mt-3"
            data-tina-field={tinaField(testimonial, "quote")}
          >
            <p className="text-gray-700 dark:text-gray-300">{testimonial.quote}</p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export const testimonialBlockSchema: Template = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      testimonials: [
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
      label: "Testimonials",
      name: "testimonials",
      ui: {
        defaultItem: {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
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
        },
      ],
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
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
