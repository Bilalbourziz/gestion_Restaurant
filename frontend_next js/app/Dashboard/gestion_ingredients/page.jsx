"use client";
import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiMove } from 'react-icons/fi'; // Added FiMove for drag handle
import Head from 'next/head';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import Cookies from "js-cookie"; 
import axios from 'axios';

axios.defaults.withCredentials = true; // Ensure credentials are sent with requests

export default function IngredientsManagement() {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newIngredient, setNewIngredient] = useState({
    nameFr: '',
    nameEn: '',
    nameAr: '',
  });
  const [editingIngredient, setEditingIngredient] = useState(null);

  useEffect(() => {
    fetchIngredients();
  }, []);
  const token = Cookies.get('token');

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ingredients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient({
      ...newIngredient,
      [name]: value
    });
  };

  const handleAddIngredient = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/ingredients', {
        name_fr: newIngredient.nameFr,
        name_en: newIngredient.nameEn,
        name_ar: newIngredient.nameAr,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIngredients([...ingredients, response.data]);
      setNewIngredient({
        nameFr: '',
        nameEn: '',
        nameAr: '',
      });
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleEditIngredient = (ingredient) => {
    setEditingIngredient(ingredient);
    setNewIngredient({
      nameFr: ingredient.name_fr,
      nameEn: ingredient.name_en,
      nameAr: ingredient.name_ar,
    });
  };

  const handleUpdateIngredient = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/ingredients/${editingIngredient.id}`, {
        name_fr: newIngredient.nameFr,
        name_en: newIngredient.nameEn,
        name_ar: newIngredient.nameAr,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIngredients(ingredients.map(ingredient => 
        ingredient.id === editingIngredient.id ? response.data : ingredient
      ));
      setEditingIngredient(null);
      setNewIngredient({
        nameFr: '',
        nameEn: '',
        nameAr: '',
      });
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/ingredients/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.name_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);

  const onDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = ingredients.findIndex(item => item.id === active.id);
      const newIndex = ingredients.findIndex(item => item.id === over.id);
      
      setIngredients(arrayMove(ingredients, oldIndex, newIndex));
    }
  };

  const SortableItem = ({ ingredient }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({ id: ingredient.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition
    };

    return (
      <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ingredient.id}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ingredient.name_fr}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ingredient.name_en}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ingredient.name_ar}</td>
        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            <button 
              className="text-gray-400 hover:text-gray-700 cursor-move"
              {...attributes}
              {...listeners}
            >
              <FiMove className="h-4 w-4" />
            </button>
            <button className="text-red-400 hover:text-red-700" onClick={() => handleDeleteIngredient(ingredient.id)}>
              <FiTrash2 className="h-4 w-4" />
            </button>
            <button className="text-green-400 hover:text-green-700" onClick={() => handleEditIngredient(ingredient)}>
              <FiEdit className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Gestion des ingrédients</title>
      </Head>
      
      <div className="px-6 py-4">
        <h1 className="text-2xl font-medium text-gray-800">gestion des ingrédients</h1>
        <p className="text-sm text-gray-600 mt-1">veuillez sélectionner un thèmes pour votre site</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-md shadow p-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">{editingIngredient ? 'Modifier ingrédient' : 'Nouveau ingrédient'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nom (fr)</label>
                <input
                  type="text"
                  name="nameFr"
                  value={newIngredient.nameFr}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nom (en)</label>
                <input
                  type="text"
                  name="nameEn"
                  value={newIngredient.nameEn}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nom (ar)</label>
                <input
                  type="text"
                  name="nameAr"
                  value={newIngredient.nameAr}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              
              <button
                onClick={editingIngredient ? handleUpdateIngredient : handleAddIngredient}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded transition duration-200"
              >
                {editingIngredient ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-white rounded-md shadow">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-700">liste des ingrédients</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Recherche"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-64 border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nom (fr)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nom (en)</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nom (ar)</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <SortableContext
                        items={currentItems.map(item => item.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {currentItems.map((ingredient) => (
                          <SortableItem key={ingredient.id} ingredient={ingredient} />
                        ))}
                      </SortableContext>
                    </tbody>
                  </table>
                </div>
              </DndContext>
              
              <div className="flex items-center justify-center mt-6">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === i + 1 ? 'bg-pink-50 text-pink-600 z-10' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}