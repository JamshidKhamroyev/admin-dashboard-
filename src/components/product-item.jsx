import React, { useRef, useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaTag,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion"
import { MdCategory } from "react-icons/md";
import { BiLoader } from "react-icons/bi";
import UpdateModal from "./update-modal";

const ProductItem = ({ product, onDelete, onUpdate, load }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(product);
  const { title, description, price, image, rating, category } = form;
  const roundedRating = Math.round(rating?.rate || 0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {/* Update product modal */}
      <UpdateModal isOpen={isOpen} setIsOpen={setIsOpen} setForm={setForm} form={form} onUpdate={onUpdate}/>
      {/* Product card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: .5 }}
        className="rounded-sm shadow-md w-full border border-gray-200 dark:border-gray-700 transition hover:shadow-xl duration-300 flex flex-col h-[540px]"
      >
        <div className="w-full h-72 overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="object-fill h-full w-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Product info */}
        <div className="flex-1 space-y-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg text-blue-600 font-semibold line-clamp-1">{title}</h3>
            <p className="text-sm line-clamp-3 opacity-70">{description}</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-sm gap-2 opacity-80">
              <MdCategory className="text-base" />
              <span>{category}</span>
            </div>

            <div className="flex items-center gap-2 text-base font-medium">
              <FaTag className="text-green-500" />
              <del>${(price + 10).toFixed(2)}</del><span>${price}</span>
            </div>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 mt-1">
            {Array.from({ length: 5 }, (_, i) =>
              i < roundedRating ? (
                <FaStar key={i} className="text-sm" />
              ) : (
                <FaRegStar key={i} className="text-sm" />
              )
            )}
            <span className="ml-2 text-sm opacity-70">({rating?.count})</span>
          </div>
        </div>
        {/* Delete and Update button */}
        <div className="w-full p-2 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-current transition duration-200 
            hover:bg-green-100/10 hover:text-green-500 dark:hover:bg-green-500/10"
            disabled={load}
          >
            <FaEdit />
            {load ? <BiLoader className="animate-spin text-base" /> : "Update"}
          </button>

          <button
            onClick={() => onDelete(form.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-current text-red-500 
            hover:bg-red-100/10 dark:hover:bg-red-500/10 hover:text-red-600 transition duration-200"
            disabled={load}
          >
            <FaTrash />
            {load ? <BiLoader className="animate-spin text-base" /> : "Delete"}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ProductItem;
