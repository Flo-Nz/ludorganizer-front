// == Import
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Card } from 'semantic-ui-react';

// == Composant
const Boardgames = ({ boardgames }) => (
  
  <main className="boardgames">
    <h1 className="boardgames-title">Liste des jeux</h1>
    <div className="boardgames-list">
      <Card.Group itemsPerRow={4}>
      {
        boardgames.map((bg) => (
          <Card
          key={bg.id}
          color='green'
          image={bg.picture_url}
          header={bg.name}
          meta={bg.categories[0]['name']}
          description={"Joueurs : " + bg.min_players + "-" + bg.max_players + " / Durée : " + bg.duration + " minutes"}
        />
        ))
      }
      </Card.Group>
    </div>
  </main>
)

export default Boardgames;