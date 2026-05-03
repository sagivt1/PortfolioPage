import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataService, PortfolioData } from './data';
import { firstValueFrom } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const mockData: PortfolioData = {
    personalInfo: {
      fullName: 'Test User',
      email: 'test@example.com',
      title: 'Test Title',
      picture: 'assets/test-profile.jpg',
      linkedin: 'https://linkedin.com/in/testuser',
      github: 'https://github.com/testuser',
    },
    projects: [
      {
        projectName: 'Test Project',
        description: 'A mock project for testing purposes.',
        githubLink: 'https://github.com/testuser/test-project',
        featured: true,
        tools: ['Tool1', 'Tool2'],
        photos: [],
        liveLink: '',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch portfolio data successfully', async () => {
    const dataPromise = firstValueFrom(service.getPortfolioData());

    const req = httpMock.expectOne('assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    const data = await dataPromise;
    expect(data).toEqual(mockData);
  });

  it('should filter out projects with missing tools', async () => {
    const invalidData = {
      ...mockData,
      projects: [
        { ...mockData.projects[0], tools: [] }, // Should be filtered (empty array)
        {
          projectName: 'Valid Project',
          description: 'Valid Desc',
          githubLink: 'Valid Link',
          featured: true,
          tools: ['Angular'],
          photos: [],
          liveLink: '',
        }, // Should stay
      ],
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());
    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    const data = await dataPromise;
    expect(data.projects.length).toBe(1);
    expect(data.projects[0].projectName).toBe('Valid Project');
    expect(data.projects[0].tools).toEqual(['Angular']);
  });

  it('should throw error if fullName is missing', async () => {
    const invalidData = {
      ...mockData,
      personalInfo: { ...mockData.personalInfo, fullName: '' },
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());

    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    await expect(dataPromise).rejects.toThrow(
      'Required field "fullName" is missing in personal information.',
    );
  });

  it('should throw error if email is missing', async () => {
    const invalidData = {
      ...mockData,
      personalInfo: { ...mockData.personalInfo, email: ' ' },
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());

    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    await expect(dataPromise).rejects.toThrow(
      'Required field "email" is missing in personal information.',
    );
  });

  it('should throw error if title is missing', async () => {
    const invalidData = {
      ...mockData,
      personalInfo: { ...mockData.personalInfo, title: '' },
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());

    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    await expect(dataPromise).rejects.toThrow(
      'Required field "title" is missing in personal information.',
    );
  });

  it('should throw error if picture is missing', async () => {
    const invalidData = {
      ...mockData,
      personalInfo: { ...mockData.personalInfo, picture: '' },
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());
    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    await expect(dataPromise).rejects.toThrow(
      'Required field "picture" is missing in personal information.',
    );
  });

  it('should throw error if linkedin is missing', async () => {
    const invalidData = {
      ...mockData,
      personalInfo: { ...mockData.personalInfo, linkedin: '' },
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());
    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    await expect(dataPromise).rejects.toThrow(
      'Required field "linkedin" is missing in personal information.',
    );
  });

  it('should throw error if github is missing', async () => {
    const invalidData = {
      ...mockData,
      personalInfo: { ...mockData.personalInfo, github: '' },
    };

    const dataPromise = firstValueFrom(service.getPortfolioData());
    const req = httpMock.expectOne('assets/data.json');
    req.flush(invalidData);

    await expect(dataPromise).rejects.toThrow(
      'Required field "github" is missing in personal information.',
    );
  });
});
