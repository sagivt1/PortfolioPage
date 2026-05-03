import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService, PortfolioData } from './services/data';
import { ThemeService } from './services/theme';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  protected themeService = inject(ThemeService);

  portfolioData = signal<PortfolioData | null>(null);
  selectedPhotos = signal<Record<string, string>>({});
  error = signal<string | null>(null);

  private rotationIntervals: Record<string, any> = {};

  ngOnInit() {
    this.dataService.getPortfolioData().subscribe({
      next: (data) => {
        this.portfolioData.set(data);

        const initialPhotos: Record<string, string> = {};
        data.projects.forEach((p) => {
          if (p.photos && p.photos.length > 0) {
            initialPhotos[p.projectName] = p.photos[0];

            // Start auto-rotation if there are multiple photos
            if (p.photos.length > 1) {
              this.startAutoRotation(p.projectName, p.photos);
            }
          }
        });
        this.selectedPhotos.set(initialPhotos);
      },
      error: (err) => {
        console.error('Error loading portfolio data:', err);
        this.error.set('Failed to load portfolio data. Please ensure assets/data.json exists.');
      },
    });
  }

  private startAutoRotation(projectName: string, photos: string[]) {
    this.rotationIntervals[projectName] = setInterval(() => {
      this.selectedPhotos.update((current) => {
        const currentPhoto = current[projectName];
        const currentIndex = photos.indexOf(currentPhoto);
        const nextIndex = (currentIndex + 1) % photos.length;
        return {
          ...current,
          [projectName]: photos[nextIndex],
        };
      });
    }, 4000); // Change every 4 seconds
  }

  selectPhoto(projectName: string, photo: string) {
    // Stop auto-rotation for this project once user interacts
    if (this.rotationIntervals[projectName]) {
      clearInterval(this.rotationIntervals[projectName]);
      delete this.rotationIntervals[projectName];
    }

    this.selectedPhotos.update((current) => ({
      ...current,
      [projectName]: photo,
    }));
  }

  ngOnDestroy() {
    // Clean up all intervals
    Object.values(this.rotationIntervals).forEach((interval) => clearInterval(interval));
  }
}
