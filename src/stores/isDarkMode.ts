import { writable } from 'svelte/store';

const storedThemeDark = localStorage.getItem('theme') === 'dark';
const matchMediaDark = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;

const isDarkMode = writable(storedThemeDark || matchMediaDark);

isDarkMode.subscribe((value) => {
  localStorage.setItem('theme', value ? 'dark' : 'light');
  if (value) {
    window.document.body.classList.add('dark');
  } else {
    window.document.body.classList.remove('dark');
  }
});

export default isDarkMode;
