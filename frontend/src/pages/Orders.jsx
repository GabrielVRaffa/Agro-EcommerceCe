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
      const response = await axios.get(`http://localhost:5000/pedidos/${user.id}`);
      const pedidosComProdutos = await Promise.all(
        response.data.map(async (pedido) => {
          const produtosDetalhados = await Promise.all(
            pedido.produtos.map(async (item) => {
              try {
                const res = await axios.get(`http://localhost:5000/produtos/${item.id}`);
                console.log (res);
                return {
                  ...item,
                  nome: res.data.name,
                  imagem_url: res.data.image,
                  preco: res.data.price
                };
              } catch (err) {
                console.error(`Erro ao buscar produto ${item.id}:`, err);
                return {
                  ...item,
                  nome: "Produto não encontrado",
                  imagem_url: null,
                  preco: 0
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
      <p className="text-center mt-10 text-lg font-medium text-gray-600">
        Carregando pedidos...
      </p>
    );
  }

  if (pedidos.length === 0) {
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-600">
        Você ainda não fez nenhum pedido.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="meus-pedidos-titulo">
        Meus Pedidos
      </h2>
      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-xl text-gray-900">
              Pedido #{pedido.id}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(pedido.data_pedido).toLocaleString("pt-BR")}
            </p>
          </div>

          {pedido.status && (
            <p className="mb-4 text-sm text-gray-700">
              Status:{" "}
              <span className="font-semibold text-blue-600">
                {pedido.status}
              </span>
            </p>
          )}

          <ul className="mt-4 flex flex-wrap justify-center gap-3">
  {pedido.produtos.map((produto, idx) => (
    <li
      key={produto.id || idx}
      className="flex flex-col items-center bg-gray-50 rounded-lg shadow-sm p-3 w-32 transition-transform transform hover:scale-105"
      style={{ minWidth: 140 }}
    >
      {produto.imagem_url ? (
        <img
          src={produto.imagem_url}
          alt={produto.nome}
          className="w-28 h-28 object-cover rounded-md mb-2 shadow-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/112?text=Sem+Imagem";
          }}
        />
      ) : (
        <div className="w-28 h-28 bg-gray-300 rounded-md mb-2 flex items-center justify-center text-xs text-gray-500 font-medium">
          Sem Imagem
        </div>
      )}
      <span className="text-center font-semibold text-sm text-gray-800">
        {produto.nome}
      </span>
      <span className="text-xs text-gray-600 mt-1">
        Quantidade: {produto.quantidade || 1}
      </span>
      <span className="text-xs text-gray-600">
        Preço: R$ {parseFloat(produto.preco || 0).toFixed(2)}
      </span>
    </li>
  ))}
</ul>


          <div className="mt-6 text-gray-900 space-y-2 text-center md:text-left md:flex md:justify-between md:items-center md:space-y-0">
            <p className="text-sm md:text-base">
              Total de produtos:{" "}
              <strong className="font-semibold">
                R$ {parseFloat(pedido.valor_produtos || 0).toFixed(2)}
              </strong>
            </p>
            <p className="text-sm md:text-base">
              Frete:{" "}
              <strong className="font-semibold">
                R$ {parseFloat(pedido.valor_frete || 0).toFixed(2)}
              </strong>
            </p>
            <p className="text-base font-bold text-green-700">
              Total: R$ {parseFloat(pedido.valor_total || 0).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
