import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { getKeys } from "../../utils/misc";
import { validateEmail } from "../../utils/validate";
import { thunkSignup } from "../../redux/session";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validations, setValidations] = useState({});
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [submitClass, setSubmitClass] = useState("button-submit");

  const setSubmitDisabledStatus = (disabled) => {
    setSubmitClass(disabled ? "button-submit-disabled" : "button-submit");
    setSubmitDisabled(disabled);
  };

  // Helper function to validate form fields and return an object with validations
  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!email) {
      newValidations.email = "An email is required.";
    } else if (!validateEmail(email)) {
      newValidations.email = "The email's format is invalid.";
    } else if (email.length > 255) {
      newValidations.email = "Emails must be 255 or fewer characters.";
    }

    if (!name) {
      newValidations.name = "A name is required.";
    } else if (name.length > 255) {
      newValidations.name = "Names must be 255 or fewer characters.";
    }

    if (description.length > 255) {
      newValidations.description =
        "Descriptions must be 255 or fewer characters.";
    }

    if (!file) {
      newValidations.profileImage = "A profile image is required.";
    }

    if (password.length < 8) {
      newValidations.password = "Passwords must be 8 or more characters.";
    } else if (password.length > 255) {
      newValidations.password = "Passwords must be 255 or fewer characters.";
    } else if (password !== confirmPassword) {
      newValidations.confirmPassword = "Both passwords must match.";
    }

    return newValidations;
  }, [email, name, description, file, password, confirmPassword]);

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
    setProfileImage(newImageURL);
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
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("profile_image", file);
    formData.append("description", description);
    setImageLoading(true);

    const serverResponse = await dispatch(thunkSignup(formData));
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="container p-4 flex flex-col flex-nowrap items-center gap-2 bg-white border border-stone-200 rounded-xl overflow-hidden">
      <h1 className="my-2 text-3xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        className="container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4"
      >
        <div className="container">
          <div className="w-full min-w-[40ch] flex items-center gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <span className="font-base text-red-600">
              {(validations.email && validations.email) ||
                (errors.email && errors.email)}
            </span>
          </div>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container">
          <div className="w-full min-w-[40ch] flex items-center gap-2">
            <label htmlFor="name" className="text-lg font-semibold">
              Name
            </label>
            <span className="font-base text-red-600">
              {(validations.name && validations.name) ||
                (errors.name && errors.name)}
            </span>
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container">
          <div className="w-full min-w-[40ch] flex items-center gap-2">
            <label htmlFor="profile-image" className="text-lg font-semibold">
              Profile Image
            </label>
            <span className="font-base text-red-600">
              {(validations.profileImage && validations.profileImage) ||
                (errors.profile_image && errors.profile_image)}
            </span>
          </div>
          <label
            htmlFor="profile-image"
            className="underline cursor-pointer text-stone-800 transition-colors hover:text-teal-500"
          >
            {filename || "Upload an image"}
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={fileWrap}
            className="hidden"
          />
          <img className="w-auto h-full max-w-16 max-h-16" src={profileImage} />
        </div>
        <div className="container">
          <div className="w-full min-w-[40ch] flex items-center gap-2">
            <label htmlFor="description" className="text-lg font-semibold">
              Description
            </label>
            <span className="font-base text-red-600">
              {(validations.description && validations.description) ||
                (errors.description && errors.description)}
            </span>
          </div>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container">
          <div className="w-full min-w-[40ch] flex items-center gap-2">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <span className="font-base text-red-600">
              {(validations.password && validations.password) ||
                (errors.password && errors.password)}
            </span>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        <div className="container">
          <div className="w-full min-w-[40ch] flex items-center gap-2">
            <label htmlFor="confirm-password" className="text-lg font-semibold">
              Confirm Password
            </label>
            <span className="font-base text-red-600">
              {validations.confirmPassword && validations.confirmPassword}
            </span>
          </div>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-1 border border-stone-400 rounded-md"
          />
        </div>
        {errors.server && (
          <p className="font-base text-red-600">{errors.server}</p>
        )}
        <div className="w-full self-center flex flex-row flex-nowrap justify-center gap-4">
          <button
            type="submit"
            className={submitClass}
            disabled={submitDisabled}
          >
            Sign Up
          </button>
          <button type="button" className="button-cancel" onClick={closeModal}>
            Cancel
          </button>
          <p className="font-base text-stone-800">
            {imageLoading && "Loading..."}
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
