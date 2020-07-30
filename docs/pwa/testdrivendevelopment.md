# Testing

# Frontend Testing

For frontend testing the hubble PWA uses [Cypress](https://www.cypress.io/). 
hubble provides testing for all common use cases to ensure functionality with new features.

## Configure Cypress

Before running tests you need to configure the cypress.json. You just need to change the email base that cypress uses for his tests. 
```json5
{
   "emailBase": "<ENTER-YOUR-PREFIX-HERE>-$placeholder@<ENTER-YOUR-DOMAIN-HERE>.com"
}
```
## Run Cypress Tests

There are two ways to run cypress test. To run cypress tests in GUI mode, use: 
```bash
npx cypress open 
```
To run cypress tests in the background, use:
```bash
npx cypress run 
```
For a specific test use:
```bash
npx cypress run --spec "cypress/integration/<SPEC>.js" 
``` 
 