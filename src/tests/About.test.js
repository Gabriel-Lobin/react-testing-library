import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testa o component About', () => {
  test('testa se a pagina contém a pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const AboutPokeText = screen.getByRole('heading', {
      level: 2, name: 'About Pokédex' });
    expect(AboutPokeText).toBeInTheDocument();
  });

  test('testa se tem uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imgPoke = screen.getByAltText('Pokédex');
    expect(imgPoke.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
