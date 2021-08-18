import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testa o component PokemonDetails', () => {
  test('testa se os detalhes do pokemon aparecem', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: 'More details' });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    const namePokeDetails = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(namePokeDetails).toHaveTextContent(/pikachu/i);
    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke.textContent).toContain('Pikachu');
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.textContent).toContain('Electric');
    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke.textContent).toContain('Average weight: 6.0 kg');
    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const summaryText = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryText.textContent).toContain('Summary');
    const PIKACHU_SUMMARY = /This intelligent Pokémon roasts/i;
    const summaryPoke = screen.getByText(PIKACHU_SUMMARY);
    expect(summaryPoke).toBeInTheDocument();
    const LocationSectionPoke = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(LocationSectionPoke).toBeInTheDocument();
    const mapImgPoke = screen.getAllByAltText('Pikachu location');
    expect(mapImgPoke[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImgPoke[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('testa se o pokemon foi marcado como favorito', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: 'More details' });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    const favoriteMarker = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favoriteMarker);
    expect(favoriteMarker).toBeChecked();
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toContain('star-icon.svg');
  });
});
