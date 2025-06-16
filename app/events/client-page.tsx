'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { EventConnectionQuery, EventConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { ArrowRight, UserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/layout/section';
import { tinaField } from 'tinacms/dist/react';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { PageIntro } from '@/components/page-intro';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

//done 35a: create events page tina collection 
//done 35b: add more sections to events template such as date, time, details,
//to-do 46: add data.address + data.actions [add link to a form] to events page.
//to-do 47: edit ui of the individual event page
//to-do 48: edit ui of all events page
//to-do 64: replace content/mdx files with relevant events

interface ClientEventProps {
  data: EventConnectionQuery;
  variables: EventConnectionQueryVariables;
  query: string;
}

export default function EventsClientPage(props: ClientEventProps) {
  const events = props.data?.eventConnection.edges!.map((eventData) => {
    const event = eventData!.node!;
    
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

    return {
      id: event.id,
      published: formattedDate,
      endpublished: formattedendDate,
      publishedtime: formattedTime,
      endpublishedtime: formattedendTime,
      title: event.title,
      tags: event.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/events/${event._sys.breadcrumbs.join('/')}`,
      description: event.description,
      locationdetails: event.locationdetails?.map((locationdetail) => locationdetail?.location) || [],
      heroImg: event.heroImg,
      coordinator: {
        name: event.coordinator?.name || 'Anonymous',
        avatar: event.coordinator?.avatar,
      }
    }
  });

  return (
    <ErrorBoundary>
      <PageIntro eyebrow="Eventos" title="Eventos Recientes">
        <p>Eventos</p>
      </PageIntro>
      <Section>
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="mx-auto mb-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl">
              Eventos
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              Manténgase al tanto de lo que está sucediendo en la Iglesia La Voz
            </p>
          </div>

          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {events.map((event) => (
              <Card
                key={event.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {event.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <Link
                        href={event.url}
                        className="hover:underline"
                      >
                        {event.title}
                      </Link>
                    </h3>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      <TinaMarkdown content={event.description} />
                    </div>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <Avatar>
                        {event.coordinator.avatar && (
                          <AvatarImage
                            src={event.coordinator.avatar}
                            alt={event.coordinator.name}
                            className="h-8 w-8"
                          />
                        )}
                        <AvatarFallback>
                          <UserRound size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{event.coordinator.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {event.published} 
                      </span>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-muted-foreground">
                        {event.endpublished}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {event.publishedtime} 
                      </span>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-muted-foreground">
                        {event.endpublishedtime}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link
                        href={event.url}
                        className="inline-flex items-center font-semibold hover:underline md:text-base"
                      >
                        <span>Ver Evento</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  {event.heroImg && (
                    <div className="order-first sm:order-last sm:col-span-5">
                      <Link href={event.url} className="block">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                          <Image
                            width={533}
                            height={300}
                            src={event.heroImg}                            
                            alt={event.title}
                            className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
