import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchAPI from '../services/data';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValuesObject, setFilterByNumericValuesObject] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    async function fetchPlanets() {
      const newPlanets = await fetchAPI();
      const newPlanets2 = newPlanets
        .map((planet) => {
          const { residents, ...rest } = planet;
          return rest;
          // delete (planet.residents);
          // return planet;
        });
      setPlanets(newPlanets2);
    }
    fetchPlanets();
  }, []);

  useEffect(() => {
    const um = -1;
    // if(filterByNumericValues.length ===0 ){
    //   setPlanets(Planets);
    // }
    if (filterByNumericValues.length > 0) {
      const { column, comparison, value } = filterByNumericValues.at(um);
      let filteredPlanets = [];
      if (comparison === 'maior que') {
        filteredPlanets = planets
          .filter((planet) => (
            Number(planet[column]) > Number(value)));
      } else if (comparison === 'menor que') {
        filteredPlanets = planets
          .filter((planet) => Number(planet[column]) < Number(value));
      } else if (comparison === 'igual a') {
        filteredPlanets = planets
          .filter((planet) => Number(planet[column]) === Number(value));
      }
      console.log(filteredPlanets);
      setPlanets(filteredPlanets);
      console.log(filterByNumericValues.at(um).column);
      const newColumns = columns
        .filter((c) => c !== filterByNumericValues.at(um).column);
      console.log(newColumns);
      setColumns(newColumns);
    }
  }, [filterByNumericValues]);

  return (

    <AppContext.Provider
      value={ {
        planets,
        setPlanets,
        filterByName,
        setFilterByName,
        filterByNumericValuesObject,
        setFilterByNumericValuesObject,
        filterByNumericValues,
        setFilterByNumericValues,
        columns,
        setColumns,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
