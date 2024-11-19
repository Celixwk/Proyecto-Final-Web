// src/Pages/BitacoraForm/BitacoraForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BitacoraForm.css';

const BitacoraForm = () => {
   const navigate = useNavigate(); // Hook para navegación
   const [bitacora, setBitacora] = useState({
       title: '',
       dateTime: '',
       location: '',
       climate: '',
       habitatDescription: '',
   });

   const handleChange = (e) => { // Maneja cambios en los campos
       const { name, value } = e.target;
       setBitacora((prev) => ({ ...prev, [name]: value }));
   };

   const handleSave = () => { // Guarda la bitácora editada
       const storedBitacoras = JSON.parse(localStorage.getItem('bitacoras')) || [];
       const updatedBitacoras = [...storedBitacoras, { ...bitacora, id: Date.now() }];
       localStorage.setItem('bitacoras', JSON.stringify(updatedBitacoras));
       navigate('/bitacoras'); // Navega a la lista de bitácoras
   };

   return (
       <section className="bitacora-form">
           <h1 className="form-title">Registrar Nueva Bitácora</h1>
           <div className="form-field">
               <label className="form-label">Título:</label>
               <input
                   type="text"
                   name="title"
                   value={bitacora.title}
                   onChange={handleChange}
                   className="form-input"
                   placeholder="Escribe el título"
               />
           </div>
           <div className="form-field">
               <label className="form-label">Fecha y Hora:</label>
               <input
                   type="datetime-local"
                   name="dateTime"
                   value={bitacora.dateTime}
                   onChange={handleChange}
                   className="form-input"
               />
           </div>
           <div className="form-field">
               <label className="form-label">Ubicación:</label>
               <input
                   type="text"
                   name="location"
                   value={bitacora.location}
                   onChange={handleChange}
                   className="form-input"
                   placeholder="Ej. Ciudad, País"
               />
           </div>
           <div className="form-field">
               <label className="form-label">Clima:</label>
               <input
                   type="text"
                   name="climate"
                   value={bitacora.climate}
                   onChange={handleChange}
                   className="form-input"
                   placeholder="Ej. Soleado, Lluvioso"
               />
           </div>
           <div className="form-field">
               <label className="form-label">Descripción del Hábitat:</label>
               <textarea
                   name="habitatDescription"
                   value={bitacora.habitatDescription}
                   onChange={handleChange}
                   className="form-input"
                   placeholder="Escribe una descripción del hábitat."
               />
           </div>
           <div className="button-container">
               <button onClick={() => navigate(-1)}>Cancelar</button> {/* Botón para cancelar */}
               <button onClick={handleSave}>Guardar</button> {/* Botón para guardar */}
           </div>
       </section>
   );
};

export default BitacoraForm;
