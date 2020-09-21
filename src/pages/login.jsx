import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, message } from 'antd';

const Login = () => {
  let history = useHistory()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({ email: "", password: "" })
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };
  const handleSubmit = () => {
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email,
      password: input.password
    }).then(
      (res) => {
        var user = res.data.user
        var token = res.data.token
        var currentUser = { name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        message.success('Selamat, Anda Berhasil Masuk');
        history.push("/")
      }
    ).catch((err) => {
      message.error("Data yang diinput harus sesuai dan benar");
    })
  }

  const handleChange = (event) => {
    let value = event.target.value
    let name = event.target.name
    switch (name) {
      case "email": {
        setInput({ ...input, email: value })
        break;
      }
      case "password": {
        setInput({ ...input, password: value })
        break;
      }
      default: { break; }
    }
  }

  return (
    <section>
     <h1><strong style={{fontWeight: "bold", fontSize: "40px"}}>Login Sistem</strong></h1>
      <div style={{ width: "80%", margin: "0 auto", display: "block" }}>
        <div style={{ border: "1px solid #aaa", padding: "20px" }}>
          <Form onFinish={handleSubmit}
            form={form}
            layout="vertical"
            initialValues={{
              requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}>
            <Form.Item label="Email">
              <Input placeholder="hedi@gmail.com" type="email" name="email" value={input.email} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Password">
              <Input placeholder="********" type="password" name="password" value={input.password} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    </section>
  )
}

export default Login