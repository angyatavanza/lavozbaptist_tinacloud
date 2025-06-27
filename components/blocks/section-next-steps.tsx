import Image from "next/image";
import React from "react";
import { StepsSection } from "../steps-section";
import { TagList, TagListItem } from "../tag-list";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksNextsteps } from "@/tina/__generated__/types";
import { Blockquote } from "../blockquote";
import { List, ListItem } from "../list";

//to-do 40: complete steps page DESIGN/FRONTEND
//to-do 63: complete steps page TINA CMS/CONTENT
//done 39: combine steps 1-4 into nextsteps and add data.title + data.description code + fix stylized image in steps page

export const NextSteps = ({ data }: { data: PageBlocksNextsteps }) => {
  return (
    <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
      <StepsSection
        title={data.title ?? "Descubre"}
        image={{ src: "/whiteboard.jpg", shape: 1 }}
        data-tina-field={tinaField(data, "title")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description")}>
            {data.description}
            Ayudará a entender el funcionamiento básico de LA VOZ. Está diseñada
            para descubrir la misión de la iglesia, los valores fundamentales, y
            estrategia; ambas cosas ayudan a comprometerse en la expansión del
            reino en esta comunidad de fe. We work closely with our staff to
            understand their{" "}
            <strong className="font-semibold text-neutral-950">
              needs
            </strong>{" "}
            and goals, embedding ourselves in their every day operations to
            understand what makes their business tick.
          </p>
          <p>
            Our team of private investigators shadow the company director’s for
            several weeks while our account managers focus on going through
            their trash. Our senior security experts then perform social
            engineering hacks to gain access to their{" "}
            <strong className="font-semibold text-neutral-950">business</strong>
            accounts — handing that information over to our forensic accounting
            team.
          </p>
          <p>
            Once the full audit is complete, we report back with a comprehensive{" "}
            <strong className="font-semibold text-neutral-950">plan</strong>{" "}
            and, more importantly, a budget.
          </p>
        </div>
        <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
          Included in this phase
        </h3>
        <TagList className="mt-4">
          <TagListItem>In-depth questionnaires</TagListItem>
          <TagListItem>Feasibility studies</TagListItem>
          <TagListItem>Blood samples</TagListItem>
          <TagListItem>Employee surveys</TagListItem>
          <TagListItem>Proofs-of-concept</TagListItem>
          <TagListItem>Forensic audit</TagListItem>
        </TagList>
      </StepsSection>
      <StepsSection
        title={data.title2 ?? "Desarolla tu fe"}
        image={{ src: "/laptop.jpg", shape: 2 }}
        data-tina-field={tinaField(data, "title2")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description2")}>
            {data.description2}
            Based off of the discovery phase, we develop a comprehensive roadmap
            for each product and start working towards delivery. The roadmap is
            an intricately tangled mess of technical nonsense designed to drag
            the project out as long as possible.
          </p>
          <p>
            Each client is assigned a key account manager to keep lines of
            communication open and obscure the actual progress of the project.
            They act as a buffer between the client’s incessant nagging and the
            development team who are hard at work scouring open source projects
            for code to re-purpose.
          </p>
          <p>
            Our account managers are trained to only reply to client emails
            after 9pm, several days after the initial email. This reinforces the
            general aura that we are very busy and dissuades staff from asking
            for changes.
          </p>
        </div>
        <Blockquote
          coordinator={{ name: "Debra Fiscal", role: "CEO of Unseal" }}
          className="mt-12"
        >
          Studio_clone were so regular with their progress updates we almost
          began to think they were automated!
        </Blockquote>
      </StepsSection>
      <StepsSection
        title={data.title3 ?? "Define tu proposito"}
        image={{ src: "/whiteboard.jpg", shape: 1 }}
        data-tina-field={tinaField(data, "title3")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description3")}>
            {data.description3}
            About halfway through the Build phase, we push each project out by 6
            weeks due to a change in{" "}
            <strong className="font-semibold text-neutral-950">
              requirements
            </strong>
            . This allows us to increase the budget a final time before launch.
          </p>
          <p>
            Despite largely using pre-built components, most of the{" "}
            <strong className="font-semibold text-neutral-950">progress</strong>{" "}
            on each project takes place in the final 24 hours. The development
            time allocated to each client is actually spent making augmented
            reality demos that go viral on Twitter.
          </p>
          <p>
            We ensure that the main pages of the site are{" "}
            <strong className="font-semibold text-neutral-950">
              fully functional
            </strong>{" "}
            at launch — the auxiliary pages will, of course, be lorem ipusm
            shells which get updated as part of our exorbitant{" "}
            <strong className="font-semibold text-neutral-950">
              maintenance
            </strong>{" "}
            retainer.
          </p>
        </div>
        <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
          Included in this phase
        </h3>
        <List>
          <ListItem title="Testing">
            Our projects always have 100% test coverage, which would be
            impressive if our tests weren’t as porous as a sieve.
          </ListItem>
          <ListItem title="Infrastructure">
            To ensure reliability we only use the best Digital Ocean droplets
            that $4 a month can buy.
          </ListItem>
          <ListItem title="Support">
            Because we hold the API keys for every critical service your
            business uses, you can expect a lifetime of support, and invoices,
            from us.
          </ListItem>
        </List>
      </StepsSection>
      <StepsSection
        title={data.title4 ?? "Transforme su Vida"}
        image={{ src: "/whiteboard.jpg", shape: 2 }}
        data-tina-field={tinaField(data, "title4")}
      >
        <div className="space-y-6 text-base text-neutral-600">
          <p data-tina-field={tinaField(data, "description4")}>
            {data.description4}
            Ayudará a desarrollar un estilo de vida que glorifique a Dios
            compartiendo su{" "}
            <strong className="font-semibold text-neutral-950">amor</strong>.
            También podrás descubrir el propósito de tu vida e integrarte al
            equipo de trabajo para llevar acabo tu misión de vida.
          </p>
          {/* Longer description
                <p>
                  Despite largely using pre-built components, most of the{" "}
                  <strong className="font-semibold text-neutral-950">progress</strong>{" "}
                  on each project takes place in the final 24 hours. The development
                  time allocated to each client is actually spent making augmented
                  reality demos that go viral on Twitter.
                </p>
                <p>
                  We ensure that the main pages of the site are{" "}
                  <strong className="font-semibold text-neutral-950">
                    fully functional
                  </strong>{" "}
                  at launch — the auxiliary pages will, of course, be lorem ipusm shells
                  which get updated as part of our exorbitant{" "}
                  <strong className="font-semibold text-neutral-950">
                    maintenance
                  </strong>{" "}
                  retainer.
                </p>
                */}
        </div>
        <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
          Included in this phase
        </h3>
        <List>
          <ListItem title="Testing">
            Our projects always have 100% test coverage, which would be
            impressive if our tests weren’t as porous as a sieve.
          </ListItem>
          <ListItem title="Infrastructure">
            To ensure reliability we only use the best Digital Ocean droplets
            that $4 a month can buy.
          </ListItem>
          <ListItem title="Support">
            Because we hold the API keys for every critical service your
            business uses, you can expect a lifetime of support, and invoices,
            from us.
          </ListItem>
        </List>
      </StepsSection>
    </div>
  );
};

export const nextstepsBlockSchema: Template = {
  name: "nextsteps",
  label: "Nextsteps",
  ui: {
    previewSrc: "/blocks/nextsteps.png",
    defaultItem: {
      title: "Start Building",
      description:
        "Get started with TinaCMS today and take your content management to the next level.",
    },
  },
  fields: [
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
      type: "string",
      label: "Title",
      name: "title2",
    },
    {
      type: "string",
      label: "Description",
      name: "description2",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Title",
      name: "title3",
    },
    {
      type: "string",
      label: "Description",
      name: "description3",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Title",
      name: "title4",
    },
    {
      type: "string",
      label: "Description",
      name: "description4",
      ui: {
        component: "textarea",
      },
    },
  ],
};
