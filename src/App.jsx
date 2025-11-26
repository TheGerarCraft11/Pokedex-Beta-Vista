// Importa React y hooks necesarios
import React, { useEffect, useState } from "react";
// Importa componentes usados en la UI
import PokeCard from "./components/PokeCard";
import PokeList from "./components/PokeList";
import PokeForm from "./components/PokeForm";
import SearchBar from "./components/SearchBar";
import PokeCarousel from "./components/PokeCarousel";
import CardCustomizer from "./components/CardCustomizer";
// Importa estilos globales de la aplicación
import "./App.css";

// Componente raíz de la aplicación
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [mostrarCustomizer, setMostrarCustomizer] = useState(false);

  // 🔧 Configuración individual por Pokémon
  const [configs, setConfigs] = useState(() => {
    const saved = localStorage.getItem("pokeConfigs");
    return saved ? JSON.parse(saved) : {};
  });

  // Guardar configs
  useEffect(() => {
    localStorage.setItem("pokeConfigs", JSON.stringify(configs));
  }, [configs]);

  // Guardar tema
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // 🚀 Cargar pokémon desde backend
  const cargarPokemons = async () => {
    try {
      const res = await fetch(
        "https://mipokedex.infinityfreeapp.com/pokedex/backend/obtener.php"
      );
      const data = await res.json();
      setPokemons(data);
    } catch (error) {
      console.error("Error al cargar Pokémon:", error);
    }
  };

  // 🔍 Buscar pokémon
  const buscarPokemon = async (nombre) => {
    if (!nombre) return cargarPokemons();
    try {
      const res = await fetch(
        `https://mipokedex.infinityfreeapp.com/pokedex/backend/buscar.php?nombre=${nombre}`
      );
      const data = await res.json();
      setPokemons(data);
      setSeleccionado(null);
      setMostrarCustomizer(false);
    } catch (err) {
      console.error("Error al buscar:", err);
    }
  };

  // ➕ Insertar pokémon
  const agregarPokemon = async (pokemon) => {
    try {
      await fetch("https://mipokedex.infinityfreeapp.com/pokedex/backend/insertar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemon),
      });
      await cargarPokemons();
    } catch (err) {
      console.error("Error al agregar Pokémon:", err);
    }
  };

  // ❌ Eliminar pokémon
  const eliminarPokemon = async (id) => {
    try {
      await fetch("https://mipokedex.infinityfreeapp.com/pokedex/backend/eliminar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await cargarPokemons();
      setSeleccionado(null);
      setMostrarCustomizer(false);
    } catch (err) {
      console.error("Error al eliminar Pokémon:", err);
    }
  };

  // ✏️ Editar pokémon
  const modificarPokemon = async (pokemon) => {
    try {
      await fetch("https://mipokedex.infinityfreeapp.com/pokedex/backend/modificar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemon),
      });
      await cargarPokemons();
      setSeleccionado(null);
      setMostrarCustomizer(false);
    } catch (err) {
      console.error("Error al modificar Pokémon:", err);
    }
  };

  // Seleccionar desde lista o carrusel
  const handleSelectPokemon = (pokemon) => {
    setSeleccionado({ ...pokemon });
    setMostrarCustomizer(false);
  };

  // Actualiza el estilo individual
  const updateConfig = (id, newConfig) => {
    setConfigs((prev) => ({ ...prev, [id]: newConfig }));
  };

  // Cargar al inicio
  useEffect(() => {
    cargarPokemons();
  }, []);

  // Render UI
  return (
    <div className={`pokedex ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </button>
      </div>

      <div className="pokedex-izquierda">
        <div className="pantalla">
          <PokeList pokemons={pokemons} onSelect={handleSelectPokemon} />
        </div>

        <div className="botones">
          <button className="boton boton-rojo" onClick={cargarPokemons}>
            Recargar
          </button>

          <button
            className="boton boton-azul"
            onClick={() => {
              setSeleccionado(null);
              setMostrarCustomizer(false);
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="pokedex-derecha">
        <div className="pantalla-secundaria">
          {seleccionado ? (
            <div className="tarjeta-con-customizer">
              <div className="tarjeta-area">
                <PokeCard
                  pokemon={seleccionado}
                  config={configs[seleccionado.id] || {}}
                  theme={theme}
                />

                <div className="opciones-tarjeta">
                  <button
                    className="boton modificar-tarjeta"
                    onClick={() => setMostrarCustomizer((s) => !s)}
                  >
                    {mostrarCustomizer ? "Ocultar Personalización" : "Modificar Tarjeta"}
                  </button>

                  <button
                    className="boton boton-rojo"
                    onClick={() => {
                      const { [seleccionado.id]: removed, ...rest } = configs;
                      setConfigs(rest);
                    }}
                  >
                    Restablecer estilo
                  </button>
                </div>
              </div>

              <div className={`customizer-area ${mostrarCustomizer ? "visible" : "hidden"}`}>
                {mostrarCustomizer && (
                  <CardCustomizer
                    config={configs[seleccionado.id] || {}}
                    setConfig={(newCfg) => updateConfig(seleccionado.id, newCfg)}
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="texto-pantalla">Selecciona un Pokémon</p>
          )}
        </div>

        <SearchBar onSearch={buscarPokemon} />

        <PokeForm
          seleccionado={seleccionado}
          onAdd={agregarPokemon}
          onDelete={eliminarPokemon}
          onUpdate={modificarPokemon}
        />

        <PokeCarousel pokemons={pokemons} onSelect={handleSelectPokemon} />
      </div>
    </div>
  );
}

export default App;
