import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add a movie', () => {
    const app = TestBed.createComponent(App).componentInstance;
    app.newTitle = 'Titanic';
    app.addMovie();
    expect(app.movies.length).toBe(3);
  });
});
