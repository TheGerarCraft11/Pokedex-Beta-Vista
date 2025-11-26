// Importa React
import React from "react";

// Componente que permite personalizar visualmente la tarjeta del Pokémon
function CardCustomizer({ config, setConfig }) {
  // Handler genérico que actualiza la configuración según el input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({ ...config, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="customizer">
      {/* Título del panel */}
      <h3>🎨 Personalizar Tarjeta</h3>

      {/* Selector de color de fondo */}
      <label>Color de fondo:</label>
      <input
        type="color"
        name="background"
        value={config.background || "#ff0000"}
        onChange={handleChange}
      />

      {/* Selector de color de texto */}
      <label>Color de texto:</label>
      <input
        type="color"
        name="textColor"
        value={config.textColor || "#000000"}
        onChange={handleChange}
      />

      {/* Slider para ancho */}
      <label>Ancho:</label>
      <input
        type="range"
        name="width"
        min="200"
        max="400"
        value={config.width || 250}
        onChange={handleChange}
      />

      {/* Slider para alto */}
      <label>Alto:</label>
      <input
        type="range"
        name="height"
        min="250"
        max="500"
        value={config.height || 350}
        onChange={handleChange}
      />

      {/* Slider para tamaño de fuente */}
      <label>Tamaño de letra:</label>
      <input
        type="range"
        name="fontSize"
        min="10"
        max="24"
        value={config.fontSize || 16}
        onChange={handleChange}
      />

      {/* Slider para tamaño de imagen */}
      <label>Tamaño de imagen:</label>
      <input
        type="range"
        name="imageSize"
        min="60"
        max="200"
        value={config.imageSize || 120}
        onChange={handleChange}
      />

      {/* Slider para radio de borde */}
      <label>Borde redondeado:</label>
      <input
        type="range"
        name="borderRadius"
        min="0"
        max="40"
        value={config.borderRadius || 16}
        onChange={handleChange}
      />

      {/* Checkbox para activar/desactivar sombra */}
      <label>Sombras:</label>
      <input
        type="checkbox"
        name="shadow"
        checked={config.shadow || false}
        onChange={handleChange}
      />

      {/* Selector de fuente */}
      <label>Estilo de letra:</label>
      <select
        name="font"
        value={config.font || "'Poppins', sans-serif"}
        onChange={handleChange}
        className="font-select"
      >
        <option value="'Poppins', sans-serif">Poppins</option>
        <option value="'Roboto', sans-serif">Roboto</option>
        <option value="'Open Sans', sans-serif">Open Sans</option>
        <option value="'Lobster', cursive">Lobster</option>
        <option value="'Press Start 2P', cursive">Press Start 2P</option>
        <option value="'Raleway', sans-serif">Raleway</option>
        <option value="'Montserrat', sans-serif">Montserrat</option>
        <option value="'Ubuntu', sans-serif">Ubuntu</option>
        <option value="'Caveat', cursive">Caveat</option>
        <option value="'Indie Flower', cursive">Indie Flower</option>
      </select>
    </div>
  );
}

export default CardCustomizer;
