import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testa o Component Pokemon', () => {
  test('testa se renderiza um card com o pokemon', () => {
    renderWithRouter(<App />);
    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke.textContent).toContain('Pikachu');
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.textContent).toContain('Electric');
    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke.textContent).toContain('Average weight: 6.0 kg');
    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(
    'testa se ao clicar no link de detalhes redireciona para a pagina do pokemon', () => {
      renderWithRouter(<App />);
      const detailLink = screen.getByRole('link', { name: 'More details' });
      expect(detailLink).toBeInTheDocument();
      userEvent.click(detailLink);
      const summaryPoke = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(summaryPoke).toBeInTheDocument();
    },
  );

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
