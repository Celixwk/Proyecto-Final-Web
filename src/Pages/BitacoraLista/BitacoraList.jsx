// src/Pages/BitacoraList/BitacoraList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BitacoraList.css';

const BitacoraList = () => {
    const navigate = useNavigate(); // Hook para navegación
    const [bitacoras, setBitacoras] = useState([]); // Estado para almacenar bitácoras
    const [filteredBitacoras, setFilteredBitacoras] = useState([]); // Estado para bitácoras filtradas
    const [filters, setFilters] = useState({ // Estado para filtros
        title: '',
        location: '',
        habitat: '',
        climate: '',
    });
    
    const [sortOrder, setSortOrder] = useState('date'); // Estado para ordenamiento

    useEffect(() => {
        const storedBitacoras = JSON.parse(localStorage.getItem('bitacoras')) || []; // Carga bitácoras desde localStorage
        setBitacoras(storedBitacoras);
        setFilteredBitacoras(storedBitacoras);
    }, []);

    useEffect(() => {
        let result = bitacoras;

        // Aplicar filtros
        if (filters.title) {
            result = result.filter(bitacora =>
                bitacora.title.toLowerCase().includes(filters.title.toLowerCase())
            );
        }

        if (filters.location) {
            result = result.filter(bitacora =>
                bitacora.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.habitat) {
            result = result.filter(bitacora =>
                bitacora.habitatDescription.toLowerCase().includes(filters.habitat.toLowerCase())
            );
        }

        if (filters.climate) {
            result = result.filter(bitacora =>
                bitacora.climate.toLowerCase().includes(filters.climate.toLowerCase())
            );
        }

        // Ordenar resultados
        if (sortOrder === 'date') {
            result.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        } else if (sortOrder === 'location') {
            result.sort((a, b) => a.location.localeCompare(b.location));
        } else if (sortOrder === 'relevance') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredBitacoras(result);
    }, [bitacoras, filters, sortOrder]);

    const handleNavigate = (id) => navigate(`/bitacoras/${id}`); // Navega a los detalles de la bitácora

    const handleFilterChange = (e) => { // Maneja cambios en los filtros
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSortChange = (e) => setSortOrder(e.target.value); // Maneja cambios en el ordenamiento

    return (
        <section className="bitacora-list">
            <div className="filters">
                <h2 className="filters-title">Filtrar Bitácoras</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Buscar por título"
                    value={filters.title}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Buscar por ubicación"
                    value={filters.location}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="habitat"
                    placeholder="Buscar por hábitat"
                    value={filters.habitat}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="climate"
                    placeholder="Buscar por clima"
                    value={filters.climate}
                    onChange={handleFilterChange}
                />
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="date">Fecha</option>
                    <option value="location">Ubicación</option>
                    <option value="relevance">Relevancia</option>
                </select>
            </div>
            
            <div className="bitacora-items">
                {filteredBitacoras.map(bitacora => (
                  <div key={bitacora.id} className="bitacora-item" onClick={() => handleNavigate(bitacora.id)}>
                      <h3 className="bitacora-title">{bitacora.title}</h3>
                      <p className="bitacora-location">Ubicación: {bitacora.location}</p>
                      <p className="bitacora-habitat">Hábitat: {bitacora.habitatDescription}</p>
                      <p className="bitacora-climate">Clima: {bitacora.climate}</p>
                  </div>
                ))}
            </div>
        </section>
      );
};

export default BitacoraList;
