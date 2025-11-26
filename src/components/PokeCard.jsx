// Importa React
import React from "react";

// Componente que representa la tarjeta de un Pokémon con estilos configurables
function PokeCard({ pokemon, config, theme }) {
  // Determina el background: si se especifica gradient usa los colores, si no usa background o un gradiente por tema
  const background = config.gradient
    ? `linear-gradient(145deg, ${config.gradient1 || "#ff0000"}, ${
        config.gradient2 || "#b00000"
      })`
    : config.background ||
      (theme === "dark"
        ? "linear-gradient(145deg, #333, #111)"
        : "linear-gradient(145deg, #ff0000, #b00000)");

  // Construye el objeto de estilos inline usando la configuración recibida
  const estilos = {
    background,
    color: config.textColor || (theme === "dark" ? "#eee" : "#111"),
    borderRadius: `${config.borderRadius || 16}px`,
    padding: `${config.padding || 20}px`,
    width: `${config.width || 250}px`,
    height: `${config.height || 350}px`,
    fontFamily: config.font || "'Poppins', sans-serif", // fuente configurable
    fontSize: `${config.fontSize || 16}px`,
    boxShadow: config.shadow
      ? theme === "dark"
        ? "0 8px 20px rgba(255,255,255,0.15)"
        : "0 8px 20px rgba(0,0,0,0.3)"
      : "none",
    textAlign: "center",
    transition: "all 0.3s ease",
    overflowY: "auto",
  };

  // Renderiza la tarjeta con los datos del Pokémon
  return (
    <div className="poke-card" style={estilos}>
      {/* Nombre del Pokémon */}
      <h2>{pokemon.nombre}</h2>
      {/* Imagen del Pokémon con estilos configurables */}
      <img
        src={pokemon.imagen}
        alt={pokemon.nombre}
        style={{
          width: `${config.imageSize || 120}px`,
          borderRadius: `${config.imageRadius || 12}px`,
          background: config.imageBackground || "rgba(255,255,255,0.2)",
          padding: "6px",
        }}
      />
      {/* Resto de atributos del Pokémon mostrados en párrafos */}
      <p><strong>Tipo:</strong> {pokemon.tipo}</p>
      <p><strong>Salud:</strong> {pokemon.puntos_salud}</p>
      <p><strong>Ataque:</strong> {pokemon.ataque}</p>
      <p><strong>Defensa:</strong> {pokemon.defensa}</p>
      <p><strong>Ataque Esp.:</strong> {pokemon.ataque_especial}</p>
      <p><strong>Defensa Esp.:</strong> {pokemon.defensa_especial}</p>
      <p><strong>Velocidad:</strong> {pokemon.velocidad}</p>
    </div>
  );
}

export default PokeCard;
