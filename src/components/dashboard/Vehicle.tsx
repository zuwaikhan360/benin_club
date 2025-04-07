"use client";
import { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import Dashboard from "@/components/Dashboard";
import VehicleList from "@/sections/VehicleList";

interface IBarcodeProps {}

export default function VehicleMenu({}: IBarcodeProps) {
  const [currentPage, setCurrentPage] = useState("create");

  const renderPage = () => {
    switch (currentPage) {
      case "create":
        return <QRCodeGenerator />;
      case "view":
        return <VehicleList />;
      default:
        return <QRCodeGenerator />;
    }
  };

  return (
    <div>
      <div className="h-20 bg-red px-8 flex items-center">
        <div className="font-bold text-white text-3xl uppercase">
          Vehicle Sticker
        </div>
      </div>
      <div className="flex flex-col md:flex-row ">
        <Dashboard setCurrentPage={setCurrentPage} />
        <div className="w-full md:w-4/5 flex flex-col mb-4 ">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
