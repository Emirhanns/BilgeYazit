import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import PrintBill from "../components/Bills/PrintBill.jsx";
import Header from "../components/Header/Header.jsx";

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bills/get-all", {
          headers: {
            "Cache-Control": "no-store", // Ön belleklemeyi devre dışı bırakıyoruz
          },
        });
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
      title: <span className="font-semibold text-lg">Müşteri Adı</span>,
      dataIndex: "cName",
      key: "cName",
      className: "text-center", // Merkezi hizalama
    },
    {
      title: <span className="font-semibold text-lg">Telefon Numarası</span>,
      dataIndex: "cPhoneNumber",
      key: "cPhoneNumber",
      className: "text-center",
    },
    {
      title: <span className="font-semibold text-lg">Oluşturma Tarihi</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
      className: "text-center",
    },
    {
      title: <span className="font-semibold text-lg">Ödeme Yöntemi</span>,
      dataIndex: "paymentType",
      key: "paymentType",
      className: "text-center",
    },
    {
      title: <span className="font-semibold text-lg">Toplam Fiyat</span>,
      dataIndex: "totalPrice",
      key: "totalAmount",
      render: (text) => {
        return <span>{text}₺</span>;
      },
      className: "text-center",
    },
    {
      title: <span className="font-semibold text-lg">Aksiyonlar</span>,
      dataIndex: "action",
      key: "action",
      className: "text-center",
      render: (_, record) => {
        return (
          <div className="flex justify-center space-x-2"> {/* Butonlar arasına boşluk ekliyoruz */}
            <Button
              className="!rounded-full bg-[#f4b41a] text-black border-none"
              onClick={() => {
                setIsModalOpen(true);
                setCustomer(record);
              }}
            >
              Yazdır
            </Button>

            

          </div>

        );


      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6 bg-[#f5e6d6] p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Faturalar</h1>
        <Table
          dataSource={billItems.map(item => ({ ...item, key: item._id }))} // Benzersiz bir key prop ekliyoruz
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1000,
            y: 300,
          }}
          className="bg-white rounded-md shadow-md"
          rowClassName={() => "bg-[#f4f1ea] hover:bg-[#f4d9b5] transition-all"}
        />
      </div>
      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />

      
    </>
  );
};

export default BillPage;
