import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { Layout, Menu, Table, Input, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from "axios"
import { UserContext } from "../../context/UserContext"
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Movies = () => {
    const [user,] = useContext(UserContext)
    const [form] = Form.useForm();
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [Genre, setGenre] = useState('')
    const [Rating, setRating] = useState('')
    const [release, setYear] = useState('')
    const data = [];
    function truncateString(str, num) {
        if (str === null) {
            return ""
        } else {
            if (str.length <= num) {
                return str
            }
            return str.slice(0, num) + '...'
        }
    }
    const columns = [
        {
            title: 'No',
            width: 70,
            dataIndex: 'number',
            key: 'number',
            sorter: (a, b) => a.number - b.number,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Tittle',
            dataIndex: 'Tittle', key: 'Tittle',
            sorter: (a, b) => a.Tittle.length - b.Tittle.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Genre', dataIndex: 'Genre', key: 'Genre',
            sorter: (a, b) => a.Genre.length - b.Genre.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Release', dataIndex: 'Year', key: 'Year',
            sorter: (a, b) => a.Year - b.Year,
        },
        {
            title: 'Duration', dataIndex: 'Duration', key: 'Duration',
            sorter: (a, b) => a.Duration - b.Duration,
        },
        {
            title: 'Rating', dataIndex: 'Rating', key: 'Rating',
            sorter: (a, b) => a.Rating - b.Rating,
        },
        {
            title: 'Description', dataIndex: 'Description', key: 'Description',
            sorter: (a, b) => a.Description.length - b.Description.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Review', dataIndex: 'Review', key: 'Review',
            sorter: (a, b) => a.Review.length - b.Review.length,
            sortDirections: ['descend', 'ascend'],
        },

        {
            title: 'Action',
            key: 'operation',
            dataIndex: "aksi",
            fixed: 'right',
            width: 170,
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                setMovies(
                    res.data.filter((item) =>
                        item.genre === null ? item.genre : item.genre.toLowerCase().includes(Genre.toLowerCase()),
                    )
                );
            })

    }, [Genre])
    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                setMovies(
                    res.data.filter((item) =>
                        item.rating === null ? item.rating : item.rating.toString().toLowerCase().includes(Rating.toLowerCase()),
                    )
                );
            })
    }, [Rating])
    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                setMovies(
                    res.data.filter((item) =>
                        item.year === null ? item.year : item.year.toString().toLowerCase().includes(release.toLowerCase())
                    )

                );
            })

    }, [release])

    const handleDelete = (event) => {
        console.log("cek pen", event.target.value);
        var idFilm = parseInt(event.target.value)
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idFilm}`, { headers: { "Authorization": `Bearer ${user.token}` } })

            .then(res => {
                console.log("cek", res);
                var newdataFilm = movies.filter(x => x.id !== idFilm)
                setMovies([...newdataFilm])
            })
    }
    const submitSearch = (e) => {
        e.preventDefault()
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let resMovies = res.data.map(el => {
                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        review: el.review,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(x => x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                setMovies([...filteredMovies])
            })

    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            {
                movies !== null && movies.map((item, index) => {
                    // for (let i = 0; i < index; i++) {
                    data.push({
                        number: index + 1,
                        image: <img style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }} src={item.image_url} alt="Gambar" />,
                        Tittle: item.title,
                        Genre: item.genre,
                        Year: item.year,
                        Duration: item.duration,
                        Rating: item.rating,
                        Description: truncateString(item.description, 20),
                        Review: truncateString(item.review, 20),
                        aksi: <p>  <button value={item.id} style={{ marginRight: "5px" }}>
                            <Link to={`/movies/edit/${item.id}`}>Edit</Link>
                        </button>
                            <button value={item.id} onClick={handleDelete} style={{color: "#1890FF"}}>Delete</button>
                        </p>
                    });
                    // }
                })
            }
            <Layout>
                <Sider className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Movies Sub Menu">
                            <Menu.Item key="1">Table</Menu.Item>
                            <Menu.Item key="2"><Link to={`/movies/create`}>Create</Link></Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >

                    <h2>Filter</h2>
                    <div style={{ width: "1000px" }}>
                        <Input type="text" placeholder="Genre" onChange={e => setGenre(e.target.value)} style={{ width: "300px" }} />
                        <Input type="number" placeholder="Rating" max={10} min={0} onChange={e => setRating(e.target.value)} style={{ width: "300px", marginLeft: "20px" }} />
                        <Input type="number" placeholder="Release Year" max={2020} min={1980} onChange={e => setYear(e.target.value)} style={{ width: "300px", marginLeft: "20px" }} />
                    </div>


                    <hr />
                    {/* <Input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} style={{ float: "right", width: "200px" }} /> <br /> <br /> */}
                        <div style={{float : "right", width: "400px"}}>
                        <form onSubmit={submitSearch} >
                            <Input type="text" placeholder="Search" value={search} onChange={handleChangeSearch} style={{width: "250px"}} /> <button style={{width: "100px"}}>Search</button>
                        </form>
                        </div>
                        <br/>
                        <br/>

                    <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: 1500, y: 450 }} />

                </Content>
            </Layout>
        </>
    )
}

export default Movies
// useEffect(() => {
//     if (movies === null) {
//         axios.get(`https://www.backendexample.sanbersy.com/api/data-movie`)
//             .then(res => {
//                 setMovies(res.data.map(el => {
//                     return {
//                         id: el.id,
//                         title: el.title,
//                         description: el.description,
//                         year: el.year,
//                         duration: el.duration,
//                         review: el.review,
//                         genre: el.genre,
//                         rating: el.rating,
//                         image_url: el.image_url
//                     }
//                 }))
//             }).catch((err)=>{
//                 message.error('Tidak dapat mengambil Data, Mohon tunggu dan Periksa Koneksi Anda');
//               })
//     }
// }, [movies])
