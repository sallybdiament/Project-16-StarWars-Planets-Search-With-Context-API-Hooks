import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Starwars() {
  const { planets, filterByName, setFilterByName } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  return (
    <div>
      <label htmlFor="searchName">
        Procure um país:
        <input
          type="text"
          data-testid="name-filter"
          name="searchName"
          id="searchName"
          //   value={  }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="columnFilter">
        Coluna:
        <select
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotarion_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        Operador:
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          id="comparisonFilter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        Valor:
        <input
          type="text"
          data-testid="value-filter"
          name="valueFilter"
          id="valueFilter"
          //   value={  }
          // onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rotation Period
            </th>
            <th>
              Orbital Period
            </th>
            <th>
              Diameter
            </th>
            <th>
              Climate
            </th>
            <th>
              Gravity
            </th>
            <th>
              Terrain
            </th>
            <th>
              Surface Water
            </th>
            <th>
              Population
            </th>
            <th>
              Films
            </th>
            <th>
              Created
            </th>
            <th>
              Edited
            </th>
            <th>
              Url
            </th>
          </tr>
        </thead>
        <tbody>
          { planets
            .filter((planet) => planet.name.includes(filterByName.name))
            .map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name}</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films.map((film) => film) }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Starwars;
