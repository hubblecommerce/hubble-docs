# Contribution Guide PWA

**1**: Issue erstellen <br>
Jede Änderung am Code und jeder Pull Request muss einem Issue zugeordnet werden können. 
Die dabei erstellte Issue ID wird für die folgenden Schritte benötigt. 

**2**: [Fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) des 
[hubble Repositorys](https://github.com/hubblecommerce/hubble-frontend-pwa) auf eigenen Github Account erstellen.

**3**: Setup NuxtJs
``` bash
npx create-nuxt-app <PROJECT-NAME>
```

**4**: Neuen Fork lokal klonen
``` bash
cd <PROJECT-NAME>
mkdir modules
cd modules
git clone https://github.com/<YOUR-ACCOUNT-NAME>/hubble-frontend-pwa.git
```

**5**: Modul in NuxtJs registrieren
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

**6**: Dependencies installieren und Projekt starten 
``` bash
npm install
npm run dev
```

**7**: Tracken des original Repositories als Remote des Forks <br>
Ist insbesondere für die Zukunft wichtig, um den Fork aktuell zu dem originalen Repository (upstream) zu halten.
 ``` bash
git remote add --track master upstream https://github.com/hubblecommerce/hubble-frontend-pwa.git
git fetch upstream
 ```

**8**: Neuen Branch für das Issue auf Basis des Upstream master Branches erstellen 
``` bash
git checkout -b issue#<NUM> upstream/master
```

**9**: Änderungen am Code in Fork Repository einchecken (Issue ID angeben)
``` bash
git add .
git commit -m "issue#<NUM> my detailed commit message"
git push -u origin issue#<NUM>
```

**10**: Pull Request <br>
Auf [Pull requests von hubble](https://github.com/hubblecommerce/hubble-frontend-pwa/pulls) gehen.
Dort sollte jetzt ein automatischer Vorschlag von Github zu sehen sein, einen neuen Pull Request aus dem erstellten Branch `issue#<NUM>` zu machen. <br>
Wichtig! Als Base Branch nicht master sondern dev angeben. 
