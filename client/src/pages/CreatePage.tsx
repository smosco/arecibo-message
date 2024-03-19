import { useState } from 'react';
import '../scss/CreatePage.scss';

const CreatePage = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array.from({ length: 73 }, () => Array(23).fill(0)),
  );

  const handleClick = (rowIndex: number, colIndex: number): void => {
    const newGrid = [...grid];
    newGrid[colIndex][rowIndex] = newGrid[colIndex][rowIndex] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const saveToBackend = (): void => {
    // 이진수로 변환
    const binaryMessage: string = grid.map(row => row.join('')).join('');

    // 이진수를 백엔드에 저장하는 로직
    console.log('이진수 메시지:', binaryMessage);
    // 백엔드로 전송하는 API 호출 등의 로직 추가
  };

  return (
    <div className="app">
      <h1>Arecibo Message</h1>
      <div className="grid-container">
        {grid.map((col, colIndex) => (
          <div key={colIndex} className="row">
            {col.map((cell, rowIndex) => (
              <button
                key={rowIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`cell ${cell === 1 ? 'black' : 'white'}`}
              ></button>
            ))}
          </div>
        ))}
      </div>
      <button onClick={saveToBackend}>Save to Backend</button>
    </div>
  );
};

export default CreatePage;
