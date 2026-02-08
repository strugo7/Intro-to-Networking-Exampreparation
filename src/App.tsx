import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { ModulePage } from './pages/ModulePage';
import { GlossaryPage } from './pages/Glossary';
import { BinaryPracticePage } from './pages/BinaryPracticePage';
import { SubnettingPage } from './pages/SubnettingPage';
import SubnetAcademyPage from './pages/SubnetAcademyPage';
import { ExamSimulatorPage } from './pages/ExamSimulatorPage';
import FileUpload from './components/FileUpload';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="module/:id" element={<ModulePage />} />
            <Route path="glossary" element={<GlossaryPage />} />
            <Route path="practice/binary" element={<BinaryPracticePage />} />
            <Route path="practice/subnetting" element={<SubnettingPage />} />
            <Route path="practice/subnet-academy" element={<SubnetAcademyPage />} />
            <Route path="practice/exam" element={<ExamSimulatorPage />} />
            <Route path="upload" element={<FileUpload />} />
            {/* Fallback */}
            <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
        </Route>
    )
);

function App() {
    return (
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    );
}

export default App;
