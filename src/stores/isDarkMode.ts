import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const isDarkMode = writable<boolean>(
  (browser && localStorage.getItem('isDarkMode') === 'true') || false
);

isDarkMode.subscribe((value) => {
  if (browser) {
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});

export const toggleDarkMode = () => {
  isDarkMode.update((mode) => !mode);

  if (browser) {
    localStorage.setItem('isDarkMode', `${isDarkMode}`);
  }
};
