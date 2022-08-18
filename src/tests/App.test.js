import React from 'react';
import { render, screen  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderHook} from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import fetchAPI from '../services/data';


test('I am your test', () => {
  render(<App />);
  const text = screen.getByText(/procure um país:/i);
  expect(text).toBeInTheDocument();
});

test('se a api é chamada', () => {
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

test("aparece o primeiro planeta", () => {
  const planets = mockData;
  render(
    <AppContext.Provider value={planets}>
     <App />
    </AppContext.Provider>
  );
  expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();
});

test("aparece depois de filtrado", () => {
  render(
     <App />
  );
  const inputValue = screen.getByRole('spinbutton', {  name: /valor:/i});
        userEvent.type(inputValue, '10');
        const botaoFiltrar = screen.getByRole('button', {  name: /filtrar/i})
        userEvent.click(botaoFiltrar);
  expect(screen.getByRole('cell', {  name: /tatooine/i})).toBeInTheDocument();
});