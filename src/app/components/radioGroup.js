"use client";
import React from "react";

export default function RadioGroup({ name, options, selected, onChange, label }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <p className="mb-1 text-foreground">{label}</p>}
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
