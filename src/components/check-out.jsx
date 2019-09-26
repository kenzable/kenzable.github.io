import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Form, Input, List } from 'semantic-ui-react';

const FORM_LINK = 'https://formspree.io/kenzable@gmail.com';

export default class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null }; // eslint-disable-line
  }

  render() {
    const { items } = this.props;
    const options = items.map(item => ({ key: item, value: item, text: item }));
    return (
      <Container>
        <Header as="h2" style={{ textTransform: 'uppercase' }}>
          Check Out
        </Header>
        <Form method="POST" action={FORM_LINK} style={{ maxWidth: '25rem', margin: '2rem auto' }}>
          <Form.Field control={Input} label="Name" placeholder="Name" name="name" />
          <Form.Field control={Input} label="Email" placeholder="Email" name="email" type="email" />
          <Form.Field
            control="input"
            type="select"
            name="items"
            options={options}
            multiple
            value={items}
            readOnly
            hidden
          />
          <List style={{ maxWidth: '14rem', margin: '3rem auto', textAlign: 'left' }}>
            {items.map(item => (
              <List.Item key={item}>
                <List.Icon name="delete" />
                <List.Content>{item}</List.Content>
              </List.Item>
            ))}
          </List>
          <Button type="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

CheckOut.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
