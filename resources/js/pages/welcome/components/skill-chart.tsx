import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { FC } from 'react';

export const description = 'A bar chart with a label';

const chartConfig = {
  fullstack: {
    label: 'Fullstack',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

type Props = {
  items: {
    stack: string;
    count: number;
  }[];
};

const SkillChart: FC<Props> = ({ items }) => {
  return (
    <Card>
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle>Project chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          {/* <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div> */}
        </CardFooter>
      </div>
      {/* <CardContent>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <BarChart
            accessibilityLayer
            data={items}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="stack" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 4)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" values="stack" fill="var(--color-desktop)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer> 
      </CardContent>*/}
      <CardContent>
        <ChartContainer config={chartConfig} className="h-24 w-full">
          <LineChart
            accessibilityLayer
            data={items}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="stack" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey={'count'} type="natural" stroke="var(--color-fullstack)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SkillChart;
