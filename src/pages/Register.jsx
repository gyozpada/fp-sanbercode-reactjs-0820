import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import { Form, Input, Button, message } from 'antd';

const Register = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({name: "", email: "" , password: ""})
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };
  const handleSubmit = () =>{
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name, 
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        console.log("inii", res);
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        message.success("Selamat Anda telah berhasil membuat Akun baru")
      }
    ).catch((err)=>{
      alert(err)

      message.error("Data yang diinput harus sesuai dan benar");
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "name":{
        setInput({...input, name: value})
        break;
      }
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <section>
                <h1><strong style={{fontWeight: "bold", fontSize: "40px"}}>Daftar Akun</strong></h1>
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
              <Form.Item label="Nama">
              <Input placeholder="Stephen Cow" type="text" name="name" value={input.name} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Email">
              <Input placeholder="hedi@gmail.com" type="email" name="email" value={input.email} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Password">
              <Input placeholder="********" type="password" name="password" value={input.password} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit">Daftar</Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    </section>
  )
}

export default Register