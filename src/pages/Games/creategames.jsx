import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Form, Input, Button, Select, message } from 'antd';

const GameForm = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };
  const [user,] = useContext(UserContext)

  const [games, setGames] = useState(null)
  const [input, setInput] = useState({
    name: "",
    platform: "",
    release: 2020,
    singlePlayer: 0,
    genre: "",
    multiplayer: 0
  })
  const [, setSelectedId] = useState(0)
  const [statusForm, setStatusForm] = useState("create")

  useEffect(() => {
    if (games === null) {
      axios.get(`https://www.backendexample.sanbersy.com/api/data-movie`)
        .then(res => {
          setGames(res.data.map(el => {
            return {
              id: el.id,
              name: el.name,
              platform: el.platform,
              release: el.release,
              singlePlayer: el.singlePlayer,
              genre: el.genre,
              multiplayer: el.multiplayer,
              image_url: el.image_url
            }
          }))
        })
    }
  }, [games])

  const handleChange = (event) => {
    let typeOfInput = event.target.name

    switch (typeOfInput) {
      case "name":
        {
          setInput({ ...input, name: event.target.value });
          break
        }
      case "platform":
        {
          setInput({ ...input, platform: event.target.value });
          break
        }
      case "release":
        {
          setInput({ ...input, release: event.target.value });
          break
        }
      case "singlePlayer":
        {
          setInput({ ...input, singlePlayer: event.target.value });
          break
        }
      case "genre":
        {
          setInput({ ...input, genre: event.target.value });
          break
        }
      case "multiplayer":
        {
          setInput({ ...input, multiplayer: event.target.value });
          break
        }
      case "image_url":
        {
          setInput({ ...input, image_url: event.target.value });
          break
        }
      default:
        { break; }
    }
  }
  const onPlayerChange = value => {
    setInput({ ...input, singlePlayer: value });
  }
  const onMultiChange = value => {
    setInput({ ...input, multiplayer: value });
  }

  const handleSubmit = () => {
    // menahan submit
    let name = input.name
    console.log(input.multiplayer)

    if (name.replace(/\s/g, '') !== "") {
      if (statusForm === "create") {
        axios.post(`https://www.backendexample.sanbersy.com/api/data-game`, {
          name: input.name,
          platform: input.platform,
          release: input.release,
          singlePlayer: parseInt(input.singlePlayer),
          genre: input.genre,
          multiplayer: parseInt(input.multiplayer),
          image_url: input.image_url

        }, { headers: { "Authorization": `Bearer ${user.token}` } })
          .then(res => {
            setGames([...games, { id: res.data.id, ...input }]);
            message.success('Selamat, Anda Telah Membuat Data Game Baru');

          }).catch((err) => {
            message.error('Mohon Maaf, terdapat kesalahan dalam penginputan data');
          })
      }

      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        platform: "",
        release: 2020,
        singlePlayer: 0,
        genre: "",
        multiplayer: 0,
        image_url: ""
      })
    }

  }
  return (
    <section>
      <Link to={`/games`}>Kembali ke Games Editor</Link>

      <h1><strong style={{fontWeight: "bold", fontSize: "30px"}}>Games Form</strong></h1>
      <div style={{ width: "80%", margin: "0 auto", display: "block" }}>
        <div style={{ border: "1px solid #aaa", padding: "10px" }}>
          <Form onFinish={handleSubmit}
            form={form}
            layout="vertical"
            initialValues={{
              requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}>
            <Form.Item label="Name" style={{fontWeight: "bold"}}>
              <Input placeholder="Avatar, Naruto, ..." type="text" name="name" value={input.name} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Platform" style={{fontWeight: "bold"}}>
              <Input placeholder="Website, PC, ..." type="text" name="platform" value={input.platform} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Genre" style={{fontWeight: "bold"}}>
              <Input placeholder="Action, Comedy, ..." type="text" name="genre" value={input.genre} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Release" style={{fontWeight: "bold"}}>
              <Input type="number" name="release" max={2020} min={1980} value={input.release} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Single Player" style={{fontWeight: "bold"}}>
              <Select placeholder="Klik untuk memilih"
                onChange={onPlayerChange}
                allowClear required>
                <Select.Option value="1">Yes</Select.Option>
                <Select.Option value="0">No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Multi Player" style={{fontWeight: "bold"}}>
              <Select placeholder="Klik untuk memilih"
                onChange={onMultiChange}
                allowClear required>
                <Select.Option value="1" >Yes</Select.Option>
                <Select.Option value="0" >No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Image URL" style={{fontWeight: "bold"}}>
              <Input.TextArea required placeholder="Link Gambar" cols="40" rows="3" name="image_url" value={input.image_url} onChange={handleChange} />
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

export default GameForm