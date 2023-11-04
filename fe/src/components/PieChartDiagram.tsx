import "chart.js/auto";
import { Pie } from "react-chartjs-2";

interface IPieData {
  laptop: number;
  monitor: number;
  accessories: number;
}
const PieChartDiagram: React.FC<IPieData> = ({
  laptop,
  monitor,
  accessories,
}) => {
  const data = {
    labels: ["Laptop", "Monitor", "Accessories"],
    datasets: [
      {
        label: "Quantity",
        data: [laptop, monitor, accessories],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChartDiagram;
