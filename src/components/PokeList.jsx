// Importa React (aunque no se usen hooks, es requerido para JSX en algunas configuraciones)
import React from "react";

// Componente que renderiza la lista de pokémons como una serie de items clicables
function PokeList({ pokemons, onSelect }) {
  return (
    <div className="poke-list">
      {/* Recorre el array de pokémons y renderiza cada uno */}
      {pokemons.map((p) => (
        // Cada elemento muestra la imagen y el nombre y es clicable
        <div key={p.id} className="poke-item" onClick={() => onSelect(p)}>
          <img src={p.imagen} alt={p.nombre} />
          <p>{p.nombre}</p>
        </div>
      ))}
    </div>
  );
}

export default PokeList;
