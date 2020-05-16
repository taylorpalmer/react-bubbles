import React, { useState } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e, { colors }) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log("edit: ", colors);
    axios
      .put(`http://localhost:5000/api/colors/${colors.id}`, colorToEdit)
      .then((res) => {
        console.log("put res: ", res);
        updateColors(
          res.data
          // (state) =>
          // state.map((color) => {
          //   if (color.id === color.id) {
          //     return res.data;
          //   } else {
          //     return colorToEdit;
          //   }
          // })
        );
        colors.history.push(`/bubblepage`);
      })
      .catch((err) => {
        console.log("Error is: ", err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color

    axios.delete(`http://localhost:5000/api/colors/${color.id}`).then((res) => {
      console.log("delete res: ", res);
      updateColors(
        res.data
        // (state) =>
        // state.filter((color) => color.id !== color.match.params.id)
      );
      color.history.push(`/bubblepage`);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
