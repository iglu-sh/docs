# Quickstart

:::warning
This project is still work in progress. Please report issues [here](https://github.com/iglu-sh/controller/issues/new)!
:::

The recommended way to use Iglu is [docker-compose](https://docs.docker.com/compose). You can find the documentation how to install compose [here](https://docs.docker.com/compose/install).

:::important
It is important to use our postgres docker, as we made some changes to it:
- cron plugin
- http plugin
:::

## 1) Prepare files
Create a folder with the name `iglu` on your machine and copy the `compose.yml`
and the `.env` in this directory.
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
    command: ["postgres", "-c", "log_statement=all"]
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
CACHE_ROOT_DOMAIN=http://localhost:3000 #External accessable URL of the Cache
PROM_ENABLE=true

# LOGGING
LOG_LEVEL=INFO

# CONTROLLER
CONTROLLER_URL=http://localhost:3001 #External accessable URL of the Controller
PORT=3001
AUTH_SECRET=changeme #Random String for AUTH
NODE_PSK=changeme #Random String for Scheduler to join Controller

# SCHEDULER
NODE_NAME=examplenode
ENABLE_CROSS_COMPILE=false
AUTO_PULL_IMG=true
```

## 2) Adjust envs
Adjust the environment variables in the `.env` file and the volume paths in the `compose.yml` to your needs.
You can read more about the envs on the [Components](/docs/Components/Iglu%20Builder) page.
:::warning
Please do not change the environemnts in the `compose.yml` unless you know what you do.
:::

## 3) Start the containers
Change in the directory with `cd iglu` and then start the containers with `compose up -d`

You can check your results by executing:
```bash
foo@bar:~$ docker ps

CONTAINER ID  IMAGE                                   COMMAND               CREATED         STATUS         PORTS                                           NAMES
64df5d9715f9  docker.io/library/redis:8               redis-server          24 minutes ago  Up 24 minutes  0.0.0.0:6379->6379/tcp                          iglu-redis-1
4aad9e73a530  ghcr.io/iglu-sh/postgres:latest         postgres              24 minutes ago  Up 24 minutes  5432/tcp                                        iglu-postgres-1
e894e57fe3ed  ghcr.io/iglu-sh/iglu-cache:latest       /bin/iglu-cache       24 minutes ago  Up 24 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:9464->9464/tcp  iglu-cache-1
0a525e2f4ae2  ghcr.io/iglu-sh/iglu-controller:latest  /bin/iglu-control...  24 minutes ago  Up 24 minutes  0.0.0.0:3001->3001/tcp, 3000/tcp                iglu-controller-1
5265714c9325  ghcr.io/iglu-sh/iglu-scheduler:latest   /bin/iglu-schedul...  24 minutes ago  Up 19 minutes  3008/tcp                                        iglu-scheduler-1
```
If it looks like the output in the example you are good to go now! Your basic Iglu-Setup is running!





