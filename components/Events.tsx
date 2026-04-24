import { getUpcomingEvents } from "@/lib/sanity/queries";
import { PortableText } from "next-sanity";

export const revalidate = 60;

export default async function Events() {
  const eventsData = await getUpcomingEvents();

  if (!eventsData || eventsData.length === 0) {
    return (
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h2 className="text-2xl font-medium mb-3 text-foreground">
          Upcoming Offerings
        </h2>
        <p>No upcoming offerings</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 w-full">
      <h2 className="text-2xl font-medium mb-3 text-foreground">
        Upcoming Offerings
      </h2>
      <div className="max-w-[var(--breakpoint-xl)] mx-auto flex flex-wrap justify-center gap-4">
        {eventsData.map((event) => (
          <div
            key={event._id}
            className="max-w-xs bg-white p-4 w-1/2 grow border-spiritblue border-2 rounded-sm shadow-sm"
          >
            <h3 className="text-lg font-semibold text-spiritblue mb-2">
              {new Date(event.startTime).toLocaleDateString("en-SE", {
                month: "numeric",
                day: "numeric",
                weekday: "long",
              })}
            </h3>

            <div className="flex flex-col">
              <span>{event.name}</span>
              <span className="text-sm">
                {new Date(event.startTime).toLocaleTimeString("en-SE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {event.endTime &&
                  ` - ${new Date(event.endTime).toLocaleTimeString("en-SE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
              </span>
            </div>

            {event.location && <p className="text-sm">{event.location}</p>}
            {event.description && <PortableText value={event.description} />}
          </div>
        ))}
      </div>
    </div>
  );
}
