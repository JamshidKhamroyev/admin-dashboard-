import { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import ProductItem from "./product-item";
import { BiLoader } from "react-icons/bi";
import { toast } from "react-toastify";
import Category from "./category";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [onSelect, setOnSelect] = useState("")
  const [load, setLoad] = useState(false);

  const filteredProducts = onSelect
  ? products.filter((product) =>
      product.category.toLowerCase() === onSelect.toLowerCase()
    )
  : products;

  const loadLocalStorage = () => {
    try {
      const localData = localStorage.getItem("data");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
        } else {
          localStorage.removeItem("data");
        }
      }
    } catch (error) {
      localStorage.removeItem("data");
    }
  };

  const getAllProduct = async () => {
    setLoad(true);
    try {
      const localData = localStorage.getItem("data");
      if (!localData) {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        localStorage.setItem("data", JSON.stringify(data));
        setProducts(data);
      }
    } catch (error) {
      toast.error(`Error: ${error.response.data}`)
    } finally {
      setLoad(false);
    }
  };

  const clickHandler = () => {
    setIsOpen(prev => !prev);
  };

  const onDelete = (id) => {
    setProducts(prev => {
      const updated = prev.filter(product => product.id !== id);
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
    toast("Product deleted succesfully")
  };

  const onUpdate = (currentId, newData) => {
    setProducts(prev => {
      const updated = prev.map(p =>
        p.id === currentId ? { ...p, ...newData } : p
      );
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
    toast("Product updated succesfully")
  };

  const addProduct = (data) => {
    setIsOpen(false);
    setProducts(prev => {
      const updated = [data, ...prev];
      localStorage.setItem("data", JSON.stringify(updated));
      return updated;
    });
    toast("Product added succesfully")
  };  

  useEffect(() => {
    loadLocalStorage();
    getAllProduct();

    const handleUnload = () => {
      localStorage.removeItem("data");
    };
  
    window.addEventListener("beforeunload", handleUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <>
      <Header
        label={"Admin panel"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addProduct={addProduct}
        bLabel={"Add new"}
        onClick={clickHandler}
      />

      <Category 
        selected={onSelect}
        onSelect={setOnSelect}
      />

      {load && (
        <div className="w-full h-screen py-2 flex items-center justify-center">
          <BiLoader className="h-8 md:h-10 md:w-10 w-8 animate-spin" />
        </div>
      )}

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 md:py-3 py-2 max-md:px-1">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, i) => (
            <ProductItem
              key={product.id}
              product={product}
              load={load}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <p className="w-full flex items-center justify-center">No products yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;
