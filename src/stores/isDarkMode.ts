import { writable } from 'svelte/store';

const localStorageThemeIsDark = localStorage.getItem('theme') === 'dark';
const localStorageThemeIsNull = localStorage.getItem('theme') === null;
const matchMediaDark = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;

const isDarkMode = writable(
  localStorageThemeIsDark || (localStorageThemeIsNull && matchMediaDark),
);

export default isDarkMode;
