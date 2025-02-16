import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı.");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Şifre yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#F5E6D6]"> {/* Nostaljik arka plan rengi */}
      <div className="flex justify-center items-center h-full">
        <div className="px-10 w-full max-w-lg flex flex-col h-full justify-center">
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
            className="bg-white p-6 rounded-lg shadow-lg" // Beyaz kart stilinde form
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Hatırla beni</Checkbox>
                <Link to="/forgot-password" className="text-[#6B4F4F]">Şifremi Unuttum?</Link> {/* Nostaljik renk */}
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
                style={{ backgroundColor: "#6B4F4F", borderColor: "#6B4F4F" }} // Nostaljik kahverengi buton
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center mt-4">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-[#6B4F4F]">Şimdi kaydol</Link> {/* Nostaljik renk */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
