import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, Route, Switch } from "react-router-dom";
import Inicio from "./componentes/Inicio";
import Blog from "./componentes/Blog";
import Tienda from "./componentes/Tienda";
import Error404 from "./componentes/Error404";
import Carrito from "./componentes/Carrito";

const App = () => {
  const productos = [
    { id: 1, nombre: "Producto 1", precio: "$45" },
    { id: 2, nombre: "Producto 2", precio: "$55" },
    { id: 3, nombre: "Producto 3", precio: "$65" },
    { id: 4, nombre: "Producto 4", precio: "$75" },
  ];

  const [carrito, cambiarCarrito] = useState([]);

  const agregarProductoAlCarrito = (idProdcutoAgregar, nombre) => {
    // Si el carrito no tiene elementos entonces agregamos uno.
    if (carrito.length === 0) {
      cambiarCarrito([{ id: idProdcutoAgregar, nombre: nombre, cantidad: 1 }]);
    } else {
      // De otra forma tenemos que revisar que el carrito no tenga ya prodcuto que queremos agregar
      // Si tiene ya el producto tenemos que actualizar su cantidad
      // Y si no tiene el producto con el ID entonces lo tenemos que agregar

      // Para poder editar tenemos que clonarlo
      const nuevoCarrito = [...carrito];

      // Comprobamos si el carrito ya tiene el ID del producto que queremos agregar
      const AgregadoEnCarrito =
        nuevoCarrito.filter((productoDeCarrito) => {
          return productoDeCarrito.id === idProdcutoAgregar;
        }).length > 0;
      // Estamos accediendo a nuestor nuevo carrito que es un clon (lo clonamos para poder editarlo)
      // Ahora al nuevo arreglo conado la aplicamos FILTER (lo que va hacer es ejecutar la funcion por cada uno de los elementos del arreglo)
      // Cada de uno de los elementos lo llamamos "prodcutoDeCarrito", en la funcion lo hacemos es comprobar si el "productoDeCarrito.id" === idProdcutoAgregar
      // Entonces devolvemos el prodcuto en un nuevo arreglo, y como esta en un arreglo ahora podemos preguntar si tiene una cantidad de elementos mayor a 0 devuelve "True" o "False"
      // En caso de que "productoDeCarrito.id" ya se encuentre agregado o no

      // Si ya tiene el producto entonces lo tenemos que actualizar
      if (AgregadoEnCarrito) {
        // Para eso tenemos que buscarlo, obtener su posicion en el arreglo
        // Y en base a su posicion ya actualizamos el valor
        nuevoCarrito.forEach((productoDeCarrito, index) => {
          if (productoDeCarrito.id === idProdcutoAgregar) {
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = {
              id: idProdcutoAgregar,
              nombre: nombre,
              cantidad: cantidad + 1,
            };
          }
        });
        // De otra forma agregamos el producto al arreglo
      } else {
        nuevoCarrito.push({
          id: idProdcutoAgregar,
          nombre: nombre,
          cantidad: 1,
        });
      }
      cambiarCarrito(nuevoCarrito);
    }
  };

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>
      <main>
        <Switch>
          <Route path="/" exact={true} component={Inicio} />
          <Route path="/blog" component={Blog} />
          <Route path="/tienda">
            <Tienda
              productos={productos}
              agregarProductoAlCarrito={agregarProductoAlCarrito}
            />
          </Route>
          <Route component={Error404} />
        </Switch>
      </main>
      <aside>
        <Carrito carrito={carrito} />
      </aside>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  max-width: 1000px;
  padding: 40px;
  width: 90%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 1fr;
  background: #fff;
  margin: 40px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;

const Menu = styled.nav`
  width: 100%;
  text-align: center;
  background: #092c4c;
  grid-column: span 2;
  border-radius: 3px;

  a {
    color: #fff;
    display: inline-block;
    padding: 15px 20px;
  }

  a:hover {
    background: #1d85e8;
    text-decoration: none;
  }
`;
export default App;
