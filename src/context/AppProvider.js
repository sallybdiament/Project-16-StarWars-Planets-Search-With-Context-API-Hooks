import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchAPI from '../services/data';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
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
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [clickOrder, setClickOrder] = useState(1);

  useEffect(() => {
    async function fetchPlanets() {
      const newPlanets = await fetchAPI();
      const newPlanets2 = newPlanets
        .map((planet) => {
          const { residents, ...rest } = planet;
          return rest;
        });
      setPlanets(newPlanets2);
      setAllPlanets(newPlanets2);
    }
    fetchPlanets();
  }, []);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      let filteredPlanets = allPlanets;
      filterByNumericValues.map((filtered) => {
        if (filtered.comparison === 'maior que') {
          filteredPlanets = filteredPlanets
            .filter((planet) => (
              Number(planet[filtered.column]) > Number(filtered.value)));
        } else if (filtered.comparison === 'menor que') {
          filteredPlanets = filteredPlanets
            .filter((planet) => Number(planet[filtered.column]) < Number(filtered.value));
        } else if (filtered.comparison === 'igual a') {
          filteredPlanets = filteredPlanets
            .filter((planet) => (
              Number(planet[filtered.column]) === Number(filtered.value)));
        }
        return setPlanets(filteredPlanets);
      });
      const columnsFiltered = filterByNumericValues.map((f) => f.column);
      const newColumns = columns.filter((c) => (
        !columnsFiltered.includes(c)));
      setColumns(newColumns);
    } else { setPlanets(allPlanets); }
  }, [filterByNumericValues]);

  useEffect(() => {
    if (clickOrder > 1) {
      const { column, sort } = order;
      if (sort === 'ASC') {
        const one = 1;
        const sortedPlanets = planets.sort((a, b) => {
          if (Number(a[column]) < Number(b[column])) return -one;
          if (Number(a[column]) > Number(b[column])) return 1;
          if (b[column] === 'unknown') return -one;
          if (a[column] === 'unknown') return -one;
          return 0;
        });
        setPlanets(sortedPlanets);
      }
      if (sort === 'DESC') {
        const one = 1;
        const sortedPlanets = planets.sort((a, b) => {
          if (Number(a[column]) < Number(b[column])) return 1;
          if (Number(a[column]) > Number(b[column])) return -one;
          if (b[column] === 'unknown') return 1;
          if (a[column] === 'unknown') return 1;
          return 0;
        });
        setPlanets(sortedPlanets);
      }
    }
  }, [clickOrder]);

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
        allPlanets,
        setAllPlanets,
        order,
        setOrder,
        clickOrder,
        setClickOrder,
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
