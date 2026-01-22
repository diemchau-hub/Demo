import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}


  async verifyLoginPageLoaded() {
    await expect(this.page).toHaveURL(/Special:UserLogin/);
    await expect(this.page.getByRole('heading', { name: 'Log in' })).toBeVisible();
    await expect(this.page.getByLabel('Username')).toBeVisible();
    await expect(this.page.getByLabel('Password')).toBeVisible();
    await expect(this.page.getByLabel('Keep me logged in (for up to one year)')).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async verifyLoginSuccess() {
    await expect(this.page.getByRole('heading', { name: 'Log in' })).toBeHidden();
    await expect(this.page.locator('#vector-user-links-dropdown-checkbox')).toBeVisible();
    await expect(this.page.locator('.mw-ui-icon-bell')).toBeVisible();

  }

  async verifyLoginError() {
    await expect(
      this.page.getByText(/incorrect|error/i)
    ).toBeVisible();
  }

  async isCaptchaDisplayed(): Promise<boolean> {
  return await this.page.locator('.fancycaptcha-image').isVisible();
  }

  async verifyCaptchaFlow() {
  const captchaImage = this.page.locator('.fancycaptcha-image');
  const captchaInput = this.page.getByPlaceholder('Enter the text you see on the image');

  await expect(captchaImage).toBeVisible();
  await expect(captchaInput).toBeVisible();
}
 


}
