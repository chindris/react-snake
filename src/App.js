import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Snake from './Snake';

import { reduce, sum } from 'ramda';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Ramda Snake</h2>
        </div>
        <p className="App-intro">
          Let's play snake.
        </p>
        <Snake />
      </div>
    );
  }
}


//===== Some POC code to generate a random position from a matrix which has some
//===== occupied positions. The performance should be really really good for
//===== huge matrixes (after initialisation of the freeSpotsPerRow, which in the
//===== real case it is actually just a filled in array with the maximum value,
//===== the complexity of the alghorithm to get a random position is O(n), or
//===== more exactly O(2n), with n being the number of rows and columns in the
//===== matrix. The basic algorithm would be O(n^2). Now if you have a matrix
//===== of 1000x1000, this algorithm will perform way better).
const matrix = [
  [0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
];

const getFreeSpotsPerRow = (matrix) => {
  return reduce((acc, value) => {
    acc.push(value.length - sum(value));
    return acc;
  },
  [],
  matrix)
}

const getFreeSpotsNumber = (freeSpotsPerRow) => sum(freeSpotsPerRow);

const getRandomNumberInsideInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getLineAndColumn = (nr, freeSpotsPerRow, matrix) => {
  let row = 0;
  while (row < freeSpotsPerRow.length && freeSpotsPerRow[row] < nr) {
    nr -= freeSpotsPerRow[row];
    row++;
  }
  if (freeSpotsPerRow[row] >= nr) {
    let column = 0;
    while (nr > 0 && column < matrix.length) {
      if (matrix[row][column] == 0) {
        nr--;
        if (nr == 0) {
          return [row, column];
        }
      }
      column++;
    }
  }
  return null;
}


const freeSpotsPerRow = getFreeSpotsPerRow(matrix);
const freeSpotsNumber = getFreeSpotsNumber(freeSpotsPerRow);
const randomNumber = getRandomNumberInsideInterval(1, freeSpotsNumber);

console.log('Random number:', randomNumber);
const point = getLineAndColumn(randomNumber, freeSpotsPerRow, matrix);
console.log('Random point:',  point);

export default App;
