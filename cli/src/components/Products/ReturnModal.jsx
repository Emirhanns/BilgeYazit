import { useState } from "react";
import { Modal, Input, message } from "antd";

const ReturnModal = ({ isModalOpen, setIsModalOpen, item, updateProductStock }) => {
  const [returnQuantity, setReturnQuantity] = useState(0);

  const handleReturn = async () => {
    if (returnQuantity <= 0) {
      message.error("Lütfen geçerli bir sayı girin.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products/update-product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item._id,
          stock: item.stock + returnQuantity, // Stok güncelleme
        }),
      });

      if (response.ok) {
        const updatedProduct = { ...item, stock: item.stock + returnQuantity }; // Güncellenmiş ürünü oluştur
        updateProductStock(updatedProduct); // Stok güncellemesini yap
        message.success(`${returnQuantity} adet ürün başarıyla iade edildi.`);
        setIsModalOpen(false); // Modal kapat
      } else {
        message.error("İade işlemi sırasında bir hata oluştu.");
      }
    } catch (error) {
      message.error("Sunucu ile iletişim kurulurken bir hata oluştu.");
    }
  };

  return (
    <Modal
      title={`"${item.title}" ürününü iade et`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleReturn} // Modal onaylandığında handleReturn çağrılır
    >
      <p>Kaç adet iade edeceğinizi giriniz:</p>
      <Input
        type="number"
        value={returnQuantity}
        onChange={(e) => setReturnQuantity(Number(e.target.value))} // Girilen miktarı güncelle
        min={1}
      />
    </Modal>
  );
};

export default ReturnModal;
