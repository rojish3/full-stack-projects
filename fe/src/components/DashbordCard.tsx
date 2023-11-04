interface ICard {
  icon: JSX.Element;
  label: string;
  bgColor: string;
  data: string;
}

const DashbordCard: React.FC<ICard> = ({ icon, bgColor, label, data }) => {
  const colorVariants: any = {
    green: "bg-green-400 hover:bg-green-300",
    blue: "bg-blue-400 hover:bg-blue-300",
    yellow: "bg-yellow-400 hover:bg-yellow-300",
    red: "bg-red-400 hover:bg-red-300",
  };
  return (
    <div
      className={`flex items-center gap-2 md:gap-8 ${colorVariants[bgColor]} cursor-pointer hover:scale-110 ease-in-out duration-300 md:min-h-[100px] md:min-w-[250px] m-2 px-2 py-1 md:m-4 md:px-4 md:py-2 rounded-xl shadow md:mb-20`}
    >
      <div className="text-xs">{icon}</div>
      <div className="flex flex-col">
        <label className="font-semibold md:text-xl">{label}</label>
        <span className="font-bold md:text-2xl">{data}</span>
      </div>
    </div>
  );
};

export default DashbordCard;
