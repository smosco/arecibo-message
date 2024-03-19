import { useState } from 'react';
import '../scss/CreatePage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [grid, setGrid] = useState<number[][]>(
    Array.from({ length: 73 }, () => Array(23).fill(0)),
  );
  const [desc, setDesc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (rowIndex: number, colIndex: number): void => {
    const newGrid = [...grid];
    newGrid[colIndex][rowIndex] = newGrid[colIndex][rowIndex] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const saveSignal = async () => {
    // 이진수로 변환
    const binaryCode: string = grid.map(row => row.join('')).join('');

    // 이진수를 백엔드에 저장하는 로직
    console.log('이진수 메시지:', binaryCode);
    // 백엔드로 전송하는 API 호출 등의 로직 추가
    try {
      setIsLoading(true);
      const res = await axios.post('http://localhost:8080/api/signals', {
        binaryCode,
        description: desc,
      });
      console.log(res);
      alert('saved');
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      // alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Arecibo Message</h1>
      <div className="grid-container">
        <input
          type="text"
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDesc(e.target.value);
          }}
          placeholder="아레시보 메시지를 설명해주세요"
        />
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
      {!isLoading && <button onClick={saveSignal}>Save to Backend</button>}
    </div>
  );
};

export default CreatePage;
