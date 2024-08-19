import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getKeys } from "../../utils/misc";
import { thunkNewShop } from "../../redux/shops";

function NewShopForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [validations, setValidations] = useState({});
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitClass, setSubmitClass] = useState("button-submit");

  const setSubmitDisabledStatus = (disabled) => {
    disabled
      ? setSubmitClass("button-submit-disabled")
      : setSubmitClass("button-submit");
    setSubmitDisabled(disabled);
  };

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!name) {
      newValidations.name = "A name is required.";
    } else if (name.length > 255) {
      newValidations.name = "Names must be 255 or fewer characters.";
    }

    if (!description) {
      newValidations.description = "A description is required.";
    } else if (description.length > 1000) {
      newValidations.description =
        "Descriptions must be 1000 or fewer characters.";
    }

    if (!file) {
      newValidations.image = "An image is required.";
    }

    return newValidations;
  }, [name, description, file]);

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
    setImage(newImageURL);
    setFile(tempFile);
    setFilename(tempFile.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) {
      // Prevent submission if validation errors exist
      setHasSubmitted(true);
      const newValidations = getValidations();
      if (getKeys(newValidations).length) return;
    }

    const formData = new FormData();
    formData.append("owner_id", user.id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);
    setImageLoading(true);

    const serverResponse = await dispatch(thunkNewShop(formData));
    if (serverResponse.shop) {
      navigate(`/shops/${serverResponse.shop.id}`);
    } else if (serverResponse) {
      setErrors(serverResponse);
    }
  };

  return (
    <main className="container px-8 py-4 flex flex-col flex-nowrap items-center gap-2 bg-white overflow-hidden">
      <h1 className="my-8 text-3xl font-bold">Create a Shop</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4"
      >
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
            <label className="text-lg font-semibold">Image</label>
            <p className="text-error">
              {(validations.image && validations.image) ||
                (errors.image && errors.image)}
            </p>
          </div>
          <label
            htmlFor="image"
            className="underline cursor-pointer text-stone-800 transition-colors hover:text-teal-500"
          >
            {filename || "Upload an image"}
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={fileWrap}
            className="hidden"
          />
          <img src={image} className="w-auto h-full max-w-16 max-h-16" />
        </div>
        {errors.server && <p className="text-error">{errors.server}</p>}
        <div className="w-full self-center flex flex-row flex-nowrap justify-center gap-4">
          <button
            type="submit"
            className={submitClass}
            disabled={submitDisabled}
          >
            Create Shop
          </button>
        </div>
        <p className="text-base text-stone-800">
          {imageLoading && "Loading..."}
        </p>
      </form>
    </main>
  );
}

export default NewShopForm;
