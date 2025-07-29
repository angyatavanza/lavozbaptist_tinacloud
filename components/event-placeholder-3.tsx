import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  attendees?: number;
  imageUrl?: string;
}

function EventCard({
  title,
  date,
  location,
  description,
  attendees,
  imageUrl,
}: EventCardProps) {
  return (
    <div className="col-span-2 md:col-span-4 lg:col-span-4 3xl:col-span-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {imageUrl && (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="font-nunito font-bold text-xl text-gray-900 mb-3">
            {title}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {date}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {location}
            </div>
            {attendees && (
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="w-4 h-4 mr-2" />
                {attendees} attending
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LatestPlaceholderEvents() {
  const events = [
    {
      title: "Blood Drive - Community Center",
      date: "December 15, 2024",
      location: "Downtown Community Center",
      description:
        "Join us for our monthly blood drive. Every donation can save up to three lives. Walk-ins welcome, appointments preferred.",
      attendees: 45,
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Disaster Preparedness Workshop",
      date: "December 20, 2024",
      location: "Red Cross Training Facility",
      description:
        "Learn essential skills for emergency preparedness. Topics include first aid, emergency supplies, and family emergency plans.",
      attendees: 28,
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Volunteer Appreciation Dinner",
      date: "December 28, 2024",
      location: "Grand Ballroom Hotel",
      description:
        "Celebrating our amazing volunteers who dedicate their time to helping others. Join us for dinner, awards, and networking.",
      attendees: 120,
      imageUrl: "/placeholder.svg",
    },
  ];

  return (
  <section className="mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3.75 mx-6">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
            description={event.description}
            attendees={event.attendees}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
