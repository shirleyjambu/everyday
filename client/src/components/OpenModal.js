import React, {Component} from 'react';
import PropTypes from 'prop-types';
import{Modal, Button} from 'react-bulma-components';
import Calender from './Calender';

class OpenModal extends Component {
  static propTypes = {
    modal: PropTypes.object//,
   // children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    modal: {},
  };

  state = {
    show: false,
  };

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render() {
    return (
      <div>
        <Button onClick={this.open}>Open</Button>
        <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
          <Calender/>
        </Modal>
      </div>
    );
  }
}

export default OpenModal;