# A simple Hello World Demo

## <a href="https://yanansun0074.github.io/helloworld_demo/">Demo Page</a>
A simple React App

Functions:
- insert name and change title based on inputs
- change background(s) with prev and next button



## Testing - Deployment - Notification <a href ="/.github/workflows/test-and-deploy.yml">Workflows</a>
### <a href="/tests/hw.spec.js">Testing</a>
Tests with playwright
- initial rendering
- type input boxes & submit
- input update title
- button visibility
- background changing button behaviors


### Deploy
Deployed with Github Page

### Notification
Implemented a Slack App for deployment alerts in a channel
- if any test failed: Send message **"Tests did not pass."**
- if tests succeeded but deployment failed: **"Deployment was skipped or failed unexpectedly."**
- success: **"Deployment succeeded! Visit: https://yanansun0074.github.io/helloworld_demo"**


