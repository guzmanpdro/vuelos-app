import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../services/getVuelos";
import { DataScroller } from "primereact/datascroller";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner"
import VueloCard from "../components/vuelo/VueloCard";
import Buscador from "../components/buscador/Buscador";
import "./Vuelo.css";

export default function Vuelos() {
  const data = useLocation().state;
  const [vuelos, setVuelos] = useState([]);
  const [dictionariesRes, setDictionariesRes] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    get(data).then(res => {
      setVuelos(res.data)
      setDictionariesRes(res.dictionaries)
      setStatus("success")
    });
  }, [data]);

  

  const itemTemplate = (data) => {
    let dataVuelta = data.itineraries[1]?data.itineraries[1]:null;
    return (
      <VueloCard
        precioVuelo={data.price}
        startIda={data.itineraries[0].segments[0].departure.iataCode}
        startRegreso={dataVuelta?dataVuelta.segments[0].departure.iataCode:null}
        dateDepart={data.itineraries[0].segments[0].departure.at}
        dateArrive={dataVuelta?dataVuelta.segments[0].departure.at:null}
        itinerariesDepart={data.itineraries[0]}
        itinerariesArrive={dataVuelta}
        dictionaries={dictionariesRes}
      />
    );
  };
  return (
    <div className="grid align-items-center justify-content-center">
      <div className="col-3 flex align-items-center justify-content-center">
        <div className="p-fluid">
          <Buscador source={data} />
        </div>
      </div>

      <Divider layout="vertical" />

      <div className="col-8 flex align-items-center justify-content-center">
        {
          status === "loading"
          ? <ProgressSpinner />
          : <DataScroller
              value={vuelos}
              itemTemplate={itemTemplate}
              rows={5}
              inline
              scrollHeight="800px"
              header="Desliza hacia abajo para cargar más resultados"
            />
        }
      </div>
    </div>
  );
}
