import React, { useEffect, useState } from 'react';
import styles from './Total.module.css';
import Swal from 'sweetalert2';

function Total() {
  const [storage, setStorage] = useState();
  const [teste, setTeste] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setStorage(localStorage.getItem('total'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  function handleClickMessage() {
    if (storage == 0) {
      Swal.fire('Carrinho Vazio!', '', 'error');
    } else Swal.fire('Compra efetuada com sucesso!', '', 'success');
  }
  return (
    <>
      <div className={styles.container}>
        <span>Total</span>
        <span>R${storage}</span>
      </div>
      {storage >= 10 && (
        <div className={styles.hidden}>
          Parabéns sua compra tem frete grátis
        </div>
      )}
      <button onClick={handleClickMessage}>Finalizar Compra</button>
    </>
  );
}

export default Total;
