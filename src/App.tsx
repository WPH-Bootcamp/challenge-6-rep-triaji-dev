import { Suspense } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import { routes } from './lib/routes';

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="bg-black min-h-screen text-white p-8">Loading...</div>}>
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
    </MainLayout>
  );
}

export default App;
