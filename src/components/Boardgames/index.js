// == Import
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Card, Button } from 'semantic-ui-react';

// == Composant
const Boardgames = ({ boardgames, categories }) => {

  const buttonColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal','blue','violet','purple','pink','brown','black']

  const getRandomButtonColor = () => {
    const randomNumber = Math.round(Math.random() * ((buttonColors.length + 1) - 1) + 1);
    console.log('random number', randomNumber);
    return buttonColors[randomNumber];
  }
 
  return (
    <main className="boardgames">
      <h1 className="boardgames-title">Liste des jeux</h1>
      <div className="boardgames-categories">
        {
          categories.map((category) => (
            <Button 
              key={category.id} 
              basic 
              color={getRandomButtonColor()}
            >
              {category.name}
            </Button>
          ))
        }
      </div>
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
}

export default Boardgames;