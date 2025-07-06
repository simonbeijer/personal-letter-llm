"use client";
import { useState } from "react";
import WeatherWidget from "../../components/widget/weatherWidget";
import Sidebar from "@/app/components/widget/sidebar";
import Modal from "@/app/components/modal";
export default function Dashboard() {
  const [selectedWidget, setSelectedWidget] = useState("Weather");
  const [isOpen, setIsOpen] = useState(true)

  let content = <WeatherWidget />;
  if (selectedWidget === "Weather") {
    content = <WeatherWidget />;
  } else if (selectedWidget === "Stonks") {
    content = <div className="text-black">Stonks</div>;
  } else if (selectedWidget === "Cool shit") {
    content = <div className="text-black">Cool shit</div>;
  } else {
    content = <WeatherWidget />;
  }

  const closeModal = () => {
      setIsOpen(false)
    }

  return (
    <div className="w-full max-w-6xl mx-auto">
        <p className="text-center">Dashboard</p>
      <div className="flex min-h-screen p-8">
        <Modal isOpen={isOpen} onClose={closeModal}>
          <p className="text-black">You have to accept the terms!?</p>
        </Modal>
        <Sidebar
          selectedWidget={selectedWidget}
          setSelectedWidget={setSelectedWidget}
        />
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
