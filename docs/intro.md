---
sidebar_position: 1
---
# Introducing Iglu

## What is Iglu?
**Iglu** is an easy-to-use cache for nix derivations and binaries. It allows you to avoid rebuilding your derivations (packages, configurations, etc.) multiple times.
You can use the official [cachix](https://hackage.haskell.org/package/cachix) client to push derivations to your own Iglu cache.

## Why Iglu?
Iglu was build to improve the usability of nix caches for normal users and organisations. We tested several existing solutions, but they didn't fit our requirements. Here are some of the existing solutions we tested:

- [attic](https://github.com/zhaofengli/attic/)
- [cachix](https://www.cachix.org/)
- [cache-server](https://github.com/mifka01/cache-server)
- [nix-serve](https://github.com/edolstra/nix-serve)

So we ([SirBerg](https://github.com/SirBerg) and [Svenum](https://github.com/Svenum)) decided to build our own cache!
We want to provide these features:

- A simple UI to manage all caches
- A stable and user-friendly experience
- A way to build and upload derivations easily and automated by a builtin [builder](https://github.com/iglu-sh/builder)
- An easy-to-use and easy-to-maintain codebase for either forking or collaboration

## Comparison
Here are some comparison to other caches:
- ✅: supported
- ❌: not supported
- 📅: planned

|Feature|[Iglu](https://github.com/iglu-sh/controller)|[cachix](https://www.cachix.org/)|[attic](https://github.com/zhaofengli/attic/)|[cache-server](https://github.com/mifka01/cache-server)|
|-------|---------------------------------------------|---------------------------------|---------------------------------------------|-------------------------------------------------------|
|open source             |✅|❌|✅|✅|
|self hostable           |✅|❌|✅|✅|
|multiple caches         |✅|✅|✅|✅|
|builtin builder         |✅|❌|❌|❌|
|cachix compatible       |✅|✅|❌|✅|
|UI for configuration    |✅|✅|❌|❌|
|free of charge          |✅|❌|✅|✅|
|Prometheus metrics      |✅|❌|❌|❌|
|flexible storage backend|📅|❌|✅|✅|
|kubernetes support      |📅|❌|❌|❌|

