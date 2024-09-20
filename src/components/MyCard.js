import React, { useState } from "react";

export const MyCard = () => {
  const [cards, setCards] = useState([
    [
      "Note",
      "The titles will appear here",
      "The text of your note will appear here.",
    ],
  ]);

  const [cardColors, setCardColors] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedCard, setEditedCard] = useState(null);
  const [showSelectIndex, setShowSelectIndex] = useState(null);

  const addCard = () => {
    const newCard = [
      "Note",
      "Add a title for your note",
      "Add text to your note",
    ];
    setCards((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      setCardColors((prevColors) => [...prevColors, ""]);
      return updatedCards;
    });
  };

  const removeCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((_, i) => i !== index);
      return updatedCards;
    });
    setCardColors((prevColors) => prevColors.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedCard([...cards[index]]);
  };

  const saveCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = editedCard;
      return updatedCards;
    });
    setEditingIndex(null);
  };

  const handleColorChange = (index, event) => {
    const newColor = event.target.value;
    setCardColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColor;
      return updatedColors;
    });
  };

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {cards.map((card, index) => (
        <div className="col" key={index}>
          <div
            className="card h-100"
            style={{ backgroundColor: cardColors[index] || "white" }}
          >
            <div className="card-header d-flex justify-content-between align-items-center">
              {card[0]}
              <div>
                {/* Mostrar el botón + solo si el índice es 0 */}
                {index === 0 ? (
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={addCard}
                  >
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
                {/* Mostrar los demás botones para las tarjetas que no están en la fila 0 */}
                {index !== 0 && (
                  <>
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => removeCard(index)}
                    >
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
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => startEditing(index)}
                    >
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
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() =>
                        setShowSelectIndex(
                          showSelectIndex === index ? null : index
                        )
                      }
                    >
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
              {editingIndex === index ? (
                <div>
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
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => saveCard(index)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <blockquote className="blockquote mb-0">
                  <p>{card[1]}</p>
                  <footer className="blockquote-footer">{card[2]}</footer>
                </blockquote>
              )}

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
  );
};
