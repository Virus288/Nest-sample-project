# Nest.js - sample project

This project is a sample nest.js project, built to learn it. Its buggy and not finished and might never be. This is just a sample 

> [!Warning].
> This package uses extremely strict eslint, which I modified to my needs. Please take a look and modify it however you like. My style of writing code might not be for you.

TLDR:
1. [How to install](#1-how-to-install)
2. [How to build](#2-how-to-build)
3. [Useful information](#3-useful-information)
4. [Docs](#4-docs)
5. [Style](#5-style)
6. [Issues](#6-issues)

## 1. How to start

- Install dependencies

```bash
npm install / yarn
```

- start 

```bash
npm run start:dev / yarn start:dev
```

Above scripts will let you start this application. You can find more detailed guide in `/docs/HowToStart.md`

## 2. How to build

```bash
npm run build / yarn build
```

> [!IMPORTANT]
> If you even encounter strange build behavior, tsconfig is set to create build with cache. Set option `incremental` in tsConfig to false

## 3. Useful information

### 3.1 Logs folder

#### Linux

```text
~/.cache/"package.json -> productName"/logs
```

#### Windows

```text
~/AppData/Roaming/"package.json -> productName"/logs
```

### 3.2 Testing

#### All test currently are written using jest. You can run all tests or just type specific tests

#### Available targets

```text
npm run / yarn tests:e2e = run 'end to end' tests
npm run / yarn tests:db = run 'database' tests
npm run / yarn tests:unit = run 'unit' tests
npm run / yarn test:cov = get tests coverage
```

### 3.3 Hooks

Instead of adding additional packages like husky, its easier to add hooks manually. If you want your code to check its quality and test itself before committing code, you can add this code to `.git/hooks/pre-commit`
```bash
#!/bin/sh

set -e

echo "Running lint-staged"
npm run lintStaged

echo "Running tsc"
npm run listErrors

echo "Running unit tests"
npm run test:unit

echo "Running db tests"
npm run test:db

echo "Running e2e tests"
npm run test:e2e

echo "Auditing"
npm audit

echo "Checking package version"
if ! git diff --cached --name-only | grep -q 'package.json'; then
    echo "Package.json is not in the staged changes. Make sure to update version in package.json to mir
ror applied changes."
    exit 1
fi

if git diff --cached --name-only | grep -q 'package.json'; then
    if ! git diff --cached -- package.json | grep -q '"version"'; then
        echo "Package.json has been modified but version has not been updated. Make sure to update vers
ion in package.json to mirror applied changes."
        exit 1

    fi
fi
```

Above code will:
- Lint your staged code
- Validate if it can be built
- Test it
- Audit it
- Check if you updated version in package.json

Most of people that I've meet, do not care about auditing their code. If you do not care if packages includes in your app have known vulnerabilities, you can remove last 2 lines from this code. Keep in mind, that github pipelines also run the same commands.

Updating version in package.json is subject to change. The amount of developers == the amount of ways t o use versioning system. If you don't feel like updating version in package.json, remove last 2 commands

## 4. Docs

### 4.1 Logging

This project utilizes winston for logging. Logging tool is my custom package called `simpl-loggar`. Currently its not deployed on npm, but will be later. It provides:

- Log - default logs that you can create.
- Warn - warnings
- Error - errors
- Debug - debug logs

### 4.2 Probes

This application is ready for probing in k8s / other systems. You can find liveness probe in `/src/tools/liveness`. readiness probe should be utilized based on `/health` route. This route will send status 500, if server is dead and status 200 if server is still ok. This status will change from 200 to 500, only if there is a heavy problem with database connection or application is unable to start, due to problems with some services. You can always add custom code, which will modify this state, so k8s will restart your app. K8s configs are not included in this repo.

### 4.3 Connections and access

When I write my apps, I prefer to have some kind of global state, which allows my app to have access to every external connection from any point in code. You can find this "state" in `/src/tools/state`. This state is used to keep external connections and to manage them. For example, instead of dependency injecting each connection to each route, I prefer to just access them from that global state 

### 4.4 Sigterm, Sigint

This application uses handlers for sigint and sigterm. What are those ? Application is listening for "kill process" system received by operating system or user. In short term, its listning for `ctr + c` and makes sure to close all connections after it dies. Why did I implement it ? 

Additional docs can be found in `docs` folder 

## 5. Style

This application uses my personal eslint settings. They are EXTREMELY strict and will force you to write specific type of code with unified style across whole project. This is `MY` config. You may not like it so please, modify it to your heart desire.

## 6. Issues 

> [!TIP]
> This category will try to explain basic issues, that you might encounter with this app. This will not include every possible issues, that was created on github, rather basic problems, that you might not expect

- `Start:dev` throws `Cannot find module`

There are 3 reason, why this might happen.

> [!NOTE]
> You started this app for the first time

1. Due to limitations with libraries, this command will throw an error, if you run it first time. Simply return it again.

> [!NOTE]
> You've been working on this app for a while

2. Something got cached in the background, after you've been working on this app for a while. This can happen, but its rare. There is a note related to it in tip under point #2. All you need to do is to remove cache. If your terminal supports make ( linux, macos, windows bash terminal and others ), simply run:

```bash
make clean
```

If you are unable to run make command, remove build folder

3. There is an error with imported code. Because this app is written in ESM, it might crash if imported ts file does not have `file.js` ( .js ) extension. This is a limitation of ESM and you might not get any errors. There should be error related to it in log files, because logger catches most of issues. If you won't find any related info in logs folder ( explained in #3.1 ) and you won't be able to fix it, please create an issue for it on github.

- I keep getting errors that npm modules are not compatible:

Due to amount of eslint modules, some of them might not be compatible with each other. At one day they might be and on another, they might throw errors. Simply
update them to latest versions. This is safe, because eslint does not make many breaking changes. Please validate this before making changes
