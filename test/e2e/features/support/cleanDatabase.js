const { Before } = require('cucumber');
const childProcess = require('child_process');

/**
 * This Before scenario, is in charge of being called by cucumber
 * to clean the Lionel Hutz service database.
 * Only scenarios tagged with `@cleanLionelhutzDatabase` call this hook.
 */
Before({ tags: '@cleanLionelhutzDatabase' }, async () => {
  await childProcess.execSync('./test/tools/cleanDatabase/cleanLionelhutzDatabase.sh');
});
