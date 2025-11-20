---
sidebar_position: 1 
---

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/iglu-sh/builder)

## Introduction
The **Iglu Builder** is the component of the Iglu Project that can build [nix derivations](https://nix.dev/manual/nix/2.25/language/derivations) and push it to [cachix](https://www.cachix.org/) compatible nix caches like our [Iglu Cache](/docs/Components/Iglu%20Cache).

## Websocket
This is the documentation of the [`/api/v1/build` Websocket](/docs/Developer/API/Iglu%20Builder/build)

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
    "git_config": {
      "type": "object",
      "properties": {
        "repository": { "type": "string" },
        "builder_id": { "type": "number" },
        "id": {"type": "number"},
        "branch": { "type": "string" },
        "gitusername": { "type": "string" },
        "gitkey": { "type": "string" },
        "requiresauth": { "type": "boolean" },
        "noclone": { "type": "boolean" }
      },
      "required": ["noclone"],
      "additionalProperties": false
    },
    "builder" : {
      "type": "object",
      "properties": {
        "id": {"type": "number"},
        "cache_id": {"type": "number"},
        "name":{"type": "string"},
        "description": {"type": "string"},
        "enabled": {"type": "boolean"},
        "trigger": {"type": "string"},
        "cron": {"type": "string"},
        "arch": {"type": "string"},
        "webhookurl": {"type": "string"}
      },
      "additionalProperties": false
    },
    "cachix_config": {
      "type": "object",
      "properties": {
        "id":{"type": "number"},
        "builder_id":{"type": "number"},
        "push":{"type": "boolean"},
        "target": {"type": "string"},
        "apikey": {"type": "string"},
        "signingkey": {"type": "string"},
        "buildoutputdir": {"type": "string"}
      },
      "additionalProperties": false
    },
    "build_options": {
      "type": "object",
      "properties": {
        "id": {"type": "number"},
        "builder_id": {"type": "number"},
        "cores": { "type": "number" },
        "maxjobs": { "type": "number" },
        "keep_going": { "type": "boolean" },
        "extraargs": { "type": "string" },
        "substituters": {
          "type": "array",
          "items": { 
            "type": "object", 
            "properties":{
              "url": {"type": "string"},
              "public_signing_keys": {
                "type": "array",
                "items": {"type": "string"}
              }
          } }
        },
        "parallelbuilds": {"type": "boolean"},
        "command": {"type": "string"}
      },
      "required": ["command"],
      "additionalProperties": false
    }
  },
  "required": ["git_config", "build_options", "cachix_config"],
  "additionalProperties": true 
}
```
</details>

For example:
<details>
This will clone `https://github.com/iglu-sh/builder` and build the derivation `iglu-builder`. This derivation will be pushed to `https://cache.example.com/default`
```json
{
    "git_config": {
        "noclone": false,
        "repository": "https://github.com/Svenum/holynix.git"
    },
    "build_options": {
        "command": "nix build .#nixosConfigurations.srv-raspi5.config.system.build.toplevel",
        "substituters": [
            {
                "url": "https://nix-community.cachix.org",
                "public_signing_keys": [
                    "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
                ]
            }
        ]
    },
    "cachix_config":{
        "push": true,
        "target": "https://example.com/default",
        "apikey": "xxxxxxxx-xxxx-xxxx-xxxxxxxx",
        "signingkey": "xxxx"

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
