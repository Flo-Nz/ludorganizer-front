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
      <div className="boardgames-list" id="cards">
        {
          boardgames.map((bg) => (
            
            <figure key={bg.id} className={'card' + ` card--${bg.difficulty[0].label}`}>
              <div className="card__image-container">
                <img src={bg.picture_url} alt={bg.name} className="card__image" />   
              </div>
              
              <figcaption className="card__caption">
                <h1 className="card__name">{bg.name}</h1>

                <h3 className="card__type">
                  {bg.difficulty[0].label}
                </h3>

                <table className="card__stats">
                  <tbody><tr>
                    <th>Joueurs min</th>
                    <td>{bg.min_players}</td>
                  </tr>
                  <tr>
                    <th>Joueurs max</th>
                    <td>{bg.max_players}</td>
                  </tr>
                  
                  <tr>
                    <th>Durée (minutes)</th>
                    <td>{bg.duration}</td>
                  </tr>

                  <tr>
                    { bg.themes.length > 1 && <th>Thèmes</th> }
                    { bg.themes.length <= 1 && <th>Thème</th>}
                    {
                      bg.themes.map((theme) => (
                        <td key={theme.id}>{theme.name}</td>
                      ))
                    }
                  </tr>
                </tbody></table>
                
                <div className="card__abilities">
                {
                  bg.categories.map((cat) => (
                    <h4 key={cat.id} className="card__ability">
                      <span className="card__label">{cat.name}</span>
                    </h4> 
                  ))
                }
                </div>
              </figcaption>
            </figure>
          ))
        }
      </div>
    </main>
  )
}

export default Boardgames;