import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, message } from 'antd';

const ChangePassword = () => {
  let history = useHistory()
  const [user, ] = useContext(UserContext)
  const [input, setInput] = useState({ current_password: "", new_password: "", new_confirm_password: "" })
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };
  const handleSubmit = () => {
    axios.post("https://backendexample.sanbersy.com/api/change-password", {
      current_password: input.current_password,
      new_password: input.new_password,
      new_confirm_password: input.new_confirm_password
    }, {headers: {"Authorization" : `Bearer ${user.token}`}}
    ).then(
      (res) => {
        message.success(res.data);
        history.push("/")
      }
    ).catch((err) => {
      alert(err)
      message.error("Password yang diinput harus sesuai dan benar");
    })
  }

  const handleChange = (event) => {
    let value = event.target.value
    let name = event.target.name
    switch (name) {
      case "current_password": {
        setInput({ ...input, current_password: value })
        break;
      }
      case "new_password": {
        setInput({ ...input, new_password: value })
        break;
      }
      case "new_confirm_password": {
        setInput({ ...input, new_confirm_password: value })
        break;
      }
      default: { break; }
    }
  }

  return (
    <section>
      <h1><strong style={{fontWeight: "bold", fontSize: "30px"}}>Change Password</strong></h1>
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
              <Form.Item label="Nama Pengguna">
              <Input type="text" value={user.name} disabled />
            </Form.Item>
            <Form.Item label="Password Saat ini">
              <Input placeholder="********" type="password" name="current_password" value={input.current_password} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Password Baru">
              <Input placeholder="********" type="password" name="new_password" value={input.new_password} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Konfirmasi Password Baru">
              <Input placeholder="********" type="password" name="new_confirm_password" value={input.new_confirm_password} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    </section>
  )
}

export default ChangePassword