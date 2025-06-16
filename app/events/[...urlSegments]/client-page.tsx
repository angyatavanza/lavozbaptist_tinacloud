'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { TinaIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { EventQuery } from '@/tina/__generated__/types';
import { useLayout } from '@/components/layout/layout-context';
import { Section } from '@/components/layout/section';
import { components } from '@/components/mdx-components';
import ErrorBoundary from '@/components/error-boundary';

/* const CustomGForm = dynamic(() => import('@customgform-lib/react-customgform'), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
});
<CustomGForm
  formId="cmbuzv5i800j4wnh93h0r2zns" 
  mode='popup'
  label="Show form"
  inlineStyles='border: none;appearance: none;cursor: pointer;padding: 8px 12px;display: inline-block;background: #3f6bff;font-size: 16px;color: #fff;border-radius: 6px;font-weight: 500;'
/>
*/

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

interface ClientEventProps {
  data: EventQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function EventClientPage(props: ClientEventProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const event = data.event;

  const date = new Date(event.date!);
  let formattedDate = '';
  let formattedTime = '';
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, 'MMM dd, yyyy');
    formattedTime = format(date, 'h:mm a');
  }
  
  const enddate = new Date(event.enddate!);
  let formattedendDate = '';
  let formattedendTime = '';
  if (!isNaN(enddate.getTime())) {
    formattedendDate = format(enddate, 'MMM dd, yyyy');
    formattedendTime = format(enddate, 'h:mm a');
  }

  return (
    <ErrorBoundary>
      <Section >
        <h2 data-tina-field={tinaField(event, 'title')} className={`w-full relative\tmb-8 text-6xl font-extrabold tracking-normal text-center title-font`}>
          <span className={`bg-clip-text text-transparent bg-linear-to-r ${titleColorClasses[theme!.color!]}`}>{event.title}</span>
        </h2>
        <div data-tina-field={tinaField(event, 'coordinator')} className='flex items-center justify-center mb-16'>
          {event.coordinator && (
            <>
              {event.coordinator.avatar && (
                <div className='shrink-0 mr-4'>
                  <Image
                    data-tina-field={tinaField(event.coordinator, 'avatar')}
                    priority={true}
                    className='h-14 w-14 object-cover rounded-full shadow-xs'
                    src={event.coordinator.avatar}
                    alt={event.coordinator.name}
                    width={500}
                    height={500}
                  />
                </div>
              )}
              <p
                data-tina-field={tinaField(event.coordinator, 'name')}
                className='text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white'
              >
                {event.coordinator.name}
              </p>
              <span className='font-bold text-gray-200 dark:text-gray-500 mx-2'>—</span>
            </>
          )}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {event.locationdetails &&
              event.locationdetails.map((locationdetail) => (
                <div
                  key={locationdetail!.label}
                  data-tina-field={tinaField(locationdetail)}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                >
                  <span className="text-wrap">{locationdetail!.location}</span>
                  <Button
                    asChild
                    size="lg"
                    variant={locationdetail!.type === "link" ? "outline" : "default"}
                    className="rounded-xl px-5 text-base"
                  >
                    <Link href={locationdetail!.link!}>
                      {locationdetail?.icon && <TinaIcon data={locationdetail?.icon} />}
                      <span className="text-wrap">{locationdetail!.label}</span>
                    </Link>
                  </Button>
                </div>
              ))}
          </div>
          <div className="mt-4 text-muted-foreground md:mt-5">
            <p
            data-tina-field={tinaField(event, 'date')}
            className='text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150'
            >
            {formattedDate}
            </p>
            <p
            data-tina-field={tinaField(event, 'date')}
            className='text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150'
            >
            {formattedendDate}
            </p>
          </div>
        </div>
        {event.heroImg && (
          <div className='px-4 w-full'>
            <div data-tina-field={tinaField(event, 'heroImg')} className='relative max-w-4xl lg:max-w-5xl mx-auto'>
              <Image
                priority={true}
                src={event.heroImg}
                alt={event.title}
                className='absolute block mx-auto rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light'
                aria-hidden='true'
                width={500}
                height={500}
                style={{ maxHeight: '25vh' }}
              />
              <Image
                priority={true}
                src={event.heroImg}
                alt={event.title}
                width={500}
                height={500}
                className='relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto opacity-100'
                style={{ maxWidth: '25vh' }}
              />
            </div>
          </div>
        )}
          <div className="mt-4 text-muted-foreground md:mt-5">
            <TinaMarkdown content={event.description} />
          </div>
        <div data-tina-field={tinaField(event, '_body')} className='prose dark:prose-dark w-full max-w-none'>
          <TinaMarkdown
            content={event._body}
            components={{
              ...components,
            }}
          />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {event.actions &&
            event.actions.map((action) => (
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
      </Section>
    </ErrorBoundary>
  );
}
