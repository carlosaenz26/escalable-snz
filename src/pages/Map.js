// instalr charts
// npm install @ant-design/charts --legacy-peer-deps


import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../components/context/Context';
import { ShowMap } from '../components/ShowMap';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

export const Map = () => {

    const { urlMapa, setTableHead, mapState, setMapState } = useContext(Context)
    const mapRef = useRef(null);
    /// se carga solamente el mapa
    useEffect(() => {
        setTableHead(tHead => tHead = 'map');

        mapRef.current = L.map("map", {
            center: [37.75, -122.44],
            zoom: 13,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });
    }, []);
/// se eliminan las capas y se cargan cada vez que se cambia el filtro (URL)
    useEffect(
        () => {

            mapRef.current.eachLayer(function (layer) {
                mapRef.current.removeLayer(layer);
            });
            //Mapa base
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            let data = [];
            fetch(urlMapa)
                .then(res => res.json())
                .then(response => {
                    data = response
                    const points = data
                        ? data.map((p) => {
                            return [p.Y, p.X];
                        })
                        : [];
                    // se grafican puntos tipo heatLayer (capa de calor)
                    L.heatLayer(points).addTo(mapRef.current);

                })
        }, [urlMapa]);
   // se define componente de entrada de datos


    return (

        //se grafica con la clase de TableMap la salida del mapa 
        <>
            <ShowMap showSelect={'none'} />
        </>

    )


}