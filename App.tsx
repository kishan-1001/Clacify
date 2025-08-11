
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center font-sans text-white p-4">
      <div className="w-full max-w-sm">
        <Calculator />
      </div>
       <footer className="mt-8 text-center text-slate-400 text-sm">
        <p>Numbers don't lie… and neither does Kishan's code..</p>
       
      </footer>
    </div>
  );
};

export default App;
