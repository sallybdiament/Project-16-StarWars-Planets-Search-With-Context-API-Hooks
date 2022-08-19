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
  const [clickOrder, setClickOrder] = useState(false);

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

  // fazer um useEffect com os filtros sendo percorridos do zero: fazer um map edepois dentro dele a logica do if
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
        // console.log(filteredPlanets);
        return setPlanets(filteredPlanets);
      });
    } else { setPlanets(allPlanets); }
  }, [filterByNumericValues]);

  useEffect(() => {
    const um = -1;
    if (filterByNumericValues.length > 0) {
      // const { column } = filterByNumericValues.at(um);
      // let filteredPlanets = [];
      // if (comparison === 'maior que') {
      //   filteredPlanets = planets
      //     .filter((planet) => (
      //       Number(planet[column]) > Number(value)));
      // } else if (comparison === 'menor que') {
      //   filteredPlanets = planets
      //     .filter((planet) => Number(planet[column]) < Number(value));
      // } else if (comparison === 'igual a') {
      //   filteredPlanets = planets
      //     .filter((planet) => Number(planet[column]) === Number(value));
      // }
      // // console.log(filteredPlanets);
      // setPlanets(filteredPlanets);
      // console.log(filterByNumericValues.at(um).column);
      const newColumns = filterByNumericValues.at(um).column
        .filter((c) => c !== filterByNumericValues.at(um).column);
      // console.log(newColumns);
      setColumns(newColumns);
    }
  }, [filterByNumericValues]);

  useEffect(() => {
    console.log(order);
    // if (order !== undefined) {
    //   const { column, sort } = order;
    //   if (sort === 'ASC') {
    //     const one = 1;
    //     const sortedPlanets = planets[column].sort((a, b) => {
    //       if (a < b) return -one;
    //       if (a > b) return 1;
    //       return 0;
    //     });
    //     setPlanets(sortedPlanets);
    //   }
    // }
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
