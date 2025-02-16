import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import ReturnModal from "./ReturnModal"; // ReturnModal bileşenini import ediyoruz

const ProductItem = ({ item, updateProductStock }) => {
  const dispatch = useDispatch();
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false); // Modal açık mı kontrolü

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };

  return (
    <div
      className="product-item w-50 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105 relative"
      key={item._id}
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-44 object-fill w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">Yazar: {item.author}</span>
        <span className="whitespace-normal break-words">Ürün Adı: {item.title}</span>
        <span>Ürün Fiyatı: {item.price}₺</span>
        <span>Stok Sayısı: {item.stock}</span>
        <span>Raf Bilgisi: {item.shelf}</span>
      </div>

      {/* Sağ üst köşeye - sembolü ekleniyor */}
      <div>
        <div
          className="absolute -top-1 right-0 text-red-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Ürün tıklama olayını durdur
            setIsReturnModalOpen(true); // Modal aç
          }}
        >
          İade Et
        </div>
      </div>
      {/* ReturnModal bileşeni */}
      <ReturnModal
        isModalOpen={isReturnModalOpen}
        setIsModalOpen={setIsReturnModalOpen}
        item={item} // Seçilen ürünü modal bileşenine geçir
        updateProductStock={updateProductStock} // Güncelleme fonksiyonunu geçiyoruz
      />
    </div>
  );
};

export default ProductItem;
