# Quick Start

:::warning
This project is currently in development. Please report issues [here](https://github.com/iglu-sh/controller/issues/new).
:::

The recommended method for deploying Iglu is [docker-compose](https://docs.docker.com/compose). Installation instructions for Compose can be found [here](https://docs.docker.com/compose/install).

:::important
It is essential to use the provided PostgreSQL Docker image, as it includes the following custom extensions:
- cron plugin
- http plugin
:::

## 1) Prepare Files
Create a directory named `iglu` on your system and copy the `compose.yml` and `.env` files into this directory.

```yaml title="compose.yml"
version: 3
services:
  redis:
    image: redis:8
    restart: unless-stopped
    ports:
      - 6379:6379

  postgres:
    image: ghcr.io/iglu-sh/postgres:latest
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: cache
    volumes:
      - ./dev/postgres:/var/lib/postgresql/data

  cache:
    image: ghcr.io/iglu-sh/iglu-cache:latest
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_HOST: postgres
      POSTGRES_DB: cache
      POSTGRES_PORT: 5432
      LOG_LEVEL: ${LOG_LEVEL}
      PROM_ENABLE: ${PROM_ENABLE}
      CACHE_ROOT_DOMAIN: ${CACHE_ROOT_DOMAIN}
      CACHE_FILESYSTEM_DIR: /tmp/cache
    ports:
      - 3000:3000
      - 9464:9464
    volumes:
      - ./dev/cache:/tmp/cache
    depends_on:
      - postgres

  controller:
    image: ghcr.io/iglu-sh/iglu-controller:latest
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_URL: ${CONTROLLER_URL}
      NEXT_PUBLIC_CACHE_URL: ${CACHE_ROOT_DOMAIN}
      NODE_PSK: ${NODE_PSK} #Required for a builder scheduler to connect to this controller
      PORT: ${PORT}
      LOG_LEVEL: ${LOG_LEVEL}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_HOST: postgres
      AUTH_SECRET: ${AUTH_SECRET}
      AUTH_TRUST_HOST: true #Instruct Auth.js to trust the x-forwarded-host header
      REDIS_HOST: redis
    ports:
      - 3001:3001
    depends_on:
      - postgres
      - cache
      - redis

  scheduler:
    image: ghcr.io/iglu-sh/iglu-scheduler:latest
    restart: unless-stopped
    environment:
      INTERFACE: 0.0.0.0
      NODE_NAME: ${NODE_NAME}
      MAX_BUILDS: 10
      CONTROLLER_REGISTRATION_KEY: ${NODE_PSK}
      LOG_LEVEL: ${LOG_LEVEL}
      CONTROLLER_URL: http://controller:3001
      REDIS_HOST: redis
      REDIS_PASSWORD: default
      DOCKER_SOCKET: /var/run/docker.sock
      AUTO_PULL_IMG: ${AUTO_PULL_IMG}
      CROSS_COMPILE: ${ENABLE_CROSS_COMPILE}
      DOCKER_IMAGE: ghcr.io/iglu-sh/iglu-builder:latest
    volumes:
      - /var/run/user/1000/podman/podman.sock:/var/run/docker.sock
    depends_on:
      - controller
```

```bash title=".env"
# DATABASE
POSTGRES_USER=iglu
POSTGRES_PASSWORD=changeme

# CACHE
CACHE_ROOT_DOMAIN=http://localhost:3000 #Externally accessible URL of the Cache
PROM_ENABLE=true

# LOGGING
LOG_LEVEL=INFO

# CONTROLLER
CONTROLLER_URL=http://localhost:3001 #Externally accessible URL of the Controller
PORT=3001
AUTH_SECRET=changeme #Random string for authentication
NODE_PSK=changeme #Random string for Scheduler to join Controller

# SCHEDULER
NODE_NAME=examplenode
ENABLE_CROSS_COMPILE=false
AUTO_PULL_IMG=true
```

## 2) Configure Environment Variables
Adjust the environment variables in the `.env` file and the volume paths in the `compose.yml` according to your requirements. Additional information about environment variables can be found on the [Components](/docs/Components/Iglu%20Builder) page.

:::warning
Do not modify the environment variables in the `compose.yml` file unless you have a thorough understanding of the configuration.
:::

## 3) Start the Containers
Navigate to the directory using `cd iglu` and start the containers with the following command:

```bash
docker compose up -d
```

Verify the deployment by executing:

```bash
foo@bar:~$ docker ps

CONTAINER ID  IMAGE                                   COMMAND               CREATED         STATUS         PORTS                                           NAMES
64df5d9715f9  docker.io/library/redis:8               redis-server          24 minutes ago  Up 24 minutes  0.0.0.0:6379->6379/tcp                          iglu-redis-1
4aad9e73a530  ghcr.io/iglu-sh/postgres:latest         postgres              24 minutes ago  Up 24 minutes  5432/tcp                                        iglu-postgres-1
e894e57fe3ed  ghcr.io/iglu-sh/iglu-cache:latest       /bin/iglu-cache       24 minutes ago  Up 24 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:9464->9464/tcp  iglu-cache-1
0a525e2f4ae2  ghcr.io/iglu-sh/iglu-controller:latest  /bin/iglu-control...  24 minutes ago  Up 24 minutes  0.0.0.0:3001->3001/tcp, 3000/tcp                iglu-controller-1
5265714c9325  ghcr.io/iglu-sh/iglu-scheduler:latest   /bin/iglu-schedul...  24 minutes ago  Up 19 minutes  3008/tcp                                        iglu-scheduler-1
```

If your output matches the example above, your basic Iglu setup is now operational.
