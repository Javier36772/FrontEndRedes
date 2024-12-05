import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });

  // Cargar productos desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
      })
        .then((response) => response.json())
        .then((newProduct) => {
          setProducts([...products, newProduct]);
          setNewProduct({ name: "", price: "", description: "" });
        })
        .catch((error) => console.error('Error al agregar producto:', error));
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f4f4f4" }}>
      <header style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Gestión de Productos</header>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Ingrese el nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Ingrese el precio del producto"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Ingrese la descripción del producto"
          value={newProduct.description}
          onChange={handleInputChange}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button
          onClick={addProduct}
          style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}
        >
          Agregar Producto
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Nombre</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Precio</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#f2f2f2" }}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>${product.price.toFixed(2)}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
