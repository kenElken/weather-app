Lihtne veebirakendus, mis kuvab valitud linna hetke ilma.

Rakenduses saab:

- sisestada linna nime
- vajutada nuppu "Näita ilma"
- näha temperatuuri
- näha tuule kiirust
- näha ilmakirjeldust

Rakenduses on katutatud:

- HTML
- CSS
- JavaScript
- Open-Meteo API

Tööpõhimõte:

Kasutab kahte Open-Meteo teenust:

1. Geocoding API leiab sisestatud linna järgi asukoha koordinaadid
2. Forecast API tagastab nende koordinaatide põhjal ilmaandmed

Kasutaja sisestab linna nime, seejärel otsib rakendus linna asukoha ning kuvab hetke ilma.

skript.js failis olevaid case numbreid ilmselt peaks selgitama kuna need ei jookse vaadates loogiliselt:

Ilma kirjeldamise kasutatakse Open-Meteo API weather_code väärtusi.

Need koodid ei ole järjestikused numbrid, vaid on API poolt ette määratud.  
Näiteks:
- 0 = selge
- 1, 2, 3 = erinevad pilvisuse tasemed
- 45 ja 48 = udu
- 61, 63, 65 = vihm
- 71, 73, 75 = lumi
- 80, 81, 82 = hoovihm
- 95 = äike

Rakenduses tõlgitakse need koodid tekstiks.