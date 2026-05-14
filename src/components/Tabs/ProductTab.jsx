import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabaseClient';
import { ClipLoader } from "react-spinners";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emergencyProducts = [
  {
    id: 1,
    name: "Basmati Rice 5kg",
    price: 450,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    category: "Rice"
  },
  {
    id: 2,
    name: "Sugar 1kg",
    price: 55,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
    category: "Essentials"
  },
  {
    id: 3,
    name: "Fortune Oil 1L",
    price: 180,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    category: "Oil"
  }
];

const ProductsTab = ({
  addToCart,
  cartItems,
  updateQuantity,
  products,
  setProducts,
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedProductId
}) => {

  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categoryImages, setCategoryImages] =
  useState({});
  const [categoryFiles, setCategoryFiles] = useState({});
  const [isAdmin, setIsAdmin] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);
  const [showImageDeletePopup, setShowImageDeletePopup] = useState(false);
  const [imageDeleteType, setImageDeleteType] =  useState("");
  const [imageDeleteItem, setImageDeleteItem] = useState(null);
  // IMAGE UPLOAD HANDLER
const handleImageUpload = async (
  e,
  category
) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const fileName =
      `${Date.now()}-${file.name}`;

    // UPLOAD
    const { error } =
      await supabase.storage
        .from("product-images")
        .upload(fileName, file);

    if (error) {
      console.log(error);
      return;
    }

    // GET URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    // SAVE IMAGE IN STATE
setCategoryImages((prev) => ({
  ...prev,
  [category]: publicUrl,
}));

setCategoryFiles((prev) => ({
  ...prev,
  [category]: fileName,
}));
  } catch (err) {

    console.log(err);

  }
};


// DELETE IMAGE HANDLER
const handleDeleteImage = async (
  category
) => {

  try {

    const fileName =
      categoryFiles[category];

    if (!fileName) return;

    // DELETE FROM STORAGE
    const { error } =
      await supabase.storage
        .from("product-images")
        .remove([fileName]);

    if (error) {
      console.log(error);
      return;
    }

    // REMOVE FROM UI
    setCategoryImages((prev) => {

      const updated = { ...prev };

      delete updated[category];

      return updated;
    });

    setCategoryFiles((prev) => {

      const updated = { ...prev };

      delete updated[category];

      return updated;
    });

  } catch (err) {

    console.log(err);

  }
};

const getSubcategoryImage = (
  subcategory
) => {

  const product =
    groupedSubcategories[subcategory]?.find(
      (item) => item.subcategory_image
    );

  return product?.subcategory_image;
};

const uploadSubcategoryImage = async (
  e,
  subcategory
) => {

  const file = e.target.files[0];

  if (!file) return;

  const fileName =
    `${Date.now()}-${file.name}`;

  // UPLOAD
  const { error: uploadError } =
    await supabase.storage
      .from("product-images")
      .upload(fileName, file);

  if (uploadError) {
    console.log(uploadError);
    return;
  }

  // GET URL
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

const imageUrl = data.publicUrl;

const existingProduct =
  products.find(
    (item) => item.id === productId
  );

const isUpdate =
  existingProduct?.image;
  // UPDATE PRODUCTS
  const { error } = await supabase
    .from("products")
    .update({
      subcategory_image: imageUrl,
    })
    .eq("subcategory", subcategory);

  if (error) {
    console.log(error);
    return;
  }

  fetchProducts();
};

