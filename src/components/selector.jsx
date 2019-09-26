import React from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Menu } from 'semantic-ui-react';
import Main from './main';
import CheckOut from './check-out';
import Items from './items';

const views = ['main', 'books', 'home', 'miscellaneous', 'check out'];

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selections: new Map(), active: 'main' };
    this.handleActiveClick = this.handleActiveClick.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleActiveClick(e, { name }) {
    this.setState({ active: name });
  }

  handleSelection(item, add) {
    this.setState(({ selections }) => {
      if (add) selections.set(item.id, item);
      else selections.delete(item.id);
      return { selections: new Map(selections) };
    });
  }

  isSelected(id) {
    const { selections } = this.state;
    return selections.has(id);
  }

  renderView() {
    const { firestore, storageRef } = this.props;
    const { active, selections } = this.state;
    if (active === 'main') return <Main />;
    if (active === 'check out') {
      const items = [...selections.values()].map(({ name }) => name);
      return <CheckOut items={items} />;
    }
    return (
      <Items
        key={active}
        firestore={firestore}
        handleSelection={this.handleSelection}
        isSelected={this.isSelected}
        storageRef={storageRef}
        type={active}
      />
    );
  }

  render() {
    const { active } = this.state;
    return (
      <Container>
        <Menu text>
          {views.map(navOpt => (
            <Menu.Item
              key={navOpt}
              name={navOpt}
              active={active === navOpt}
              onClick={this.handleActiveClick}
            />
          ))}
        </Menu>
        <Divider />
        {this.renderView()}
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
