import { BrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';


export interface HistoryRouterProps {
  history: BrowserHistory,
  basename?: string,
  children?: React.ReactNode,
}

export function HistoryRouter({
  basename,
  children,
  history,
}: HistoryRouterProps) {
  const [state, seState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(seState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
