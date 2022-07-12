import React, { useState, useEffect } from "react";
import { DataScroller } from "primereact/datascroller";
import { Divider } from "primereact/divider";

import { VuelosService } from "../services/VuelosService";
import VueloCard from "../components/vuelo/VueloCard";
import Buscador from "../components/buscador/Buscador";
import "./Vuelo.css";

export default function Vuelos() {
  const [vuelos, setVuelos] = useState([]);
  const vuelosService = new VuelosService();
  const [dictionariesRes, setDictionariesRes] = useState([]);
  useEffect(() => {
    vuelosService.getVuelos().then((data) =>{
      setDictionariesRes(data.dictionaries);
      setVuelos(data.data);
    } );
  }, []);

  const itemTemplate = (data) => {
    return (
      <VueloCard
        precioVuelo={data.price}
        startIda={data.itineraries[0].segments[0].departure.iataCode}
        startRegreso={data.itineraries[1].segments[0].departure.iataCode}
        dateDepart={data.itineraries[0].segments[0].departure.at}
        dateArrive={data.itineraries[1].segments[0].departure.at}
        itinerariesDepart={data.itineraries[0]}
        itinerariesArrive={data.itineraries[1]}
        dictionaries={dictionariesRes}
      />
    );
  };
  return (
    <div className="grid align-items-center justify-content-center">
      <div className="col-3 flex align-items-center justify-content-center">
        <div className="p-fluid">
          <Buscador />
        </div>
      </div>

      <Divider layout="vertical" />

      <div className="col-8 flex align-items-center justify-content-center">
        <DataScroller
          value={vuelos}
          itemTemplate={itemTemplate}
          rows={5}
          inline
          scrollHeight="800px"
          header="Desliza hacia abajo para cargar más resultados"
        />
      </div>
    </div>
  );
}