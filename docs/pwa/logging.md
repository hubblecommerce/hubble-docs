# Logging

Aktuell wird zum loggen von bestimmten Checkout relevanten Fehlern der `hubble-logger` verwendet.
Dieser ist eine nuxt Servermiddleware und verwendet winstonjs um unter /logs entsprechende log files zu schreiben. 

### Verwendung

```js
import axios from 'axios';

axios({
    method: 'POST',
    url: '/api/hubble-logger',
    data: {
        level: 'error',
        msg: 'initExpressButton AmazonPayButton onError: %o',
        payload: error
    }
});
```

Zukünftig wird dieser Logger jedoch durch einen online Service eines Drittanbieters ersetzt werden. Dieser ist dann in der Lage 
sämtliche JS Fehler zu loggen. Auch clientseitige console errors. 
