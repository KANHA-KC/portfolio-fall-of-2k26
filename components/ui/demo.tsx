import { WordRotate } from "@/components/ui/word-rotate";

export default function DemoOne() {
  return (
    <WordRotate
      duration={1500}
      className="text-5xl font-semibold"
      words={["Fast", "Smooth", "Beautiful"]}
    />
  );
}
