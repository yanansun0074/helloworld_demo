import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: process.env.CI ? 2 : 0,

    webServer: {
        command: 'npm start',
        reuseExistingServer: !process.env.CI,
        timeout: 20000,
        port: 3000
    }
});
