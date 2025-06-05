import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./landing-hero";
import { Aboutsection } from "./section-about";
import { AboutUs } from "./landing-about-us";
import { Content } from "./section-content";
import { Connections } from "./landing-connect";
import { Features } from "./section-features";
import { Groups } from "./landing-groups";
import { Sermon } from "./landing-latest-sermons";
import { Video } from "./section-video";
import { Callout } from "./section-callout";
import { Herocontent } from "./section-herocontent";
import { Banner } from "./section-banner";
import { FreqAskedQuestions } from "./section-faqcontent";
import { ContentAndImage } from "./section-imgcontent";
import { ContentAndImageVariant } from "./section-imgcontent2";
import { Profile } from "./section-profile";
import { TeamMember } from "./section-our-team";
import { Stats } from "./landing-stats";
import { LatestEvents } from "./landing-latest-events";
import { CallToAction } from "./section-call-to-action";
import { Vision } from "./section-vision";
import { Step1 } from "./section-step1";
import { Step2 } from "./section-step2";
import { Step3 } from "./section-step3";
import { Step4 } from "./section-step4";
import { Mission } from "./section-mission";
import { Partner } from "./section-partners";
import { Listcontent } from "./section-listcontent";
import { ContactSection } from "./section-contact";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">& { events?: Event[] }) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks
      .filter((block): block is PageBlocks => block !== null)
      .map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} events={props.events} />
          </div>
        );
      })}
    </>
  );
};

const Block = ({block, events,}: {block: PageBlocks; events?: any[];}) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksBanner":
      return <Banner data={block} />;
    case "PageBlocksProfile":
      return <Profile data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksHerocontent":
      return <Herocontent data={block} />;    
    case "PageBlocksAboutsection":
      return <Aboutsection data={block} />;
    case "PageBlocksTeammember":
      return <TeamMember data={block} />;  
    case "PageBlocksAboutus":
      return <AboutUs data={block} />;    
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksLatestevents":
        return <LatestEvents data={block} events={events ?? []} />;
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
    case "PageBlocksGroups":
      return <Groups data={block} />;  
    case "PageBlocksSermon":
      return <Sermon data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksVision":
      return <Vision data={block} />;
    case "PageBlocksPartner":
      return <Partner data={block} />;
    case "PageBlocksListcontent":
      return <Listcontent data={block} />;
    case "PageBlocksStep1":
      return <Step1 data={block} />;
    case "PageBlocksStep2":
      return <Step2 data={block} />;
    case "PageBlocksStep3":
      return <Step3 data={block} />;
    case "PageBlocksStep4":
      return <Step4 data={block} />;
    case "PageBlocksMission":
      return <Mission data={block} />;
    case "PageBlocksContactsection":
      return <ContactSection data={block} />; 
    default:
      return null;
  }
};
