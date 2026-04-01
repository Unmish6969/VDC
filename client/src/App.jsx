import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import FormulaTable from './components/FormulaTable';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="app-header">
          <div className="header-badge">⚡</div>
          <div>
            <h1 className="app-title">Dynamic Formula Evaluator</h1>
            <p className="app-subtitle">
              Define custom math expressions on numeric inputs — results update instantly
            </p>
          </div>
        </header>
        <main className="app-main">
          <FormulaTable />
        </main>
        <footer className="app-footer">
          Use <code>A</code> and <code>B</code> as variables &nbsp;·&nbsp; Supports any valid JS math expression &nbsp;·&nbsp; e.g.&nbsp;
          <code>A * B</code>, <code>Math.pow(A, B)</code>, <code>A &gt; B ? A : B</code>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
