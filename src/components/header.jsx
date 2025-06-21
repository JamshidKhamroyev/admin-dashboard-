import { BiLeftArrowAlt, BiPlus, BiStar } from "react-icons/bi";
import { MdDarkMode, MdImage, MdLightMode, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode } from "../reducers/mode";
import { useState } from "react";
import CreateModal from "./create-modal";

const Header = ({ isBack, label, bLabel, addProduct, isOpen, setIsOpen }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rate: 5,
    count: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);

  const logoutHandler = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("data")
    window.location.reload()
  }

  return (
    <>
    <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} setForm={setForm} form={form} addProduct={addProduct} />
      <div className="w-full justify-between md:p-3 p-2 flex items-center border-b">
        <div className="flex items-center gap-2">
          {isBack && (
            <BiLeftArrowAlt
              onClick={() => navigate(-1)}
              className="w-7 h-7 cursor-pointer hover:opacity-80 duration-300"
            />
          )}
          <h2 className="text-xl">{label}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`md:py-1.5 p-1 border rounded-sm cursor-pointer md:px-4 px-3 flex items-center justify-center gap-2 duration-500 ${
              mode
                ? "hover:bg-white hover:text-[#010112]"
                : "hover:bg-[#010112] hover:text-white"
            }`}
          >
            <BiPlus />
            {bLabel}
          </button>

          {mode ? (
            <MdLightMode
              onClick={() => dispatch(setMode())}
              className="md:h-6 md:w-6 text-yellow-400 w-5 h-5 cursor-pointer"
            />
          ) : (
            <MdDarkMode
              onClick={() => dispatch(setMode())}
              className="md:h-6 text-gray-400 md:w-6 w-5 h-5 cursor-pointer"
            />
          )}

          <MdLogout className="md:w-6 md:h-6 w-4 h-4 text-red-600 cursor-pointer" onClick={logoutHandler} />
        </div>
      </div>
    </>
  );
};

export default Header;