import { Table } from "antd";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header.jsx";

const Customer = () => {
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bills/get-all");
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "cName",
      key: "cName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "cPhoneNumber",
      key: "cPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 bg-[#F5E6D6] p-6 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#6B4F4F]">
          Müşterilerim
        </h1>
        <Table
          dataSource={billItems.map(item => ({ ...item, key: item._id }))} // Benzersiz bir key prop ekliyoruz
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1000,
            y: 300,
          }}
          className="bg-white border border-[#6B4F4F]" // Tablo arka planını beyaz, kenarlıkları kahverengi yapıyoruz
          rowClassName={() => "bg-[#f4f1ea]"} // Satırlar için arka plan rengini nostaljik tonla değiştiriyoruz
          title={() => (
            <div className="text-lg font-semibold text-[#6B4F4F]">
              Müşteri Faturaları
            </div>
          )}
        />
      </div>
    </>
  );
  
};
export default Customer;