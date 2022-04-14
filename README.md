## Super-Minor-Bros
In deze module van de minor Web Design & Development wordt er vier dagen gewerkt met de GitHub GraphQL API. De invulling hiervan is op eigen creatieve manier waardoor er de mogelijkheid is om GraphQL te leren verkennen.

### Voorkant



### Link naar live demo
[Klik hier!](https://super-minor-bros.herokuapp.com/){:target="_blank"}

### Inhoudsopgave 

* [Beschrijving](https://github.com/timmit147/Super-Minor-Bros#beschrijving)
* [Installeren](https://github.com/timmit147/Super-Minor-Bros#installeren)
* [Bronnen](https://github.com/timmit147/Super-Minor-Bros#bronnen)
* [Licentie](https://github.com/timmit147/Super-Minor-Bros#licentie)

### Beschrijving
Op de homepagina zijn alle namen van de studenten van de minor 2021/2022 te zien. Als Mario omhoog springt zijn het aantal repositories van die studient te zien. Als je hierop klikt ga je naar de detailpagina, de underground, en kan je de repositories van diegene bekijken.

Met de GraphQL explorer is de data opgehaald die wordt gebruikt voor de website. De data van web-app-from-scratch-2122 wordt gebruikt om alle forks op te halen van de studenten. Om deze data te verzamelen is de volgende website gebruikt: https://docs.github.com/en/graphql/overview/explorer.

```
{
  repository(name: "web-app-from-scratch-2122", owner: "cmda-minor-web") {
    id
    forks(first: 100) {
      edges {
        node {
          id
          owner {
            login
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
}
```

### Installeren
- Open de terminal in jouw code editor 
- Gebruik de terminal en clone deze repo 
```
git clone https://github.com/timmit147/Super-Minor-Bros.git
```
- Installeer de gebruikte packages
```
npm install
```
- Start de server
```
npm run rundev
```
- Open de localhost in de browser
```
http://localhost:7000/
```

### Licentie
[MIT License](LICENSE)