"use client";
import { Blocks } from "@/components/blocks";
import { Section } from "@/components/layout/section";
import { PageQuery } from "@/tina/__generated__/types";
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import ErrorBoundary from "@/components/error-boundary";
import { components } from '@/components/mdx-components';

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
