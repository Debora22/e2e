const { After, Status } = require('cucumber');

After(async function attachScreenshotToScenario(scenario) {
  if (scenario.result.status === Status.FAILED) {
    const png = await browser.takeScreenshot();
    const decodedImage = Buffer.from(png, 'base64');
    this.attach(decodedImage, 'image/png');
  }
});
