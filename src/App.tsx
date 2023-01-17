import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DataEntity, Iproducts } from "./model/Iproducts";

function App() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [products, setProducts] = React.useState<DataEntity[]>([]);
  const [currentProductInfo, setCurrentProductInfo] =
    React.useState<DataEntity>();
  const [currentProducts, setCurrentProducts] = React.useState<DataEntity[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  console.log(currentProductInfo);
  useEffect(() => {
    fetch(`https://reqres.in/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data?.data);
        let sliceto = currentPage * 5;
        let startfrom = (currentPage - 1) * 5;
        setCurrentProducts(data?.data.slice(startfrom, sliceto));
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        alert("An error occurred. Please try again later.");
      });
  }, [currentPage]);
  const showResult = (id: number | string) => {
    if (!id) {
      let sliceto = currentPage * 5;
      let startfrom = (currentPage - 1) * 5;
      setCurrentProducts(products.slice(startfrom, sliceto));
      return;
    }
    const newData = products.filter((data) => data.id === id);
    setCurrentProducts(newData);
  };
  console.log(currentPage);
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
            <tr
              onClick={() => {
                setCurrentProductInfo(data);
                handleOpen();
              }}
              key={id}
              style={{ backgroundColor: `${data.color}` }}
            >
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 ? true : false}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * 5 >= products.length ? true : false}
        >
          Next
        </button>

        {/* <button onClick={handleOpen}>Open Modal</button> */}
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h1 className="modal-title">{currentProductInfo?.name}</h1>

              <h3 className="">Id: {currentProductInfo?.id}</h3>
              <h3 className="">Color: {currentProductInfo?.color}</h3>
              <h3 className="">
                Pantone Value: {currentProductInfo?.pantone_value}
              </h3>
              <h3 className="">Year: {currentProductInfo?.year}</h3>

              <button className="modal-close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
