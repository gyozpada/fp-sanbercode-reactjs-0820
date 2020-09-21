import React, { useState, useEffect, useContext } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Form, Input, Button, message } from 'antd';

import axios from "axios"

const FilmForm = () => {
  let { id } = useParams()
  const [form] = Form.useForm();
  let history = useHistory()

  const [user,] = useContext(UserContext)
  const [movies, setMovies] = useState(null)
  const [, setSelectedId] = useState(0)
  const [statusForm, setStatusForm] = useState("edit")
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };
  useEffect(() => {
    if (movies === null) {
      axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
        .then(res => {
          setMovies(res.data)
        })
    }
  }, [movies, setMovies]);

  const handleChange = (event) => {
    let typeOfInput = event.target.name

    switch (typeOfInput) {
      case "title":
        {
          setMovies({ ...movies, title: event.target.value });
          break
        }
      case "review":
        {
          setMovies({ ...movies, review: event.target.value });
          break
        }
      case "description":
        {
          setMovies({ ...movies, description: event.target.value });
          break
        }
      case "year":
        {
          setMovies({ ...movies, year: event.target.value });
          break
        }
      case "duration":
        {
          setMovies({ ...movies, duration: event.target.value });
          break
        }
      case "genre":
        {
          setMovies({ ...movies, genre: event.target.value });
          break
        }
      case "rating":
        {
          setMovies({ ...movies, rating: event.target.value });
          break
        }
      case "image_url":
        {
          setMovies({ ...movies, image_url: event.target.value });
          break
        }
      default:
        { break; }
    }
  }

  const handleSubmit = () => {
    // menahan submit
    let title = movies.title

    if (title.replace(/\s/g, '') !== "") {
      if (statusForm === "edit") {
        axios.put(`https://www.backendexample.sanbersy.com/api/movies/${id}`, {
          title: movies.title,
          review: movies.review,
          description: movies.description,
          year: movies.year,
          duration: movies.duration,
          genre: movies.genre,
          rating: parseInt(movies.rating),
          image_url: movies.image_url

        }, { headers: { "Authorization": `Bearer ${user.token}` } })
          .then(res => {
            setMovies(res.data)
            message.success('Selamat, Anda Telah Mengubah Data Movie');
            history.push("/movies")

          }).catch((err) => {
            message.error('Mohon Maaf, terdapat kesalahan dalam penginputan data');
          })
      }

      setStatusForm("edit")
      setSelectedId(0)
      setMovies({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        image_url: ""
      })
    }

  }
  return (
    <section>
      <Link to={`/movies`}>Kembali ke Movies Editor</Link>

      <h1><strong style={{fontWeight: "bold", fontSize: "30px"}}>Movies Form</strong></h1>
      <div style={{ width: "50%", margin: "0 auto", display: "block" }}>
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
              <Input placeholder="Avatar, Naruto, ..." type="text" name="title" value={movies !== null && movies.title} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Genre" style={{fontWeight: "bold"}}>
              <Input placeholder="Action, Comedy, ..." type="text" name="genre" value={movies !== null && movies.genre} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Year" style={{fontWeight: "bold"}}>
              <Input type="number" name="year" max={2020} min={1980} value={movies !== null && movies.year} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Duration" style={{fontWeight: "bold"}}>
              <Input type="number" name="duration" value={movies !== null && movies.duration} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Rating" style={{fontWeight: "bold"}}>
              <Input type="number" name="rating" max={10} min={0} value={movies !== null && movies.rating} onChange={handleChange} required />
            </Form.Item>
            <Form.Item label="Description" style={{fontWeight: "bold"}}>
              <Input.TextArea required placeholder="Film ini adalah..." cols="40" rows="3" name="description" value={movies !== null && movies.description} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Review" style={{fontWeight: "bold"}}>
              <Input.TextArea required placeholder="Menururt saya, Film ini merupakan..." cols="40" rows="3" name="review" value={movies !== null && movies.review} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Image URL" style={{fontWeight: "bold"}}>
              <Input.TextArea required placeholder="Link Gambar" cols="40" rows="3" name="image_url" value={movies !== null && movies.image_url} onChange={handleChange} />
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