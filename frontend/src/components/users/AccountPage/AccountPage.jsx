import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getValues } from "../../../utils/misc";
import { thunkLoadUserShops } from "../../../redux/shops";
import { thunkLoadUserProducts } from "../../../redux/products";
import MyShopCard from "./MyShopCard";
import MyProductCard from "./MyProductCard";

function AccountPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkLoadUserShops(user));
    dispatch(thunkLoadUserProducts(user));
    setDataLoaded(true);
  }, []);

  const shops = useSelector((state) => state.shops.shops);
  const products = useSelector((state) => state.products.products);

  // Fixes rerender issue when editing/deleting products/shops
  const productsCount = useSelector((state) => state.products.productsCount);
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const shopsCount = useSelector((state) => state.shops.count);
  const currentShop = useSelector((state) => state.shops.currentShop);

  useEffect(() => {
    dispatch(thunkLoadUserProducts(user));
    dispatch(thunkLoadUserShops(user));
  }, [user, dispatch, productsCount, currentProduct, shopsCount, currentShop]);

  return (
    <main className="container h-max p-4 flex flex-col flex-nowrap gap-4">
      <section className="w-full pb-4 flex flex-col flex-nowrap items-start gap-4 border-b border-stone-400">
        <h1 className="my-4 text-3xl lg:text-4xl font-bold">My Account</h1>
        <div className="w-full flex flex-row flex-nowrap items-start justify-start">
          <img
            src={user.profileImage}
            alt="User Image"
            className="size-24 rounded-xl border border-stone-400"
          />
          <div className="w-full my-auto ml-2 p-2 flex flex-col flex-wrap items-start gap-2">
            <div className="flex flex-row flex-wrap items-end gap-4">
              <p className="text-xl/[1] font-bold">{user.name}</p>
              <p className="text-lg/[1] font-semibold text-stone-800">
                {user.email}
              </p>
            </div>
            <p className="max-w-[60ch] text-base text-wrap text-ellipsis line-clamp-4">
              {user.description}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full pb-4 flex flex-col flex-nowrap items-start gap-4 border-b border-stone-400">
        <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-4">
          <h2 className="my-4 text-3xl font-bold">My Shops</h2>
          <NavLink to="/shops/new" className="button-submit">
            Create a Shop
          </NavLink>
        </div>
        <ul className="w-full p-2 list-none grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {dataLoaded ? (
            getValues(shops).map((shop) => (
              <MyShopCard shop={shop} key={shop.id} />
            ))
          ) : (
            <p className="text-base text-stone-800">Loading...</p>
          )}
        </ul>
      </section>
      <section className="w-full pb-4 flex flex-col flex-nowrap items-start gap-4 border-b border-stone-400">
        <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-4">
          <h2 className="my-4 text-3xl font-bold">My Products</h2>
          <NavLink to="/products/new" className="button-submit">
            Create a Product
          </NavLink>
        </div>
        <ul className="w-full p-2 list-none grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {dataLoaded ? (
            getValues(products).map((product) => (
              <MyProductCard product={product} key={product.id} />
            ))
          ) : (
            <p className="text-base text-stone-800">Loading...</p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default AccountPage;
