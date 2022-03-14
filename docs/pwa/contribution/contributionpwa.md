# Contribution Guide PWA

**1**: Create Issue <br>
Every change to the code and every pull request must be able to be assigned to an issue.
The issue ID created is required for the following steps.

**2**: [Fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) 
the [hubble Repository](https://github.com/hubblecommerce/hubble-frontend-pwa) with your Github account.

**3**: Setup NuxtJs
``` bash
npx create-nuxt-app <PROJECT-NAME>
```

**4**: Clone new fork locally
``` bash
cd <PROJECT-NAME>
mkdir modules
cd modules
git clone https://github.com/<YOUR-ACCOUNT-NAME>/hubble-frontend-pwa.git
```

**5**: Register Modul to NuxtJs
``` json
// ~/package.json
"dependencies": { 
    "@hubblecommerce/hubble": "file:modules/hubble-frontend-pwa/@hubblecommerce/hubble"
}
```

``` js
// ~/nuxt.config.js
buildModules: [
    ['@hubblecommerce/hubble']
],

hubble: {
    apiType: process.env.API_TYPE
},
```

**6**: Install Dependencies and start app
``` bash
npm install
npm run dev
```

**7**: Track the original repository as the remote of the fork <br>
Is especially important for the future to keep the fork up to date with the original repository (upstream).
 ``` bash
git remote add --track master upstream https://github.com/hubblecommerce/hubble-frontend-pwa.git
git fetch upstream
 ```

**8**: Create a new branch for the issue based on the upstream master branch
``` bash
git checkout -b issue#<NUM> upstream/master
```

**9**: Commit changes (specify issue ID)
``` bash
git add .
git commit -m "issue#<NUM> my detailed commit message"
git push -u origin issue#<NUM>
```

**10**: Pull Request <br>
Create a [Pull requests](https://github.com/hubblecommerce/hubble-frontend-pwa/pulls). <br>
You should now see an automatic suggestion from Github for a new pull request from the branch `issue#<NUM>` you created.

::: warning
Specify **dev** as the base branch instead of master.
::: 