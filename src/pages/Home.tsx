import React, { useEffect, useState } from 'react';
import { allCategories, allProduct } from '../service';
import { Category, Result } from '../models/Product';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { IUser } from '../models/IUser';
import { decrypt } from '../util';
import { ICategory } from '../models/ICategory';


function Home() {
  const [arr, setArr] = useState<Result[]>([]);
  const [catArr, setCatArr] = useState<ICategory[]>([]);

  useEffect(() => {
    allProduct()
      .then((res) => {
        setArr(res.data.result);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    allCategories()
      .then((res) => {
        setCatArr(res.data);
      })
      .catch((err) => {});
  }, []);

  const navigate = useNavigate();
  const stSession = sessionStorage.getItem('user');
  var user: IUser | undefined;
  if (stSession !== null) {
    const plainText = decrypt(stSession);
    user = JSON.parse(plainText) as IUser;
  }

  return (
    <div className="home-container">
      <Navbar user={user!} />
      <hr className="divider" />
      <h2 className="section-title">Products</h2>
      <hr className="divider" />
      <div className="row">
        <div className="col-sm-4 categories-section">
          <h3 className="categories-title">Categories</h3>
          <ul className="list-group categories-list">
            {catArr.map((item, index) => (
              <li key={index} className="list-group-item category-item">
                <NavLink to={'/category/' + item.name} aria-current="true">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm-8 products-section">
          <div className="row">
            {arr.map((item, index) => (
              <div className="col-sm-6 product-card" key={index}>
                <div className="card">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="card-img-top product-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title product-title">{item.title}</h5>
                    <p className="card-text product-price">${item.price}</p>
                    <NavLink
                      to={'/detail/' + item.pid}
                      className="btn btn-primary product-button"
                    >
                      Detail
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;