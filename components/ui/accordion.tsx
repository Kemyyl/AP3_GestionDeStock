
"use client";

import React, { useState, ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-3 px-4 flex justify-between items-center text-left hover:bg-gray-100 focus:outline-none"
      >
        <span className="text-lg font-medium">{title}</span>
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
}

export function Accordion({ children }: AccordionProps) {
  return <div className="w-full divide-y divide-gray-200">{children}</div>;
}
