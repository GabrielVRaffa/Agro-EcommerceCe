import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

function FecharPedido() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    numero: "",
    validade: "",
    cvv: "",
  });
  const [pedidoFeito, setPedidoFeito] = useState(false);

  const totalProdutos = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const calcularFrete = () => {
    const valorFrete = Math.floor(Math.random() * 500) + 500;
    setFrete(valorFrete);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const finalizarPedido = async () => {
    if (!user?.id) {
      alert("Você precisa estar logado para finalizar o pedido.");
      return navigate("/login");
    }
    if (frete == null) {
      return alert("Calcule o frete antes de finalizar.");
    }

    const pedido = {
      user_id: user.id,
      produtos: cartItems.map((i) => ({
        id: i.id,
        quantidade: i.quantity,
        preco: Number(i.price),
      })),
      valor_produtos: Number(totalProdutos.toFixed(2)),
      valor_frete: Number(frete.toFixed(2)),
    };

    try {
      const resp = await fetch("http://localhost:5000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (resp.ok) {
        setPedidoFeito(true);
        clearCart();
      } else {
        const msg = await resp.text();
        console.error("Erro ao enviar pedido:", msg);
        alert("Erro ao registrar pedido.");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      alert("Falha de rede ao registrar pedido.");
    }
  };

  if (pedidoFeito) {
    return (
      <div style={styles.container}>
        <h2 style={{ ...styles.title, color: "#28a745" }}>
          ✅ Pedido realizado com sucesso!
        </h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Finalizar Pedido</h1>

      <div style={styles.rowCentered}>
        <label htmlFor="cep" style={styles.label}>
          CEP:
        </label>
        <input
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="00000-000"
          style={styles.input}
        />
        <button onClick={calcularFrete} style={styles.button}>
          Calcular Frete
        </button>
      </div>

      {frete !== null && (
        <>
          <div style={styles.summaryBox}>
            <p style={{ color: "#222" }}>
              <strong style={{ color: "#222" }}>Valor dos Produtos:</strong>{" "}
              <span style={{ color: "#222" }}>
                R$ {totalProdutos.toFixed(2)}
              </span>
            </p>
            <p style={{ color: "#222" }}>
              <strong style={{ color: "#222" }}>Valor do Frete:</strong>{" "}
              <span style={{ color: "#222" }}>R$ {frete.toFixed(2)}</span>
            </p>
            <p
              style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#111" }}
            >
              Total Geral:{" "}
              <span style={{ color: "#111" }}>
                R$ {(totalProdutos + frete).toFixed(2)}
              </span>
            </p>
          </div>

          <h3 style={{ marginBottom: 12, textAlign: "center" , color: '#222'}}>Pagamento</h3>
          <div style={styles.formCentered}>
            <input
              name="nome"
              value={form.nome}
              onChange={handleInputChange}
              placeholder="Nome no cartão"
              style={styles.input}
            />
            <input
              name="numero"
              value={form.numero}
              onChange={handleInputChange}
              placeholder="Número do cartão"
              style={styles.input}
            />
            <input
              name="validade"
              value={form.validade}
              onChange={handleInputChange}
              placeholder="Validade (MM/AA)"
              style={styles.input}
            />
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              style={styles.input}
            />
          </div>

          <button
            onClick={finalizarPedido}
            style={{
              ...styles.button,
              backgroundColor: "#28a745",
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "1.5rem",
    maxWidth: 400,
    margin: "3rem auto",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  rowCentered: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
    justifyContent: "center",
    width: "100%",
  },
  label: {
    fontWeight: "600",
    minWidth: 40,
  },
  input: {
    flex: 1,
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    borderRadius: 6,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.2s",
    minWidth: 120,
  },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  summaryBox: {
    backgroundColor: "white",
    padding: "1rem 1.5rem",
    borderRadius: 6,
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginBottom: 20,
    color: "#333",
    fontSize: "1rem",
    lineHeight: 1.5,
    width: "100%",
    textAlign: "center",
  },
  formCentered: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    maxWidth: 320,
    width: "100%",
    alignItems: "center",
  },
};

export default FecharPedido;
