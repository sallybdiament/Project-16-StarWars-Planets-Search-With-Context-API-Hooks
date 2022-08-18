import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Starwars() {
  const { planets, filterByName, setFilterByName,
    filterByNumericValues, setFilterByNumericValues,
    filterByNumericValuesObject,
    setFilterByNumericValuesObject,
    columns,
  } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const onInputChange = ({ target }) => {
    setFilterByNumericValuesObject({
      ...filterByNumericValuesObject, [target.name]: target.value });
  };

  const onFilterClick = async () => {
    await setFilterByNumericValues([
      ...filterByNumericValues,
      filterByNumericValuesObject]);
  };

  const onRemoveAllClick = () => {
    setFilterByNumericValues([]);
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
      <label htmlFor="column">
        Coluna:
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ onInputChange }
        >
          { columns.map((column, index) => (
            <option key={ index }>{column}</option>
          ))}
          {/* <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option> */}
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          onChange={ onInputChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          id="value"
          value={ filterByNumericValuesObject.value }
          onChange={ onInputChange }
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
        onClick={ onFilterClick }
      >
        Filtrar
      </button>

      {filterByNumericValues
        .map((filter, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <span>
              {filter.column}
              {' '}
            </span>
            <span>
              {filter.comparison}
              {' '}
            </span>
            <span>
              {filter.value}
              {' '}
            </span>
            <span>
              <button
                type="submit"
              >
                Excluir
              </button>
            </span>
          </div>
        ))}

      <button
        type="submit"
        data-testid="button-remove-filters"
        onClick={ onRemoveAllClick }
      >
        Remover todas filtragens
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
