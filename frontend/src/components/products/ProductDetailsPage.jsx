import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { centsToUSD } from "../../utils/misc";
import { thunkLoadCurrentProduct } from "../../redux/products";
import OpenModalButton from "../common/OpenModalButton";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkLoadCurrentProduct(productId));
    setDataLoaded(true);
  }, [productId, dispatch]);

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.currentProduct);

  const productPriceText = centsToUSD(product?.productPrice);
  const shippingPriceText =
    product?.shippingPrice > 0
      ? `+ ${centsToUSD(product?.shippingPrice)} Shipping`
      : "Free Shipping";

  return (
    <main className="container h-max p-4 flex flex-col gap-4">
      {product ? (
        <>
          <div className="w-full grid grid-cols-[2fr_3fr] gap-8">
            <img
              src={product.images[0].image}
              alt="Product Image"
              className="size-auto border border-stone-400 rounded-xl"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {product.brand} {product.name}
              </h1>
              <p className="text-lg md:text-xl text-stone-800 font-semibold">
                {product.condition}
              </p>
              <div>
                <span className="text-xl font-bold">
                  {productPriceText}&#32;
                </span>
                <span className="text-lg text-stone-800">
                  {shippingPriceText}
                </span>
              </div>
              <p className="max-w-[60ch] text-base text-wrap text-ellipsis line-clamp-4">{product.description}</p>
              {user && product.user.id === user.id && (
                <div className="flex gap-2 mt-2">
                  <OpenModalButton
                    modalComponent={<EditProductModal product={product} />}
                    buttonText="Edit"
                    className="button-submit"
                  />
                  <OpenModalButton
                    modalComponent={<DeleteProductModal product={product} />}
                    buttonText="Delete"
                    className="button-delete"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-fit p-2 flex flex-col flex-wrap gap-2">
            <h2 className="text-2xl text-stone-800 font-semibold">
              Sold By...
            </h2>
            <div className="grid grid-cols-[1fr_4fr] gap-2">
              <img
                src={product.shop.image}
                alt="Shop Image"
                className="size-auto box-content border border-stone-400 rounded-xl"
              />
              <div className="flex flex-col flex-nowrap justify-center gap-2">
                <p className="text-xl font-bold">{product.shop.name}</p>
                <NavLink
                  to={`/shops/${product.shop.id}`}
                  className="w-fit button-submit-sm"
                >
                  View Shop
                </NavLink>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="loading">
          {dataLoaded ? "No product found..." : "Loading..."}
        </h1>
      )}
    </main>
  );
}

export default ProductDetailsPage;
