import React from 'react'
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import request from 'superagent';

const METADATA_SERVICE = process.env.REACT_APP_METADATA_SERVICE;

class Glossary extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      definition: null,
      anchor: null,
    }

    this.handlePopoverClose = this.handlePopoverClose.bind(this);
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
  }

  handlePopoverOpen = event => {
    if(this.state.definition) {
      this.setState({ anchor: event.target });
    } else {
      event.persist();
      request.get(`${METADATA_SERVICE}/glossary/search?id=${this.props.node.data.get('id')}`)
        .then(res => {
          this.setState({
            anchor: event.target,
            definition: res.body.definition,
          });
        }).catch(err => console.log(new Error(err)));
    }
  };

  handlePopoverClose = () => {
    this.setState({ anchor: null });
  };

  render() {
    const { data } = this.props.node
    const { attributes, children } = this.props;
    const id = data.get('id')
    const { anchor, definition } = this.state;
    const open = !!anchor

    return (
      <span
        onMouseOver={this.handlePopoverOpen}
        onMouseOut={this.handlePopoverClose}
        {...attributes}
        id={id}
      >
        <span>
          {children}
        </span>
        <Popover
          open={open}
          anchorEl={anchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onRequestClose={this.handlePopoverClose}
        >
          <Typography>{definition}</Typography>
        </Popover>
      </span>
    )
  }
}

export default Glossary;

