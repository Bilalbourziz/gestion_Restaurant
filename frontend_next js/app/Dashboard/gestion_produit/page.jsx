"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Search, Plus, Edit, Trash2, Globe, ChevronLeft, ChevronRight, Move } from "lucide-react";

const itemsPerPage = 5;

export default function ProductManagement() {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [language, setLanguage] = useState("fr");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getFieldName = (field) => {
    if (language === "fr") return field;
    return `${field}_${language}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        const categoriesData = Array.isArray(response.data) ? response.data : [];
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setActiveTab(categoriesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeTab === null) return;

    setLoading(true);
    setError(null);

    const token = Cookies.get("token");

    axios
      .get(`http://127.0.0.1:8000/api/table_bord/${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("API response:", response.data);
        const productsData = Array.isArray(response.data.data)
          ? response.data.data.filter((p) => p && typeof p === "object")
          : [];
        console.log("Filtered Products:", productsData);
        setProducts(productsData);
      })
      .catch((err) => {
        console.error("API Error:", err.response?.data || err.message);
        setError("An error occurred while fetching data.");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [activeTab, language]);

  let displayedProducts;
  try {
    displayedProducts = products
      .filter((product) => {
        if (!product || typeof product !== "object") {
          console.warn("Skipping invalid product in filter:", product);
          return false;
        }
        const nameField = getFieldName("name");
        const name = product[nameField] !== null && product[nameField] !== undefined ? String(product[nameField]) : "Not created yet";
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  } catch (e) {
    console.error("Error computing displayedProducts:", e, "Products:", products);
    displayedProducts = [];
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id);
      const newIndex = products.findIndex((p) => p.id === over.id);
      setProducts(arrayMove(products, oldIndex, newIndex));
    }
  };

  const handleDelete = (id) => {
    const token = Cookies.get("token");
    axios
      .delete(`http://127.0.0.1:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire("Success", "Product deleted successfully", "success");
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error.response?.data);
        Swal.fire("Error", "An error occurred while deleting the product", "error");
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-['Poppins', sans-serif]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Product display is enabled</span>
          <input type="checkbox" className="toggle-checkbox" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-md px-3 py-2 pl-10 text-sm w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <select
              className="border rounded-md px-3 py-2 pl-10 text-sm w-40 bg-white"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <Link href="/Dashboard/gestion_produit/nouvaux_produit">
            <button className="bg-rose-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex border-b mb-4 space-x-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`pb-2 text-sm ${
              activeTab === category.id ? "border-b-2 border-rose-600 text-rose-600 font-semibold" : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(category.id);
              setCurrentPage(1);
            }}
          >
            {category.name_en}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 shadow-md rounded-md">
        {loading ? (
          <p className="text-center text-gray-600">Loading data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : displayedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available in this category.</p>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={displayedProducts.map((product) => product.id)} strategy={verticalListSortingStrategy}>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b">
                    <th className="p-3 w-10">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Emporter</th>
                    <th className="p-3">Delivery</th>
                    <th className="p-3">Ingredients</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product) => (
                    <SortableRow key={product.id} product={product} language={language} handleDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </SortableContext>
          </DndContext>
        )}

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "bg-rose-600 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SortableRow({ product, language, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getFieldName = (field) => {
    if (language === "fr") return field;
    return `${field}_${language}`;
  };

  if (!product || typeof product !== "object") {
    console.warn("Invalid product in SortableRow:", product);
    return (
      <tr className="border-b bg-white">
        <td colSpan="8" className="p-3 text-center text-gray-500">
          Invalid product data
        </td>
      </tr>
    );
  }

  return (
    <tr ref={setNodeRef} style={style} className="border-b bg-white">
      <td className="p-3">
        <img
          src={product.image_src ?? "/default-image.png"}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="p-3">{product[getFieldName("name")] ?? "Not created yet"}</td>
      <td className="p-3">{product[getFieldName("description")] ?? "Not created yet"}</td>
      <td className="p-3">{product.emporter} £</td>
      <td className="p-3">{product.livrison} £</td>
      <td className="p-3">{product[getFieldName("ingredians")] ?? "Not created yet"}</td>
      <td className="p-3">{product[getFieldName("title")] ?? "Not created yet"}</td>
      <td className="p-3 flex space-x-2">
        <Edit className="text-blue-500 h-5 w-5 cursor-pointer" />
        <Trash2
          className="text-red-500 h-5 w-5 cursor-pointer"
          onClick={() => handleDelete(product.id)}
        />
        <Move {...attributes} {...listeners} className="h-5 w-5 text-gray-600" />
      </td>
    </tr>
  );
}