## Super-Minor-Bros
In deze module van de minor Web Design & Development werken we vier dagen met de GitHub GraphQL API. We mogen dit op een eigen creatieve manier gaan invullen. 

### Link naar live demo
[Klik hier!](https://super-minor-bros.herokuapp.com/)

<!-- ### Beschrijving

Bij de data die wordt opgehaald wordt gebruikt gemaakt van de volgende API: https://quote.api.fdnd.nl/v1/quote

Uit de API wordt de name, text en avatar opgehaald.

### Voorkant


### Inhoudsopgave 

* [Installeren](https://github.com/Mitzyyy/Enquete#installeren)
* [Gebruik en kenmerken](https://github.com/Mitzyyy/Enquete#gebruik-en-kenmerken)
* [Gedaan en wenslijst](https://github.com/Mitzyyy/Enquete#gedaan-en-wenslijst)
* [Bronnen](https://github.com/Mitzyyy/Enquete#bronnen)
* [Licentie](https://github.com/Mitzyyy/Enquete#licentie)

## GraphQL API 

Met de GraphQL explorer heb ik de data opgehaald die wij gaan gebruiken op onze website. Wij gebruiken de data van web-app-from-scratch-2122 om alle forks op te halen van de studenten. De website die we hebben gebruikt om deze data te verzamelen is https://docs.github.com/en/graphql/overview/explorer.

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
          }
        }
      }
    }
  }
}
``` -->
