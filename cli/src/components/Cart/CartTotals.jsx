import { Button, message } from "antd"; 
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

// Helper function to split text into lines of max 10 characters
const formatTitle = (title) => {
  const regex = /.{1,10}/g; // 10 karakterlik gruplar oluşturur
  return title.match(regex)?.map((part, index) => <span key={index}>{part}<br /></span>);
};

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full flex flex-col bg-[#f8f1e4] shadow-lg rounded-lg border border-[#d3c0a7]">
      <h2 className="bg-[#704c2e] text-center py-4 text-white font-bold tracking-wide text-2xl">
        Sepetteki Kitaplar
      </h2>
      <ul className="cart-items px-4 flex flex-col gap-y-4 py-4 overflow-y-auto max-h-[300px] text-[#704c2e]">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
            <li className="cart-item flex justify-between" key={item._id}>
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt=""
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => dispatch(deleteCart(item))}
                />
                <div className="flex flex-col ml-2">
                  <b className="line-clamp-2">{formatTitle(item.title)}</b>
                  <span>
                    {item.price}₺ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full bg-[#704c2e] text-white"
                  icon={<PlusCircleOutlined />}
                  onClick={() => dispatch(increase(item))}
                />
                <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
                <Button
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full bg-[#704c2e] text-white"
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (window.confirm("Ürün Silinsin Mi?")) {
                        dispatch(decrease(item));
                        message.success("Ürün Sepetten Silindi.");
                      }
                    }
                    if (item.quantity > 1) {
                      dispatch(decrease(item));
                    }
                  }}
                />
                <Button
                  className="w-full flex items-center justify-center !rounded-full bg-[#704c2e] text-white"
                  icon={<CloseCircleOutlined />}
                  onClick={() => dispatch(deleteCart(item))}
                />
              </div>
            </li>
          )).reverse()
          : "Sepette hiç ürün yok..."}
      </ul>

      <div className="cart-totals mt-auto p-4 bg-[#f7e8d1]">
        <div className="border-t border-b border-[#d3c0a7] py-2">
          <div className="flex justify-between">
            <span className="text-[#704c2e]">{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4 border-[#d3c0a7] py-2">
          <div className="flex justify-between">
            <b className="text-xl text-[#704c2e]">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4">
          <Button
            type="primary"
            size="large"
            className="w-full bg-[#704c2e] border-none"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="default"
            size="large"
            className="w-full mt-2 flex items-center justify-center bg-red-600"
            icon={<ClearOutlined />}
            danger
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              if (window.confirm("Emin Misiniz?")) {
                dispatch(reset());
                message.success("Sepet Başarıyla Temizlendi.");
              }
            }}
          >
            Sepeti Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
