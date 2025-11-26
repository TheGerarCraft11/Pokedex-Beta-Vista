// Importa React y hooks
import React, { useState, useEffect } from "react";

// Componente de formulario para agregar/editar/eliminar pokémons
function PokeForm({ seleccionado, onAdd, onDelete, onUpdate }) {
  // Estado local que contiene los campos del formulario
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    tipo: "",
    puntos_salud: "",
    ataque: "",
    defensa: "",
    ataque_especial: "",
    defensa_especial: "",
    velocidad: "",
    imagen: "",
  });

  // Cuando cambia la prop 'seleccionado' cargamos sus valores en el formulario
  useEffect(() => {
    if (seleccionado) {
      setForm(seleccionado);
    } else {
      // Si no hay seleccionado, restablecemos los campos a vacío
      setForm({
        id: "",
        nombre: "",
        tipo: "",
        puntos_salud: "",
        ataque: "",
        defensa: "",
        ataque_especial: "",
        defensa_especial: "",
        velocidad: "",
        imagen: "",
      });
    }
  }, [seleccionado]);

  // Maneja cambios en cualquier campo del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Maneja la acción de agregar: llama a onAdd y limpia el formulario
  const handleAdd = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      id: "",
      nombre: "",
      tipo: "",
      puntos_salud: "",
      ataque: "",
      defensa: "",
      ataque_especial: "",
      defensa_especial: "",
      velocidad: "",
      imagen: "",
    });
  };

  // Maneja la acción de actualizar: llama a onUpdate con los datos actuales
  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  // Maneja la acción de eliminar: llama a onDelete si hay un id
  const handleDelete = (e) => {
    e.preventDefault();
    if (form.id) {
      onDelete(form.id);
      setForm({
        id: "",
        nombre: "",
        tipo: "",
        puntos_salud: "",
        ataque: "",
        defensa: "",
        ataque_especial: "",
        defensa_especial: "",
        velocidad: "",
        imagen: "",
      });
    }
  };

  // Renderiza el formulario con inputs controlados
  return (
    <form className="poke-form" onSubmit={handleAdd}>
      {/* Campo ID */}
      <input name="id" placeholder="ID" value={form.id} onChange={handleChange} />
      {/* Campo Nombre */}
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      {/* Campo Tipo */}
      <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} />
      {/* Campo Puntos de salud */}
      <input name="puntos_salud" placeholder="PS" value={form.puntos_salud} onChange={handleChange} />
      {/* Campo Ataque */}
      <input name="ataque" placeholder="Ataque" value={form.ataque} onChange={handleChange} />
      {/* Campo Defensa */}
      <input name="defensa" placeholder="Defensa" value={form.defensa} onChange={handleChange} />
      {/* Campo Ataque especial */}
      <input name="ataque_especial" placeholder="Atk. Esp." value={form.ataque_especial} onChange={handleChange} />
      {/* Campo Defensa especial */}
      <input name="defensa_especial" placeholder="Def. Esp." value={form.defensa_especial} onChange={handleChange} />
      {/* Campo Velocidad */}
      <input name="velocidad" placeholder="Velocidad" value={form.velocidad} onChange={handleChange} />
      {/* Campo URL de la imagen */}
      <input name="imagen" placeholder="URL Imagen" value={form.imagen} onChange={handleChange} />

      <div className="acciones">
        {/* Botón Agregar (submit del formulario) */}
        <button type="submit" className="add">Agregar</button>
        {/* Botón Modificar que invoca handleUpdate */}
        <button type="button" className="update" onClick={handleUpdate}>Modificar</button>
        {/* Botón Eliminar que invoca handleDelete */}
        <button type="button" className="delete" onClick={handleDelete}>Eliminar</button>
      </div>
    </form>
  );
}

export default PokeForm;
