import React from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const navigate = useNavigate();

  const handleChange = (e, id) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 10) {
      updateQuantity(id, value);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

   const handleFecharPedido = () => {
    if (cartItems.length > 0) {
      navigate('/fechar-pedido');
    }
  };


  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Carrinho de Compras</h1>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, color: 'black'}}>
            {cartItems.map(item => (
              <li
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  color: 'black'
                }}
              >
                <h3 style={{color: 'black'}}>{item.name}</h3>
                <p>
                  <strong>Descrição:</strong> {item.description}
                </p>
                <img src={item.image} alt={item.name} width="150" />
                <p>
                  <strong>Preço:</strong> R$ {Number(item.price).toFixed(2)}
                </p>
                <p>
                  <strong>Subtotal:</strong> R$ {(Number(item.price) * item.quantity).toFixed(2)}
                </p>
                <label>
                  Quantidade:{' '}
                  <input
                    type="number"
                    min="10"
                    value={item.quantity}
                    onChange={e => handleChange(e, item.id)}
                    style={{ width: '80px', marginLeft: '8px' }}
                  />
                </label>
                <br />
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <h2>Total: R$ {total.toFixed(2)}</h2>
          <button
            onClick={handleFecharPedido}
            style={{
              marginTop: '1rem',
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Fechar Pedido
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
