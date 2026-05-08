import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface PersonalInfo {
  fullName: string;
  email: string;
  title: string;
  picture: string;
  linkedin: string;
  github: string;
}

export interface Project {
  projectName: string;
  role: string;
  tools: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    infrastructure: string[];
  };
  description: string;
  highlights: string[];
  photos: string[];
  githubLink: string;
  liveLink: string;
  featured?: boolean;
  type?: 'web' | 'terminal' | 'design' | 'database';
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>('assets/data.json').pipe(
      map((data) => {
        this.validateData(data);
        return data;
      }),
    );
  }

  private validateData(data: PortfolioData): void {
    if (!data.personalInfo) {
      throw new Error('Personal information is missing.');
    }

    const requiredPersonalInfo: (keyof PersonalInfo)[] = [
      'fullName',
      'email',
      'title',
      'picture',
      'linkedin',
      'github',
    ];
    for (const field of requiredPersonalInfo) {
      if (!data.personalInfo[field] || data.personalInfo[field].trim() === '') {
        throw new Error(`Required field "${field}" is missing in personal information.`);
      }
    }

    if (data.projects && Array.isArray(data.projects)) {
      data.projects = data.projects.filter((project, index) => {
        const requiredProjectFields: (keyof Project)[] = [
          'projectName',
          'role',
          'description',
          'githubLink',
        ];

        const hasRequiredStrings = requiredProjectFields.every((field) => {
          const value = project[field];
          return typeof value === 'string' && value.trim() !== '';
        });
        const hasFeatured = project.featured !== undefined && project.featured !== null;

        const hasHighlights = Array.isArray(project.highlights);

        const tools = project.tools;
        const hasTools =
          tools &&
          typeof tools === 'object' &&
          !Array.isArray(tools) &&
          Array.isArray(tools.languages) &&
          Array.isArray(tools.frameworks) &&
          Array.isArray(tools.databases) &&
          Array.isArray(tools.infrastructure);

        if (!hasRequiredStrings || !hasFeatured || !hasTools || !hasHighlights) {
          console.warn(
            `Project at index ${index} ("${project.projectName || 'Unknown'}") was skipped due to missing required fields (strings, featured status, tools, or highlights).`,
          );
          return false;
        }

        return true;
      });
    } else {
      data.projects = [];
    }
  }
}
