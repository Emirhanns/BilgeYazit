import { Button } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const CartTotals = () => {
  return (
    <div className="cart h-full flex flex-col bg-[#f8f1e4] shadow-lg rounded-lg border border-[#d3c0a7]">
      <h2 className="bg-[#704c2e] text-center py-4 text-white font-bold tracking-wide text-2xl">
        Sepetteki Kitaplar
      </h2>
      <ul className="cart-items px-4 flex flex-col gap-y-4 py-4 overflow-y-auto text-[#704c2e]">
        <li className="cart-item flex justify-between items-center border-b border-[#d3c0a7] pb-4">
          <div className="flex items-center">
            
            <div className="flex flex-col ml-4">
              <b className="text-lg">Platon</b>
              <b className="text-lg">Devlettttttttt</b>
              <span className="text-sm text-[#704c2e]">12₺ x 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              type="default"
              size="small"
              className="flex items-center justify-center !rounded-full bg-[#704c2e] text-white"
              icon={<PlusCircleOutlined />}
            />
            <span className="font-bold text-lg">1</span>
            <Button
              type="default"
              size="small"
              className="flex items-center justify-center !rounded-full bg-[#704c2e] text-white"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto p-4 bg-[#f7e8d1]">
        <div className="border-t border-b border-[#d3c0a7] py-2">
          <div className="flex justify-between">
            <b className="text-[#704c2e]">Ara Toplam</b>
            <span className="text-[#704c2e]">99₺</span>
          </div>
          <div className="flex justify-between">
            <b className="text-[#704c2e]">KDV %8</b>
            <span className="text-[#d9534f]">+7.92₺</span>
          </div>
        </div>
        <div className="border-b mt-4 border-[#d3c0a7] py-2">
          <div className="flex justify-between">
            <b className="text-xl text-[#704c2e]">Genel Toplam</b>
            <span className="text-xl text-[#704c2e]">99₺</span>
          </div>
        </div>
        <div className="py-4">
          <Button
            type="primary"
            size="large"
            className="w-full bg-[#704c2e] border-none"
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="default"
            size="large"
            className="w-full mt-2 flex items-center justify-center bg-red-600"
            icon={<ClearOutlined />}
            danger
          >
            Sepeti Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
