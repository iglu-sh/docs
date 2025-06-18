---
sidebar_position: 2
---


[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/iglu-sh/cache)

## Introduction
The **Iglu Cache** is the component of the Iglu Project that stores [nix derivations](https://nix.dev/manual/nix/2.25/language/derivations). This Cache is compatible with the [cachix](https://www.cachix.org/) client.

## Metrics
The **Iglu Cache** has its own [Prometheus](https://prometheus.io/) endpoint (default: `http://localhost:9464/metrics`).
This endpoint can be disabled by setting the env `PROM_ENABLE` to `false`.

It provides the following metrics **per** cache:
|name|description|example|
|-|-|-|
|`iglu_cache_derivation_count`|Number of derivations in the cache|`iglu_cache_derivation_count{cache="test",uri="http://localhost:3000"} 6`|
|`iglu_cache_size`|Size of the cache in byte|`iglu_cache_size{cache="default",uri="http://localhost:3000"} 11640438`|
|`iglu_cache_requests_total`|Request count per cache|`iglu_cache_requests_total{cache="default",uri="http://localhost:3000"} 6`|
