import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Form, Input, List, Modal } from 'semantic-ui-react';

const FORM_LINK = 'https://formspree.io/kenzable@gmail.com';

export default function CheckOut(props) {
  const { handleSelection, items } = props;
  const options = items.map(({ name }) => ({ key: name, value: name, text: name }));
  return (
    <Container>
      <Header as="h2" style={{ textTransform: 'uppercase' }}>
        Check Out
      </Header>
      <Form method="POST" action={FORM_LINK} style={{ maxWidth: '20rem', margin: '2rem auto' }}>
        <Form.Field control={Input} label="Name" placeholder="Name" name="name" />
        <Form.Field control={Input} label="Email" placeholder="Email" name="email" type="email" />
        <Form.Field
          control="input"
          type="select"
          name="items"
          options={options}
          multiple
          value={items.map(({ name }) => name)}
          readOnly
          hidden
        />
        <List style={{ maxWidth: '15rem', margin: '3rem auto', textAlign: 'left' }}>
          {items.map(item => (
            <List.Item key={item.name}>
              <List.Icon name="delete" size="large" onClick={() => handleSelection(item, false)} />
              <List.Content>{item.name}</List.Content>
            </List.Item>
          ))}
        </List>
        <Modal
          trigger={
            <Button
              style={{ display: 'block', margin: '3rem auto' }}
              basic
              onClick={e => e.preventDefault()}>
              See Mack&apos;s Schedule
            </Button>
          }
          style={{ width: '445px' }}>
          <Modal.Content style={{ margin: '0 auto' }}>
            <iframe
              title="calendar"
              src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=a2VuemFibGVAZ21haWwuY29t&amp;color=%23E67C73&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=1&amp;mode=WEEK&amp;title=When%20do%20you%20want%20to%20come%20take%20stuff%3F&amp;showNav=1"
              style={{ borderWidth: 0 }}
              width="400"
              height="400"
              frameBorder="0"
              scrolling="no"
            />
          </Modal.Content>
        </Modal>
        <Form.Field
          control={Input}
          label="When do you want to pick stuff up?"
          placeholder="List dates/times"
          name="datetime"
        />
        <Button type="submit" style={{ margin: '2rem auto' }}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

CheckOut.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
