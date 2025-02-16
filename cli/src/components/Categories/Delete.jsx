import { Button,  message, Modal, Table } from "antd";
import React from "react";

const Delete = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  categories,
  setCategories,
}) => {
  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch("http://localhost:5000/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => <p>{record.title}</p>, // Sadece kategorinin adını göster
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Button
            type="link"
            danger
            onClick={() => deleteCategory(record._id)}
          >
            Sil
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      open={isDeleteModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsDeleteModalOpen(false)}
    >
      <Table
        bordered
        dataSource={categories}
        columns={columns}
        rowKey={"_id"}
      />
    </Modal>
  );
};

export default Delete;
