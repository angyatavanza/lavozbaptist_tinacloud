import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { About } from "./about";
import { Mission } from "./mission";
import { Content } from "./content";
import { Features } from "./features";
import { Groups } from "./groups";
import { Sermon } from "./sermon";
import { Video } from "./video";
import { Callout } from "./callout";
import { Herocontent } from "./hero-content";
import { Banner } from "./banner";
import { ContentwithList } from "./content-list";
import { ContentAndImage } from "./content-img";
import { ContentAndImageVariant } from "./content-img2";
import { Profile } from "./profile-section";
import { TeamMember } from "./our-team";
import { Events } from "./events";
import { CallToAction } from "./call-to-action";
import { Vision } from "./vision";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Mission2 } from "./mission2";
import { Staff } from "./staff";
import { Connect } from "./connect";
import { ContactSection } from "./contact-section";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
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
    case "PageBlocksAbout":
      return <About data={block} />;
    case "PageBlocksTeammember":
      return <TeamMember data={block} />;  
    case "PageBlocksMission":
      return <Mission data={block} />;    
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksEvents":
      return <Events data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksContentandimagevariant":
      return <ContentAndImageVariant data={block} />;
    case "PageBlocksContentandimage":
      return <ContentAndImage data={block} />;  
    case "PageBlocksContentwithlist":
      return <ContentwithList data={block} />;  
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
    case "PageBlocksStaff":
      return <Staff data={block} />;
    case "PageBlocksConnect":
      return <Connect data={block} />;
    case "PageBlocksStep1":
      return <Step1 data={block} />;
    case "PageBlocksStep2":
      return <Step2 data={block} />;
    case "PageBlocksStep3":
      return <Step3 data={block} />;
    case "PageBlocksStep4":
      return <Step4 data={block} />;
    case "PageBlocksMission2":
      return <Mission2 data={block} />;
    case "PageBlocksContactsection":
      return <ContactSection data={block} />; 
    default:
      return null;
  }
};
