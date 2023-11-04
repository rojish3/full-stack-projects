import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Diagram = ({
  laptop,
  monitor,
  accessories,
}: {
  laptop: any;
  monitor: any;
  accessories: any;
}) => {
  console.log(laptop, monitor, accessories);
  const data = [
    { name: "Laptop", value: 10 },
    { name: "Monitor", value: 100 },
    { name: "Accessories", value: 140 },
  ];
  // <div className="border border-black">
  <PieChart width={400} height={400} className="border shadow-lg rounded-lg">
    <Pie
      data={data}
      cx={200}
      cy={200}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={150}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>;
  // </div>
};
export default Diagram;
