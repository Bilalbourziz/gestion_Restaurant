"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie"; // Import the js-cookie library
import "../globals.css";
import { AlignJustifyIcon, Bell, ChartNoAxesCombined, CircleUser, LogOut, NotebookText, PackageSearch, ShoppingBasket, ShoppingCart, TicketSlash ,Settings} from "lucide-react";

const items = [
  { name: "Table Board", href: "/Dashboard/table_bord", icon: <ChartNoAxesCombined /> },
  { name: "Commandes", href: "/Dashboard/commandes", icon: <ShoppingCart /> },
  { name: "Gestion des Produits", href: "/Dashboard/gestion_produit", icon: <PackageSearch /> },
  { name: "Gestion des ingrédients", href: "/Dashboard/gestion_ingredients", icon: <ShoppingBasket /> },
  { name: "Gestion des catégories", href: "/Dashboard/gestion_categories", icon: <NotebookText /> },
  { name: "Code Promo", href: "/Dashboard/code_promo", icon: <TicketSlash /> },
  { name: "gestion Contenu", href: "/Dashboard/gestion_contenu", icon: <Settings /> },
];

export default function RootLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(items[0].name);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const fetchUserData = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No authentication token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Fetched User Data:", responseData);
      
      // Extract the user data from the nested 'data' property
      setUser(responseData.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to fetch user data when component mounts
  useEffect(() => {
    if (showProfile && !user) {
      fetchUserData();
    }
  }, [showProfile, user]);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const defaultDashboard = (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard. Select an option from the sidebar to get started.</p>
    </div>
  );

  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <div className="flex flex-1">
          {/* Sidebar */}
          <nav
            className={`${
              isCollapsed ? "w-16" : "w-64"
            } bg-stone-300 text-gray-900 flex flex-col p-y-1 space-y-4 transition-all duration-300 ease-in-out items-center`}
          >
            <Image
              src="/image.png"
              alt="logo"
              width={isCollapsed ? 40 : 88}
              height={isCollapsed ? 40 : 88}
              className="object-contain mb-8"
              onError={(e) => {
                e.target.src = "/fallback-image.png";
              }}
            />
            <div className="space-y-2 w-full">
              {items.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className={`flex items-center space-x-2 p-2 
                    ${activeItem === item.name ? "bg-rose-600 text-white mr-[-40px] " : "hover:bg-rose-600 hover:text-white "} 
                    rounded-r-[20px] hover:mr-[-40px]  group 
                    transition-all duration-200 ease-in-out
                    relative overflow-hidden`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <div className="flex-shrink-0 w-6">
                    {item.icon}
                  </div>
                  <span 
                    className={`${
                      isCollapsed ? "hidden" : "block"
                    } transition-all duration-200 group-hover:pr-2`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <div 
                className="flex items-center space-x-2 p-2 
                  hover:bg-gray-700 hover:text-white 
                  rounded-md cursor-pointer 
                  transition-all duration-200 ease-in-out"
              >
                <div className="flex-shrink-0 w-6">
                  <LogOut href="/login"/>
                </div>
                <span className={`${isCollapsed ? "hidden" : "block"}`}>
                  Logout
                </span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center p-4 shadow-md bg-white relative">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleSidebar} 
                  className="p-2 focus:outline-none hover:bg-gray-100 rounded-md"
                >
                  <AlignJustifyIcon />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0"></div>
                  <Bell />
                </div>
                <button 
                  onClick={handleProfileClick}
                  className="focus:outline-none"
                >
                  <CircleUser />
                </button>
                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute top-12 right-4 bg-white shadow-lg rounded-md p-4 w-64 z-10">
                    {loading ? (
                      <p>Loading...</p>
                    ) : user ? (
                      <div className="space-y-2">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    ) : (
                      <p>Error loading profile</p>
                    )}
                  </div>
                )}
              </div>
            </header>

            {/* Main Content Area */}
            <main className="p-4 flex-1 overflow-auto">
              {children || defaultDashboard}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}