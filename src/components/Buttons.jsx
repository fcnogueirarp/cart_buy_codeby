import React, { useEffect, useState } from 'react';
import styles from './Buttons.module.css';

function Buttons({ children: price }) {
  let [count, setCount] = useState(0);
  let [total, setTotal] = useState([]);
  let [arr, setArr] = useState([]);
  let [finalTotal, setFinalTotal] = useState([]);
  let [storage, setStorage] = useState([]);

  function handleClickLess() {
    if (count > 0 && count <= 1) {
      setCount(--count);
      setTotal(price * -1);
    }
  } 
  function handleClickMore() {
    if (count >= 0 && count < 1) {
      setCount(++count);
      setTotal(price * 1);
    }
  }

  useEffect(() => {
    const nodes = document.querySelectorAll('.Buttons_total__Rb530');

    for (var i = 0; i < nodes.length; ++i) {
      let nodeValues = [nodes[i].innerText];
      arr.push(nodeValues);
      setFinalTotal(arr.reduce((a, b) => +a + +b, 0));
      console.log(arr.reduce((a, b) => +a + +b, 0));
    }
  }, [total, arr]);

  useEffect(() => {
    setStorage(localStorage.setItem('total', finalTotal / 100));
  }, [finalTotal]);

  return (
    <>
      <div className={styles.container__buttons}>
        <span onClick={handleClickLess}> - </span>
        <h2>{count}</h2>
        <span onClick={handleClickMore}> + </span>
        <div className={styles.container}></div>

        <div className={styles.total}>{total}</div>
      </div>
    </>
  );
}

export default Buttons;
