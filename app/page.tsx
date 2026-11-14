import Architecture from "@/components/architecture/Architecture";
import Culture from "@/components/culture/Culture";
import Hero from "@/components/hero/Hero";
import Timeline from "@/components/timeline/Timeline";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Timeline />
      <Architecture />
      <Culture />
    </main>
  );
}
