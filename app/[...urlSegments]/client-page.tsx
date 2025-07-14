"use client";
import { Blocks } from "@/components/blocks";
import { Section } from "@/components/layout/section";
import { PageQuery } from "@/tina/__generated__/types";
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import ErrorBoundary from "@/components/error-boundary";
import { components } from '@/components/mdx-components';
//done 1: fix url link to /service-times
//done 7: add text to aboutus in homepage
//done 8: decide if short aboutus or short mission should be on the homepage
//done 36: add needed blocks to serve page
//to-do 38: add needed blocks + content to groups page TINA CMS/CONTENT
//done 45: create privacy page and add content blocks to privacy page TINA CMS/CONTENT 
//done 60: add text to connections in homepage TINA CMS/CONTENT
//done 61: change button and text in section-contact TINA CMS/CONTENT
//to-do 63: add text and images to first steps page TINA CMS CONTENT
//to-do 68: replace images for all block templates TINA CMS/CONTENT
//to-do 70:change background colors to all sections TINA CMS/CONTENT
//to-do 71: take screenshots of all of the blocks and upload to the blocks folder TINA CMS/CONTENT
//to-do 72: change the default text in each block component TINA CMS/CONTENT
//to-do 73: replace text + images in content/contact+ftvisitor and contactdetails TINA CMS CONTENT
//done 75: add: ¡Estamos listos para recibirte and [Planifica tu visita] ← (Botón que puede llevar a un formulario simple de nombre, email y fecha tentativa)TINA CMS CONTENT
//to-do 99: add the partners+testimonial block component to a page ? TINA CMS/CONTENT
export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  events?: any[];
  messages?: any[];
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  return (
    <ErrorBoundary>
      <Blocks {...data?.page} events={props.events}  messages={props.messages} />
      <Section >
        <div data-tina-field={tinaField(data.page, '_body')} className='prose dark:prose-dark w-full max-w-none'>
          <TinaMarkdown
            content={data.page._body}
            components={{
              ...components,
          }}
        />
        </div>
      </Section>    
    </ErrorBoundary>
  );
}
