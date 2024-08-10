import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { centsToUSD } from "../../../utils/misc";
import { thunkLoadCurrentProduct } from "../../../redux/products";
import OpenModalButton from "../../common/OpenModalButton";
import EditProductModal from "../EditProductModal";
import DeleteProductModal from "../DeleteProductModal";

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
    <main id="product-details-page">
      {product ? (
        <>
          <div className="product-wrapper">
            <div className="product-images-container">
              <img
                src={product.images[0].image}
                alt="Product Image"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h1>
                {product.brand} {product.name}
              </h1>
              <p className="category">{product.category}</p>
              <p className="condition">{product.condition}</p>
              <div>
                <span className="price">{productPriceText}</span>
                <span className="shipping-price">{shippingPriceText}</span>
              </div>
              <p className="description">{product.description}</p>
              {user && product.user.id === user.id && (
                <div className="owner-actions">
                  <OpenModalButton
                    modalComponent={<EditProductModal product={product} />}
                    buttonText={"Edit"}
                  />
                  <OpenModalButton
                    modalComponent={<DeleteProductModal product={product} />}
                    buttonText={"Delete"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="shop-info-wrapper">
            <h2>Sold By...</h2>
            <div className="shop-info">
              <img
                className="shop-image"
                src={product.shop.image}
                alt="Shop Image"
              />
              <div className="shop-info-text">
                <p className="shop-name">{product.shop.name}</p>
                <NavLink to={`/shops/${product.shop.id}`}>View Shop</NavLink>
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
