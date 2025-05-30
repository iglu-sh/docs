---
sidebar_position: 2
---

We recomend the installation via docker compose, as it is the simplest one.

## Compose file

```yml
services:
  controller:
    image: ghcr.io/iglu-sh/iglu-controller-docker:latest
    environment:
      DATABASE_URL: postgresql://iglu:<POSTGRES_DB_PASSWORD>@postgres:5432/cache
      NEXT_PUBLIC_URL: <EXTERNAL_CONTROLLER_URL>:<EXPOSED_CONTROLLER_PORT>
      NEXT_PUBLIC_CACHE_URL: <EXTERNAL_CACHE_URL>:<EXPOSED_CACHE_PORT>
    ports:
      - <EXPOSED_CONTROLLER_PORT>:3000
    depends_on:
      - postgres
      - cache
  cache:
    image: ghcr.io/iglu-sh/iglu-cache-docker:latest
    environment:
      CACHE_ROOT_DOMAIN: <EXTERNAL_CACHE_URL>:<EXPOSED_CACHE_PORT>
      CACHE_MAX_GB: <MAX_CACHE_SIZE> 
      LOG_LEVEL: INFO
      POSTGRES_USER: iglu
      POSTGRES_PASSWORD: <POSTGRES_DB_PASSWORD>
      POSTGRES_DB: cache
      POSTGRES_HOST: postgres
      POSTGRES_PORT: 5432
      CACHE_FILESYSTEM_DIR: /tmp/cache #Should be mounted to an outside container if you want to persist files, else set to something in the container
    volumes:
      - ./cache/nar_files:/tmp/cache
    ports:
      - <EXPOSED_CACHE_PORT>:3000
    depends_on:
      - postgres
  
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: iglu
      POSTGRES_PASSWORD: <POSTGRES_DB_PASSWORD>
      POSTGRES_DB: cache
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
```

Please Replace:
|String to replace|description|example|
|-----------------|-----------|-------|
|`<MAX_CACHE_SIZE>`|max size how big the cache can be in GB | `100`|
|`<EXPOSED_CACHE_PORT>`|port on which the cache will listen | `3000`|
|`<EXTERNAL_CACHE_URL>`|external url of the cache|`http://cache.example.com`|
|`<EXPOSED_CONTROLLER_PORT>`|port on which the controller will listen | `3001`|
|`<EXTERNAL_CONTROLLER_URL>`|external url of the controller|`http://controller.example.com`|
|`<POSTGRES_DB_PASSWORD>`|password witch is used to authenticate against postgres|`secret_password`|



