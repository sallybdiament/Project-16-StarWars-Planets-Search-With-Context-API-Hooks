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
          //   value={ searchArtist }
          onChange={ handleChange }
        />
      </label>
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
