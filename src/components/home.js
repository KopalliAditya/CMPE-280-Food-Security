import Header from "./header";
import NavBar from "./nav";
import "../App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCountry, setRRange } from "../CountryRangeSlice";
import { Link } from "react-router-dom";



export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("China");
  const [persona, setSelectedPersona] = useState("Researcher");
  const [basket, setBasket] = useState([]);
  const [range, setRange] = useState([1960, 2020]);
  const dispatch = useDispatch();
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    dispatch(setCountry(country));
    setBasket([]);
  };

  const handlePersonaChange = (country) => {
    setSelectedPersona(country);
  };

  const years = [];
  for (let i = 1990; i < 2021; i++) {
    years.push(i);
  }

  const [annotations, setAnnotations] = useState([]);

  const rangeChange = (event, newValue) => {
    setRange(newValue);
    console.log(newValue);
    dispatch(setRRange(newValue));
  };



  return (
    <div>
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <div className="col-md-2" >
          <NavBar country={selectedCountry} range={range} />
        </div>
        <div className="col-md-1 vl"></div>
        <div className="col-md-8 main-container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <br />
                <br />
                <br />
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={range}
                  onChange={rangeChange}
                  min={1960}
                  max={2020}
                  valueLabelDisplay="auto"

                //   getAriaValueText={valuetext}
                />
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Year: <span id="demo">{`${range[0]}-${range[1]}`}</span>
                </p>
              </div>
            </div>

            <div className="col-md-4 position-absolute top-0 end-0 p-3">
              <select
                onChange={(e) => {
                  handleCountryChange(e.target.value);
                }}
              >
                <option>CHINA</option>
                <option>INDIA</option>
                <option>USA</option>
              </select>
              <br />
              <br />
              <select
                onChange={(e) => {
                  handlePersonaChange(e.target.value);
                }}
              >
                <option>Researcher</option>
                <option>Government Official</option>
              </select>
            </div>
          </div>

          <div className="col-md-1 position-absolute top-0 end-0 p-3">


            <div className="nav-main-elements">
              {/* Using a button for the "ChatGPT" link */}
              <Link to="/copilot">
                <button
                  style={{
                    backgroundColor: 'rgb(25, 118, 210)',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100px'
                  }}
                >
                  🗨️ Co-Pilot
                </button>
              </Link>
            </div>


          </div>

          <div className="row">
            <div className="col-md-10">
              <div className=" row drag-drop-area">
                <DragDropArea
                  basket={basket}
                  setBasket={setBasket}
                  notes={setAnnotations}
                />
              </div>
            </div>

            <div className="col-md-2">
              {persona === "Researcher" && (
                <div className="annotation" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Annotations</h4>
                  <div style={{ fontSize: '20px', lineHeight: '1.6' }}>
                    {annotations}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>


      </div>
    </div>


  );
}

export function DragDropArea({ isDragging, text, basket, setBasket, notes }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Basket basket={basket} setBasket={setBasket} notes={notes} />
    </DndProvider>
  );
}


export const MenuCard = ({ id, name, chart }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'menuItem',
    item: { id, name, chart },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const cardStyle = {
    padding: '10px',
    margin: '10px',
    backgroundColor: isDragging ? '#f0f0f0' : 'white',
    border: isDragging ? '2px dashed #333' : '2px solid #ddd',
    cursor: 'move',
  };

  return (
    <div className="pet-card" ref={dragRef} style={cardStyle}>
      {name}
      {isDragging && <span> - Dragging...</span>}
    </div>
  );
};

export const Notes = (props) => {
  const [notes, setNotes] = useState("");

  const closeNote = () => {
    props.closeNote(notes);
  };
  return (
    <div style={{
      backgroundColor: "rgb(10 106 183 / 50%)",
      width: "200px",
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center",
      position: "relative",
      marginLeft: "300px",
    }}>
      <textarea
        onChange={(e) => setNotes(e.target.value)}
        type="text"
        placeholder="Add Notes.."
        style={{
          width: "100%",
          padding: "8px",
          margin: "8px 0",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      ></textarea>
      <button
        onClick={closeNote}
        style={{
          padding: "10px 20px",
          backgroundColor: "#242424",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          //position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "matrix(1, 0, 0, 1, 0, 0)",
        }}
      >
        Add Note
      </button>
    </div>

  );
};

export const BasketChart = ({ id, name, chart, anNotes }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "menuItem",
    item: { id, name, chart },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [showNotes, setShowNotes] = useState(false);

  const addNotes = () => {
    setShowNotes(true);
  };

  const submitNotes = (notes) => {
    anNotes(notes);
    setShowNotes(false);
  };

  return (
    <div>
      <div onClick={addNotes} className="pet-card" ref={dragRef}>
        {name}
        {isDragging}
        {chart}
      </div>
      {showNotes ? <Notes closeNote={submitNotes} /> : null}
    </div>
  );
};

export const Basket = ({ basket, setBasket, notes }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "menuItem",
    drop: (item) =>
      setBasket((basket) =>
        !basket.includes(item) ? [...basket, item] : basket
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div>
      <div
        style={{ width: "800px", height: "600px", marginTop: "20px", position: "relative" }}
        className="basket"
        ref={dropRef}
      >
        {basket.map((menuItem) => (
          <BasketChart
            key={menuItem.id}
            name={menuItem.name}
            chart={menuItem.chart}
            anNotes={notes}
          />
        ))}
        {isOver && (
          <div
            style={{
              // position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "30px",
              fontWeight: "bold",
              color: "#000000", // You can change the color to your preference
            }}
          >
            Drop Here!
          </div>
        )}
      </div>
    </div>
  );


};
