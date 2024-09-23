import React, { useState } from "react";

export const MyCard = () => {
  // Estado para almacenar las tarjetas
  const [cards, setCards] = useState([
    [
      "Note", // Título de la tarjeta
      "The titles will appear here", // Subtítulo
      "The text of your note will appear here.", // Texto principal de la tarjeta
    ],
  ]);

  // Estado para almacenar los colores de fondo de las tarjetas
  const [cardColors, setCardColors] = useState([]);
  // Índice de la tarjeta que se está editando (si está en modo de edición)
  const [editingIndex, setEditingIndex] = useState(null);
  // Datos temporales de la tarjeta que se está editando
  const [editedCard, setEditedCard] = useState(null);
  // Índice de la tarjeta que tiene visible el menú de selección de color
  const [showSelectIndex, setShowSelectIndex] = useState(null);

  // Función para añadir una nueva tarjeta
  const addCard = () => {
    const newCard = [
      "Note", // Título por defecto
      "Add a title for your note", // Subtítulo por defecto
      "Add text to your note", // Texto por defecto
    ];
    // Actualizamos el estado de las tarjetas y los colores
    setCards((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      setCardColors((prevColors) => [...prevColors, ""]); // Agregamos un color vacío para la nueva tarjeta
      return updatedCards;
    });
  };

  // Función para eliminar una tarjeta específica
  const removeCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((_, i) => i !== index); // Filtramos y eliminamos la tarjeta seleccionada
      return updatedCards;
    });
    setCardColors((prevColors) => prevColors.filter((_, i) => i !== index)); // También eliminamos su color asociado
  };

  // Función para iniciar el modo de edición de una tarjeta
  const startEditing = (index) => {
    setEditingIndex(index); // Guardamos el índice de la tarjeta que se está editando
    setEditedCard([...cards[index]]); // Copiamos el contenido de la tarjeta para editarlo
  };

  // Función para guardar los cambios realizados en una tarjeta
  const saveCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = editedCard; // Actualizamos la tarjeta con el contenido editado
      return updatedCards;
    });
    setEditingIndex(null); // Salimos del modo de edición
  };

  // Función para cambiar el color de fondo de una tarjeta
  const handleColorChange = (index, event) => {
    const newColor = event.target.value; // Color seleccionado
    setCardColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor; // Actualizamos el color de la tarjeta correspondiente
      return updatedColors;
    });
  };

  return (
    <div className="container">
      <div className={`row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 ${cards.length === 1 ? 'justify-content-center' : ''}`}>
        {/* Iteramos sobre cada tarjeta y la mostramos */}
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div
              className="card h-100"
              style={{ backgroundColor: cardColors[index] || "white" }} // Aplicamos el color de fondo
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                {card[0]} {/* Título de la tarjeta */}
                <div>
                  {/* Mostrar el botón + solo si el índice es 0 */}
                  {index === 0 ? (
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={addCard} // Añadir nueva tarjeta
                    >
                      {/* SVG del ícono + */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                      </svg>
                    </button>
                  ) : null}

                  {/* Mostrar botones de eliminar, editar y cambiar color para tarjetas que no sean la primera */}
                  {index !== 0 && (
                    <>
                      {/* Botón para eliminar la tarjeta */}
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => removeCard(index)}
                      >
                        {/* SVG del ícono - */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-minus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l14 0" />
                        </svg>
                      </button>

                      {/* Botón para editar la tarjeta */}
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => startEditing(index)}
                      >
                        {/* SVG del ícono de lápiz */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                          <path d="M13.5 6.5l4 4" />
                        </svg>
                      </button>

                      {/* Botón para mostrar u ocultar el menú de selección de color */}
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() =>
                          setShowSelectIndex(
                            showSelectIndex === index ? null : index
                          )
                        }
                      >
                        {/* SVG del ícono de paleta de colores */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-palette"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                          <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="card-body">
                {/* Si la tarjeta está en modo de edición */}
                {editingIndex === index ? (
                  <div>
                    {/* Campo para editar el subtítulo de la tarjeta */}
                    <textarea
                      value={editedCard[1]}
                      onChange={(e) =>
                        setEditedCard([
                          editedCard[0],
                          e.target.value,
                          editedCard[2],
                        ])
                      }
                      className="form-control mb-2"
                    />
                    {/* Campo para editar el texto principal de la tarjeta */}
                    <input
                      type="text"
                      value={editedCard[2]}
                      onChange={(e) =>
                        setEditedCard([
                          editedCard[0],
                          editedCard[1],
                          e.target.value,
                        ])
                      }
                      className="form-control"
                    />
                    {/* Botón para guardar los cambios */}
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => saveCard(index)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  // Mostrar el contenido de la tarjeta si no está en modo de edición
                  <blockquote className="blockquote mb-0">
                    <p>{card[1]}</p> {/* Subtítulo */}
                    <footer className="blockquote-footer">
                      {card[2]}
                    </footer>{" "}
                    {/* Texto principal */}
                  </blockquote>
                )}

                {/* Mostrar el selector de color si el índice coincide */}
                {showSelectIndex === index && (
                  <select
                    className="form-select mt-3"
                    aria-label="Default select example"
                    onChange={(e) => handleColorChange(index, e)}
                  >
                    <option value="">Select a color</option>
                    <option value="lightgreen">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="red">Red</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
