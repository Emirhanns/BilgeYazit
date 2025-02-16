import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const Bill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalPrice: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,  // Satın alınan ürünler
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu ve stoklar güncellendi.");
        dispatch(reset());  // Sepeti sıfırla
        navigate("/bills");  // Fatura sayfasına yönlendir
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <Modal
      title={<span className="text-[#2c2c2c] font-bold">Fatura Oluştur</span>}
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      className="custom-modal"
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label={<span className="text-[#2c2c2c] font-semibold">Müşteri Adı</span>}
          name={"cName"}
          rules={[
            {
              required: true,
              message: "Bir Müşteri Adı Yazmanız Gerekiyor.",
            },
          ]}
        >
          <Input
            placeholder="Bir Müşteri Adı Yazınız"
            className="border-[#b08968] focus:border-[#d1a054] placeholder-[#a0a0a0] rounded-lg"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"cPhoneNumber"}
          label={<span className="text-[#2c2c2c] font-semibold">Tel No</span>}
        >
          <Input
            placeholder="Bir Tel No Yazınız"
            maxLength={11}
            className="border-[#b08968] focus:border-[#d1a054] placeholder-[#a0a0a0] rounded-lg"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-[#2c2c2c] font-semibold">Ödeme Yöntemi</span>}
          rules={[{ required: true }]}
          name={"paymentType"}
        >
          <Select
            placeholder="Bir Ödeme Yöntemi Seçiniz"
            className="border-[#b08968] rounded-lg"
          >
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card className="bg-[#f7f1e3] border border-[#b08968] rounded-lg shadow-md p-4">
          <div className="flex justify-between text-[#2c2c2c]">
            <span>Ara Toplam</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2 text-[#d1a054]">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between text-[#2c2c2c] font-bold">
            <b>Genel Toplam</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4 bg-[#b08968] hover:bg-[#d1a054] text-white font-bold py-2 px-4 rounded-lg transition-all"
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default Bill;
