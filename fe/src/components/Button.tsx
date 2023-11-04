interface IButton {
  bg: string;
  color: string;
  rounded: string;
  value: string;
}
const Button: React.FC<IButton> = ({ bg, color, rounded, value }) => {
  return (
    <>
      <button
        value={value}
        className={`btn border-none px-3 py-2 cursor-pointer shadow ${bg} ${color} ${rounded} lg:text-xl lg:px-4 lg:py-3`}
      >
        {value}
      </button>
    </>
  );
};

export default Button;
