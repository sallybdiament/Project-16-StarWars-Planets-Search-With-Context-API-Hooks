import React from 'react';
import { render, screen } from '@testing-library/react';
import {renderHook} from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import fetchAPI from '../services/data';


test('I am your test', () => {
  render(<App />);
  const text = screen.getByText(/procure um país:/i);
  expect(text).toBeInTheDocument();
});

test.only('se a api é chamada', () => {
  const mockFetch = Promise.resolve({
  json: () => Promise.resolve(mockData),
  })
 const functionAPI = jest.fn(global, 'fetch').mockImplementation(() => mockFetch);
// fetch.mockImplementation(mockFetch);
  render(<App />);
  expect(global.fetch).toBeCalled();
})

test('I am your test', () => {
  render(<App />);
  const text = screen.getByText(/procure um país:/i);
  expect(text).toBeInTheDocument();
});


test('render Hook', () => {
  const {result} = renderHook(() => {
    const [planets, setPlanets] = useState([]);
    React.useEffect(() => {
      setPlanets(mockData)
    }, [])
  
    return planets
  })
  
  expect(result.current).toBe(mockData)
})

test("UserGreeter salutes an anonymous user", () => {
  render(
    <AppContext.Provider value={null}>
      <App />
    </AppContext.Provider>
  );
  expect(screen.getByText("Hello stranger!")).toBeInTheDocument();
});

test("UserGreeter salutes a user", () => {
  const planets = mockData;
  render(
    <UserContext.Provider value={planets}>
     <App />
    </UserContext.Provider>
  );
  expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();
});