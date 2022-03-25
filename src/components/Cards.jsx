/*react*/
import React, { useEffect, useState } from 'react';

/*backend from axios*/
import { apiDown, apiUp } from '../services/httpService/api';

/*UUID - help in the render of component*/
import { getNewId } from '../services/UUID/uuid';

/*Library - help in the work with arrays*/
import _ from 'lodash';

import styles from './Cards.module.css';
import Buttons from './Buttons';
import Total from './Total';

function Cards(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsUniq, setAllProductsUniq] = useState([]);
  const [productUp, setProductUp] = useState([]);
  const [productDown, setProductDown] = useState([]);

  /* Backend requisition and change state*/
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
        <Total />
      </section>
    </>
  );
}

export default Cards;
