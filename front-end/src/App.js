import Layout from './components/Layout/Layout';

import { useEffect } from 'react';

function App() {
  const accountList = localStorage.getItem('accountList');
  useEffect(() => {
    if (!accountList) {
      localStorage.setItem(
        'accountList',
        JSON.stringify([
          {
            userName: 'admin',
            password: 'admin',
          },
        ])
      );
    }
  }, [accountList]);
  return <div className='App'>{<Layout />}</div>;
}

export default App;
