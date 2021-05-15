## Ravintolasovellus

Tämä on Helsingin Yliopiston kurssin "Aineopintojen harjoitustyö: Tietokantasovellus" (TKT20011) harjoitustyö.

Sovelluksessa näkyy tietyn alueen ravintolat, joista voi etsiä tietoa ja lukea arvioita. Jokainen käyttäjä on peruskäyttäjä tai ylläpitäjä.

- Käyttäjä voi kirjautua sisään ja ulos sekä luoda uuden tunnuksen.
- Käyttäjä näkee ravintolat kartalla ja voi painaa ravintolasta, jolloin siitä näytetään lisää tietoa (kuten kuvaus ja aukioloajat).
- Käyttäjä voi antaa arvion (tähdet ja kommentti) ravintolasta ja lukea muiden antamia arvioita.
- Ylläpitäjä voi lisätä ja poistaa ravintoloita sekä määrittää ravintolasta näytettävät tiedot.
- Käyttäjä voi etsiä kaikki ravintolat, joiden kuvauksessa on annettu sana.
- Käyttäjä näkee myös listan, jossa ravintolat on järjestetty parhaimmasta huonoimpaan arvioiden mukaisesti.
- Ylläpitäjä voi tarvittaessa poistaa käyttäjän antaman arvion.
- Ylläpitäjä voi luoda ryhmiä, joihin ravintoloita voi luokitella. Ravintola voi kuulua yhteen tai useampaan ryhmään.

SOVELLUKSEN DEMOVERSIO ON NÄHTÄVISSÄ [TÄÄLLÄ](https://tsoha-ravintolat.herokuapp.com)

_Demotunnukset:_

|                 | tunnus | salasana  |
| --------------- | ------ | --------- |
| normaali tunnus | demo   | demopassu |
| pääkäyttäjä     | pomo   | pomopassu |

Kun käyttäjä saapuu sovellukseen, kotinäkymässä on Kumpulan alueen kartta ja kartalla markereita osoittamassa paikkoja, jossa ravintoloita on. Klikkaamalla ikonia käyttäjä pääsee katsomaan ravintolan tietoja sekä lukemaan ja antamaan arvioita.

Ylänavigaatiossa on linkit pääsivulle, Top-sivulle, lisätietosivulle sekä linkki joko kirjautumissivulle tai profiiliin/hallintapaneeliin, kirjaudu-ulos painike, sekä linkki hakusivulle.

Hallintapaneelissa pääkäyttäjä pääsee lisäämään,muokkaamaan ja poistamaan ravintoloita ja niihin liittyviä ominaisuuksia.

Ravintolan tietosivulla on perustietojen lisäksi arviot, joita käyttäjä pääsee lisäämään kirjauduttuaan. Pääkäyttäjä voi poistaa arvioita.

##Juttuja, joita voisi vielä lisätä/parantaa

- Käyttäjä voisi lisätä omia kuvia ravintolasta
- Check-in feature kuten esim. Foursquaressa/Swarmissa
  - Tarkistettaisiin GPS-lokaatio + mahdollisesti vaadittaisiin kuvatodiste kaljatuopista. Tarkistus voitaisiin tehdä esim. Googlen Cloud Vision API:lla 😎
- Tyylikkäämpi karttapohja
