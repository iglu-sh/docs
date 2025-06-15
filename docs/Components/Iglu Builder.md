---
sidebar_position: 1 
---

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/iglu-sh/builder)

## Introduction
The **Iglu Builder** is the component of the Iglu Project that can build [nix derivations](https://nix.dev/manual/nix/2.25/language/derivations) and push it to [cachix](https://www.cachix.org/) compatible nix caches like our [Iglu Cache](/docs/Components/Iglu%20Cache).

## Websocket
This is the documentation to the [`/api/v1/build` Websocket](/docs/Developer/API/Iglu%20Builder/build)

:::info
This Endpoint accepts only **one** connection simultaneously!
:::

### Requests
#### Start a build job
To start a build job you have to send a json with this schema:
<details>
```json title="schema"
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "git": {
      "type": "object",
      "properties": {
        "repository": { "type": "string" },
        "branch": { "type": "string" },
        "gitUsername": { "type": "string" },
        "gitKey": { "type": "string" },
        "requiresAuth": { "type": "boolean" },
        "noClone": { "type": "boolean" }
      },
      "required": ["noClone"],
      "additionalProperties": false
    },
    "buildOptions": {
      "type": "object",
      "properties": {
        "cores": { "type": "number" },
        "maxJobs": { "type": "number" },
        "keep_going": { "type": "boolean" },
        "extraArgs": { "type": "string" },
        "substituters": {
          "type": "array",
          "items": { "type": "string" }
        },
        "trustedPublicKeys": {
          "type": "array",
          "items": { "type": "string" }
        },
        "command": { "type": "string" },
        "cachix": {
          "type": "object",
          "properties": {
            "push": { "type": "boolean" },
            "target": { "type": "string" },
            "apiKey": { "type": "string" },
            "signingKey": { "type": "string" }
          },
          "required": ["push"],
          "additionalProperties": false
        }
      },
      "required": ["command", "cachix"],
      "additionalProperties": false
    }
  },
  "required": ["git", "buildOptions"],
  "additionalProperties": true
}
```
</details>

For example:
<details>
This will clone `https://github.com/iglu-sh/builder` and build the derivation `iglu-builder`. This derivation will be pushed to `https://cache.example.com/default`
```json
{
    "git": {
        "noClone": false
        "repository": "https://github.com/iglu-sh/builder"
    },
    "buildOptions": {
        "command": "nix build .#iglu-builder",
        "cachix": {
            "push": true,
            "target": "http://cache.example.com/default",
            "apiKey": "0197178f-b4f3-7000-acai-fec951e85504",
            "signingKey": "SgykdnDTu9iRkZZQhaif81C22fUERBiagMvD2oeMBUaE/4yAPYL3PJHinFVWkuvwUwp1MhSSKQ7pVlO4FGGCSQ=="
        }
    }
}
```
</details>

### Responses
Every response has this schema:

<details>
```json title="schema"
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
        "msg": { "type": "string" },
        "error": { "type": "string" },
        "stdout": { "type": "string" },
        "jobStatus": {
            "type": "string",
            "enum": ["failed", "success", "starting", "running"]
        },
        "childExitCode": { "type": "number" },
        "timestamp": { "type": "number" }
    }
    "required": [ "jobStatus", "timestamp" ],
    "additionalProperties": false
}
```
</details>

#### Too many connections
<details>
```json
{
    "error": "A build job is already running.",
    "jobStatus": "running",
    "timestamp": TIMESTAMP
}
```
</details>

#### Start building
<details>
```json
{
    "msg": "Start Building",
    "jobStatus": "starting",
    "timestamp": TIMESTAMP
}
```
</details>

#### Output of build job
<details>
```json
{
    "stdout": "SOME_OUTPUT",
    "jobStatus": "running",
    "timestamp": TIMESTAMP
}
```
</details>

#### Invalid command
<details>
```json
{
    "error": "Invalid command: 'YOUR_COMMAND'",
    "buildExitCode": 2,
    "jobStatus": "failed",
    "timestamp": TIMESTAMP
}
```
</details>

#### Build failed
<details>
```json
{
    "error": "Something went wrong while building. Builder exited with error code CHILD_EXIT_CODE",
    "buildExitCode": CHILD_EXIT_CODE,
    "jobStatus": "failed",
    "timestamp": TIMESTAMP
}
```
</details>

#### Build succeeded
<details>
```json
{
    "msg": "Build was successfull",
    "buildExitCode": 0,
    "jobStatus": "success",
    "timestamp": TIMESTAMP
}
```
</details>

#### Invalid JSON schema
<details>
```json
{
    "error": "JSON schema is not valid.",
    "jobStatus": "failed",
    "timestamp": TIMESTAMP
}
```
</details>

#### Invalid JSON
<details>
```json
{
    "error": "Not a valid JSON",
    "jobStatus": "failed",
    "timestamp": TIMESTAMP
}
```
</details>
