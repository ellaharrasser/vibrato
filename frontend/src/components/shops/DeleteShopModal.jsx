import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { thunkDeleteShop } from "../../redux/shops";

function DeleteShopModal({ shop }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(thunkDeleteShop(shop.id));
    // Navigate to homepage if on shop details page currently
    if (location.pathname.startsWith("/shops/")) {
      navigate("/");
    }
    closeModal();
  };

  return (
    <div className="container p-8 flex flex-col flex-nowrap items-center gap-4 bg-white border border-stone-200 rounded-xl overflow-hidden">
      <h1 className="text-3xl font-bold">Delete Shop</h1>
      <p className="text-lg text-center">
        Are you sure you want to delete this shop?
        <br />
        All of its listed products will be deleted.
        <br />
        <span className="font-semibold">This action cannot be undone.</span>
      </p>
      <div className="w-full self-center flex flex-row flex-nowrap justify-center gap-4">
        <button onClick={handleDelete} className="button-delete">
          Delete
        </button>
        <button onClick={closeModal} className="button-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteShopModal;
