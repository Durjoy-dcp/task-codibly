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
    <div className="App">
      {products.map((data) => (
        <h1>{data.color}</h1>
      ))}
    </div>
  );
}

export default App;
