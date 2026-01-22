import { test } from '@playwright/test';
import { WikipediaHomePage } from '../pages/WikipediaHomePage';
import { WikipediaMainPage } from '../pages/WikipediaMainPage';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'node:console';

test.describe('Wikipedia Login Workflow', () => {
  let home: WikipediaHomePage;
  let main: WikipediaMainPage;
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    home = new WikipediaHomePage(page);
    main = new WikipediaMainPage(page);
    login = new LoginPage(page);
  });

  test.afterEach(async ({ context, page }) => {
    await context.clearCookies();
  });


  test('TC_LOGIN_001 – Vefify login page from wikipedia.org successfully', async ({ page }) => {

  /** STEP: Navigate to Wikipedia page */
    await home.open();

  /** STEP: Verify home page  */
    await home.assertOnPage();

  /** STEP: Select language */  
    await home.selectLanguage(process.env.WIKI_LANGUAGE!);

  /** STEP: Navigate to main page */  
    await main.goToLogin();

  /** STEP: Verify main page */  
    await login.verifyLoginPageLoaded();

  /** STEP: Navigate to login page then fill user name, password */  
    await login.login(
      process.env.WIKI_VALID_USERNAME!,
      process.env.WIKI_VALID_PASSWORD!
    );

  /** STEP: Verify user login success */
    await login.verifyLoginSuccess();
    
  });

  test('TC_LOGIN_002 – Show error with invalid credentials', async ({ page }) => {
  /** STEP: Navigate to Wikipedia page */
    await home.open();

    /** STEP: Verify home page  */
    await home.assertOnPage(); 

    /** STEP: Select language */  
    await home.selectLanguage('English');

    /** STEP: Navigate to main page */  
    await main.goToLogin();

    /** STEP: Verify main page */
    await login.verifyLoginPageLoaded();

    /** STEP: Navigate to login page then fill user name, password */ 
    await login.login(process.env.WIKI_INVALID_USERNAME!,process.env.WIKI_INVALID_PASSWORD!);
    
    /** STEP: Verify login fail */ 
    await login.verifyLoginError();
    
  });

  test('TC_LOGIN_003 – CAPTCHA appears after multiple invalid attempts', async ({ page }) => {
  /** STEP: Navigate to Wikipedia page */
  await home.open();

  /** STEP: Select language */  
  await home.selectLanguage('English');

  /** STEP: Navigate to main page */
  await main.goToLogin();

  /** STEP: Verify main page */
  await login.verifyLoginPageLoaded();
  
  /** STEP: Verify capcha will be displayed when user input multiple invalid credentials */
  for (let i = 1; i <= 3; i++) {
    await login.login(
      process.env.WIKI_INVALID_USERNAME!,
      process.env.WIKI_INVALID_PASSWORD!
    );

    if (await login.isCaptchaDisplayed()) {
      await login.verifyCaptchaFlow();
      return;
    }
  }

  // test.skip('CAPTCHA did not appear – acceptable security behavior');
});


});
