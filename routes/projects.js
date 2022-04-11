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
    }`).then((data) => {
      res.render('projects', {
        projects: data.repository.forks.edges,
      })
      console.log(data.repository.forks.edges);
    })
  })