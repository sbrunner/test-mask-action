const core = require('@actions/core');
const { spawn } = require('child_process');
const path = require('path');

try {
  const installprocess = spawn(path.resolve(__dirname, 'install'), [], {
    stdio: ['inherit', 'inherit', 'inherit'],
    env: {
      PATH: process.env.PATH,
      HOME: process.env.HOME,
      GITHUB_ENV: process.env.GITHUB_ENV,
      PATTERNS: core.getInput('patterns'),
      CI_GPG_PRIVATE_KEY: core.getInput('ci-gpg-private-key'),
      GITHUB_GOPASS_CI_TOKEN: core.getInput('github-gopass-ci-token'),
      GOPASS_VERSION: core.getInput('gopass_version'),
      SUMMON_VERSION: core.getInput('summon_version'),
      GPG_FINGERPRINT: core.getInput('gpg-fingerprint'),
      GITHUB_REPOSITORY: core.getInput('github-repository'),
    },
  });
  installprocess.on('error', (error) => {
    console.log('error');
    console.log(error);
    core.setFailed();
  });
  installprocess.on('exit', (code) => {
    if (code != 0) {
      console.log(`exit: ${code}`);
      core.setFailed();
    }
  });
  installprocess.on('close', (code) => {
    if (code != 0) {
      console.log(`close: ${code}`);
      core.setFailed();
    }
  });
} catch (error) {
  console.log('catch');
  core.setFailed(error.message);
}
