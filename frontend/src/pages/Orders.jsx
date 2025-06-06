import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    const fetchPedidos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pedidos/${user.id}`
        );
        const pedidosComProdutos = await Promise.all(
          response.data.map(async (pedido) => {
            const produtosDetalhados = await Promise.all(
              pedido.produtos.map(async (item) => {
                try {
                  const res = await axios.get(
                    `http://localhost:5000/produtos/${item.id}`
                  );
                  return {
                    ...item,
                    nome: res.data.name,
                    imagem_url: res.data.image,
                    preco: res.data.price,
                  };
                } catch (err) {
                  return {
                    ...item,
                    nome: "Produto não encontrado",
                    imagem_url: null,
                    preco: 0,
                  };
                }
              })
            );
            return { ...pedido, produtos: produtosDetalhados };
          })
        );

        setPedidos(pedidosComProdutos);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [user]);

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: 40,
          fontSize: 14,
          fontWeight: "400",
          color: "#718096",
          backgroundColor: "transparent",
        }}
      >
        Carregando pedidos...
      </p>
    );
  }

  if (pedidos.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: 40,
          fontSize: 14,
          fontWeight: "400",
          color: "#718096",
          backgroundColor: "transparent",
        }}
      >
        Você ainda não fez nenhum pedido.
      </p>
    );
  }

  return (
    <div
      style={{
        padding: 16,
        maxWidth: 1000,
        margin: "0 auto",
        backgroundColor: "transparent",
      }}
    >
      <h2
        style={{
          textAlign: "center", // centraliza
          marginBottom: 24, // leve espaço abaixo
          fontSize: 32, // fonte maior
          fontWeight: "700", // mais forte
          color: "#ffffff", // branco
          backgroundColor: "transparent",
        }}
      >
        Meus Pedidos
      </h2>

      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          style={{
            backgroundColor: "transparent",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            border: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              backgroundColor: "transparent",
            }}
          >
            <h3
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: "white",
                margin: 0,
                backgroundColor: "transparent",
              }}
            >
              Pedido #{pedido.id}
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "white",
                margin: 0,
                fontWeight: "400",
                backgroundColor: "transparent", 
              }}
            >
              {new Date(pedido.data_pedido).toLocaleString("pt-BR")}
            </p>
          </div>

          {pedido.status && (
            <p
              style={{
                marginBottom: 12,
                fontSize: 12,
                color: "#4a5568",
                fontWeight: "400",
                marginTop: 0,
                backgroundColor: "transparent",
              }}
            >
              Status:{" "}
              <span style={{ fontWeight: "600", color: "#3182ce" }}>
                {pedido.status}
              </span>
            </p>
          )}

          {/* ÁREA DOS PRODUTOS: fundo com 75% de opacidade */}
          <ul
            style={{
              display: "flex",
              gap: 8,
              padding: 6,
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.15)", // inline com 75% opacidade
              overflowX: "auto",
              maxHeight: 150, // altura suficiente p/ imagem + 2 linhas
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            {pedido.produtos.map((produto, idx) => (
              <li
                key={produto.id || idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#ffffff", // branco fora da inline
                  minWidth: 80,
                  userSelect: "none",
                  transition: "transform 0.3s ease",
                  padding: 1,
                  
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={
                    produto.imagem_url ||
                    "https://via.placeholder.com/70?text=Sem+Imagem"
                  }
                  alt={produto.nome}
                  style={{
                    width: 150,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 6,
                    marginBottom: 2,
                    backgroundColor: "transparent",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/70?text=Sem+Imagem";
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    textAlign: "center",
                    lineHeight: 1.1,
                    color: "#1a202c", // escuro dentro da inline
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    maxWidth: 150,
                  }}
                >
                  {produto.nome}
                </span>
                <span style={{ fontSize: 14, color: "#2d3748" }}>
                  Qtd: {produto.quantidade || 1}
                </span>
                <span style={{ fontSize: 14, color: "#2d3748" }}>
                  R$ {parseFloat(produto.preco || 0).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: 8,
              color: "#1a202c",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 8,
              fontSize: 12,
              backgroundColor: "transparent",
            }}
          >
            <p style={{fontSize: 16,  flex: "1 1 30%" }}>
              Total produtos:{" "}
              <strong style={{fontSize: 16,  fontWeight: "600" }}>
                R$ {parseFloat(pedido.valor_produtos || 0).toFixed(2)}
              </strong>
            </p>
            <p style={{fontSize: 16,  flex: "1 1 30%" }}>
              Frete:{" "}
              <strong style={{fontSize: 16,  fontWeight: "600" }}>
                R$ {parseFloat(pedido.valor_frete || 0).toFixed(2)}
              </strong>
            </p>
            <p
              style={{
                flex: "1 1 30%",
                fontWeight: "700",
                color: "rgb(130, 238, 171)",
                backgroundColor: "transparent",
                fontSize: 18, 
              }}
            >
              Total: R$ {parseFloat(pedido.valor_total || 0).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
