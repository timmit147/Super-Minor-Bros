const express = require('express')
const { graphql } = require('@octokit/graphql')
const graphqlAuth = graphql.defaults({
  headers: { authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN },
})

module.exports = express
  .Router()

  .get('/', function (req, res) {
    // Get the repository information from my GitHub account
    graphqlAuth(`{
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
    }`).then((data) => {
      res.render('projects', {
        users: data.repository.forks.edges,
      })
      // console.log(data.repository.forks.edges);
    })
  })