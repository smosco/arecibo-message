import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/HomePage.scss';

interface Signal {
  _id: string;
  binaryCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HomePage = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [grids, setGrids] = useState<{ grid: number[][]; title: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드에서 여러 개의 문자열로 된 이진수를 가져오는 API 호출
    const getSignals = async () => {
      try {
        // API 호출 및 응답 받기
        const response = await axios.get('http://localhost:8080/api/signals');
        const data = await response.data;
        // 가져온 데이터 설정
        setSignals(data);
      } catch (error) {
        console.error('Error fetching signals:', error);
      }
    };

    getSignals();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행됨

  useEffect(() => {
    // 객체들의 배열을 그리드들로 변환
    const convertToGrids = (
      signals: Signal[],
    ): { grid: number[][]; title: string }[] => {
      return signals.map(signal => {
        const binaryMessage: string = signal.binaryCode;
        const rows = binaryMessage.match(/.{1,23}/g); // 73개씩 나누어 행 배열 생성
        if (rows) {
          const grid = rows.map(row =>
            row.split('').map(cell => parseInt(cell, 10)),
          );
          return { grid, title: signal.description };
        }
        return { grid: [], title: '' };
      });
    };

    setGrids(convertToGrids(signals));
  }, [signals]); // signals가 변경될 때마다 실행됨

  console.log(grids);

  return (
    <div className="app">
      <h1>View Arecibo Messages</h1>
      <ul>
        {grids.map((grid, index) => (
          <li key={index} className="grid-container">
            <h2>{grid.title}</h2>
            {grid.grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <button
                    key={colIndex}
                    className={`cell ${cell === 1 ? 'black' : 'white'}`}
                  ></button>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/create')}>
        아레시보 메시지 만들기
      </button>
    </div>
  );
};

export default HomePage;
