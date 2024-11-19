import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddNote.css';

const AddNote = () => {
    const { id } = useParams(); // Obtiene el ID de los parámetros de la URL
    const navigate = useNavigate(); // Hook para navegar entre rutas
    const [note, setNote] = useState(''); // Estado para almacenar la nota

    const handleSave = () => {
        // Verifica que la nota no esté vacía
        if (note.trim() === '') {
            alert('La nota no puede estar vacía.');
            return;
        }

        // Obtiene las bitácoras almacenadas en localStorage
        const storedBitacoras = JSON.parse(localStorage.getItem('bitacoras')) || [];
        
        // Actualiza la bitácora correspondiente con la nueva nota
        const updatedBitacoras = storedBitacoras.map((b) =>
            b.id === Number(id)
                ? { ...b, notes: [...(b.notes || []), note] }
                : b
        );

        // Guarda las bitácoras actualizadas en localStorage
        localStorage.setItem('bitacoras', JSON.stringify(updatedBitacoras));
        
        // Navega a la página anterior
        navigate('/bitacoras');
    };

    return (
        <section className="add-note">
            <h1>Agregar Nota</h1>
            <textarea
                className="note-input"
                value={note}
                onChange={(e) => setNote(e.target.value)} // Actualiza el estado de la nota
                placeholder="Escribe tu nota aquí..."
            ></textarea>
            <div className="button-container">
                <button id="save-button" onClick={handleSave}>
                    Guardar
                </button>
                <button id="cancel-button" onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </div>
        </section>
    );
};

export default AddNote;