import ArchiveGrid from "@/components/ui/ArchiveGrid";

export type ArchiveItem = {
  title: string;
  year: string;
  medium: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;

  weight: "low" | "medium" | "high";
  state: "ongoing" | "completed" | "archive";
};

const items: ArchiveItem[] = [
  {
    title: "Between Worlds",
    year: "2026",
    medium: "Mixed Media Installation",
    description: "Liminal spaces — the threshold between material and spirit.",
    longDescription: "An immersive installation exploring the in-between...",
    tags: ["Installation", "Ongoing"],
    image: "/altar-session-1200w.jpg",
    weight: "high",
    state: "ongoing",
  },
  {
    title: "The Language of Plants",
    year: "2026",
    medium: "Essays & Botanical Illustration",
    description: "On botanical knowledge and spiritual practice.",
    longDescription:
      "A body of writing accompanied by hand-drawn illustrations...",
    tags: ["Writing", "Ongoing"],
    image: "",
    weight: "medium",
    state: "ongoing",
  },
  {
    title: "Clay, Earth, Memory",
    year: "2025",
    medium: "Ceramics",
    description: "Shaped by ancestral memory and earth intelligence.",
    longDescription: "A series of ceramic vessels...",
    tags: ["Art", "Completed"],
    image: "/placeholder-02.jpg",
    weight: "high",
    state: "completed",
  },
  {
    title: "Silt",
    year: "2024",
    medium: "Photography & Text",
    description: "What the river carries. What it leaves behind.",
    longDescription: "A photographic series paired with prose fragments...",
    tags: ["Photography", "Writing"],
    image: "/placeholder-03.jpg",
    weight: "medium",
    state: "archive",
  },
  {
    title: "Gathering Ground",
    year: "2025",
    medium: "Workshops & Community",
    description: "Bringing together healing, art, and community.",
    longDescription: "A series of public workshops...",
    tags: ["Community"],
    image: "",
    weight: "low",
    state: "completed",
  },
  {
    title: "The Language of Plants",
    year: "2026",
    medium: "Essays & Botanical Illustration",
    description: "On botanical knowledge and spiritual practice.",
    longDescription:
      "A body of writing accompanied by hand-drawn illustrations...",
    tags: ["Writing", "Ongoing"],
    image: "/placeholder-01.jpg",
    weight: "medium",
    state: "ongoing",
  },
  {
    title: "Clay, Earth, Memory",
    year: "2025",
    medium: "Ceramics",
    description: "Shaped by ancestral memory and earth intelligence.",
    longDescription: "A series of ceramic vessels...",
    tags: ["Art", "Completed"],
    image: "",
    weight: "high",
    state: "completed",
  },
  {
    title: "Silt",
    year: "2024",
    medium: "Photography & Text",
    description: "What the river carries. What it leaves behind.",
    longDescription: "A photographic series paired with prose fragments...",
    tags: ["Photography", "Writing"],
    image: "",
    weight: "medium",
    state: "archive",
  },
  {
    title: "Gathering Ground",
    year: "2025",
    medium: "Workshops & Community",
    description: "Bringing together healing, art, and community.",
    longDescription: "A series of public workshops...",
    tags: ["Community"],
    image: "/placeholder-04.jpg",
    weight: "low",
    state: "completed",
  },
];

export default function PracticePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="h-[2px] w-10 bg-spiritred mb-8" />
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
          Practice
        </h1>
        <p className="text-lg font-body max-w-2xl leading-relaxed">
          A living archive. Works, fragments, and ongoing processes.
        </p>
      </div>

      {/* Archive Grid */}
      <ArchiveGrid items={items} />
    </div>
  );
}
