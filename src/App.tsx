import { MainPage } from '@/pages/main-page';
import { EventListener } from '@lib/services';
import { appWindow } from '@tauri-apps/api/window';
import { useState } from 'react';
import { useMount } from 'react-use';
import { AppPage } from '@custom-types/app-page.enum';
import ResultPage from './pages/result-page';

function App() {
  const [page, setPage] = useState(AppPage.MAIN);
  useMount(() => new EventListener());
  useMount(() => setPage(appWindow.label as AppPage));

  if (page === AppPage.MAIN) return <MainPage />;
  if (page === AppPage.RESULT) return <ResultPage />;

  return 'Page not found!';
}

export default App;
