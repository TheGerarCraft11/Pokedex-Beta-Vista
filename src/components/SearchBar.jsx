// Importa React y el hook useState
import React, { useState } from "react";

// Componente que renderiza una barra de búsqueda para pokémons
function SearchBar({ onSearch }) {
  // Estado que almacena el texto del input
  const [nombre, setNombre] = useState("");

  // Maneja el submit del formulario y llama a la prop onSearch
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(nombre);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      {/* Input controlado para el nombre a buscar */}
      <input
        type="text"
        placeholder="Buscar Pokémon por nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {/* Botón para ejecutar la búsqueda */}
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
