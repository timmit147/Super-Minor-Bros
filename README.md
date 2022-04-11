# Super-Minor-Bros

## GraphQL API 

Met de GraphQL explorer heb ik de data opgehaald die wij gaan gebruiken op onze website. Wij gebruiken de data van project-2-2122 om alle forks op te halen van de studenten. De website die we hebben gebruikt om deze data te verzamelen is https://docs.github.com/en/graphql/overview/explorer.

```
{
  repository(name: "project-2-2122", owner: "cmda-minor-web") {
    id
    forks(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
```
