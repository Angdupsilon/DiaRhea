import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { TestPage } from './pages/TestPage';
import { VerifyPage } from './pages/VerifyPage';
import { ResultPage } from './pages/ResultPage';
import { HistoryPage } from './pages/HistoryPage';

// Scroll to top on route change wrapper
const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop>
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-dark antialiased">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test/:testId" element={<TestPage />} />
            <Route path="/verify/:testId" element={<VerifyPage />} />
            <Route path="/results/:testId/:resultId" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default App;