import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { DataEntry } from "../types";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  data: DataEntry[];
  type: "bar" | "pie";
}

export const ChartView = ({ data, type }: Props) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Vrijednost",
        data: data.map((d) => d.value),
        backgroundColor: ["#4e79a7", "#f28e2b", "#e15759"],
      },
    ],
  };

  return (
    // control the container size with Tailwind
    <div className="w-full h-64">
      {type === "bar" ? (
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false, // tells Chart.js to fill the container height and width
            responsive: true, // keeps the chart responsive inside its container
          }}
        />
      ) : (
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      )}
    </div>
  );
};
