// DateFilter.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateFilter.css'; // Importa el archivo de estilos

const DateFilter = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleFilterClick = () => {
        onDateChange(startDate, endDate);
    };

    return (
        <div className="date-filter">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Fecha de inicio"
                className="date-picker"
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Fecha de fin"
                className="date-picker"
            />
            <button className="filter-button" onClick={handleFilterClick}>
                Filtrar
            </button>
        </div>
    );
};

export default DateFilter;
