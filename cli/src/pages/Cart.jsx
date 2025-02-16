import { Button, Card, message, Popconfirm, Table } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bill from "../components/Cart/Bill.jsx";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { deleteCart, increase, decrease } from "../redux/cartSlice.js";
import Header from "../components/Header/Header.jsx";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return (
          <img
            src={text}
            alt=""
            className="w-full h-20 object-cover rounded-lg border-2 border-[#b08968] shadow-md"
          />
        );
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      className: "text-[#2c2c2c] font-semibold", // Vintage yazı tipi ve koyu renk
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      className: "text-[#2c2c2c]",
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span className="text-[#b08968]">{text.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              size="small"
              className="w-full flex items-center justify-center !rounded-full bg-[#b08968] hover:bg-[#d1a054] transition-all"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.quantity}
            </span>
            <Button
              size="small"
              className="w-full flex items-center justify-center !rounded-full bg-[#b08968] hover:bg-[#d1a054] transition-all"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return (
          <span className="text-[#d1a054]">
            {(record.quantity * record.price).toFixed(2)}₺
          </span>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              type="link"
              danger
              className="text-red-600 hover:text-red-800"
            >
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 bg-[#f7f1e3] min-h-screen py-4">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1000,
            y: 300,
          }}
          className="rounded-lg shadow-lg border border-[#b08968] bg-[#000000]"
          rowClassName={() => "bg-[#f4f1ea]"}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72 bg-[#f7f1e3] border border-[#b08968] rounded-lg shadow-md">
            <Button
              className="w-full bg-[#b08968] hover:bg-[#d1a054] text-white font-bold py-2 px-4 rounded-lg transition-all"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <Bill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Cart;
