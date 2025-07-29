import React from "react";
import { ArrowRight } from "lucide-react";
import { Section, sectionBlockSchemaField } from "@/components/layout/section";
import {
  DecorativeIcon,
  LargeDecorativeIcon,
} from "@/components/ui/decorative-icon";

interface BlogCard {
  title: string;
  description: string;
  image: string;
  isHover?: boolean;
}

export const BlogSection: React.FC = () => {
  const blogCards: BlogCard[] = [
    {
      title: "Our Childcare Guide",
      description:
        "This guide provides practical support and empowering advice for children and lots of supportive way.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/449b2b0624f1c4ffa0e1c7a96e58b2bcc1345da8?width=704",
      isHover: true,
    },
    {
      title: "Raising Resilient Kids",
      description:
        "Nurturing strength and adaptability in young minds. Equipping children to face challenges with courage.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3a3780e6b5225643f864e88f7ce79eb387b1d11d?width=704",
    },
    {
      title: "Financial Security",
      description:
        "Building a strong foundation for the future. Protecting what matters most: your family's well-being.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/871fe5144a23fc41ff2be5d2c8a12d42087a54c2?width=704",
    },
  ];

  return (
    <div className="relative bg-gray-500 py-16 px-24 md:px-24 lg:px-24 3xl:px-119 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-0 mb-12 lg:mb-16">
        <div className="flex flex-col gap-2">
          <span className="font-nunito font-bold  text-lg text-yellow-500">
            Blog
          </span>
          <div className="relative">
            <h2 className="font-nunito font-bold  text-3xl md:text-4xl lg:text-[42px] text-white leading-[1.4] max-w-md lg:max-w-lg">
              Inspiration and Guidance for Child
            </h2>
            <div className="absolute -top-2 right-4 md:right-0 lg:right-0 lg:top-0">
              <DecorativeIcon />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-white text-white font-roboto font-bold  text-sm md:text-base hover:bg-white hover:text-primary transition-colors self-start lg:self-auto">
          View More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6 relative">
        {blogCards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-grey-0 p-3 md:p-4 flex flex-col gap-3 md:gap-4 group hover:shadow-lg transition-shadow col-span-1 md:col-span-4"
          >
            {/* Image */}
            <div className="relative h-48 md:h-60 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-nunito font-bold  text-xl md:text-2xl text-grey-900 leading-normal">
                  {card.title}
                </h3>
                <p className="font-roboto text-sm md:text-base text-grey-500 leading-[1.5]">
                  {card.description}
                </p>
              </div>

              {/* Button */}
              <div className="flex flex-col gap-1">
                <button className="flex items-center gap-1 text-primary font-nunito font-bold  text-sm md:text-base group-hover:gap-2 transition-all">
                  Ver ahora
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div
                  className={`h-px bg-green-500 transition-all duration-300 ${
                    card.isHover
                      ? "w-20 md:w-24"
                      : "w-0 group-hover:w-20 group-hover:md:w-24"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Large Decorative Icon */}
        <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-4 lg:-bottom-12 lg:-right-8 opacity-80 hidden md:block">
          <LargeDecorativeIcon />
        </div>
      </div>
    </div>
  );
};