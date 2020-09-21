import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { useParams, Link, useHistory } from "react-router-dom"
import {UserContext} from "../../context/UserContext"
import { Form, Input, Button , Select, message  } from 'antd';

const GameForm = () => {
  let history = useHistory()
  let { id } = useParams()
  const [form] = Form.useForm();
  const [user, ] = useContext(UserContext)
  const [games, setGames] =  useState(null)
  const [, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("edit")
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };
  
  useEffect(() => {
    if (games === null) {
      axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
        .then(res => {
          setGames(res.data)
        })
    }
  }, [games, setGames]);
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setGames({...games, name: event.target.value});
        break
      }
      case "platform":
      {
        setGames({...games, platform: event.target.value});
        break
      }
      case "release":
      {
        setGames({...games, release: event.target.value});
          break
      }
      case "singlePlayer":
      {
        setGames({...games, singlePlayer: event.target.value});
          break
      }
      case "genre":
        {
          setGames({...games, genre: event.target.value});
            break
        }
      case "multiplayer":
        {
          setGames({...games, multiplayer: event.target.value});
            break
        }
      case "image_url":
        {
          setGames({...games, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }
  const onPlayerChange = value =>{
    setGames({...games, singlePlayer: value});
  }
  const onMultiChange = value => {
    setGames({...games, multiplayer: value});
  }

  const handleSubmit = () =>{
    // menahan submit
    let name = games.name

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "edit")
      {
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
          name: games.name,
          platform: games.platform,
          release: games.release,
          singlePlayer: parseInt(games.singlePlayer),
          genre: games.genre,
          multiplayer: parseInt(games.multiplayer),
          image_url: games.image_url

        }, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
          setGames(res.data)
          message.success('Selamat, Anda Telah Mengubah Data Game');
          history.push("/games")
        }).catch((err)=>{
          message.error('Mohon Maaf, terdapat kesalahan dalam penginputan data');
        })
      }
      
      setStatusForm("edit")
      setSelectedId(0)
      setGames({
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
  return(
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
          <Input placeholder="Avatar, Naruto, ..." type="text" name="name" value={games !== null && games.name} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Platform" style={{fontWeight: "bold"}}>
          <Input placeholder="Website, PC, ..." type="text" name="platform" value={games !== null && games.platform} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Genre" style={{fontWeight: "bold"}}>
          <Input placeholder="Action, Comedy, ..." type="text" name="genre" value={games !== null && games.genre} onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Release" style={{fontWeight: "bold"}}>
          <Input  type="number" name="release" max={2020} min={1980} value={games !== null && games.release} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Single Player" style={{fontWeight: "bold"}}>
          <Select placeholder= {games !== null && games.singlePlayer === 1 ? "Yes" : "No"}
            onChange={onPlayerChange}
            allowClear>
            <Select.Option  value="1">Yes</Select.Option>
            <Select.Option value="0">No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Multi Player" style={{fontWeight: "bold"}}>
          <Select  placeholder={games !== null && games.multiplayer === 1 ? "Yes" : "No" }
            onChange={onMultiChange}
            allowClear>
            <Select.Option value="1" >Yes</Select.Option>
            <Select.Option value="0" >No</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Image URL" style={{fontWeight: "bold"}}>
        <Input.TextArea placeholder="Link Gambar" cols="40" rows="3" name="image_url" value={games !== null && games.image_url} onChange={handleChange} />
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