import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './lib/routes';

function App() {
  return (
    <Suspense fallback={<div className="bg-neutral-900 min-h-screen text-white p-8">Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
