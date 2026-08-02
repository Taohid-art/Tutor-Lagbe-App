// "use client"

// import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/Components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/Components/ui/chart"

// export const description = "A multiple bar chart"

// const chartData = [
//   { month: "January", Total: 186, Successfull: 80 },
//   { month: "February", Total: 305, Successfull: 200 },
//   { month: "March", Total: 237, Successfull: 120 },
//   { month: "April", Total: 273, Successfull: 190 },
//   { month: "May", Total: 209, Successfull: 130 },
//   { month: "June", Total: 214, Successfull: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Total",
//     color: "var(--chart-1)",
//   },
//   mobile: {
//     label: "Successfull",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig

// export default function ChartBarMultiple() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Bar Chart - Multiple</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             <Bar dataKey="Total" fill="var(--color-desktop)" radius={4} />
//             <Bar dataKey="Successfull" fill="var(--color-mobile)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 leading-none font-medium">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="text-muted-foreground leading-none">
//           Showing total and successfull Transection for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }