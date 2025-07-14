import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks, Message, Event } from "@/tina/__generated__/types";
import { Callout } from "./landing-callout";
import { Hero } from "./landing-hero";
import { AboutUs } from "./landing-about-us";
import { Groupsinfo } from "./landing-groups";
import { Connections } from "./landing-connect";
import { LatestEvents } from "./landing-latest-events";
import { LatestMessages } from "./landing-latest-messages";
import { CallToAction } from "./section-call-to-action";
import { CallToActionLinks } from "./section-cta-links";
import { FreqAskedQuestions } from "./section-faqcontent";
import { Herocontent } from "./section-herocontent";
import { Herodonation } from "./section-herodonation";
import { Profile } from "./del-profile";
import { TeamMember } from "./section-our-team";
import { Vision } from "./section-vision";
import { NextSteps } from "./section-first-steps";
import { Mission } from "./section-mission";
import { Aboutsection } from "./section-about";
import { Group } from "./section-groups";
import { Partner } from "./del-partners";
import { ContentAndImage } from "./section-imgcontent";
import { ContentAndImageVariant } from "./section-imgcontent2";
import { Features } from "./section-features";
import { Listcontent } from "./section-listcontent";
import { ContactSection } from "./section-contact";
import { Content } from "./section-content";
import { Video } from "./section-video";

export const Blocks = (
  props: Omit<Page, "id" | "_sys" | "_values"> & {
    events?: Event[];
    messages?: Message[];
  }
) => {
  //This only checks if props.blocks is undefined or null (i.e., the whole array is missing), not if the array contains null elements.
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks
      //Filters out any null values from the props.blocks array before mapping over it.
      //You should keep the .filter((block): block is PageBlocks => block !== null) line
      //unless you are 100% certain that props.blocks will never contain null or undefined values.
      .filter((block): block is PageBlocks => block !== null)
      .map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} events={props.events} messages={props.messages} />
          </div>
        );
      })}
    </>
  );
};

const Block = ({
  block,
  events,
  messages,
}: {
  block: PageBlocks;
  events?: Event[];
  messages?: Message[];
}) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksCtalinks":
      return <CallToActionLinks data={block} />;
    case "PageBlocksProfile":
      return <Profile data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksHerocontent":
      return <Herocontent data={block} />;
    case "PageBlocksHerodonation":
      return <Herodonation data={block} />;      
    case "PageBlocksAboutsection":
      return <Aboutsection data={block} />;
    case "PageBlocksTeammember":
      return <TeamMember data={block} />; 
    case "PageBlocksGroup":
      return <Group data={block} />;   
    case "PageBlocksAboutus":
      return <AboutUs data={block} />;    
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksLatestevents":
        return <LatestEvents data={block} events={events ?? []} />;
    case "PageBlocksLatestmessages":
        return <LatestMessages data={block} messages={messages ?? []} />; 
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksContentandimagevariant":
      return <ContentAndImageVariant data={block} />;
    case "PageBlocksContentandimage":
      return <ContentAndImage data={block} />;  
    case "PageBlocksFreqaskedquestions":
      return <FreqAskedQuestions data={block} />;  
    case "PageBlocksConnections":
      return <Connections data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksGroupsinfo":
      return <Groupsinfo data={block} />;  
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksVision":
      return <Vision data={block} />;
    case "PageBlocksPartner":
      return <Partner data={block} />;
    case "PageBlocksListcontent":
      return <Listcontent data={block} />;
    case "PageBlocksNextsteps":
      return <NextSteps data={block} />;
    case "PageBlocksMission":
      return <Mission data={block} />;
    case "PageBlocksContactsection":
      return <ContactSection data={block} />; 
    default:
      return null;
  }
};
