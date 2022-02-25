# ContentEngineAdmin

The Olapic's admin application.

## Development

- Clone the repository
```bash
cd ~/OLAPIC
git clone git@github.com:Olapic/contentEngine-Admin
```

- Install [NVM](https://www.npmjs.com/) with [`homebrew`](https://brew.sh/) (`brew install nvm`)

- Install Node.js through NVM

```bash
cd ~/OLAPIC/contentEngine-Admin
nvm install
```
> Make sure you always run `nvm use` right after `cd`'ing to the app directory. This will ensure you are always using the right Node.js version before running any command.

### Local setup
As all the apps on the Olapic's ecosistem, the application should run under a `.photorank.me` secure domain, currently, we're using `admin.local.photorank.me`.

#### Requirements
You'll need to clone the `Puppet`'s repository which includes the certificates files to run the domain in secure mode.
Also, you will need a `http` server to run the local domain, we're currently using `nginx` which can be installed with [`homebrew`](https://brew.sh/).

* Clone [`Puppet`](https://github.com/Olapic/Puppet/) repository into ~/OLAPIC/Environment64 with:

```bash
cd ~/OLAPIC
git clone --single-branch -b local git@github.com:Olapic/Puppet.git Environment64
```

* Use `brew` to install `nginx`: run `brew install nginx`.
* Evaluate the nginx's configuration file path with `sudo nginx -t`
* Open the nginx's configuration (`/usr/local/etc/nginx/nginx.conf`) and include the following `server` config, please beare in mind that `[USER]` should be replace with your bash's user.

```
##################################
## Olapic Content Engin Admin
##################################
server {
    listen 443 ssl;
    ssl_certificate /Users/[USER]/OLAPIC/Environment64/puppet/modules/nginx/files/ssl/photorank-wildcard.pem;
    ssl_certificate_key /Users/[USER]/OLAPIC/Environment64/puppet/modules/nginx/files/ssl/photorank-wildcard.key;
    server_name admin.local.photorank.me;

    location / {
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:2525;
    }
}

server {
    listen 80;
    server_name admin.local.photorank.me;
    rewrite ^/(.*)$ https://$host/$1 last;
}
```

* Edit your hosts' file (`/etc/hosts`) to let your environment know where `admin.local.photorank.me` is, add the following route:

```bash
127.0.0.1 admin.local.photorank.me
```

* Set environment vars pointing to the local env.

```bash
cp ~/OLAPIC/ContentEngine-Admin/.env.local.example ~/OLAPIC/ContentEngine-Admin/.env
```

#### Starting the app

To run the app with development features, like watching for changes:

```bash
npm run start:development
```

## Deployment

* Create a PR on the project repository and request review from your teammates.
* Once you get your :shipit:, merge the PR against `master`.
* Wait for the new build to be completed on [ce-builds/builds](https://live-us-va.comoros.photorank.me:8443/console/project/ce-builds/browse/builds/content-engine-admin?tab=history) (*x*)
* Once the previous step is completed, you should [publish a new release on the repository](https://github.com/Olapic/ContentEngine-Admin/releases/new); the release title should be `{release version}: PR title`; for example `4.1.0: Cycle the rights message templates when asking for rights`.
* The previous action will trigger a new release on the [QA environment](https://qa-us-va.comoros.photorank.me:8443/console/project/ce-content-engine/overview); QA team can now start validating the feature on this environment. (*xx*)
* Once the QA team approves the feature, you are able to create a new PR on the [project's configuration repository](https://github.com/Olapic/content-engine-configuration/compare/master...qa); the PR's description is currently not necessary on this, take closed PRs as reference. (*xxx*)
* Wait for a reviewer from your team to approve the PR, and then merge it.
* The previous action [triggers the deploy action](https://live-us-va.comoros.photorank.me:8443/console/project/ce-content-engine/browse/deployment/content-engine-admin?tab=history) of the new image in the production environment. (*xxx*)

(*x*) This action may take some time to be fired, it should wait for a node to be ready.

(*xx*) QA is currently happening in the team environment which is not described in this document.

(*xxx*) You will need write access to [Olapic/content-engine-configuration](https://github.com/Olapic/content-engine-configuration).

(*xxxx*) This action may take up to 5min to be fired.

### Best practices

* Create small, self-explained and well documented PRs, keep your reviewer's health in mind.
* Provide a complete guide to validate the feature/fix you're introducing, on local or stg environment.
* Choose your reviewer wisely, context switching is a high price to pay.
* Create a feature branch where to merge the small PRs.
* When tagging the project, implement [semver](https://semver.org/) properly.

### GIT hooks

The project has repository hooks for `pre-commit` and `post-merge`:

- `pre-commit`: Runs the lint and test tasks.
- `post-merge`: Runs `npm install` in order to get the latest dependencies.

To install the hooks, run this command from the project root directory:

```
npm run install-hooks
```
