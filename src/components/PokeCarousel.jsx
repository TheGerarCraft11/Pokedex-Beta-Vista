// Importa React y hooks necesarios
import React, { useEffect, useState, useRef } from "react";

// Componente carrusel de imágenes de pokémons con efecto infinito
function PokeCarousel({ pokemons = [], onSelect }) {
  // Índice actual del carrusel
  const [indice, setIndice] = useState(0);
  // Controla si la transición CSS está activa
  const [isTransitioning, setIsTransitioning] = useState(true);
  // Referencia al track del carrusel (no usada directamente pero disponible)
  const trackRef = useRef(null);

  // Duplicamos la lista para lograr el efecto visual de carrusel infinito
  const listaDuplicada = [...pokemons, ...pokemons];

  // Avance automático cada 2s; si no hay pokémons no hace nada
  useEffect(() => {
    if (pokemons.length === 0) return;
    const interval = setInterval(() => {
      moverDerecha();
    }, 2000);
    return () => clearInterval(interval);
  });

  // Función para mover el carrusel a la derecha (índice +1)
  const moverDerecha = () => {
    setIsTransitioning(true);
    setIndice((prev) => prev + 1);
  };

  // Función para mover el carrusel a la izquierda (índice -1)
  const moverIzquierda = () => {
    setIsTransitioning(true);
    setIndice((prev) => prev - 1);
  };

  // Cuando el índice supera los límites, reseteamos sin transición para simular infinito
  useEffect(() => {
    if (indice >= pokemons.length) {
      const timeout = setTimeout(() => {
        // Desactiva la transición y reinicia a 0
        setIsTransitioning(false);
        setIndice(0);
      }, 800);
      return () => clearTimeout(timeout);
    }
    if (indice < 0) {
      const timeout = setTimeout(() => {
        // Desactiva la transición y pone el índice al último elemento
        setIsTransitioning(false);
        setIndice(pokemons.length - 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [indice, pokemons.length]);

  // Si no hay pokémons, no renderiza nada
  if (pokemons.length === 0) return null;

  return (
    <div className="poke-carousel">
      {/* Flecha izquierda para desplazar */}
      <button className="boton-carousel izquierda" onClick={moverIzquierda}>
        ◀
      </button>

      <div className="carousel-container">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{
            // Traduce el track en X según el índice (80px por elemento)
            transform: `translateX(-${indice * 80}px)`,
            // Aplica o quita la transición CSS según isTransitioning
            transition: isTransitioning ? "transform 0.8s ease-in-out" : "none",
          }}
        >
          {/* Mapea la lista duplicada y muestra las imágenes clicables */}
          {listaDuplicada.map((p, i) => (
            <img
              key={i + p.id}
              src={p.imagen}
              alt={p.nombre}
              className="carousel-img"
              onClick={() => onSelect(p)}
            />
          ))}
        </div>
      </div>

      {/* Flecha derecha para desplazar */}
      <button className="boton-carousel derecha" onClick={moverDerecha}>
        ▶
      </button>
    </div>
  );
}

export default PokeCarousel;
