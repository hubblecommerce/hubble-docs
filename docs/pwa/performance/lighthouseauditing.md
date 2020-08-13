# Lighthouse Audits

Seiten in hubble werden über [Lighthouse](https://github.com/GoogleChrome/lighthouse) Audits auf
verschiedene Parameter hin, wie z.B. SEO Freundlichkeit, PWA Fähigkeiten und Ladezeiten, überprüft.
Die Entwicklung von Komponenten findet im Rahmen dessen statt.
Es existieren verschiedene Aspekte, die den finalen Lighthouse Score und die evaluierten Metriken beeinflussen.

## Performance
- [Dynamic Imports](../architectureanddataflow/dynamicimports.md)
- [Lazy Loading](../architectureanddataflow/lazyloading.md)

## Best practices
Komponenten in hubble haben den Anspruch Googles 
[Best practices Audits](https://developers.google.com/web/fundamentals/accessibility?utm_source=lighthouse&utm_medium=devtools) zu bestehen. 

## Accessibility
Komponenten in hubble haben den Anspruch korrektes HTML Markup zu benutzen um Googles 
[Accessibility Audits](https://web.dev/lighthouse-best-practices/) zu bestehen. 

## SEO
- [SEO](../seo.md)

## PWA
In hubble existieren verschiedene Vorkonfigurationen für die Bereitstellung von PWA Eigenschaften, wie
eine Manifest Datei, Offline Fähigkeit etc. Außerdem ist eine leichte Individualisierung und
Erweiterung der bereits existierenden Fähigkeiten durch die Vorkonfiguration möglich. 
Bestehende Einstellungen und Funktionaliäten sind im Abschnitt
[Service Worker und Manifest](../architectureanddataflow/serviceworkerandmanifesg.md) beschrieben.


