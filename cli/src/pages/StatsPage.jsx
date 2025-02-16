import React, { useState, useEffect } from 'react';
import Header from "../components/Header/Header.jsx";
import StatsCard from '../components/Stats/StatsCard.jsx';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const StatsPage = () => {
    const [bookSales, setBookSales] = useState({});
    const [productData, setProductData] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0); // Toplam satış
    const [totalCost, setTotalCost] = useState(0); // Toplam maliyet
    const [categories, setCategories] = useState([]); // Kategoriler
    const [selectedCategory, setSelectedCategory] = useState(''); // Seçilen kategori
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const user = JSON.parse(localStorage.getItem("posUser"));

    useEffect(() => {
        fetch("http://localhost:5000/api/bills/get-all")
            .then(response => response.json())
            .then(data => {
                const salesByBook = {};
                let customerSet = new Set();
                let revenue = 0;

                data.forEach(bill => {
                    customerSet.add(bill.cName);

                    bill.cartItems.forEach(item => {
                        const { title, quantity, price } = item; // price, ürünün satış fiyatı
                        const date = new Date(bill.createdAt).toLocaleDateString();
                        revenue += quantity * price; // Toplam satış

                        if (!salesByBook[title]) {
                            salesByBook[title] = { price, sales: {} };
                        }
                        if (!salesByBook[title].sales[date]) {
                            salesByBook[title].sales[date] = 0;
                        }

                        salesByBook[title].sales[date] += quantity;
                    });
                });

                setBookSales(salesByBook);
                setTotalCustomers(customerSet.size);
                setTotalRevenue(revenue); // Toplam geliri burada kaydediyoruz
            })
            .catch(error => console.error('Error fetching sales data:', error));

        fetch("http://localhost:5000/api/products/get-all")
            .then(response => response.json())
            .then(data => {
                setProductData(data);

                // Kategorileri benzersiz hale getirme
                const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, []);

    useEffect(() => {
        // Maliyet hesaplama
        let cost = 0;
        Object.entries(bookSales).forEach(([title, { sales }]) => {
            const product = productData.find(product => product.title === title);
            if (product) {
                const productCost = product.cost; // Ürünün maliyeti
                Object.values(sales).forEach(quantity => {
                    cost += quantity * productCost; // Toplam maliyeti artır
                });
            }
        });

        setTotalCost(cost); // totalCost'u burada güncelleyip state'e kaydediyoruz
    }, [bookSales, productData]);

    useEffect(() => {
        let filteredData = Object.entries(bookSales).reduce((acc, [title, { sales, price }]) => {
            Object.entries(sales).forEach(([date, quantity]) => {
                // Tarihi YYYY-MM-DD formatına çevir
                const formattedDate = date.split('.').reverse().join('-');
    
                // Tarih aralığı filtresi
                const isWithinDateRange = 
                    (startDate === '' || new Date(formattedDate) >= new Date(startDate)) &&
                    (endDate === '' || new Date(formattedDate) <= new Date(endDate));
    
                // Kategori filtresi
                const product = productData.find(product => product.title === title);
                const isWithinCategory = !selectedCategory || product?.category === selectedCategory;
    
                if (isWithinDateRange && isWithinCategory) {
                    const existing = acc.find(item => item.date === date);
                    if (existing) {
                        existing.quantity += quantity;
                        existing.books.push({ title, quantity, price });
                    } else {
                        acc.push({ date, quantity, books: [{ title, quantity, price }] });
                    }
                }
            });
            return acc;
        }, []);
    
        // Tarih sıralaması
        filteredData.sort((a, b) => {
            const dateA = a.date.split('.').reverse().join('-');
            const dateB = b.date.split('.').reverse().join('-');
            return new Date(dateA) - new Date(dateB);
        });
    
        setFilteredSales(filteredData);
    }, [bookSales, selectedCategory, startDate, endDate, productData]);
    

    const totalProducts = productData.length;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { date, quantity, books = [] } = payload[0].payload;

            const hasValidBooks = books.some(book => book.quantity > 0);

            return (
                <div className="custom-tooltip">
                    <h4>{date}</h4>
                    <p><strong>Toplam Satılan Kitap Adeti:</strong> {quantity}</p>
                    {quantity > 0 && hasValidBooks ? (
                        books.map((book, index) => (
                            book.quantity > 0 && (
                                <p key={index}>
                                    {book.title}: {book.quantity} adet - {book.price * book.quantity} TL
                                </p>
                            )
                        ))
                    ) : (
                        <p>Bu tarihte satış yok.</p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ overflowY: 'scroll', height: '100vh' }}>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4">Kitap Bazlı Satış İstatistikleri</h1>
            <h2>
                Hoş Geldin {" "}
                <span className="text-green-700 font-bold text-xl">{user.username}</span>
            </h2>

            <div className="lg:flex lg:justify-around grid lg:grid-cols-4 md:grid-cols-2 md:ml-28 lg:ml-0 justify-center my-5">
                <StatsCard title={"Toplam Müşteri"} amount={totalCustomers} img={"/images/customer.png"} />
                <StatsCard title={"Toplam Satış"} amount={totalRevenue.toFixed(2) + '₺'} img={"/images/sale.png"} />
                <StatsCard title={"Toplam Kazanç"} amount={(totalRevenue - totalCost).toFixed(2) + '₺'} img={"/images/money.png"} />
                <StatsCard title={"Toplam Ürün"} amount={totalProducts} img={"/images/product.png"} />
            </div>

            <div className="my-4">
                <label htmlFor="start-date" className="text-lg font-bold">Başlangıç Tarihi:</label>
                <input 
                    type="date" 
                    id="start-date"
                    className="ml-2 p-2 border rounded"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="my-4">
                <label htmlFor="end-date" className="text-lg font-bold">Bitiş Tarihi:</label>
                <input 
                    type="date" 
                    id="end-date"
                    className="ml-2 p-2 border rounded"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="my-4">
                <label htmlFor="category-select" className="text-lg font-bold">Kategori Seç:</label>
                <select
                    id="category-select"
                    className="ml-2 p-2 border rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Tümü</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {filteredSales.length > 0 && (
                <div className="mt-10 ml-32">
                    <div className="w-full max-w-screen-md">
                        <ResponsiveContainer width="150%" height={300}>
                            <AreaChart data={filteredSales}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="quantity" stroke="#8884d8" fill="#964b00" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsPage;
