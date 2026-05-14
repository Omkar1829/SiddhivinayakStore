import React, { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import ImageUploader from "./ImageUploader";

const AddProduct = () => {

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [subcategory, setSubcategory] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const handleAddProduct = async () => {

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          category,
          subcategory,
          image: imageUrl,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Failed");
      return;
    }

    alert("Product Added");

    setName("");
    setPrice("");
    setCategory("");
    setSubcategory("");
    setImageUrl("");
  };

  return (

    <div className="p-10 bg-white rounded-3xl shadow-xl">

      <h2 className="text-3xl font-black mb-8">
        Add Product
      </h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="
          w-full p-4 border rounded-2xl mb-5
        "
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="
          w-full p-4 border rounded-2xl mb-5
        "
      />

      {/* CATEGORY */}
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="
          w-full p-4 border rounded-2xl mb-5
        "
      />

      {/* SUBCATEGORY */}
      <input
        type="text"
        placeholder="Subcategory (Optional)"
        value={subcategory}
        onChange={(e) =>
          setSubcategory(e.target.value)
        }
        className="
          w-full p-4 border rounded-2xl mb-5
        "
      />

      {/* IMAGE UPLOAD */}
      <ImageUploader
        onUpload={(url) =>
          setImageUrl(url)
        }
      />

      {/* PREVIEW */}
      {imageUrl && (

        <img
          src={imageUrl}
          alt=""
          className="
            w-40 h-40
            object-cover
            rounded-2xl
            mt-6
          "
        />

      )}

      {/* BUTTON */}
      <button
        onClick={handleAddProduct}
        className="
          mt-8
          bg-emerald-500
          text-white
          px-8 py-4
          rounded-2xl
          font-bold
        "
      >
        Add Product
      </button>

    </div>
  );
};

export default AddProduct;