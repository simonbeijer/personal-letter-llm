"use client";
import React from "react";

export default function TextAreaField({ name, value, onChange, placeholder, error, label }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-foreground pl-[2px]">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mb-4 p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
        rows={4}
      />
    </div>
  );
}
