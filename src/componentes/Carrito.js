import React from "react";
import styled from "styled-components";

const Carrito = ({carrito}) => {
  return (
    <div>
      <h3>Carrito de Compra</h3>
      {carrito.length > 0 ? 
        carrito.map((producto, index) => {
            return(
                <Prodcuto key={index}>
                    <NombreProducto>
                        {producto.nombre}
                    </NombreProducto>
                    Cantidad: {producto.cantidad}
                </Prodcuto>
                
            )
        })
      : 
      <p>No hay productos en el carrito</p>}
    </div>
  );
};

const Prodcuto = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ebebf3;
    font-size: 12px;
`;

const NombreProducto = styled.p`
    font-weight: bold;
    font-size: 16px:
    color: #000;
`;

export default Carrito;
