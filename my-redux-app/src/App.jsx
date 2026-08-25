import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './features/counterSlice';

function App() {
  // Read the counter value from the store
  const count = useSelector((state) => state.counter.value);
  
  // Get the dispatch function to trigger actions
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Vite + React + Redux</h1>
      
      <div style={{ margin: '20px', fontSize: '2rem' }}>
        Count: {count}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => dispatch(decrement())}>
          Decrement (-)
        </button>
        <button onClick={() => dispatch(increment())}>
          Increment (+)
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Add 5
        </button>
      </div>
    </div>
  );
}

export default App;