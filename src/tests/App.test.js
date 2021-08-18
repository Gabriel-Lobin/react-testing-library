import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('testando links', () => {
  test('testando o link "Home"', () => {
    renderWithRouter(<App />);

    const homeButton = screen.getByRole('link', { name: 'Home' });
    expect(homeButton).toBeInTheDocument();
  });

  test('testanto o link "About"', () => {
    renderWithRouter(<App />);
    const aboutText = screen.getByRole('link', { name: 'About' });
    expect(aboutText).toBeInTheDocument();
  });

  test('testando o link "Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favPokeText = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favPokeText).toBeInTheDocument();
  });
});
