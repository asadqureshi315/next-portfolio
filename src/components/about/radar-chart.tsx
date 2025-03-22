"use client";

import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

export default function SwitchableRadarChart({
  fullstack,
  devops,
}: {
  fullstack: RadarVal[];
  devops: RadarVal[];
}) {
  const [activeDataset, setActiveDataset] = useState<"fullstack" | "devops">(
    "fullstack"
  );

  const fullstackData = fullstack;

  const skillsData = devops;
  const activeData = activeDataset === "fullstack" ? fullstackData : skillsData;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <Tabs
          defaultValue="fullstack"
          value={activeDataset}
          onValueChange={(value) =>
            setActiveDataset(value as "fullstack" | "devops")
          }
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
            <TabsTrigger value="devops">Devops</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[250px] w-full">
        <ChartContainer
          config={{
            [activeDataset]: {
              label: activeDataset === "fullstack" ? "fullstack" : "devops",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={activeData} className="mx-auto">
              <PolarGrid stroke="gray" />
              <PolarAngleAxis dataKey="category" />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="text-right text-sm font-medium">
                          {payload[0].payload.category}
                        </div>
                        <div className="mt-1 text-left text-sm font-bold">
                          {payload[0].value}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name={activeDataset === "fullstack" ? "fullstack" : "devops"}
                dataKey="value"
                fill="teal"
                fillOpacity={0.6}
                stroke="teal"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
