import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import saboresdaroca from "../assets/saboresdaroca.png";

function Home() {
  return (
    <div className="App" style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <img src={saboresdaroca} style={{ height: "200px" }} alt="Logo"></img>
      </div>
      <h1>Bem-vindo à Sabores da Roça</h1>
      <h3>
        Somos uma empresa de venda e distribuição de produtos da Agricultura
        Familiar. Entregamos para mercados de toda a região Sul.
      </h3>
      <h3> Faça seu pedido!</h3>
      <p style={{fontSize: 22}}>Confira nossos produtos fresquinhos e naturais.</p>
      <p>
        <Link
          to="/products"
          style={{
            fontSize: "1.5rem",
            color: "white",
            textAlign: "center",
            padding: "10px 20px",
            backgroundColor: "#28a745", // verde
            borderRadius: "5px",
            textDecoration: "none",
            display: "inline-block",
            transition: "background-color 0.3s ease",
            userSelect: "none",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e7e34")
          } // verde escuro ao clicar
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#28a745")} // volta ao normal ao soltar
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#28a745")
          } // volta ao normal se tirar o mouse
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#218838")
          } // muda um pouco o verde ao passar mouse
        >
          <strong>Ver Produtos</strong>
        </Link>
      </p>
    </div>
  );
}

export default Home;
