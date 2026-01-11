import { Suspense } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
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
