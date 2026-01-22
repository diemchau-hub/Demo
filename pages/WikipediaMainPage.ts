import { Page, expect } from '@playwright/test';

export class WikipediaMainPage {
  constructor(private page: Page) {}

    async assertOnPage() {
    await expect(this.page).toHaveURL(/en\.wikipedia\.org\/wiki\/Main_Page/);
    await expect(this.page.getByRole('link', { name: 'Log in' }).nth(0)).toBeVisible();
    await expect(this.page.locator('#vector-user-links-dropdown-checkbox')).toBeHidden();
    
  }

  async goToLogin() {
    // await this.page.getByRole('link', { name: 'Log in' }).toBeVisible();
    // await this.page.getByRole('navigation').getByRole('link', { name: 'Log in' }).click();
    await this.assertOnPage();
    await this.page.getByRole('link', { name: 'Log in' }).nth(0).click();

  }
}
