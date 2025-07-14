interface CTACardProps {
  title: string;
  bgColor: string;
  onClick?: () => void;
}

function CTACard({ title, bgColor, onClick }: CTACardProps) {
  return (
    <div className="col-span-2 sm:col-span-3 lg:col-span-3 3xl:col-span-3">
      <div
        className={`flex flex-col justify-center items-center py-10 px-4 h-[253px] cursor-pointer hover:opacity-90 transition-opacity ${bgColor}`}
        onClick={onClick}
      >
        <h2 className="font-playfair font-bold text-[40px] leading-[50px] text-redcross-text text-center capitalize max-w-full">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function CTASection() {
  const handleVolunteerClick = () => {
    // Navigation to volunteer page would go here
    console.log("Navigate to volunteer page");
  };

  const handleDonateClick = () => {
    // Navigation to donate page would go here
    console.log("Navigate to donate page");
  };

  const handleMemberClick = () => {
    // Navigation to member page would go here
    console.log("Navigate to member page");
  };

  const handleLocationClick = () => {
    // Navigation to location finder would go here
    console.log("Navigate to location finder");
  };

  return (
                    <section className="mx-auto px-6">
      <div className="grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-12 3xl:grid-cols-12 gap-3.75">
        <CTACard
          title="Become a Volunteer"
          bgColor="bg-redcross-volunteer"
          onClick={handleVolunteerClick}
        />
        <CTACard
          title="Donate Blood"
          bgColor="bg-redcross-blood"
          onClick={handleDonateClick}
        />
        <CTACard
          title="Become A Member"
          bgColor="bg-redcross-member"
          onClick={handleMemberClick}
        />
        <CTACard
          title="Find a Red Cross Near you"
          bgColor="bg-redcross-location"
          onClick={handleLocationClick}
        />
      </div>
    </section>
  );
}
