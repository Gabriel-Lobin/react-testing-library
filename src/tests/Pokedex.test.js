import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const POKE_ID = 'pokemon-name';
describe('testa o component Pokedex', () => {
  test('testa se existe o texto "Encoutered pokémons"', () => {
    renderWithRouter(<App />);
    const findPokesText = screen.getByText('Encountered pokémons');
    expect(findPokesText).toBeInTheDocument();
  });

  test('testa se existe um botão com texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokeButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokeButton).toBeInTheDocument();
  });

  test('testa o botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokeButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokeButton).toBeInTheDocument();
    userEvent.click(nextPokeButton);
    const namePoke = screen.getByTestId('pokemon-name');
    expect(namePoke.textContent).toContain('Charmander');
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.textContent).toContain('Fire');
    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke.textContent).toContain('Average weight: 8.5 kg');
  });

  test('testa se existe 7 botões de filtro', () => {
    renderWithRouter(<App />);
    const typePokeButton = screen.getAllByTestId('pokemon-type-button');
    const buttonsNumber = 7;
    expect(typePokeButton.length).toBe(buttonsNumber);
    const typePoke = screen.getByRole('button', { name: 'Electric' });
    expect(typePoke).toBeInTheDocument();
    userEvent.click(typePoke);
    const pokemonActual = screen.getByTestId(POKE_ID);
    expect(pokemonActual.textContent).toContain('Pikachu');
  });

  test('testa se o botão all existe', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  test('testa se o filtro funciona', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    const psychicButton = screen.getByText('Psychic');
    userEvent.click(psychicButton);
    const pokemonActualPsy = screen.getByTestId(POKE_ID);
    expect(pokemonActualPsy.textContent).toContain('Alakazam');
    userEvent.click(allButton);
    const pokemonActual = screen.getByTestId(POKE_ID);
    expect(pokemonActual.textContent).toContain('Pikachu');
  });
});
