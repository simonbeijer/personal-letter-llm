"use client";
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg min-w-[300px] shadow-xl">
        <button onClick={onClose} className="mb-4 text-right text-sm text-gray-500 hover:text-black">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
