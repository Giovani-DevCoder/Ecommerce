// src/components/ui/input.js
import React from "react";

export function Input({ id, type = "", placeholder, name, value, onChange, className }) {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    );
  }
  