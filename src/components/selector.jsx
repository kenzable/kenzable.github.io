import React from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';
import Items from './items';

const itemTypes = ['books', 'home', 'miscellaneous'];

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selections: new Map(), type: null };
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleTypeClick(e, { name }) {
    this.setState({ type: name });
  }

  handleSelection(item, add) {
    this.setState(({ selections }) => {
      if (add) selections.set(item.id, item);
      else selections.delete(item.id);
      return { selections };
    });
  }

  isSelected(id) {
    const { selections } = this.state;
    return selections.has(id);
  }

  render() {
    const { firestore, storageRef } = this.props;
    const { selections, type } = this.state;

    console.log('what are selections?', selections);

    return (
      <Container>
        <Menu text>
          {itemTypes.map(itemType => (
            <Menu.Item
              key={itemType}
              name={itemType}
              active={type === itemType}
              onClick={this.handleTypeClick}
            />
          ))}
        </Menu>
        {type ? (
          <Items
            firestore={firestore}
            handleSelection={this.handleSelection}
            isSelected={this.isSelected}
            key={type}
            storageRef={storageRef}
            type={type}
          />
        ) : (
          <p>hi</p>
        )}
      </Container>
    );
  }
}

Selector.propTypes = {
  firestore: PropTypes.shape({
    collection: PropTypes.func,
  }).isRequired,
  storageRef: PropTypes.shape({
    child: PropTypes.func,
  }).isRequired,
};
