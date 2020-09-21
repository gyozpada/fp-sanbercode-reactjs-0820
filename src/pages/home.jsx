
import React, { Component } from "react";
import axios from "axios";
import { Button, message } from "antd";
import { Link } from "react-router-dom";
import '../public/css/style.css';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            games: []
        }
    }

    componentDidMount() {
        axios.get(`https://www.backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let movies = res.data.map(el => {
                    return {
                        id: el.id,
                        title: el.title,
                        year: el.year,
                        rating: el.rating,
                        duration: el.duration,
                        genre: el.genre,
                        description: el.description,
                        image_url: el.image_url
                    }
                })
                this.setState({ movies })
            }).catch((err) => {
                message.error('Tidak dapat mengambil Data, Mohon tunggu dan Periksa Koneksi Anda');
            })
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let games = res.data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        release: item.release,
                        genre: item.genre,
                        description: item.description,
                        image_url: item.image_url
                    }
                })
                this.setState({ games })
            }).catch((err) => {
                message.error('Tidak dapat mengambil Data, Mohon tunggu dan Periksa Koneksi Anda');
            })
    }

    render() {
        const img = {
            width: "100%",
            objectFit: "cover",
            maxHeight: "150px",
            maxwidth: "150px",
            minHeight: "130px",
            minwidth: "130px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px"
        }
        const card = {
            border: "1px solid black",
            display: "inline-block",
            width: "30%",
            margin: "15px",
            borderRadius: "10px",
            boxShadow: "#aaa"
        }

        const container = {
            padding: "10px"
        }

        return (

            <section>
                <h1><strong style={{ fontWeight: "bold", fontSize: "40px" }}>Movies Review</strong></h1>
                {
                    this.state.movies.map((item) => {
                        return (
                            <div style={card}>
                                <img src={item.image_url} style={img} alt="Gambar" />
                                <div style={container}>
                                    <h2 style={{ textAlign: "center" }}><b> {item.title}</b>
                                        <p style={{ color: "grey" }}> {item.year}</p></h2>
                                    <p><strong style={{ width: "100px" }}>Deskripsi : </strong>
                                        {item.description === null ? item.description : item.description.substring(0, 20)} ...</p>
                                    <Button type="primary" htmlType="submit" value={item.id} style={{ marginRight: "5px" }}>
                                        <Link to={`/detail-movie/${item.id}`}>Show Detail</Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
                <hr />
                <h1><strong style={{ width: "150px", fontWeight: "bold", fontSize: "40px" }}>Games Review</strong></h1>
                {
                    this.state.games.map((item) => {
                        return (
                            <div style={card}>
                                <img src={item.image_url} style={img} alt="Gambar" />
                                <div style={container}>
                                    <h2 style={{ textAlign: "center" }}><b> {item.name}</b>
                                        <p style={{ color: "grey" }}> {item.release}</p></h2>

                                    <p><strong style={{ width: "100px" }}>Genre : </strong>
                                        {item.genre === null ? item.genre : item.genre.substring(0, 20)}</p>
                                    <Button type="primary" htmlType="submit" value={item.id} style={{ marginRight: "5px" }}>
                                        <Link to={`/detail-game/${item.id}`}>Show Detail</Link>
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}


export default Home;

