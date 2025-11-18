# The Iglu Scheduler
The Iglu Scheduler is responsible for managing iglu-builders. 
It gets instructions from the Iglu Controller using Redis Channels.

## Startup
On Startup the Scheduler runs through a series of tasks.  
This is done mainly through the [startup.ts](https://github.com/iglu-sh/scheduler/blob/main/lib/startup.ts) file. This file handles env var validation and registration with the controller. A usual startup, however also includes connecting to Redis and setting up build listeners, which is done in the index.ts file after the startup.ts file has done its job.  
### Startup Routine
The usual startup routine looks like this:
![Startup Routine](/img/docs/Components/Scheduler/Scheduler-Startup.svg)  
### Controller Registration Flow
The afforementioned Controller Registration Flow looks like this:  
![Startup Conversation](/img/docs/Components/Scheduler/startup-conversation.svg)
This flow is executed on startup, everytime a Scheduler starts up. In the future, this should also provide the config to the Scheduler, so you won't have to set all the env vars for every controler. However this is not implemented yet.
## Job Flow
To Start a Job on any Node, the Controller receives an HTTP Webhook Request (in any of the three Trigger methods) to `/api/v1/webhooks/builder/<hook>`, this then triggers this flow of communication:  
All Red Arrows represent Redis Channel Communication, all orange ones represent HTTP REST calls:  
![New Job Conversation](/img/docs/Components/Scheduler/job-conversation-flow.svg)