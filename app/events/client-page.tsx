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
import imageWhiteboard from "@/images/whiteboard.jpg";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

//done 35a: create events page tina collection 
//to-do 35b: add data.address + data.actions [add link to a form] to events page.
//to-do 35c: replace content/mdx files with relevant events
//to-do 35d: edit ui of the individual event page
//to-do 35e: edit ui of all events page

interface ClientEventProps {
  data: EventConnectionQuery;
  variables: EventConnectionQueryVariables;
  query: string;
}

export default function EventsClientPage(props: ClientEventProps) {
  const events = props.data?.eventConnection.edges!.map((eventData) => {
    const event = eventData!.node!;
    const posteddate = new Date(event.posteddate!);
    let formattedpostedDate = '';
    if (!isNaN(posteddate.getTime())) {
      formattedpostedDate = format(posteddate, 'MMM dd, yyyy');
    }

     const date = new Date(event.date!);
    let formattedDate = '';
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, 'MMM dd, yyyy');
    }
    return {
      id: event.id,
      published: formattedDate,
      title: event.title,
      tags: event.tags?.map((tag) => tag?.tag?.name) || [],
      url: `/events/${event._sys.breadcrumbs.join('/')}`,
      description: event.description,
      location: event.location,
      heroImg: event.heroImg,
      author: {
        name: event.author?.name || 'Anonymous',
        avatar: event.author?.avatar,
      }
    }
  });

  return (
    <ErrorBoundary>
      <PageIntro eyebrow="Eventos" title="Eventos Recientes">
        <p>Eventos.</p>
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
                      <TinaMarkdown content={event.location} />
                    </div>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      <TinaMarkdown content={event.description} />
                    </div>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <Avatar>
                        {event.author.avatar && (
                          <AvatarImage
                            src={event.author.avatar}
                            alt={event.author.name}
                            className="h-8 w-8"
                          />
                        )}
                        <AvatarFallback>
                          <UserRound size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{event.author.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {event.published}
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
