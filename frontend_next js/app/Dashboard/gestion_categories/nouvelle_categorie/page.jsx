"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie"; // Import the js-cookie library
import { useRouter } from "next/navigation";

export default function NewCategory() {
  const [nameEn, setNameEn] = useState("");
  const [nameFr, setNameFr] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [metaTitleEn, setMetaTitleEn] = useState("");
  const [metaTitleFr, setMetaTitleFr] = useState("");
  const [metaTitleAr, setMetaTitleAr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = Cookies.get('token');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/categories', {
        name_en: nameEn,
        name_fr: nameFr,
        name_ar: nameAr,
        description_en: descriptionEn,
        description_fr: descriptionFr,
        description_ar: descriptionAr,
        meta_title_en: metaTitleEn,
        meta_title_fr: metaTitleFr,
        meta_title_ar: metaTitleAr,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire("Success", "Category created successfully", "success");
      router.push("/Dashboard/gestion_categories");
    } catch (error) {
      console.error("An error occurred while creating the category:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : "An error occurred while creating the category");
      Swal.fire("Error", error.response ? error.response.data.message : "An error occurred while creating the category", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-['Poppins', sans-serif]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">New Category</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name (EN)</label>
          <input
            type="text"
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name (FR)</label>
          <input
            type="text"
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={nameFr}
            onChange={(e) => setNameFr(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name (AR)</label>
          <input
            type="text"
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description (EN)</label>
          <textarea
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description (FR)</label>
          <textarea
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={descriptionFr}
            onChange={(e) => setDescriptionFr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description (AR)</label>
          <textarea
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Meta Title (EN)</label>
          <input
            type="text"
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={metaTitleEn}
            onChange={(e) => setMetaTitleEn(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Meta Title (FR)</label>
          <input
            type="text"
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={metaTitleFr}
            onChange={(e) => setMetaTitleFr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Meta Title (AR)</label>
          <input
            type="text"
            className="border rounded-md px-3 py-2 mt-1 w-full"
            value={metaTitleAr}
            onChange={(e) => setMetaTitleAr(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-rose-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}