import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Servicios = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const categorias = [
    {
      nombre: "Serigrafía",
      items: [
        { nombre: "Playera", ruta: "/" },
        { nombre: "Vaso", ruta: "/vaso" },
        { nombre: "Taza", ruta: "/taza" },
        { nombre: "Cilindro básico", ruta: "/cilindro" },
        { nombre: "Reconocimiento de cristal", ruta: "/cristal" },
        { nombre: "Carpeta", ruta: "/carpeta" },
        { nombre: "Lapicero", ruta: "/lapicero" },
        { nombre: "Bolsa mandadera", ruta: "/bolsa-mandadera" },
        { nombre: "Bolsa ecológica", ruta: "/bolsa-ecologica" },
      ],
    },
    {
      nombre: "Sublimación",
      items: [
        { nombre: "Playera", ruta: "/playera-sublimada" },
        { nombre: "Cerámicas", ruta: "/ceramicas" },
        { nombre: "Termos", ruta: "/termos" },
        { nombre: "Tarro", ruta: "/tarro" },
        { nombre: "Llavero acojinado", ruta: "/llavero-acojinado" },
        { nombre: "Llavero sublimable", ruta: "/llavero-sublimable" },
        { nombre: "Gorra", ruta: "/gorra" },
        { nombre: "Liston", ruta: "/liston" },
        { nombre: "Servilleta", ruta: "/servilleta" },
        { nombre: "Mouse Pad", ruta: "/mouse-pad" },
        { nombre: "Bolsa tergal", ruta: "/bolsa-tergal" },
        { nombre: "Lanyard", ruta: "/lanyard" },
        { nombre: "Rompecabezas", ruta: "/rompecabezas" },
      ],
    },
    {
      nombre: "Impresiones en papel",
      items: [
        { nombre: "Volantes", ruta: "/volantes" },
        { nombre: "Recetarios", ruta: "/recetarios" },
        { nombre: "Nota de remisión", ruta: "/nota-remision" },
        { nombre: "Folder y diploma", ruta: "/folder-diploma" },
        { nombre: "Menu", ruta: "/menu" },
        { nombre: "Tarjeta de presentación", ruta: "/tarjeta-presentacion" },
      ],
    },
    {
      nombre: "Etiquetas",
      items: [
        { nombre: "Vinil", ruta: "/etiqueta-vinil" },
        { nombre: "Mylar", ruta: "/etiqueta-mylar" },
        { nombre: "Holografica", ruta: "/etiqueta-holografica" },
      ],
    },
    {
      nombre: "Vinil",
      items: [
        { nombre: "Playera", ruta: "/vinil-playera" },
        { nombre: "Sudadera", ruta: "/vinil-sudadera" },
        { nombre: "Vinil Impreso", ruta: "/vinil-impreso" },
        { nombre: "Microperforado", ruta: "/vinil-microperforado" },
        { nombre: "De corte", ruta: "/vinil-corte" },
      ],
    },
    {
      nombre: "Invitaciones",
      items: [
        { nombre: "Invitaciones", ruta: "/invitaciones" },
      ],
    },
    {
      nombre: "Multimedia",
      items: [
        { nombre: "Video", ruta: "/video" },
        { nombre: "Spot", ruta: "/spot" },
        { nombre: "Sesiones fotográficas", ruta: "/sesiones-fotograficas" },
        { nombre: "Redes sociales", ruta: "/redes-sociales" },
      ],
    },
  ];

  const toggleCategoria = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="header-content container">
        <div className="header-txt">
          <h1>Nuestros Servicios</h1>
          <p>Calidad y profesionalismo en cada proyecto</p>
        </div>
      </section>

      <section className="servicios container">
        <div id="categorias-container">
          {categorias.map((categoria, index) => (
            <div key={index} className="categoria">
              <h2 
                className={`categoria-titulo ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleCategoria(index)}
              >
                {categoria.nombre}
                <i className={`fa-solid fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
              </h2>
              
              <div className={`categoria-lista ${activeIndex === index ? 'active' : ''}`}>
                {categoria.items.map((item, itemIndex) => (
                  <Link 
                    key={itemIndex} 
                    to={item.ruta}
                    className="categoria-item-link"
                  >
                    {item.nombre}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Servicios;