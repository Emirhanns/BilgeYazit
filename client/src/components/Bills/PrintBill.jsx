import { Button, Modal } from "antd";

const PrintBill = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6">
          <article className="overflow-hidden">
            {/* Logo and Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="logo">
                <h2 className="text-3xl font-bold text-gray-800">LOGO</h2>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-700">FATURA</h3>
                <p className="text-sm text-gray-500">Fatura No: #00041</p>
                <p className="text-sm text-gray-500">Veriliş Tarihi: 2022-11-21</p>
              </div>
            </div>

            {/* Billing Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-md text-gray-600">
                <p className="font-semibold text-gray-800">Fatura Detayı:</p>
                <p>Unwrapped</p>
                <p>Fake Street 123</p>
                <p>San Javier, CA 1234</p>
              </div>
              <div className="text-md text-gray-600">
                <p className="font-semibold text-gray-800">Fatura:</p>
                <p>The Boring Company</p>
                <p>Tesla Street 007</p>
                <p>Frisco, CA 0000</p>
              </div>
            </div>

            {/* Table */}
            <div className="bill-table-area">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-800">
                      Görsel
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-800">
                      Başlık
                    </th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-gray-800">
                      Fiyat
                    </th>
                    <th className="py-2 px-4 text-center text-sm font-semibold text-gray-800">
                      Adet
                    </th>
                    <th className="py-2 px-4 text-right text-sm font-semibold text-gray-800">
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-4 px-4">
                      <img
                        src="https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg"
                        alt="Ürün"
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="py-4 px-4">Şalgam</td>
                    <td className="py-4 px-4 text-center">5₺</td>
                    <td className="py-4 px-4 text-center">1</td>
                    <td className="py-4 px-4 text-right">5₺</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th className="pt-4 px-4 text-right" colSpan="4">
                      Ara Toplam:
                    </th>
                    <th className="pt-4 px-4 text-right">61₺</th>
                  </tr>
                  <tr>
                    <th className="pt-2 px-4 text-right" colSpan="4">
                      KDV:
                    </th>
                    <th className="pt-2 px-4 text-right text-red-600">+4.88₺</th>
                  </tr>
                  <tr>
                    <th className="pt-2 px-4 text-right font-semibold" colSpan="4">
                      Genel Toplam:
                    </th>
                    <th className="pt-2 px-4 text-right font-semibold">65.88₺</th>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-gray-300 pt-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Ödeme koşulları 14 gündür. Paketlenmemiş borçların geç ödenmesi durumunda 00.00 gecikme ücreti talep edilecektir. Revize faturanın ödenmemesi halinde faiz oranı uygulanacaktır.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Print Button */}
      <div className="flex justify-end mt-6">
        <Button type="primary" size="large">
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
