'use client';
import * as React from "react";
import dynamic from "next/dynamic";
import Image from 'next/image';
import { format } from 'date-fns';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { MessageQuery } from '@/tina/__generated__/types';
import { useLayout } from '@/components/layout/layout-context';
import MessagesVideoDialog from "@/components/ui/messages-video-dialog";
import { Section } from '@/components/layout/section';
import { components } from '@/components/mdx-components';

import ErrorBoundary from '@/components/error-boundary';

const titleColorClasses = {
  blue: 'from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500',
  teal: 'from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500',
  green: 'from-green-400 to-green-600',
  red: 'from-red-400 to-red-600',
  pink: 'from-pink-300 to-pink-500',
  purple: 'from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500',
  orange: 'from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500',
  yellow: 'from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500',
};

interface ClientMessageProps {
  data: MessageQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function MessageClientPage(props: ClientMessageProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const message = data.message;

  const date = new Date(message.date!);
  let formattedDate = '';
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, 'MMM dd, yyyy');
  }

  const thumbnailSrc = "/fallback.jpg";
  
  return (
    <ErrorBoundary>
      <Section >
        <h2 data-tina-field={tinaField(message, 'title')} className={`w-full relative\tmb-8 text-6xl font-nunito font-medium tracking-normal text-center title-font`}>
          <span className={`bg-clip-text text-transparent bg-linear-to-r ${titleColorClasses[theme!.color!]}`}>{message.title}</span>
        </h2>
        <div data-tina-field={tinaField(message, 'coordinator')} className='flex items-center justify-center mb-16'>
          {message.coordinator && (
            <>
              {message.coordinator.avatar && (
                <div className='shrink-0 mr-4'>
                  <Image
                    data-tina-field={tinaField(message.coordinator, 'avatar')}
                    priority={true}
                    className='h-14 w-14 object-cover rounded-full shadow-xs'
                    src={message.coordinator.avatar}
                    alt={message.coordinator.name}
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <p
                data-tina-field={tinaField(message.coordinator, 'name')}
                className='text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white'
              >
                {message.coordinator.name}
              </p>
              <span className='font-bold text-gray-200 dark:text-gray-500 mx-2'>—</span>
            </>
          )}
          <p
            data-tina-field={tinaField(message, 'date')}
            className='text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150'
          >
            {formattedDate}
          </p>
        </div>
        {message.image?.embeddable && message.image?.videoUrl ? (
          <div className="order-first sm:order-last sm:col-span-5">
              <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                <div
                  className="fb-video"
                  data-href={message.image.videoUrl}
                  data-allowfullscreen="true"
                  data-width="500"
                ></div>
              </div>
          </div>
        ) : (
          <div className="order-first sm:order-last sm:col-span-5">
            <div className="aspect-[16/9] overflow-clip rounded-lg border border-border relative">
              <MessagesVideoDialog
                videoSrc={message.image?.videoUrl || ""}
                thumbnailSrc={thumbnailSrc}
                thumbnailAlt="Messages Video"
              />
            </div>
          </div>
        )}
        <div data-tina-field={tinaField(message, '_body')} className='prose dark:prose-dark w-full max-w-none'>
          <TinaMarkdown
            content={message._body}
            components={{
              ...components,
            }}
          />
        </div>
      </Section>
    </ErrorBoundary>
  );
}
