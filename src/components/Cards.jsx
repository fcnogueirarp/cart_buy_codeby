import React, { useEffect, useState } from 'react';
import { apiDown, apiUp } from '../services/httpService/api';
import { getNewId } from '../services/UUID/uuid';
import styles from './Cards.module.css';
import _ from 'lodash';
import Buttons from './Buttons';
import Total from './Total';

function Cards(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsUniq, setAllProductsUniq] = useState([]);
  const [productUp, setProductUp] = useState([]);
  const [productDown, setProductDown] = useState([]);

  useEffect(() => {
    (async function up() {
      const apiUpGet = await apiUp.get();
      const apiUpGetData = await apiUpGet.data;
      setProductUp(apiUpGetData);
    })();
  }, []);

  useEffect(() => {
    (async function down() {
      const apiDownGet = await apiDown.get();
      const apiDownGetData = await apiDownGet.data;
      setProductDown(apiDownGetData);
    })();
  }, []);

  useEffect(() => {
    setAllProducts([...productUp, ...productDown]);
  }, [productUp, productDown]);

  useEffect(() => {
    setAllProductsUniq(_.uniq(allProducts));
  }, [allProducts]);

  return (
    <>
      <section>
        {allProductsUniq.map(item => {
          return (
            <div key={getNewId()} className={styles.card}>
              <img key={getNewId()} src={item.imageUrl} alt="" />
              <div className={styles.card__description}>
                <h2 key={getNewId()}>{item.name}</h2>
                <h6 key={getNewId()}>
                  R${(item.price / 100).toLocaleString()}
                </h6>
                <h5 key={getNewId()}>
                  R$ {(item.sellingPrice / 100).toLocaleString()}
                </h5>
                <div className="container__button">
                  <Buttons>{item.sellingPrice}</Buttons>
                </div>
              </div>
            </div>
          );
        })}
        <Total></Total>
      </section>
    </>
  );
}

export default Cards;
