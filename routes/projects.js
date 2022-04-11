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
      user(login: "ju5tu5") {
        repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
          edges {
            node {
              name
              url
              description
              updatedAt
              homepageUrl
            }
          }
        }
      }
    }`).then((data) => {
      res.render('projects', {
        projects: data.user.repositories.edges,
      })
    })
  })