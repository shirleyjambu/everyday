import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Section } from "react-bulma-components";
import Calender from "./Calender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class OpenModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    modal: {}
  };

  state = {
    show: false
  };

  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  render() {
    return (
      <div>
        <FontAwesomeIcon
          icon="calendar-alt"
          onClick={this.open}
          size="lg"
          title="Calendar"
        />
        <Modal
          show={this.state.show}
          onClose={this.close}
          {...this.props.modal}
        >
          <Modal.Content>
            <Section style={{ backgroundColor: "white" }}>
              <Calender user_id={this.props.user_id} />
            </Section>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default OpenModal;
