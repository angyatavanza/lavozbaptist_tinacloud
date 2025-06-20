import { format } from "date-fns";
import React from "react";
import { FormEvent, useState } from "react";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import Image from "next/image";
import { Prism } from "tinacms/dist/rich-text/prism";
import { PageIntro } from "./page-intro";
import { Container } from "./container";
import { ContactDetails } from "./forms/contact-details";
import { ServeDetails } from "./forms/serve-details"; 
import { ResourcesDetails } from "./forms/resources-details"; 
import { FTVisitorDetails } from "./forms/visitor-details"; 
import { ContactForm } from "./forms/contact-form";
import { ResourcesForm } from "./forms/resources-form";
import { ServeForm } from "./forms/serve-form";
import { FTVisitorForm } from "./forms/visitor-form";
import { Video } from "./blocks/section-video";
import { PageBlocksVideo } from "@/tina/__generated__/types";
import { mermaid } from "./blocks/mermaid";

export const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    coordinatorName: string;
  };
  DateTime: {
    format?: string;
  };
  ContactSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  FTVisitorSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  ResourcesSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  ServeSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  video: PageBlocksVideo;
}> = {
  code_block: (props) => {
    if (!props) {
      return <></>;
    }
    return <Prism lang={props.lang} value={props.value} />;
  },
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    coordinatorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.coordinatorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{format(dt, "yyyy-MM-dd")}</span>;
      case "utc":
        return <span>{format(dt, "eee, dd MMM yyyy HH:mm:ss OOOO")}</span>;
      case "local":
        return <span>{format(dt, "P")}</span>;
      default:
        return <span>{format(dt, "P")}</span>;
    }
  },
  FTVisitorSignup: (props) => {
   
    return (
      <>
        <PageIntro eyebrow="Contact us" title="Let’s work together">
          <TinaMarkdown content={props.children} />
        </PageIntro>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <FTVisitorDetails />
            <FTVisitorForm
            placeholder={props.placeholder} 
            buttonText={props.buttonText} 
            />
          </div>
          <div className="mt-3 text-sm text-gray-500">
            {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
          </div>
        </Container>
      </>
    );
  },
  ResourcesSignup: (props) => {

    return (
       <>
        <PageIntro eyebrow="Contact us" title="Let’s work together">
          <TinaMarkdown content={props.children} />
        </PageIntro>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <ResourcesDetails />
            <ResourcesForm 
            placeholder={props.placeholder} 
            buttonText={props.buttonText} 
            />
          </div>
          <div className="mt-3 text-sm text-gray-500">
            {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
          </div>
        </Container>
      </>
    );
  },
  ContactSignup: (props) => {

    return (
      <>
        <PageIntro eyebrow="Contact us" title="Let’s work together">
          <TinaMarkdown content={props.children} />
        </PageIntro>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <ContactDetails />
            <ContactForm 
            placeholder={props.placeholder} 
            buttonText={props.buttonText} 
            />
          </div>
          <div className="mt-3 text-sm text-gray-500">
            {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
          </div>
        </Container>
      </>
    );
  },
  ServeSignup: (props) => {

    return (
      <>
        <PageIntro eyebrow="Contact us" title="Let’s work together">
          <TinaMarkdown content={props.children} />
        </PageIntro>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <ServeDetails />
            <ServeForm 
            placeholder={props.placeholder} 
            buttonText={props.buttonText} 
            />
          </div>
          <div className="mt-3 text-sm text-gray-500">
            {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
          </div>
        </Container>
      </>
    );
  },
  img: (props) => {
    if (!props) {
      return <></>;
    }
    return (
      <span className="flex items-center justify-center">
        <Image src={props.url} alt={props.alt || ""} width={500} height={500} />
      </span>
    );
  },
  mermaid,
  video: (props) => {
    return <Video data={props} />;
  },
};
