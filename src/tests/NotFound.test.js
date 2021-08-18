import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testa a pagina notFound', () => {
  test('testa se há um texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pageinexistente');
    const notFoundText = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });

  test('testa se existe um gif com src "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pageinexistente');
    const sadGif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(sadGif.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
