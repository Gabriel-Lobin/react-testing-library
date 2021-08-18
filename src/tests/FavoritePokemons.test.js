import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testa o component FavoritePokemons', () => {
  test('testando se existe o texto "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const pokeNotFound = screen.getByText('No favorite pokemon found');
    expect(pokeNotFound).toBeInTheDocument();
  });

  test('testa se o pokemon foi marcado como favorito', () => {
    const { history } = renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: 'More details' });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    const favoriteMarker = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favoriteMarker);
    expect(favoriteMarker).toBeChecked();
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toContain('star-icon.svg');
    history.push('/favorites');
    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke.textContent).toContain('Pikachu');
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.textContent).toContain('Electric');
    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke.textContent).toContain('Average weight: 6.0 kg');
    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
