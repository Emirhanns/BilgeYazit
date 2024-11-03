import React from 'react';

const Products = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 p-6 bg-vintage-beige overflow-y-auto" style={{ maxHeight: "75vh" }}>
    {/* Kitap Kartı 1 */}
    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-amber-700 font-bold">Platon</h3>
      <h3 className="text-xl font-serif text-darkBrown">Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
      <p className="text-sm text-darkGray">Raf: A-05</p>

    </div>

    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-darkBrown mb-2">Platon - Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
    </div>

    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-darkBrown mb-2">Platon - Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
    </div>

    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-darkBrown mb-2">Platon - Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
    </div>

    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-darkBrown mb-2">Platon - Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
    </div>

    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-darkBrown mb-2">Platon - Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
    </div>

    <div className="product-item w-40 h-full border border-darkGray shadow-md bg-old-paper rounded-lg p-4 transition-transform hover:scale-105">
      <img
        alt="Kitap Kapak"
        src="https://i.dr.com.tr/cache/500x400-0/originals/0000000545142-1.jpg"
        className="w-full h-44 object-fit mb-4 rounded"
      />
      <h3 className="text-xl font-serif text-darkBrown mb-2">Platon - Devlet</h3>
      <p className="text-lg font-bold text-darkBrown">Fiyat: 20 TL</p>
      <p className="text-sm text-darkGray">Stok: 5 Adet</p>
    </div>
  </div>
);

export default Products;