const deleteSubcategoryImage = async (
  subcategory
) => {

 const deleteProduct = async (
  productId
) => {

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {

    console.log(error);

    toast.error(
      "Failed to delete product"
    );

    return;
  }

  setProducts((prev) =>
    prev.filter(
      (item) => item.id !== productId
    )
  );

  toast.success(
    "Product deleted successfully"
  );
};

  const { error } = await supabase
    .from("products")
    .update({
      subcategory_image: null,
    })
    .eq("subcategory", subcategory);

  if (error) {
    console.log(error);
    return;
  }

  fetchProducts();
};


  // FETCH PRODUCTS
  const fetchProducts = async () => {

    setLoading(true);

    try {

     const { data, error } = await supabase
  .from("products")
  .select("*")
  .order("id", { ascending: true });

      if (error) throw error;

      setProducts(data);

      localStorage.setItem(
        "cachedProducts",
        JSON.stringify(data)
      );

    } catch (error) {

      console.error("Supabase Error:", error);

      const cachedProducts =
        localStorage.getItem("cachedProducts");

      if (cachedProducts) {

        setProducts(JSON.parse(cachedProducts));

      } else {

        setProducts(emergencyProducts);

      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  // CATEGORY IMAGE UPLOAD
const uploadCategoryImage = async (
  e,
  category
) => {

  const file = e.target.files[0];

  if (!file) return;

  const fileName =
    `${Date.now()}-${file.name}`;

  // UPLOAD TO STORAGE
  const { error: uploadError } =
    await supabase.storage
      .from("product-images")
      .upload(fileName, file);

  if (uploadError) {
    console.log(uploadError);
    return;
  }

  // GET PUBLIC URL
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  const imageUrl = data.publicUrl;

  // UPDATE PRODUCTS OF SAME CATEGORY
  const { error } = await supabase
    .from("products")
    .update({
      category_image: imageUrl,
    })
    .eq("category", category);

  if (error) {

    console.log(error);

    toast.error(
      "Failed to upload category image"
    );

    return;
  }

  const existingCategory =
    groupedProducts[category]?.find(
      (item) => item.category_image
    );

  fetchProducts();

  toast.success(
    existingCategory
      ? "Category image updated successfully"
      : "Category image added successfully"
  );

};

const filteredProducts = products.filter((product) => {

  const search =
    searchTerm?.toLowerCase() || "";

  return (
    product.name
      ?.toLowerCase()
      .includes(search) ||

    product.category
      ?.toLowerCase()
      .includes(search) ||

    product.subcategory
      ?.toLowerCase()
      .includes(search)
  );

});

const deleteCategoryImage = async (
  category
) => {

  try {

    const { error } = await supabase
      .from("products")
      .update({
        category_image: null,
      })
      .eq("category", category);

    if (error) {

      console.log(error);

      toast.error(
        "Failed to delete category image"
      );

      return;
    }

    fetchProducts();

    toast.success(
      "Category image deleted successfully"
    );

  } catch (err) {

    console.log(err);

    toast.error(
      "Something went wrong"
    );

  }
};
const deleteProduct = async (
  productId
) => {


  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {

    console.log(error);

    toast.error(
      "Failed to delete product"
    );

    return;
  }

  setProducts((prev) =>
    prev.filter(
      (item) => item.id !== productId
    )
  );

  toast.success(
    "Product deleted successfully"
  );
};

  // CART PRODUCT QTY
  const getProductQuantity = (productId) => {

    const item = cartItems.find(
      item => item.id === productId
    );

    return item ? item.quantity : 0;
  };

  // LOCAL QTY UPDATE
  const updateLocalQuantity = (
    productId,
    change
  ) => {

    const cartQty =
      getProductQuantity(productId);

    setQuantities((prev) => {

      const currentQty =
        prev[productId] ?? cartQty;

      return {
        ...prev,
        [productId]: Math.max(
          0,
          currentQty + change
        ),
      };
    });
  };

  // REALTIME UPDATES
  const getCategoryImage = (category) => {

  const product =
    groupedProducts[category]?.find(
      (item) => item.category_image
    );

  return product?.category_image;
};

  // RESET LOCAL QTY WHEN CART REMOVED
  useEffect(() => {

    const updatedQuantities = { ...quantities };

    products.forEach((product) => {

      const cartQty =
        getProductQuantity(product.id);

      updatedQuantities[product.id] =
        cartQty;
    });

    setQuantities(updatedQuantities);

  }, [cartItems]);

  // GROUP PRODUCTS BY CATEGORY
  const groupedProducts = products.reduce(
    (acc, product) => {

      if (!acc[product.category]) {
        acc[product.category] = [];
      }

      acc[product.category].push(product);

      return acc;

    },
    {}
  );

  // PRODUCT IMAGE UPLOAD
// PRODUCT IMAGE UPLOAD
const uploadProductImage = async (
  e,
  productId
) => {

  try {

    const file = e.target.files[0];

    if (!file) return;

    // FIND EXISTING PRODUCT
    const existingProduct =
      products.find(
        (item) =>
          item.id === productId
      );

    const isUpdate =
      existingProduct?.image;

    const fileName =
      `${Date.now()}-${file.name}`;

    // UPLOAD IMAGE
    const {
      error: uploadError,
    } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (uploadError) {

      console.log(uploadError);

      toast.error(
        "Failed to upload image"
      );

      return;
    }

    // GET URL
    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const imageUrl =
      data.publicUrl;

    // UPDATE PRODUCT
    const { error } =
      await supabase
        .from("products")
        .update({
          image: imageUrl,
        })
        .eq("id", productId);

    if (error) {

      console.log(error);

      toast.error(
        "Failed to save image"
      );

      return;
    }

    fetchProducts();

    toast.success(
      isUpdate
        ? "Product image updated successfully"
        : "Product image added successfully"
    );

  } catch (err) {

    console.log(err);

    toast.error(
      "Something went wrong"
    );

  }

};

// DELETE PRODUCT IMAGE
// DELETE PRODUCT IMAGE
const deleteProductImage = async (
  productId
) => {

  try {

    const { error } = await supabase
      .from("products")
      .update({
        image: null,
      })
      .eq("id", productId);

    if (error) {

      console.log(error);

      toast.error(
        "Failed to delete product image"
      );

      return;
    }

    fetchProducts();

    toast.success(
      "Product image deleted successfully"
    );

  } catch (err) {

    console.log(err);

    toast.error(
      "Something went wrong"
    );

  }
};

const deleteCategory = async (
  category
) => {


  const { error } = await supabase
    .from("products")
    .delete()
    .eq("category", category);

  if (error) {

    console.log(error);

    toast.error(
      "Failed to delete category"
    );

    return;
  }

  fetchProducts();

  setSelectedCategory(null);

  toast.success(
    "Category deleted successfully"
  );
};

useEffect(() => {

  if (!selectedProductId) return;

  setTimeout(() => {

    const element =
      document.getElementById(
        `product-${selectedProductId}`
      );

    if (element) {

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

    }

  }, 500);

}, [selectedCategory, selectedProductId]);


  return (
    <div>

      {/* <ToastContainer
  position="top-right"
  autoClose={3000}
/> */}

      {/* TITLE */}
      <div className="text-center mb-20">

        <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6">
          🛒 All Products
        </h2>

        <p className="text-xl text-gray-600 font-semibold">
          Fresh groceries at unbeatable prices
        </p>

      </div>

      {/* LOADER */}
      {loading ? (

        <div className="flex flex-col items-center justify-center py-32">

          <ClipLoader
            color="#10b981"
            loading={loading}
            size={80}
            speedMultiplier={1}
          />

          <p className="mt-6 text-2xl font-bold text-emerald-600 animate-pulse">
            Loading Fresh Products...
          </p>

        </div>

      ) : (

        <>
          {/* CATEGORY VIEW */}
       {/* CATEGORY VIEW */}
{/* CATEGORY VIEW */}
{!selectedCategory ? (

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

    {Object.keys(groupedProducts).map((category) => (

      <div
        key={category}
        className="
          group
          relative
          bg-white
          rounded-3xl
          shadow-lg
          hover:shadow-2xl
          border border-gray-100
          p-4
          transition-all duration-300
          hover:-translate-y-2
        "
      >

        {/* CATEGORY IMAGE */}
        <div
          className="
            relative
            aspect-square
            overflow-hidden
            rounded-2xl
            mb-4
            bg-gradient-to-br
            from-emerald-100
            to-green-100
          "
        >

          {getCategoryImage(category) ? (

            <img
              src={getCategoryImage(category)}
              alt={category}
              className="
                w-full
                h-full
                object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
            />

          ) : (

            <div className="w-full h-full flex items-center justify-center">

              {/* <h2 className="text-2xl font-black text-emerald-700 text-center">
                {category}
              </h2> */}
              <div className='text-center'>

              <div className="text-6xl mb-2">
          📦
        </div>

        <p className="text-lg font-bold text-emerald-700">
          No Image
        </p>
              </div>

            </div>

          )}

          {/* CATEGORY IMAGE CONTROLS */}
          {isAdmin && (

            <div
              className="
                absolute
                top-3
                right-3
                flex
                flex-col
                gap-2
                opacity-0
                group-hover:opacity-100
                transition-all duration-300
                z-50
              "
            >

              {/* ADD / EDIT IMAGE */}
              <label
                className="
                  w-10
                  h-10
                  bg-white/90
                  backdrop-blur-xl
                  rounded-xl
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:bg-emerald-500
                  hover:text-white
                  transition-all duration-300
                "
              >

                <span className="text-lg font-bold">
                  {getCategoryImage(category)
                    ? "✎"
                    : "+"}
                </span>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    uploadCategoryImage(
                      e,
                      category
                    )
                  }
                />

              </label>

              {/* DELETE CATEGORY IMAGE */}
              {getCategoryImage(category) && (

                <button
                 onClick={() => {

  setImageDeleteType(
    "category-image"
  );

  setImageDeleteItem(
    category
  );

  setShowImageDeletePopup(
    true
  );

}}
                  className="
                    w-10
                    h-10
                    bg-white/90
                    backdrop-blur-xl
                    rounded-xl
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    hover:bg-red-500
                    hover:text-white
                    transition-all duration-300
                  "
                >
                  🗑
                </button>

              )}

            </div>

          )}

          {/* CENTER DELETE CATEGORY */}
          {isAdmin && (

            <button
             onClick={() => {

  setDeleteType("category");

  setDeleteItem(category);

  setShowDeletePopup(true);

}}
              className="
                absolute
                inset-0
                m-auto
                w-20
                h-12
                rounded-md
                bg-red-500/90
                text-white
                text-2xl
                backdrop-blur-xl
                shadow-2xl
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition-all duration-300
                z-40
                hover:scale-110
              "
            >
              Delete
            </button>

          )}

        </div>

        {/* CATEGORY NAME */}
        <h3 className="text-lg font-bold text-center text-gray-800 mb-2">
          {category}
        </h3>

        {/* PRODUCT COUNT */}
        <p className="text-sm text-gray-500 text-center mb-4">
          {groupedProducts[category].length} Products
        </p>

        {/* VIEW BUTTON */}
        <button
          onClick={() =>
            setSelectedCategory(category)
          }
          className="
            w-full
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            hover:from-emerald-600
            hover:to-green-700
            text-white
            font-semibold
            py-3
            rounded-xl
            transition-all duration-300
          "
        >
          View Products
        </button>

      </div>

    ))}

  </div>

) : (

            <>
              {/* BACK BUTTON */}
              <div className="mb-10 flex items-center justify-between">

                <div>

                  <h2 className="text-4xl font-black text-emerald-700">
                    {selectedCategory}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Explore all products
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelectedCategory(null)
                  }
                  className="
                    bg-gray-200
                    hover:bg-gray-300
                    text-gray-800
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    transition-all
                  "
                >
                  ← Back
                </button>

              </div>

              {/* PRODUCTS GRID */}
          {/* PRODUCTS GRID */}
{/* PRODUCTS GRID */}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

  {filteredProducts
  .filter(
    (product) =>
      product.category === selectedCategory
  )
  .map((product) => {

    const qty =
      quantities[product.id] ??
      getProductQuantity(product.id);

    return (

      <div
          id={`product-${product.id}`}
  key={product.id}
        className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          overflow-hidden
          relative
          hover:shadow-lg
          transition-all
          duration-300
        "
      >

        {/* IMAGE SECTION */}
        <div className="relative p-3">

          {/* PRODUCT IMAGE */}
         {/* PRODUCT IMAGE */}
<div
  className="
    relative
    h-56
    overflow-hidden
    rounded-3xl
    mb-6
    bg-gradient-to-br
    from-emerald-100
    to-green-100
    shadow-lg
    group
  "
>

  {/* PRODUCT IMAGE */}
  {product.image ? (

    <img
      src={product.image}
      alt={product.name}
      className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-500
        group-hover:scale-110
      "
    />

  ) : (

    <div className="w-full h-full flex items-center justify-center">

      <div className="text-center">

        <div className="text-6xl mb-2">
          📦
        </div>

        <p className="text-lg font-bold text-emerald-700">
          No Image
        </p>

      </div>

    </div>

  )}

  {/* ============================= */}
  {/* CENTER DELETE PRODUCT BUTTON */}
  {/* ============================= */}

  {isAdmin && product.image && (

    <button
      onClick={() => {

        setDeleteType("product");

        setDeleteItem(product.id);

        setShowDeletePopup(true);

      }}
      className="
        absolute
        inset-0
        m-auto
        w-28
        h-12
        rounded-2xl
        bg-red-500/90
        text-white
        font-bold
        backdrop-blur-xl
        shadow-2xl
        flex
        items-center
        justify-center
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-300
        z-40
        hover:scale-110
      "
    >
      Delete
    </button>

  )}

  {/* ============================= */}
  {/* TOP RIGHT CONTROLS */}
  {/* ============================= */}

  {isAdmin && (

    <div
      className="
        absolute
        top-3
        right-3
        flex
        flex-col
        gap-2
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-300
        z-50
      "
    >

      {/* ============================= */}
      {/* SHOW ADD BUTTON ONLY IF IMAGE NOT EXISTS */}
      {/* ============================= */}

      {!product.image && (

        <label
          className="
            w-11
            h-11
            bg-white/95
            backdrop-blur-xl
            rounded-2xl
            shadow-lg
            flex
            items-center
            justify-center
            cursor-pointer
            hover:bg-emerald-500
            hover:text-white
            transition-all
            duration-300
          "
        >

          <span className="text-2xl font-bold">
            +
          </span>

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              uploadProductImage(
                e,
                product.id
              )
            }
          />

        </label>

      )}

      {/* ============================= */}
      {/* SHOW EDIT + DELETE ONLY IF IMAGE EXISTS */}
      {/* ============================= */}

      {product.image && (

        <>
          {/* EDIT IMAGE */}
          <label
            className="
              w-11
              h-11
              bg-white/95
              backdrop-blur-xl
              rounded-2xl
              shadow-lg
              flex
              items-center
              justify-center
              cursor-pointer
              hover:bg-emerald-500
              hover:text-white
              transition-all
              duration-300
            "
          >

            <span className="text-lg">
              ✎
            </span>

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                uploadProductImage(
                  e,
                  product.id
                )
              }
            />

          </label>

          {/* DELETE IMAGE */}
          <button
           onClick={() => {

  setImageDeleteType(
    "product-image"
  );

  setImageDeleteItem(
    product.id
  );

  setShowImageDeletePopup(
    true
  );

}}
            className="
              w-11
              h-11
              bg-white/95
              backdrop-blur-xl
              rounded-2xl
              shadow-lg
              flex
              items-center
              justify-center
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            🗑
          </button>
        </>

      )}

    </div>

  )}

</div>

          {/* ADD BUTTON */}
          {qty === 0 ? (

            <button
              onClick={() =>
                updateLocalQuantity(
                  product.id,
                  1
                )
              }
              className="
                absolute
                bottom-4
                right-4
                bg-white
                border-2
                border-pink-500
                text-pink-600
                font-bold
                px-5
                py-1.5
                rounded-xl
                shadow-md
              "
            >
              ADD
            </button>

          ) : (

            <div
              className="
                absolute
                bottom-4
                right-4
                flex
                items-center
                bg-pink-600
                rounded-xl
                overflow-hidden
                shadow-lg
              "
            >

              <button
                onClick={() =>
                  updateLocalQuantity(
                    product.id,
                    -1
                  )
                }
                className="
                  px-3
                  py-1
                  text-white
                  text-lg
                  font-bold
                "
              >
                -
              </button>

              <span
                className="
                  px-3
                  text-white
                  font-bold
                "
              >
                {qty}
              </span>

              <button
                onClick={() =>
                  updateLocalQuantity(
                    product.id,
                    1
                  )
                }
                className="
                  px-3
                  py-1
                  text-white
                  text-lg
                  font-bold
                "
              >
                +
              </button>

            </div>

          )}

        </div>

        {/* PRODUCT DETAILS */}
        <div className="px-3 pb-4">

          {/* PRICE */}
          <div
            className="
              inline-block
              bg-green-700
              text-white
              text-sm
              font-bold
              px-3
              py-1
              rounded-lg
              mb-3
            "
          >
            ₹{product.price}
          </div>

          {/* PRODUCT NAME */}
          <h3
            className="
              text-[15px]
              font-semibold
              text-gray-800
              leading-snug
              line-clamp-2
            "
          >
            {product.name}
          </h3>

          {/* WEIGHT */}
          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            {product.weight || "1 pc"}
          </p>

          {/* ADD TO CART BUTTON */}
          {qty > 0 && (

            <button
              onClick={() =>
                addToCart(product, qty)
              }
              className="
                w-full
                mt-4
                bg-green-600
                hover:bg-green-700
                text-white
                py-2
                rounded-xl
                font-semibold
                transition-all
              "
            >
              Add To Cart
            </button>

          )}

        </div>

      </div>

    );

  })}

</div>
            </>
          )}
        </>
      )}

  <div>

    <ToastContainer
      position="top-right"
      autoClose={3000}
    />

    {/* ALL YOUR UI */}

    {/* DELETE POPUP */}
    {showDeletePopup && (

      <div
        className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-[9999]
        "
      >

        <div
          className="
            bg-white
            p-8
            rounded-3xl
            shadow-2xl
            w-[90%]
            max-w-md
            text-center
          "
        >

          <h2 className="text-3xl font-black mb-4 text-gray-800">
            Delete Confirmation
          </h2>

          <p className="text-gray-600 mb-8 text-lg">

            Are you sure you want to delete this{" "}

            <span className="font-bold text-red-500">
              {deleteType}
            </span>

            ?

          </p>

          <div className="flex justify-center gap-4">

            {/* CANCEL */}
            <button
              onClick={() =>
                setShowDeletePopup(false)
              }
              className="
                px-6
                py-3
                rounded-2xl
                bg-gray-200
                hover:bg-gray-300
                font-bold
              "
            >
              Cancel
            </button>

            {/* YES DELETE */}
            <button
              onClick={async () => {

                if (
                  deleteType === "product"
                ) {

                  await deleteProduct(
                    deleteItem
                  );

                } else {

                  await deleteCategory(
                    deleteItem
                  );

                }

                setShowDeletePopup(false);

              }}
              className="
                px-6
                py-3
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                text-white
                font-bold
              "
            >
              Yes Delete
            </button>

          </div>

        </div>

      </div>

    )}

    {/* IMAGE DELETE POPUP */}
{showImageDeletePopup && (

  <div
    className="
      fixed
      inset-0
      bg-black/50
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-[9999]
    "
  >

    <div
      className="
        bg-white
        p-8
        rounded-3xl
        shadow-2xl
        w-[90%]
        max-w-md
        text-center
        animate-in
        fade-in
        zoom-in
        duration-300
      "
    >

      <h2
        className="
          text-3xl
          font-black
          mb-4
          text-gray-800
        "
      >
        Delete Image
      </h2>

      <p
        className="
          text-gray-600
          mb-8
          text-lg
        "
      >

        Are you sure you want to
        delete this image?

      </p>

      <div
        className="
          flex
          justify-center
          gap-4
        "
      >

        {/* CANCEL */}
        <button
          onClick={() =>
            setShowImageDeletePopup(
              false
            )
          }
          className="
            px-6
            py-3
            rounded-2xl
            bg-gray-200
            hover:bg-gray-300
            font-bold
            transition-all
          "
        >
          Cancel
        </button>

        {/* DELETE */}
        <button
          onClick={async () => {

            if (
              imageDeleteType ===
              "product-image"
            ) {

              await deleteProductImage(
                imageDeleteItem
              );

            } else {

              await deleteCategoryImage(
                imageDeleteItem
              );

            }

            setShowImageDeletePopup(
              false
            );

          }}
          className="
            px-6
            py-3
            rounded-2xl
            bg-red-500
            hover:bg-red-600
            text-white
            font-bold
            transition-all
          "
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}

  </div>

    </div>
    
  );
};

export default ProductsTab;