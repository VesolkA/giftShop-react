import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import style from './Map.module.scss';

const MapComponent = () => {
  const position = [53.864718, 27.485504];  // Определите переменную position внутри компонента
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.leafletElement.openPopup();
    }
  }, []);

  return (
    <MapContainer className={style.container} center={position} zoom={18} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} ref={markerRef}>
        <Popup>
          <h2 className={style.title}>Мы здесь!</h2>
          <p>г.Минск, пр. Дзержинского, 146-2</p> 
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
