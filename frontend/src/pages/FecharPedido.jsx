import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function FecharPedido() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();                     // ← pega usuário logado
  const navigate = useNavigate();

  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);
  const [form, setForm] = useState({ nome: '', numero: '', validade: '', cvv: '' });
  const [pedidoFeito, setPedidoFeito] = useState(false);

  const totalProdutos = cartItems
    .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const calcularFrete = () => {
    const valorFrete = Math.floor(Math.random() * 1000) + 1000; // simulação
    setFrete(valorFrete);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const finalizarPedido = async () => {
    if (!user?.id) {
      alert('Você precisa estar logado para finalizar o pedido.');
      return navigate('/login');
    }
    if (frete == null) {
      return alert('Calcule o frete antes de finalizar.');
    }

    const pedido = {
      user_id: user.id,                                   // ✅ nome correto
      produtos: cartItems.map(i => ({
        id: i.id,
        quantidade: i.quantity,
        preco: Number(i.price)
      })),
      valor_produtos: Number(totalProdutos.toFixed(2)),   // ✅ número
      valor_frete: Number(frete.toFixed(2))               // ✅ número
    };

    console.log('🟡 Pedido sendo enviado:', pedido);

    try {
      const resp = await fetch('http://localhost:5000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });

      if (resp.ok) {
        setPedidoFeito(true);
        clearCart();
      } else {
        const msg = await resp.text();
        console.error('❌ Erro ao enviar pedido:', msg);
        alert('Erro ao registrar pedido.');
      }
    } catch (err) {
      console.error('❌ Erro de rede:', err);
      alert('Falha de rede ao registrar pedido.');
    }
  };

  if (pedidoFeito) {
    return <h2 className="App" style={{ padding: '2rem' }}>✅ Pedido realizado com sucesso!</h2>;
  }

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Finalizar Pedido</h1>

      {/* CEP e cálculo de frete */}
      <div style={{ marginBottom: '1rem' }}>
        <label>CEP:</label>
        <input value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" />
        <button onClick={calcularFrete} style={{ marginLeft: '1rem' }}>Calcular Frete</button>
      </div>

      {frete !== null && (
        <>
          <p><strong>Valor dos Produtos:</strong> R$ {totalProdutos.toFixed(2)}</p>
          <p><strong>Frete:</strong> R$ {frete.toFixed(2)}</p>
          <h2>Total: R$ {(totalProdutos + frete).toFixed(2)}</h2>

          {/* Formulário de cartão (simulado) */}
          <h3>Pagamento</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
            <input name="nome"     value={form.nome}     onChange={handleInputChange} placeholder="Nome no cartão" />
            <input name="numero"   value={form.numero}   onChange={handleInputChange} placeholder="Número do cartão" />
            <input name="validade" value={form.validade} onChange={handleInputChange} placeholder="Validade (MM/AA)" />
            <input name="cvv"      value={form.cvv}      onChange={handleInputChange} placeholder="CVV" />
          </div>

          <button
            onClick={finalizarPedido}
            style={{ marginTop: '1rem', background: '#28a745', color: '#fff',
                     padding: '0.75rem 1.5rem', border: 'none',
                     borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}

export default FecharPedido;
