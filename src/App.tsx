import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DataEntity, Iproducts } from "./model/Iproducts";

function App() {
  const [data, setData] = React.useState<Iproducts>({} as Iproducts);
  const [products, setProducts] = React.useState<DataEntity[]>([]);

  useEffect(() => {
    fetch(`https://reqres.in/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setProducts(data?.data);
      });
  }, []);

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data, id) => (
            <tr key={id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
