import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testa o component FavoritePokemons', () => {
  test('testando se existe o texto "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const pokeNotFound = screen.getByText('No favorite pokemon found');
    expect(pokeNotFound).toBeInTheDocument();
  });
});
