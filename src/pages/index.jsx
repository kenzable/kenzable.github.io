import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import firebase from 'firebase';
import 'firebase/firestore';
import { firebase as firebaseConfig } from '../../config.json';
import SEO from '../components/seo';
import Items from '../components/items';

import 'semantic-ui-css/semantic.min.css';

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const storageRef = firebase.storage().ref();
const itemTypes = ['books'];

const IndexPage = () => (
  <Container textAlign="center">
    <SEO title="Home" />
    <Header
      as="h1"
      style={{
        fontSize: '4em',
        fontWeight: 'bold',
        marginBottom: '1rem',
        marginTop: '1rem',
        textTransform: 'uppercase',
      }}>
      Take my stuff
    </Header>
    {itemTypes.map(type => (
      <Items key={type} type={type} firestore={firestore} storageRef={storageRef} />
    ))}
  </Container>
);

export default IndexPage;
