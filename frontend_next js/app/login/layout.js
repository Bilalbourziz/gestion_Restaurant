"use client";
import "../globals.css";



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
      < div>
              {children }
            </div>
      </body>
    </html>
  );
}