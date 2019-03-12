import React from 'react';
import {Hero, Heading} from 'react-bulma-components';

const Header =() =>{
  return(
    <React.Fragment>
      <Hero color="primary">
          <Hero.Body>
            <Heading className="has-text-centered">EveryDay</Heading>
          </Hero.Body>
      </Hero>
    </React.Fragment>
  )
}

export default Header;