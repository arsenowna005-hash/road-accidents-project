import { useEffect, useState } from 'react';
import type { Accident } from './types';

function App() {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Функция загрузки данных с сервера
  const loadAccidents = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/v1/accidents')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сервера');
        return res.json();
      })
      .then(json => {
        setAccidents(json.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  // Загружаем при старте
  useEffect(() => {
    loadAccidents();
  }, []);

  // Функция удаления
  const handleDelete = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить это ДТП?")) return;
    
    try {
      const res = await fetch(`http://localhost:3000/api/v1/accidents/${id}`, { 
        method: 'DELETE' 
      });
      
      if (res.ok) {
        // Убираем удаленную запись из таблицы без перезагрузки страницы
        setAccidents(prev => prev.filter(a => a.id !== id));
      } else {
        alert("Ошибка при удалении на сервере");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети. Проверьте, запущен ли сервер.");
    }
  };

  if (loading) return <h1 style={{textAlign: 'center', marginTop: '50px'}}>⏳ Загрузка данных...</h1>;
  if (error) return <h1 style={{textAlign: 'center', color: 'red', marginTop: '50px'}}>❌ Ошибка: {error}</h1>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Список ДТП (React)</h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Место</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Дата</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Тип</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {accidents.map(a => (
            <tr key={a.id}>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{a.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{a.location}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{a.date}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{a.type}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                <button 
                  onClick={() => handleDelete(a.id)} 
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {accidents.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>Список пуст</p>}
    </div>
  );
}

export default App;