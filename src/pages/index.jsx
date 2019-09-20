import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import SEO from '../components/seo';

import 'semantic-ui-css/semantic.min.css';

const IndexPage = () => (
  <Container text>
    <SEO title="Home" />
    <Header
      as="h1"
      style={{
        fontSize: '4em',
        fontWeight: 'bold',
        marginBottom: '1rem',
        marginTop: '1rem',
        textTransform: 'uppercase',
      }}
    >
      Take my stuff
    </Header>
    <p>Content will go here.</p>
    <p>Now go build something great.</p>
  </Container>
);

export default IndexPage;
