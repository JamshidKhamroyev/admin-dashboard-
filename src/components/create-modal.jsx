import { useState } from "react";
import Modal from "./modal";
import { BiStar } from "react-icons/bi";
import { BsCurrencyDollar as DollarSign, BsHash as Hash } from "react-icons/bs";
import { MdImage } from "react-icons/md";

const CreateModal = ({ isOpen, setIsOpen, form, setForm, addProduct }) => {
  const categories = [
    "Men's clothing",
    "Women's clothing",
    "Electronics",
    "Jewelery",
  ];

  const [errors, setErrors] = useState({});

  const inputStyle =
    "w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" }); // error yo'qotiladi
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.price || form.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.image) newErrors.image = "Image URL is required";
    if (form.rate < 0 || form.rate > 5) newErrors.rate = "Rate must be between 0 and 5";
    if (form.count < 0) newErrors.count = "Count cannot be negative";

    setErrors(newErrors);
    setTimeout(() => {
        setErrors({})
    }, 2000);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addProduct(form);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-4 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Add new Product</h3>

        {/* Title */}
        <div>
          <label>Title</label>
          <input
            placeholder="Product title"
            className={inputStyle}
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="number"
              placeholder="Product price"
              className={`${inputStyle} pl-8`}
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            placeholder="Put in product information..."
            className={inputStyle}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            className={inputStyle}
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">-- Choose the category --</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label>Image URL</label>
          <div className="relative">
            <MdImage className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              placeholder="Image location url"
              className={`${inputStyle} pl-8`}
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        {/* Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Rating (Rate)</label>
            <div className="relative">
              <BiStar className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                className={`${inputStyle} pl-8`}
                value={form.rate}
                onChange={(e) => handleChange("rate", e.target.value)}
              />
            </div>
            {errors.rate && <p className="text-red-500 text-sm">{errors.rate}</p>}
          </div>

          <div>
            <label>Rating (Count)</label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="number"
                min={0}
                className={`${inputStyle} pl-8`}
                value={form.count}
                onChange={(e) => handleChange("count", e.target.value)}
              />
            </div>
            {errors.count && <p className="text-red-500 text-sm">{errors.count}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 active:opacity-80 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4 w-full"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default CreateModal;