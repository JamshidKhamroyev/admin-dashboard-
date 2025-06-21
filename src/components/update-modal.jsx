import { BsCurrencyDollar as DollarSign, BsHash as Hash } from "react-icons/bs";
import Modal from "./modal";
import { MdImage } from "react-icons/md";
import { BiStar } from "react-icons/bi";

const UpdateModal = ({ isOpen, setIsOpen, form, setForm, onUpdate }) => {
    const categories = [
      "Men's clothing",
      "Women's clothing",
      "Electronics",
      "Jewelery",
    ];

    const inputStyle =
      "w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

    const handleChange = (field, value) => {
      setForm({ ...form, [field]: value });
    };
    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Mahsulotni yangilash</h3>

            <div>
                <label>Title</label>
                <input
                placeholder="Mahsulot nomi"
                className={inputStyle}
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                />
            </div>

            <div>
                <label>Price</label>
                <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                    type="number"
                    placeholder="Narxini kiriting"
                    className={`${inputStyle} pl-8`}
                    value={form.price}
                    onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                />
                </div>
            </div>

            <div>
                <label>Description</label>
                <textarea
                placeholder="Mahsulot haqida batafsil..."
                className={inputStyle}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                />
            </div>

            <div>
                <label>Category</label>
                <select
                className={inputStyle}
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                >
                <option value="">-- Kategoriya tanlang --</option>
                {categories.map((cat, idx) => (
                    <option key={idx} value={cat.toLowerCase()}>
                    {cat}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label>Image URL</label>
                <div className="relative">
                <MdImage className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                    placeholder="Rasm manzili"
                    className={`${inputStyle} pl-8`}
                    value={form.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                />
                </div>
            </div>

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
                    value={form.rating?.rate || 0}
                    onChange={(e) =>
                        setForm((prev) => ({
                        ...prev,
                        rating: {
                            ...prev.rating,
                            rate: parseFloat(e.target.value),
                        },
                        }))
                    }
                    />
                </div>
                </div>

                <div>
                <label>Rating (Count)</label>
                <div className="relative">
                    <Hash className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    <input
                    type="number"
                    min={0}
                    className={`${inputStyle} pl-8`}
                    value={form.rating?.count || 0}
                    onChange={(e) =>
                        setForm((prev) => ({
                        ...prev,
                        rating: {
                            ...prev.rating,
                            count: parseInt(e.target.value),
                        },
                        }))
                    }
                    />
                </div>
                </div>
            </div>

            <button
                onClick={() => {
                    onUpdate(form.id, form);
                    setIsOpen(false);
                }}
                className="bg-blue-600 active:opacity-80 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4 w-full"
            >
                Update
            </button>
            </div>
        </Modal>
    )
}

export default UpdateModal