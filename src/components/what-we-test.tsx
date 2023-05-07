import type { FC } from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const tests = [
  {
    title: "Attention",
    description:
      "A person's approach to managing incoming information and distractions.",
  },
  {
    title: "Decision Making",
    description: "A person's approach to making decisions.",
  },
  {
    title: "Effort",
    description:
      "A person's approach toward investing effort based on size of reward and probability of success.",
  },
  {
    title: "Emotion",
    description: "A person's strategy for interpreting the emotions of others.",
  },
  {
    title: "Fairness",
    description: "A person's approach to fairness and equity.",
  },
  {
    title: "Focus",
    description: "A person's concentration style for one or more tasks.",
  },
  {
    title: "Generosity",
    description:
      "A person's tendency to prioritize the needs of others above their own.",
  },
  {
    title: "Learning",
    description:
      "A person's approach to changing behavior based on new information.",
  },
  {
    title: "Risk Toleration",
    description: "A person's level of comfort with risk-taking.",
  },
];

interface WhatWeTestProps {
  name: string;
}

const WhatWeTest = ({ name }: WhatWeTestProps) => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        {`${name}'s Behavioral Talents`}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {tests.map((test) => (
          <HoverCard key={test.title}>
            <HoverCardTrigger>
              <Card className="flex w-[450px] flex-col gap-2 p-4 dark:bg-gray-800">
                <span>{test.title}</span>
                <Progress value={Math.random() * 80 + 10} />
              </Card>
            </HoverCardTrigger>
            <HoverCardContent>{test.description}</HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default WhatWeTest;
