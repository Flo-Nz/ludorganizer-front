// == Import
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Card } from 'semantic-ui-react';

// == Composant
const Boardgames = () => (
  
  <main className="boardgames">
    <h1 className="boardgames-title">Liste des jeux</h1>
    <div className="boardgames-list">
      <Card.Group itemsPerRow={4}>
        <Card
          color='olive'
          image='/images/avatar/large/elliot.jpg'
          header='Elliot Baker'
          meta='Friend'
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        />
        <Card
          color='green'
          image='/images/avatar/large/elliot.jpg'
          header='Elliot Baker'
          meta='Friend'
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        />
        <Card
          color='teal'
          image='/images/avatar/large/elliot.jpg'
          header='Elliot Baker'
          meta='Friend'
          description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        />
      </Card.Group>
    </div>
  </main>
)

export default Boardgames;