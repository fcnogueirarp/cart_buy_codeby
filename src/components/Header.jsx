import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import shopcar from '../assets/image/iconbuy.svg';

function Header() {
  const [storage, setStorage] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setStorage(localStorage.getItem('total'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <header>
      <ul>
        <img src={shopcar} alt="Quantidade de produtos comprados" />
        <li>
          <b>Meu Carrinho</b>
        </li>
        <li>R${storage}</li>
      </ul>
    </header>
  );
}

export default Header;
