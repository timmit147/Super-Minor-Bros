const express = require('express')
const { graphql } = require('@octokit/graphql')
const graphqlAuth = graphql.defaults({
  headers: { authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN },
})

module.exports = express
  .Router()

  .get('/:id', function (req, res) {
    // Get the repository information from my GitHub account
    graphqlAuth(`{
      viewer {
        login
      }
      repositoryOwner(login: "${req.params.id}") {
        id
        repositories(orderBy: { field: UPDATED_AT, direction: DESC }, first: 100 ) {
          edges {
            node {
              id
              name
              url
            }
          }
        }
      }
    }`).then((data) => {
      console.log(data.repositoryOwner.repositories.edges[0].node.name);
      res.render('underground', {
        repositories: data.repositoryOwner.repositories.edges,
        name: req.params.id,
      })
    })
  })