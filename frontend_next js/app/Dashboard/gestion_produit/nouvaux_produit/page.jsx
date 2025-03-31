
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function AddProduit() {
  const [language, setLanguage] = useState("fr");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  // formData state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    emporter: "",
    livrison: "",
    title: "",
    ingredients: [],
    category_id: "",
    image: null,
  });

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories', {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Swal.fire("Error", "Failed to fetch categories", "error");
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.description || !formData.category_id || !formData.emporter || !formData.livrison) {
        setError("Tous les champs sont requis.");
        Swal.fire("Validation Error", "Tous les champs sont requis.", "error");
        return;
    }

    try {
        const data = new FormData();
        const emporter = parseInt(formData.emporter);
        const livrison = parseInt(formData.livrison);

        if (isNaN(emporter) || isNaN(livrison)) {
            setError("Les prix doivent être des nombres valides.");
            Swal.fire("Validation Error", "Les prix doivent être des nombres valides.", "error");
            return;
        }

        data.append('language', language);
        switch (language) {
            case 'fr':
                data.append('name', formData.name);
                data.append('description', formData.description);
                data.append('title', formData.title);
                data.append('ingredians', formData.ingredients.join(","));
                break;
            case 'en':
                data.append('name_en', formData.name);
                data.append('description_en', formData.description);
                data.append('title_en', formData.title);
                data.append('ingredians_en', formData.ingredients.join(","));
                break;
            case 'ar':
                data.append('name_ar', formData.name);
                data.append('description_ar', formData.description);
                data.append('title_ar', formData.title);
                data.append('ingredians_ar', formData.ingredients.join(","));
                break;
        }

        data.append("category_id", formData.category_id);
        data.append("emporter", emporter);
        data.append("livrison", livrison);
        if (formData.image) {
            data.append("image", formData.image);
        }

        const token = Cookies.get("token");

        const response = await axios.post('http://127.0.0.1:8000/api/products', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        Swal.fire("Success", "Product added successfully", "success");

        setFormData({
            name: "",
            description: "",
            emporter: "",
            livrison: "",
            title: "",
            ingredients: [],
            category_id: "",
            image: null,
        });
        setImagePreview(null);
    } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.error || "An unexpected error occurred");
        Swal.fire("Error", err.response?.data?.error || "An unexpected error occurred", "error");
    }
};

return (
    <div className="p-8 w-full h-full bg-gray-100 rounded-lg shadow-lg">
      <p className="text-4xl text-gray-900">Nouveau produits</p>
      <p className="text-sm text-gray-500">Veuillez sélectionner un thème pour votre site</p>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {/* Image Upload */}
      <div className="flex space-x-4">
        <div
          className="w-40 h-40 border rounded-lg overflow-hidden flex items-center justify-center cursor-pointer bg-gray-200 text-gray-500"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : "Aucune image"}
        </div>
        <input id="fileInput" type="file" onChange={handleImageChange} className="hidden" />
      </div>

      {/* Language Selection */}
      <div className="mt-2 flex space-x-2">
        {["fr", "en", "ar"].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`text-sm font-medium ${language === lang ? "text-rose-600" : "text-gray-800"}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-sm font-medium">Nom</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Titre</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Prix Emporter</label>
          <input type="number" name="emporter" value={formData.emporter} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Prix Livraison</label>
          <input type="number" name="livrison" value={formData.livrison} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Ingrédients</label>
          <input 
            type="text" 
            name="ingredients" 
            value={formData.ingredients.join(",")} 
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value.split(",") })} 
            className="w-full p-2 border rounded-md" 
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Catégories</label>
          <select 
            className="w-full p-2 border rounded-md" 
            name="category_id" 
            value={formData.category_id} 
            onChange={handleChange}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_en}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="bg-rose-600 text-white px-4 py-1 rounded-md mt-6 text-sm"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}