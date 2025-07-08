import {test, expect} from '@playwright/test';

// test 1: initial rendering
test("Initial page rendering", async ({page}) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('heading', { name: 'Hello, World!' })).toBeVisible();

    const container = await page.locator('.app-container');
    const background = await container.evaluate((el) =>
            getComputedStyle(el).backgroundImage
        );
    // background
    expect(background).toMatch(/bg_1\.[a-z0-9]+\.png/i);
    await expect(page.getByRole('button', { name: 'Previous' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
});

// test 2: name input box can be typed in
test('Name input box can be typed in', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const input = page.getByPlaceholder('Your name');
    await input.fill('Bob');
    await expect(input).toHaveValue('Bob');
  });

// test 3: submitting blank input
test('Submitting blank input shakes the box and does not proceed', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const input = page.getByPlaceholder('Your name');
    const enterBtn = page.getByRole('button', { name: 'Enter' });
    // Ensure input is empty
    // await input.fill('');
    await enterBtn.click();
    // Input should have class 'shake' (animation)
    const hasShake = await input.evaluate(el => el.classList.contains('shake'));
    expect(hasShake).toBe(true);
    // Heading should still be Hello, World!
    await expect(page.getByRole('heading', { name: 'Hello, World!' })).toBeVisible();
    // Prev/Next buttons should not be visible
    await expect(page.getByRole('button', { name: 'Previous' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
  });



// test 7: prev/next buttons are not visible before submit and are visible after submit
test('Prev/Next buttons only show after submit', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await expect(page.getByRole('button', { name: 'Previous' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
    // Submit a name
    await page.getByPlaceholder('Your name').fill('Dana');
    await page.getByRole('button', { name: 'Enter' }).click();
    // After submit
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
  });

// test 8: input should only accept first 20 characters
test('Input only accepts first 20 characters', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const input = page.getByPlaceholder('Your name');
    const longName = 'abcdefghijklmnopqrstu'; // 21 characters
    await input.fill(longName);
    // Should only show first 20
    await expect(input).toHaveValue('abcdefghijklmnopqrst');
  });


  


// test 2: background change testing
test('Next and Previous buttons change background', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Submit a name to show buttons
  await page.getByPlaceholder('Your name').fill('Alice');
  await page.getByRole('button', { name: 'Enter' }).click();
  const container = page.locator('.app-container');
  const nextBtn = page.getByRole('button', { name: 'Next' });
  const prevBtn = page.getByRole('button', { name: 'Previous' });

  // Initial background should be bg_1.png
  let bg = await container.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bg).toMatch(/bg_1\.[a-z0-9]+\.png/i);

  // Click next, should be bg_2.jpg
  await nextBtn.click();
  bg = await container.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bg).toMatch(/bg_2\.[a-z0-9]+\.jpg/i);

  // Click next, should be bg_3.jpg
  await nextBtn.click();
  bg = await container.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bg).toMatch(/bg_3\.[a-z0-9]+\.jpg/i);

  // Click previous, should be bg_2.jpg
  await prevBtn.click();
  bg = await container.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(bg).toMatch(/bg_2\.[a-z0-9]+\.jpg/i);
});

// test 3: test image loading error and placeholder text
test('Shows placeholder text if image fails to load', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    const img = document.querySelector('.app-container img');
    if (img) img.src = 'bad_path.jpg';
  });
  await expect(page.getByText('Failed to load background image')).toBeVisible();
});





// test 6: submitting a name updates greeting and shows prev/next buttons
test('Submitting a name updates greeting and shows prev/next buttons', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const input = page.getByPlaceholder('Your name');
  const enterBtn = page.getByRole('button', { name: 'Enter' });
  await input.fill('Charlie');
  await enterBtn.click();
  // Heading should update
  await expect(page.getByRole('heading', { name: 'Hello, Charlie!' })).toBeVisible();
  // Prev/Next buttons should be visible
  await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
});
