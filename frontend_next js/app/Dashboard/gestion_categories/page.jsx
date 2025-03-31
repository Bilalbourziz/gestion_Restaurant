"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie"; // Import the js-cookie library
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Move } from "lucide-react";

const itemsPerPage = 5;

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories', {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });
        const categoriesData = Array.isArray(response.data) ? response.data : [];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const displayedCategories = categories
    .filter((category) => category.name_en.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id);
      const newIndex = categories.findIndex((c) => c.id === over.id);
      setCategories(arrayMove(categories, oldIndex, newIndex));
    }
  };

  const handleDelete = (id) => {
    const token = Cookies.get('token');
    axios.delete(`http://127.0.0.1:8000/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      Swal.fire("Success", "Category deleted successfully", "success");
      setCategories(categories.filter(category => category.id !== id));
    })
    .catch((error) => {
      console.error("An error occurred while deleting the category:", error.response.data);
      Swal.fire("Error", "An error occurred while deleting the category", "error");
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-['Poppins', sans-serif]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Category Management</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
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
      
        <Link href="/Dashboard/gestion_categories/nouvelle_categorie" >
          <button className="bg-rose-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Category</span>
          </button>
        </Link>
      </div>

      <div className="bg-white p-4 shadow-md rounded-md">
        {loading ? (
          <p className="text-center text-gray-600">Loading data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : displayedCategories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={displayedCategories.map((category) => category.id)} strategy={verticalListSortingStrategy}>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 text-left">
                  <tr className="border-b">
                    <th className="p-3 w-10">ID</th>
                    <th className="p-3">Name (EN)</th>
                    <th className="p-3">Name (FR)</th>
                    <th className="p-3">Name (AR)</th>
                    <th className="p-3">Description (EN)</th>
                    <th className="p-3">Description (FR)</th>
                    <th className="p-3">Description (AR)</th>
                    <th className="p-3">Meta Title (EN)</th>
                    <th className="p-3">Meta Title (FR)</th>
                    <th className="p-3">Meta Title (AR)</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCategories.map((category, index) => (
                    <SortableRow key={category.id} category={category} handleDelete={handleDelete} />
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
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "bg-rose-600 text-white" : "bg-gray-200"}`}>
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

function SortableRow({ category, handleDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b bg-white">
      <td className="p-3">{category.id}</td>
      <td className="p-3">{category.name_en}</td>
      <td className="p-3">{category.name_fr}</td>
      <td className="p-3">{category.name_ar}</td>
      <td className="p-3">{category.description_en}</td>
      <td className="p-3">{category.description_fr}</td>
      <td className="p-3">{category.description_ar}</td>
      <td className="p-3">{category.meta_title_en}</td>
      <td className="p-3">{category.meta_title_fr}</td>
      <td className="p-3">{category.meta_title_ar}</td>
      <td className="p-3 flex space-x-2">
        <Edit className="text-blue-500 h-5 w-5 cursor-pointer" />
        <Trash2 className="text-red-500 h-5 w-5 cursor-pointer" onClick={() => handleDelete(category.id)} />
        <Move {...attributes} {...listeners} className="h-5 w-5 text-gray-600" />
      </td>
    </tr>
  );
}