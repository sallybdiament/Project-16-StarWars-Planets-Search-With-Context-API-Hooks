import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchAPI from '../services/data';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    async function fetchPlanets() {
      const newPlanets = await fetchAPI();
      const newPlanets2 = newPlanets
        .map((planet) => {
          delete (planet.residents);
          return planet;
        });
      setPlanets(newPlanets2);
    }
    fetchPlanets();
  }, []);

  return (

    <AppContext.Provider
      value={ {
        planets,
        setPlanets,
        filterByName,
        setFilterByName,
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
