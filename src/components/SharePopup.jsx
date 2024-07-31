import React from "react";
import QRCode from "qrcode.react";

const SharePopup = ({ isOpen, onClose, listCode, listUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#140933] bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full text-white">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#6d58a5]">Compartir Lista</h2>
        <div className="flex flex-col md:flex-row items-center justify-around mb-4">
          <div className="mb-4 md:mb-0 md:mr-4 bg-white p-2 rounded">
            <QRCode value={listUrl} size={128} />
          </div>
          <div className="text-center md:text-left">
            <p className="mb-2 text-[#6d58a5]">Código de la Lista:</p>
            <p className="text-xl text-center font-semibold">{listCode}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#6d58a5] text-white py-2 px-4 rounded hover:bg-[#5a4a8a] transition duration-200"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SharePopup;