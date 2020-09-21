import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {UserContext} from "../../context/UserContext"
import { Form, Input, Button , message  } from 'antd';
import { Link } from "react-router-dom"

const FilmForm = () => {
  const [user, ] = useContext(UserContext)
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    review:"",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0
  })
  const [ , setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };

  useEffect( () => {
    if (movies === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/data-movie`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            review: el.review,
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [movies])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "review":
        {
          setInput({...input, review: event.target.value});
          break
        }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = () =>{
    // menahan submit
    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
          title: input.title,
          review: input.review,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          image_url: input.image_url

        }, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            setMovies([...movies, {id: res.data.id, ...input}])
            message.success('Selamat, Anda Telah Membuat Data Film Baru');

        }).catch((err)=>{
          message.error('Mohon Maaf, terdapat kesalahan dalam penginputan data');
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        title: "",
        review: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        image_url: ""
      })
    }

  }
  return(
    <section>
            <Link to={`/movies`}>Kembali ke Movies Editor</Link>
            <h1><strong style={{fontWeight: "bold", fontSize: "30px"}}>Movies Form</strong></h1>
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
      <Form.Item label="Tittle" style={{fontWeight: "bold"}}>
          <Input placeholder="Avatar, Naruto, ..." type="text" name="title" value={input.title} onChange={handleChange} required/>
        </Form.Item>
        <Form.Item label="Genre" style={{fontWeight: "bold"}}>
          <Input placeholder="Action, Comedy, ..." type="text" name="genre" value={input.genre} onChange={handleChange} required/>
        </Form.Item>
        <Form.Item label="Year" style={{fontWeight: "bold"}}>
          <Input  type="number" name="year" max={2020} min={1980} value={input.year} onChange={handleChange} required/>
        </Form.Item>
        <Form.Item label="Duration" style={{fontWeight: "bold"}}>
          <Input  type="number" name="duration"  value={input.duration} onChange={handleChange} required/>
        </Form.Item>
        <Form.Item label="Rating" style={{fontWeight: "bold"}}>
          <Input  type="number" name="rating" max={10} min={0} value={input.rating} onChange={handleChange} required/>
        </Form.Item>
        <Form.Item label="Description" style={{fontWeight: "bold"}}>
        <Input.TextArea required placeholder="Film ini adalah..." cols="40" rows="3" name="description" value={input.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Review" style={{fontWeight: "bold"}}>
        <Input.TextArea required placeholder="Menururt saya, Film ini merupakan..." cols="40" rows="3" name="review" value={input.review} onChange={handleChange} />
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

export default FilmForm