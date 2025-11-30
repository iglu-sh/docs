# First Launch
At your first launch you have to do some things to achieve a basic setup.

## Get your first signing key
At the first start (**and only at the first start**) the cache generates a **private signing key**.
This key is very important to sign new packages as validation that they are trustworthy.
You get this key by looking in the logs of the cache with the command:
```bash
foo@bar:~$ docker logs $(docker ps | grep iglu-cache | awk '{print $1}') | grep "Initial Key"

cache 2025-11-30T21:27:48.359Z INFO Initial Key for cache default: 019ad6aa-2d87-7000-aea3-e417b13229a5
```
In this example the key is *"019ad6aa-2d87-7000-aea3-e417b13229a5"*.
You should store this securely in a password manager for example.

## First login
At the access of the controller (in our [Quickstart](./Quickstart) guide: http://localhost:3001) you are
prompted for a username and password, the default values are:
- username: admin
- password: admin

## Claiming the default cache
Because the [Cache](/docs/03-Components/Iglu%20Cache) can be used standalone it creates at start a cache
with the name "default". To be able to manage this cache via the controller you have to claim it.
![claim-caches](/img/docs/02-Getting_started/03-First_launch/claim-caches.png)

## Changing default password
After claiming the cashes you will be redirected to the "reset password" page.
there you have to set a new password for the "admin" user.

![change-password](/img/docs/02-Getting_started/03-First_launch/change-password.png)

