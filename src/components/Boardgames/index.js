// == Import
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Icon, Typography } from '@material-ui/core';
import { PeopleAlt, Brush, Category, BarChart, ChildCare } from '@material-ui/icons';

// == Composant
const Boardgames = ({ boardgames, categories }) => {
  return (
    <main className="boardgames">
      <h1 className="boardgames-title">Liste des jeux</h1>
      <div className="boardgames-categories">
      </div>
      <div className="boardgames-list">
        <Grid container spacing={4} alignItems="stretch">
        {
          boardgames.map((bg) => (
            <Grid item xs={12} sm={8} md={6} lg={4} key={bg.id} alignItems="stretch" justify="center" marginLeft="auto" marginRight="auto">
                <Card raised className="cardEffect">
                  <CardHeader style={{height: '5rem'}}
                    title={bg.name}
                  />
                  <CardMedia
                    style={{
                      width: "auto",
                      maxWidth: "80%",
                      maxHeight: "200px",
                      margin: "auto"
                    }}
                    component="img"
                    image={bg.picture_url}
                    alt={bg.name}
                  />
                  <CardContent>
                    <Grid container spacing={4} alignItems="stretch" height="230px">
                      {/* Nombre de joueurs */}
                      <Grid item xs={12} sm={8} md={6} lg={4} marginLeft="auto" marginRight="auto">
                        <PeopleAlt />
                        <Typography variant="body2">
                          {bg.min_players} - {bg.max_players}
                        </Typography>
                      </Grid>
                      {/* Catégories */}
                      <Grid item xs={12} sm={8} md={6} lg={4} marginLeft="auto" marginRight="auto">
                        <Category />
                        <ul>
                          <Typography variant="body2">
                              {bg.categories.map((cat) => (
                                <li className={'cat cat-' + cat.id} key={cat.id + cat.name}>{cat.name}</li>
                              ))}
                          </Typography>
                        </ul>
                      </Grid>
                      <Grid item xs={12} sm={8} md={6} lg={4} marginLeft="auto" marginRight="auto">
                        <Brush />
                        <ul>
                          <Typography variant="body2">
                            {bg.themes.map((theme) => (
                              <li key={theme.id}>{theme.name}</li>
                            ))}
                          </Typography>
                        </ul>
                      </Grid>
                      <Grid item xs={12} sm={8} md={6} lg={4} marginLeft="auto" marginRight="auto">
                        <BarChart />
                        <Typography variant="body2">
                          {bg.difficulty[0].label}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={6} lg={4} marginLeft="auto" marginRight="auto">
                        <ChildCare />
                        {bg.min_age > 1 &&
                          <Typography variant="body2">
                            {bg.min_age} ans et +
                          </Typography>
                        }
                        {bg.min_age <= 1 &&
                          <Typography variant="body2">
                            {bg.min_age} an et +
                          </Typography>
                        }
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
            </Grid>
          ))
        }
        </Grid>
      </div>
    </main>
  )
}

export default Boardgames;