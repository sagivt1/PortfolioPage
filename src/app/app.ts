import { Component, inject, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
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
  modalImage = signal<string | null>(null);
  currentModalProject = signal<string | null>(null);
  error = signal<string | null>(null);

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.modalImage()) return;

    if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'Escape') {
      this.closeModal();
    }
  }

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

  openModal(projectName: string, image: string) {
    this.currentModalProject.set(projectName);
    this.modalImage.set(image);
    // Disable scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalImage.set(null);
    this.currentModalProject.set(null);
    // Re-enable scrolling
    document.body.style.overflow = '';
  }

  nextImage(event?: Event) {
    if (event) event.stopPropagation();
    const projectName = this.currentModalProject();
    const currentImg = this.modalImage();
    const data = this.portfolioData();
    if (!projectName || !currentImg || !data) return;

    const project = data.projects.find((p) => p.projectName === projectName);
    if (!project || !project.photos) return;

    const currentIndex = project.photos.indexOf(currentImg);
    const nextIndex = (currentIndex + 1) % project.photos.length;
    this.modalImage.set(project.photos[nextIndex]);
  }

  prevImage(event?: Event) {
    if (event) event.stopPropagation();
    const projectName = this.currentModalProject();
    const currentImg = this.modalImage();
    const data = this.portfolioData();
    if (!projectName || !currentImg || !data) return;

    const project = data.projects.find((p) => p.projectName === projectName);
    if (!project || !project.photos) return;

    const currentIndex = project.photos.indexOf(currentImg);
    const prevIndex = (currentIndex - 1 + project.photos.length) % project.photos.length;
    this.modalImage.set(project.photos[prevIndex]);
  }

  ngOnDestroy() {
    // Clean up all intervals
    Object.values(this.rotationIntervals).forEach((interval) => clearInterval(interval));
  }
}
