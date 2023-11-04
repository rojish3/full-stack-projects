import { Link } from "react-router-dom";

interface IProduct {
  _id: string;
  image: string;
  name: string;
  price: string;
  quantity: string;
}
const ProductCard: React.FC<IProduct> = ({
  _id,
  image,
  name,
  price,
  quantity,
}) => {
  return (
    <div className="relative w-64 h-80 p-2 card-shadow rounded-lg cursor-pointer hover:scale-105 duration-300">
      <Link to={`/products/${_id}`}>
        <div className="h-2/3 overflow-hidden">
          <img className="object-cover m-auto " src={image} />
        </div>
        <div className="mt-4">
          <p className="font-semibold text-lg">
            {name.length < 25 ? name : <p>{name.substring(0, 25)}...</p>}
          </p>
          <span className="text-xl font-bold">${price}</span>
          {Number(quantity) === 0 ? (
            <div className="absolute right-4 top-4 bg-red-500 p-1 rounded-lg opacity-80">
              Out of Stock
            </div>
          ) : (
            <div className="absolute right-4 top-4 bg-green-500 p-1 rounded-lg opacity-80">
              In Stock
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
