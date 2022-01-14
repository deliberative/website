import 'svelte';
import { createBrowserHistory } from 'history';

import App from './App.svelte';

const history = createBrowserHistory();

const app = new App({
  target: document.body,
  props: {
    history,
  },
});

export default app;
