import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export default () => {
  return (
    <Container>
      <Header as="h2" style={{ textTransform: 'uppercase', marginBottom: '2rem' }}>
        Welp... I&apos;m moving!
      </Header>
      <Container text>
        <p>
          I fly out of NYC on October 12th, so between now and then I have a bunch of stuff to get
          rid of.
        </p>

        <p>
          Plz browse the categories above and select anything you might be interested in! Then, fill
          out the form under &quot;check out&quot; to let me know what I should put on hold for you.
        </p>
        <p>
          <strong>Keep checking this page!</strong> I&apos;ll likely be adding more items as moving
          day approaches
        </p>
      </Container>
    </Container>
  );
};
