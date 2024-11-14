import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({width: 1080, height: 1024})
  await page.goto('https://www.pccomponentes.com/procesador-amd-ryzen-7-9800x3d-47-52ghz')
  await page.waitForSelector('#cookiesrejectAll')
  await page.locator('#cookiesrejectAll').click()

  while (true){

    await page.waitForSelector('#pdp-price-current-integer')
    const price = await page.$eval('#pdp-price-current-integer', (element) => {
      return Number(element.innerHTML.match(/\d+/g).join('.'))
    })

    console.log(price)
    if (price <= 600) {
      puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage()
        await page.setViewport({width: 1080, height: 1024})
        await page.goto('https://listenonrepeat.com/?v=T5NUv-XSCyI')
        await page.waitForSelector('#dialog')
        await page.locator('[aria-label="Reject the use of cookies and other data for the purposes described"]').click()
        while (true) {
          await sleep(1000 * 60 * 30)
        }
      })
    }
    await sleep(1000 * 60 * 30)
    await page.reload()
  }
})
