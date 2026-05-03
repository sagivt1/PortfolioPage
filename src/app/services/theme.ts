import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'auto' | 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeMode = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    // Persist theme choice to localStorage and apply it
    effect(() => {
      const mode = this.themeMode();
      localStorage.setItem('portfolio-theme', mode);
      this.applyTheme(mode);
    });
  }

  private getInitialTheme(): ThemeMode {
    const saved = localStorage.getItem('portfolio-theme') as ThemeMode;
    return saved || 'auto';
  }

  private applyTheme(mode: ThemeMode) {
    const root = document.documentElement;
    root.classList.remove('light-mode', 'dark-mode');

    if (mode === 'light') {
      root.classList.add('light-mode');
    } else if (mode === 'dark') {
      root.classList.add('dark-mode');
    }
    // 'auto' removes both classes, allowing CSS media queries to take over
  }

  toggleTheme() {
    const current = this.themeMode();
    const next: ThemeMode = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
    this.themeMode.set(next);
  }
}
