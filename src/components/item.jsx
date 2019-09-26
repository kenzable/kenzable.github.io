import React from 'react';
import PropTypes from 'prop-types';
import { Card, Dimmer, Header, Icon, Image } from 'semantic-ui-react';

const statusMap = {
  A: 'Available',
  H: <span style={{ color: 'orange' }}>On Hold</span>,
};
const imageCache = new Map();

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    const { isSelected, item } = props;
    this.state = {
      dimmed: false,
      checked: isSelected(item.id),
      src: null,
    };
    this.toggleCheck = this.toggleCheck.bind(this);
    this.handleDim = this.handleDim.bind(this);
    this.handleUndim = this.handleUndim.bind(this);
  }

  async componentDidMount() {
    const { item, storageRef } = this.props;
    const imgName = `items/img${item.id}.jpeg`;
    try {
      let src = imageCache.get(imgName);
      if (!src) {
        src = await storageRef.child(imgName).getDownloadURL();
        imageCache.set(imgName, src);
      }
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

  handleDim() {
    this.setState({ dimmed: true });
  }

  handleUndim() {
    this.setState({ dimmed: false });
  }

  render() {
    const { item } = this.props;
    const { name, description, price, status } = item;
    const { checked, dimmed, src } = this.state;

    return (
      <Card>
        {src && (
          <Dimmer.Dimmable as="div" onMouseEnter={this.handleDim} onMouseLeave={this.handleUndim}>
            <Image src={src} rounded fluid />
            <Dimmer
              inverted
              active={dimmed}
              style={{ background: 'rgba(211, 189, 234, 0.52)' }}
              onClick={this.toggleCheck}>
              <Header
                as="h2"
                style={{
                  color: 'rgba(0,0,0,.4)',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: '2rem',
                }}>
                select item
              </Header>
            </Dimmer>
          </Dimmer.Dimmable>
        )}
        {checked && (
          <Icon
            size="huge"
            name="check circle"
            style={{
              color: 'rgba(255,255,255,.7)',
              position: 'absolute',
              top: '15px',
              right: '10px',
            }}
          />
        )}
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
