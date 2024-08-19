import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getKeys,
  getValues,
  endsWithOne,
  imageSuffixes,
} from "../../utils/misc";
import conditions from "../../utils/conditions";
import { thunkLoadUserShops } from "../../redux/shops";
import { thunkNewProduct } from "../../redux/products";

function NewProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);

  const [shopId, setShopId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image1, setImage1] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [validations, setValidations] = useState({});
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitClass, setSubmitClass] = useState("button-submit");

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const fetchUserShops = async () => {
      await dispatch(thunkLoadUserShops(user));
      setDataLoaded(true);
    };
    fetchUserShops();
  }, [user, dispatch, navigate]);

  const shops = useSelector((state) => state.shops.shops);

  const setSubmitDisabledStatus = (disabled) => {
    disabled
      ? setSubmitClass("button-submit-disabled")
      : setSubmitClass("button-submit");
    setSubmitDisabled(disabled);
  };

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!shopId) {
      newValidations.shop = "A shop is required.";
    }

    if (!name) {
      newValidations.name = "A name is required.";
    } else if (name.length > 255) {
      newValidations.name = "Names must be 255 or fewer characters.";
    }

    if (!brand) {
      newValidations.brand = "A brand is required.";
    } else if (brand.length > 20) {
      newValidations.brand = "Brands must be 20 or fewer characters.";
    }

    if (!category) {
      newValidations.category = "A category is required.";
    } else if (category.length > 20) {
      newValidations.category = "Categories must be 20 or fewer characters.";
    }

    if (!condition) {
      newValidations.condition = "A condition is required.";
    }

    if (!description) {
      newValidations.description = "A description is required.";
    } else if (description.length > 1000) {
      newValidations.description =
        "Descriptions must be 1000 or fewer characters.";
    }

    if (productPrice !== 0 && !productPrice) {
      newValidations.productPrice = "A product price is required.";
    } else if (Number.isNaN(productPrice)) {
      newValidations.productPrice = "The product price format is invalid.";
    } else if (productPrice < 1) {
      newValidations.productPrice = "Product prices must be $1.00 or greater.";
    }

    if (shippingPrice !== 0 && !shippingPrice) {
      newValidations.shippingPrice = "A shipping price is required.";
    } else if (Number.isNaN(productPrice)) {
      newValidations.shippingPrice = "The shipping price format is invalid.";
    } else if (shippingPrice < 0) {
      newValidations.shippingPrice =
        "Shipping prices must be $0.00 or greater.";
    }

    if (quantity <= 0) {
      newValidations.quantity = "A quantity must be 1 or more";
    }

    if (!file) {
      newValidations.image1 = "An image is required.";
    } else if (!endsWithOne(filename, imageSuffixes)) {
      newValidations.image1 = "An image must be a pdf, png, jpg, jpeg, or gif.";
    }

    return newValidations;
  }, [
    shopId,
    name,
    brand,
    category,
    condition,
    description,
    productPrice,
    shippingPrice,
    quantity,
    file,
    filename,
  ]);

  useEffect(() => {
    if (!hasSubmitted) return; // Prevent validations until initial submission
    const newValidations = getValidations();
    setSubmitDisabledStatus(getKeys(newValidations).length > 0);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  // Helper function for generating thumbnail URL and setting image states
  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Limit image size to 5 Mb
    if (tempFile.size > 5000000) {
      setFilename("Image must be less than 5 Mb.");
      return;
    }

    // Generate local thumbnail URL
    const newImageURL = URL.createObjectURL(tempFile);
    setImage1(newImageURL);
    setFile(tempFile);
    setFilename(tempFile.name);
  };

  // Navigate to shop creation form if no shops exist
  if (dataLoaded && !getKeys(shops).length) return navigate("shops/new");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) {
      // Prevent submission if validation errors exist
      setHasSubmitted(true);
      const newValidations = getValidations();
      if (getKeys(newValidations).length) return;
    }

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("shop_id", shopId);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("description", description);
    formData.append("product_price", Math.round(productPrice * 100));
    formData.append("shipping_price", Math.round(shippingPrice * 100));
    formData.append("quantity", +quantity);
    formData.append("image_1", file);
    setImageLoading(true);

    const serverResponse = await dispatch(thunkNewProduct(formData));
    if (serverResponse.product) {
      navigate(`/products/${serverResponse.product.id}`);
    } else if (serverResponse) {
      setErrors(serverResponse);
    }
  };

  return dataLoaded ? (
    <main className="container px-8 py-4 flex flex-col flex-nowrap items-center gap-2 bg-white overflow-hidden">
      <h1 className="my-8 text-3xl font-bold">List a new Product</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4"
      >
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="shop" className="text-lg font-semibold">
              Shop
            </label>
            <p className="text-error">
              {(validations.shop && validations.shop) ||
                (errors.shop && errors.shop)}
            </p>
          </div>
          <select
            id="shop"
            name="shop"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            className="w-full px-2 py-1 rounded-full cursor-pointer bg-stone-200 border border-stone-400 transition-colors hover:bg-stone-100 focus:bg-stone-100"
          >
            <option value="">Please select a shop...</option>
            {getValues(shops).map((shop) => (
              <option value={shop.id} key={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="name" className="text-lg font-semibold">
              Name
            </label>
            <p className="text-error">
              {(validations.name && validations.name) ||
                (errors.name && errors.name)}
            </p>
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="brand" className="text-lg font-semibold">
              Brand
            </label>
            <p className="text-error">
              {(validations.brand && validations.brand) ||
                (errors.brand && errors.brand)}
            </p>
          </div>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="text-lg font-semibold">
              Category
            </label>
            <p className="text-error">
              {(validations.category && validations.category) ||
                (errors.category && errors.category)}
            </p>
          </div>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="condition" className="text-lg font-semibold">
              Condition
            </label>
            <p className="text-error">
              {(validations.condition && validations.condition) ||
                (errors.condition && errors.condition)}
            </p>
          </div>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full px-2 py-1 rounded-full cursor-pointer bg-stone-200 border border-stone-400 transition-colors hover:bg-stone-100 focus:bg-stone-100"
          >
            <option value="">Please select a condition...</option>
            {conditions.map((condition) => (
              <option value={condition} key={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="description" className="text-lg font-semibold">
              Description
            </label>
            <p className="text-error">
              {(validations.description && validations.description) ||
                (errors.description && errors.description)}
            </p>
          </div>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="productPrice" className="text-lg font-semibold">
              Product Price
            </label>
            <p className="text-error">
              {(validations.productPrice && validations.productPrice) ||
                (errors.product_price && errors.product_price)}
            </p>
          </div>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="shippingPrice" className="text-lg font-semibold">
              Shipping Price
            </label>
            <p className="text-error">
              {(validations.shippingPrice && validations.shippingPrice) ||
                (errors.shipping_price && errors.shipping_price)}
            </p>
          </div>
          <input
            id="shippingPrice"
            type="number"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="text-lg font-semibold">
              Quantity
            </label>
            <p className="text-error">
              {(validations.quantity && validations.quantity) ||
                (errors.quantity && errors.quantity)}
            </p>
          </div>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400">
          <div className="flex items-center gap-2">
            <label className="text-lg font-semibold">Image</label>
            <p className="text-error">
              {(validations.image1 && validations.image1) ||
                (errors.image1 && errors.image1)}
            </p>
          </div>
          <label
            htmlFor="image-1"
            className="underline cursor-pointer text-stone-800 transition-colors hover:text-teal-500"
          >
            {filename || "Upload an image"}
          </label>
          <input
            id="image-1"
            type="file"
            accept="image/*"
            onChange={fileWrap}
            className="hidden"
          />
          <img src={image1} className="w-auto h-full max-w-16 max-h-16" />
        </div>
        <p className="text-error">{errors.server && errors.server}</p>
        <div className="w-full self-center flex flex-row flex-nowrap justify-center">
          <button
            type="submit"
            disabled={submitDisabled}
            className={submitClass}
          >
            Create Product
          </button>
        </div>
        <p className="text-base text-stone-800">
          {imageLoading && "Loading..."}
        </p>
      </form>
    </main>
  ) : (
    <main>
      <p className="font-base text-stone-800">Loading...</p>
    </main>
  );
}

export default NewProductForm;
