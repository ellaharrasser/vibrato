import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getValues } from "../../utils/misc";
import { thunkLoadCurrentShop } from "../../redux/shops";
import ProductCard from "../products/ProductCard";
import OpenModalButton from "../common/OpenModalButton";
import EditShopFormModal from "./EditShopModal";
import DeleteShopModal from "./DeleteShopModal";

function ShopDetailsPage() {
  const dispatch = useDispatch();
  const { shopId } = useParams();

  const user = useSelector((state) => state.session.user);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkLoadCurrentShop(shopId));
    setDataLoaded(true);
  }, [dispatch, shopId, user]);

  const shop = useSelector((state) => state.shops.currentShop);
  const products = useSelector((state) => state.products.products);

  return (
    <main className="container h-max p-4 flex flex-col flex-nowrap gap-4">
      {shop ? (
        <>
          <section className="w-fit pb-4 mx-auto flex flex-nowrap justify-center gap-4 border-b border-stone-400">
            <img
              src={shop.image}
              alt="Shop Image"
              className="size-auto box-content border border-stone-400 rounded-xl"
            />
            <div className="flex flex-col flex-nowrap gap-2">
              <h1 className="text-3xl font-bold">{shop.name}</h1>
              <p className="text-base">{shop.description}</p>
              {user && shop.owner.id === user.id && (
                <div className="flex gap-2">
                  <OpenModalButton
                    modalComponent={<EditShopFormModal shop={shop} />}
                    buttonText="Edit"
                    className="button-submit"
                  />
                  <OpenModalButton
                    modalComponent={<DeleteShopModal shop={shop} />}
                    buttonText="Delete"
                    className="button-delete"
                  />
                </div>
              )}
            </div>
          </section>
          <section className="w-full pb-4 flex flex-col flex-nowrap gap-4">
            <h2 className="my-4 text-3xl font-bold">
              This Shop&apos;s Products
            </h2>
            <ul className="w-full p-2 list-none grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {getValues(products).map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </ul>
          </section>
        </>
      ) : (
        <h1>{dataLoaded ? "No Shop Found..." : "Loading..."}</h1>
      )}
    </main>
  );
}

export default ShopDetailsPage;
