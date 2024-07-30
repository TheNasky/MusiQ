'use client';
import { useState, useRef, useEffect } from 'react';

export default function ShareDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full pt-3 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
        </svg>▾
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 w-32 rounded-tl-lg rounded-b-lg bg-white py-1.5">
          
          <p className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">código qr</p>
          <p className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Nombre de la lista</p>
          <p className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">código alfanum</p>

        </div>
      )}
    </div>
  );
}
