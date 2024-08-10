import { useNavigate } from "react-router-dom";

import { centsToUSD } from "../../../utils/misc";
import OpenModalButton from "../../common/OpenModalButton";
import EditProductModal from "../../products/EditProductModal";
import DeleteProductModal from "../../products/DeleteProductModal";

function MyProductCard({ product }) {
  const navigate = useNavigate();

  const productPriceText = centsToUSD(product.productPrice);
  const shippingPriceText =
    product.shippingPrice > 0
      ? `${centsToUSD(product.shippingPrice)} Shipping`
      : "Free Shipping";

  return (
    <li className="container w-full h-full flex flex-col gap-2">
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="container w-full h-full flex flex-col cursor-pointer group"
      >
        <img
          src={product.images[0].image}
          alt="Product Image"
          className="w-full h-auto border border-stone-200 rounded-xl mb-2 shadow-md"
        />
        <div className="container flex-1 p-1 rounded-lg bg-transparent transition-all group-hover:bg-orange-200">
          <p className="text-sm md:text-base lg:text-lg font-semibold overflow-ellipsis line-clamp-2">{product.brand}</p>
          <p className="text-sm/4 md:text-base/5 lg:text-lg/6 overflow-ellipsis line-clamp-2">{product.name}</p>
          <p className="product-price">{productPriceText}</p>
          <p className="shipping-price">{shippingPriceText}</p>
        </div>
      </div>
      <div className="w-full flex flex-row flex-nowrap gap-2 md:gap-4 justify-center">
        <OpenModalButton
          modalComponent={<EditProductModal product={product} />}
          buttonText="Edit"
          className="button-submit-sm"
        />
        <OpenModalButton
          modalComponent={<DeleteProductModal product={product} />}
          buttonText="Delete"
          className="button-delete-sm"
        />
      </div>
    </li>
  );
}

export default MyProductCard;
