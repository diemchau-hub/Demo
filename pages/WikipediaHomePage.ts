// import { Page } from '@playwright/test';
import { Page, expect } from '@playwright/test';

export class WikipediaHomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
    await this.assertOnPage();
  }

  async assertOnPage() {
    await expect(this.page).toHaveURL(/wikipedia\.org\/$/);
    await expect(this.page.getByRole('heading', { name: 'Wikipedia' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Read Wikipedia in your language ' })).toBeVisible();

  }  
  async selectLanguage(language: string) {
    await this.page.getByRole('link', { name: language }).click();
  }
}
