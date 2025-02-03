// src/components/ui/textarea.js
import React from "react";

export function Textarea({ id, name, placeholder, value, onChange, className }) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
