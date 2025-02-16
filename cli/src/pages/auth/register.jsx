import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      // Yanıtı bekle ve JSON'a dönüştür
      const data = await res.json();
  
      if (res.ok) { // res.ok, status 200-299 aralığını kontrol eder
        message.success(data.message || "Kayıt işlemi başarılı. Giriş yapabilirsiniz!");
        navigate("/login"); // Başarılı kayıt sonrası giriş sayfasına yönlendirme
      } else {
        // Hata mesajını kontrol et
        message.error(data.message || "Kayıt işlemi sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      message.error("Sunucuyla bağlantı kurulamadı. Lütfen tekrar deneyin.");
    }
  };
  

  return (
    <div className="h-screen bg-[#F5E6D6] flex justify-center items-center">
      <div className="w-full max-w-lg px-10">
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[{ required: true, message: "Kullanıcı adı boş bırakılamaz!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="E-posta"
            name="email"
            rules={[
              { required: true, message: "E-posta alanı boş bırakılamaz!" },
              { type: "email", message: "Geçerli bir e-posta giriniz." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifre boş bırakılamaz!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Şifre Tekrar"
            name="passwordAgain"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Şifre tekrar alanı boş bırakılamaz!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full"
              style={{ backgroundColor: "#6B4F4F", borderColor: "#6B4F4F" }}
            >
              Kaydol
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          Zaten bir hesabınız var mı?&nbsp;
          <Link to="/login" className="text-[#6B4F4F]">
            Giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
