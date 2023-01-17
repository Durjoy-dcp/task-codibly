import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DataEntity, Iproducts } from "./model/Iproducts";

function App() {
  const [products, setProducts] = React.useState<DataEntity[]>([]);
  const [currentProducts, setCurrentProducts] = React.useState<DataEntity[]>(
    []
  );

  useEffect(() => {
    fetch(`https://reqres.in/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.data);
        setCurrentProducts(data?.data);
      });
  }, []);
  const showResult = (id: number | string) => {
    if (!id) {
      setCurrentProducts(products);
      return;
    }
    const newData = products.filter((data) => data.id === id);
    setCurrentProducts(newData);
  };

  return (
    <div className="App" style={{ maxWidth: "600px", margin: "auto" }}>
      <input
        type="number"
        onKeyUp={
          //@ts-ignore
          (event) => showResult(Number(event.target.value))
        }
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((data, id) => (
            <tr key={id} style={{ backgroundColor: `${data.color}` }}>
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
