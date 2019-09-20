module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
  siteMetadata: {
    author: `Mackenzie Turner`,
    description: `A project for quickly deploying to my github page`,
    title: `kenzable.github.io`,
  },
};
