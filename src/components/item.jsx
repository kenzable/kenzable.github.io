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
    this.state = { src: null };
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

  render() {
    const { item } = this.props;
    const { name, description, price, status } = item;
    const { src } = this.state;
    return (
      <Card>
        {src && <Image src={src} rounded fluid />}
        <Checkbox style={{ position: 'absolute', top: '5px', right: '5px' }} />
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
