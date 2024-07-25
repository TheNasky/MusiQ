'use client';
import { useState, useRef, useEffect } from 'react';

export default function PrivateDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  const options = ['Privada', 'Pública'];

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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center w-full pt-3 text-sm text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || 'Seleccionar'}▾
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-tl-lg rounded-b-lg bg-white py-1.5 shadow-lg">
          {options.map((option, index) => (
            <label key={index} className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer">
              {option}
              <input
                type="checkbox"
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
