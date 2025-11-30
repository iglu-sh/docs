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
WIP
```

```bash title=".env"
WIP=test
```

## 2) Adjust envs
Adjust the `.env` file for your needs.
You can read more about the envs on the [Components](/docs/Components/Iglu%20Builder) page.
:::warning
Please do not change the environemnts or any other property in the `compose.yml` unless you know what you do.
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





