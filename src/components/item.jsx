import React from 'react';
import PropTypes from 'prop-types';
import { Card, Checkbox, Image } from 'semantic-ui-react';

const statusMap = {
  A: 'Available',
  H: 'On Hold',
};

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    const { isSelected, item } = props;
    this.state = { checked: isSelected(item.id), src: null };
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  async componentDidMount() {
    const { item, storageRef } = this.props;
    const imgName = `items/img${item.id}.jpeg`;
    try {
      const src = await storageRef.child(imgName).getDownloadURL();
      this.setState({ src });
    } catch (err) {
      console.error(`Failed to retrieve source for image ${imgName}`);
    }
  }

  toggleCheck() {
    const { handleSelection, item } = this.props;
    const { checked } = this.state;
    const newCheckedState = !checked;
    handleSelection(item, newCheckedState);
    this.setState({ checked: newCheckedState });
  }

  render() {
    const { item } = this.props;
    const { name, description, price, status } = item;
    const { checked, src } = this.state;
    return (
      <Card>
        {src && <Image src={src} rounded fluid />}
        <Checkbox
          style={{ position: 'absolute', top: '5px', right: '5px' }}
          onChange={this.toggleCheck}
          checked={checked}
        />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          {description && <Card.Description>{description}</Card.Description>}
        </Card.Content>
        <Card.Content extra>
          <p>{price === 0 ? 'FREE!!!' : `Price: $${price}`}</p>
          <p>Status: {statusMap[status]}</p>
        </Card.Content>
      </Card>
    );
  }
}

Item.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  storageRef: PropTypes.shape({
    child: PropTypes.func,
  }).isRequired,
};
