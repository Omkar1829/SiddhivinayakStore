import React, { useRef, useState } from "react";
import { supabase } from "../../config/supabaseClient";

const ImageUploader = ({ onUpload }) => {

  const fileInputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const handleFileChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } = await supabase
      .storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      console.log(error);
      alert("Upload Failed");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase
      .storage
      .from("product-images")
      .getPublicUrl(fileName);

    onUpload(publicUrl);

    setUploading(false);
  };

  return (
    <div>

      <button
        onClick={() =>
          fileInputRef.current.click()
        }
        className="
          w-32 h-32
          rounded-3xl
          border-4 border-dashed
          border-emerald-400
          flex items-center justify-center
          text-5xl
          text-emerald-500
          hover:bg-emerald-50
          transition-all
        "
      >
        {uploading ? "..." : "+"}
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

    </div>
  );
};

export default ImageUploader;