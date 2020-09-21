
import React from "react"
import '../public/css//style.css';
import { Link } from "react-router-dom";

const About = () => {
    return (
        <section>
            <div style={{ padding: "10px", border: "1px solid #ccc "}}>
                <h1>Data Peserta Sanbercode Bootcamp Reactjs</h1>
                <ol>
                    <li><strong style={{ width: "100px"}}>Nama:</strong> Ahmad Galang Satria</li>
                    <li><strong style={{ width: "100px"}}>Email:</strong> ahmadgalangclass@gmail.com</li>
                    <li><strong style={{ width: "100px"}}>Sistem Operasi yang digunakan:</strong> Windows 10</li>
                    <li><strong style={{ width: "100px"}}>Akun Gitlab:</strong> @ahmadgalangclass</li>
                    <li><strong style={{ width: "100px"}}>Akun Telegram:</strong> @gyozpada</li>
                </ol>
            </div>
            <br />
            <br />
            <Link to="/">Home</Link>
            </section>
    );
};

export default About;
