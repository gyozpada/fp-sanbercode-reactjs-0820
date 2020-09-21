import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { Layout, Menu, Table, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from "axios"
import { UserContext } from "../../context/UserContext"

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Games = () => {
    const [user,] = useContext(UserContext)
    const [search, setSearch] = useState('')
    const [genre, setGenre] = useState('')
    const [platform, setPlatform] = useState('')
    const [year, setYear] = useState('')
    const [games, setGames] = useState([]);
    const data = [];
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
            title: 'Name',
            dataIndex: 'Name', key: 'Name',
            sorter: (a, b) => a.Name.length - b.Name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Genre', dataIndex: 'Genre',
            key: 'Genre',
            sorter: (a, b) => a.Genre.length - b.Genre.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Release', dataIndex: 'Release',
            key: 'Release',
            sorter: (a, b) => a.Release - b.Release,
        },
        {
            title: 'Platform', dataIndex: 'Platform',
            key: 'Platform',
            sorter: (a, b) => a.Platform.length - b.Platform.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Single Player', dataIndex: 'SinglePlayer', key: 'SinglePlayer', sorter: (a, b) => a.SinglePlayer.length - b.SinglePlayer.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Multi Player', dataIndex: 'multiplayer', key: 'multiplayer', sorter: (a, b) => a.multiplayer.length - b.multiplayer.length,
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
    const handleDelete = (event) => {
        var idGame = parseInt(event.target.value)
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idGame}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                var newdataFilm = games.filter(x => x.id !== idGame)
                setGames([...newdataFilm])
            })
    }
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setGames(
                    res.data.filter((item) =>
                        item.genre === null ? item.genre : item.genre.toLowerCase().includes(genre.toLowerCase()),
                    )
                );
            })

    }, [genre])
    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setGames(
                    res.data.filter((item) =>
                        item.platform === null ? item.platform : item.platform.toLowerCase().includes(platform.toLowerCase()),
                    )
                );
            })
    }, [platform])
    useEffect(() => {
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setGames(
                    res.data.filter((item) =>
                        item.release === null ? item.release : item.release.toString().toLowerCase().includes(year.toLowerCase())
                    )

                );
            })

    }, [year])
    const submitSearch = (e) => {
        e.preventDefault()
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let resGames = res.data.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        release: el.release,
                        platform: el.platform,
                        genre: el.genre,
                        singlePlayer: el.singlePlayer,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                setGames([...filteredGames])
            })

    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            {
                games !== null && games.map((item, index) => {
                    // for (let i = 0; i < index; i++) {
                    data.push({
                        number: index + 1,
                        image: <img style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }} src={item.image_url} alt="Gambar" />,
                        Name: item.name,
                        Genre: item.genre,
                        Release: item.release,
                        Platform: item.platform,
                        SinglePlayer: item.singlePlayer === 1 ? "Yes" : "No",
                        multiplayer: item.multiplayer === 1 ? "Yes" : "No",
                        aksi: <p>  <button value={item.id} style={{ marginRight: "5px" }}>
                            <Link to={`/games/edit/${item.id}`}>Edit</Link>
                        </button>
                            <button value={item.id} onClick={handleDelete} style={{ color: "#1890FF" }}>Delete</button>
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
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Games Sub Menu">
                            <Menu.Item key="1">Table</Menu.Item>
                            <Menu.Item key="2"><Link to={`/games/create`}>Create</Link></Menu.Item>
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
                        <Input type="text" placeholder="Platform" onChange={e => setPlatform(e.target.value)} style={{ width: "300px", marginLeft: "20px" }} />
                        <Input type="number" placeholder="Release Year" max={2020} min={1980} onChange={e => setYear(e.target.value)} style={{ width: "300px", marginLeft: "20px" }} /> <br /> <br />

                    </div>


                    <hr />
                    {/* <Input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} style={{ float: "right", width: "200px" }} /> <br /> <br /> */}
                    <div style={{ float: "right", width: "400px" }}>
                        <form onSubmit={submitSearch} >
                            <Input type="text" placeholder="Search" value={search} onChange={handleChangeSearch} style={{ width: "250px" }} /> <button style={{ width: "100px" }}>Search</button>
                        </form>
                    </div>
                    <br />
                    <br />
                    <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: 1500, y: 450 }} />
                </Content>
            </Layout>
        </>
    )
}

export default Games

// setGames(res.data.map(el => {
//     return {
//         id: el.id,
//         name: el.name,
//         release: el.release,
//         platform: el.platform,
//         genre: el.genre,
//         singlePlayer: el.singlePlayer,
//         multiplayer: el.multiplayer,
//         image_url: el.image_url
//     }
// }))