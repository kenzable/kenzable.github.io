import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import Item from './item';

const itemCache = new Map();

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], loaded: false };
  }

  async componentDidMount() {
    const { type, firestore } = this.props;
    try {
      let items = itemCache.get(type);
      if (!items) {
        const { docs } = await firestore.collection(type).get();
        items = (docs || []).map(doc => ({ id: doc.id, ...doc.data() }));
        itemCache.set(type, items);
      }
      this.setState({ items, loaded: true });
    } catch (err) {
      console.error(`Failed to retrieve data for collection "${type}"`, err);
    }
  }

  render() {
    const { handleSelection, isSelected, type, storageRef } = this.props;
    const { items, loaded } = this.state;

    return (
      <Container>
        <Header as="h2" style={{ textTransform: 'uppercase', marginBottom: '2rem' }}>
          {type}
        </Header>
        <Card.Group centered>
          {loaded ? (
            items
              .filter(({ status }) => status === 'A')
              .map(item => (
                <Item
                  key={item.id}
                  item={item}
                  storageRef={storageRef}
                  handleSelection={handleSelection}
                  isSelected={isSelected}
                />
              ))
          ) : (
            <Loader active inline="centered" size="large" inverted>
              Loading Items...
            </Loader>
          )}
        </Card.Group>
      </Container>
    );
  }
}

Items.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  firestore: PropTypes.shape({
    collection: PropTypes.func,
  }).isRequired,
  storageRef: PropTypes.shape({
    child: PropTypes.func,
  }).isRequired,
};
