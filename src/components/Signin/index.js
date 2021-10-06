// == Import
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Box } from '@material-ui/system';
import { TextField, MenuItem, Card, CardHeader, CardMedia, Button, Grid, Alert, outlinedInputClasses, inputLabelClasses } from '@material-ui/core';
import { PeopleAlt, Brush, Category, Send, Assignment, BubbleChart } from '@material-ui/icons';

// == Composant
const AddForm = ({ addFormError, addFormErrorMsg, addFormData, handleAddForm, handleInputChange, categories, themes, difficulties, submitAddFormErr, submitAddFormOk }) => {
  const loginDefaultValues = {login: '', pwd: ''};
  const [signinFormData, setSigninFormData] = useState(loginDefaultValues);
  const [signinFormError, setAddFormError] = useState(bgDefaultError);
  return (
    <div className="signin">
      <Box
        component="form"
        autoComplete="off"
        sx={{
          width: '50%',
          margin: 'auto',
          textAlign: 'center',
          marginTop: '1em',
          marginBottom: '1em'
        }}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSigninForm(signinFormData);
        }}
      >
          <Card raised>
            <CardHeader title="Se connecter" justify="center" sx={{color: '#9FBAE6'}} />
            <TextField
                required
                id="login"
                name="login"
                label="Nom d'utilisateur"
                value={signinFormData.login}
                onChange={handleInputChange}
                error={signinFormError.bgTitle}
                helperText={addFormErrorMsg.bgTitle}
                margin='dense'
                sx={{width: '70%'}}
                fullWidth
                />
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <CardHeader title="Nombre de joueurs" 
                avatar={<PeopleAlt />}
                justify="center"
              />
              <TextField
              required
              id="bgMinPlayers"
              name="bgMinPlayers"
              label="Joueurs Minimum"
              value={addFormData.bgMinPlayers}
              onChange={handleInputChange}
              error={addFormError.bgMinPlayers}
              helperText={addFormErrorMsg.bgMinPlayers}
              margin='dense'
              sx={{width: '80%'}}
              />
              <TextField
              required
              id="bgMaxPlayers"
              name="bgMaxPlayers"
              label="Joueurs Maximum"
              value={addFormData.bgMaxPlayers}
              onChange={handleInputChange}
              error={addFormError.bgMaxPlayers}
              helperText={addFormErrorMsg.bgMaxPlayers}
              margin='dense'
              sx={{width: '80%'}}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <CardHeader title="Durée - Âge" 
                avatar={<Assignment />}
                justify="center"
              />
              <TextField
              required
              id="bgDuration"
              name="bgDuration"
              label="Durée (minutes)"
              value={addFormData.bgDuration}
              onChange={handleInputChange}
              error={addFormError.bgDuration}
              helperText={addFormErrorMsg.bgDuration}
              margin='dense'
              sx={{width: '80%'}}
              />
              <TextField
              required
              id="bgMinAge"
              name="bgMinAge"
              label="Âge minimum"
              value={addFormData.bgMinAge}
              onChange={handleInputChange}
              error={addFormError.bgMinAge}
              helperText={addFormErrorMsg.bgMinAge}
              margin='dense'
              sx={{width: '80%'}}
              />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <CardHeader title="Difficulté - Image" 
                avatar={<BubbleChart />}
                justify="center"
              />
              <TextField
                required
                id="bgDifficulty"
                name="bgDifficulty"
                select
                label="Difficulté"
                value={addFormData.bgDifficulty?addFormData.bgDifficulty: ''}
                onChange={handleInputChange}
                error={addFormError.bgDifficulty}
                helperText={addFormErrorMsg.bgDifficulty}
                margin='dense'
                placeholder='Difficulté'
                sx={{width: '80%'}}
                >
                <MenuItem value=''>{'-- Choisir une difficulté --'}</MenuItem>
                  {difficulties.map((difficulty) => <MenuItem key={difficulty.id} value={difficulty.id}>{difficulty.label}</MenuItem>)}
              </TextField>
              <TextField
                required
                id="bgPictureUrl"
                name="bgPictureUrl"
                label="Lien vers une image"
                value={addFormData.bgPictureUrl}
                onChange={handleInputChange}
                error={addFormError.bgPictureUrl}
                helperText={addFormErrorMsg.bgPictureUrl}
                placeholder="https://"
                margin='dense'
                sx={{width: '80%'}}
              />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5em'
            }}>
              <CardHeader title="Catégorie(s)" 
                avatar={<Category />}
                justify="center"
              />
              <TextField
              required
              id="bgCategory1"
              name="bgCategory1"
              select
              label="Catégorie principale"
              value={addFormData.bgCategories[0]?addFormData.bgCategories[0]: ''}
              onChange={handleInputChange}
              error={addFormError.bgCategory1}
              helperText={addFormErrorMsg.bgCategory1}
              margin='dense'
              placeholder='Catégorie 1'
              sx={{width: '80%'}}
              >
                <MenuItem value=''>{'-- Choisir une catégorie --'}</MenuItem>
                {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
              </TextField>
              { addFormData.bgCategories.length >= 1 &&
                <TextField
                  id="bgCategory2"
                  name="bgCategory2"
                  select
                  label="Catégorie 2"
                  value={addFormData.bgCategories[1]?addFormData.bgCategories[1]: ''}
                  onChange={handleInputChange}
                  error={addFormError.bgCategory2}
                  helperText={addFormErrorMsg.bgCategory2}
                  margin='dense'
                  placeholder='Catégorie 2'
                  sx={{width: '80%'}}
                  >
                    <MenuItem value=''>{'-- Choisir une catégorie --'}</MenuItem>
                      {categories.filter(category => category.id !== addFormData.bgCategories[0])
                        .map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                </TextField>
              }
              { addFormData.bgCategories.length >= 2 &&
                <TextField
                  id="bgCategory3"
                  name="bgCategory3"
                  select
                  label="Catégorie 3"
                  value={addFormData.bgCategories[2]?addFormData.bgCategories[2]: ''}
                  onChange={handleInputChange}
                  error={addFormError.bgCategory3}
                  helperText={addFormErrorMsg.bgCategory3}
                  margin='dense'
                  placeholder='Catégorie 3'
                  sx={{width: '80%'}}
                >
                  <MenuItem value=''>{'-- Choisir une catégorie --'}</MenuItem>
                    {categories.filter(category => category.id !== addFormData.bgCategories[0]&& category.id !== addFormData.bgCategories[1])
                      .map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                </TextField>
              }
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5em'
            }}>
              <CardHeader title="Thème(s)" 
                avatar={<Brush />}
                justify="center"
              />
              <TextField
                required
                id="bgTheme1"
                name="bgTheme1"
                select
                label="Thème principal"
                value={addFormData.bgThemes[0]?addFormData.bgThemes[0]: ''}
                onChange={handleInputChange}
                error={addFormError.bgTheme1}
                helperText={addFormErrorMsg.bgTheme1}
                margin='dense'
                sx={{width: '80%'}}
              >
                <MenuItem value=''>{'-- Choisir un thème --'}</MenuItem>
                {themes.map((theme) => <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>)}
              </TextField>
              { addFormData.bgThemes.length >= 1 &&
                <TextField
                  id="bgTheme2"
                  name="bgTheme2"
                  select
                  label="Thème 2"
                  value={addFormData.bgThemes[1]?addFormData.bgThemes[1]: ''}
                  onChange={handleInputChange}
                  error={addFormError.bgTheme2}
                  helperText={addFormErrorMsg.bgTheme2}
                  margin='dense'
                  placeholder='Thème 2'
                  sx={{width: '80%'}}
                >
                  <MenuItem value=''>{'-- Choisir un thème --'}</MenuItem>
                  {themes.filter(theme => theme.id !== addFormData.bgThemes[0])
                    .map((theme) => <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>)}
                </TextField>
              }
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4} sx={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5em'
            }}>
              <Button variant="contained" endIcon={<Send />} type='submit' sx={{
                width: '60%', 
                backgroundColor: '#99BAE7',
                '&:hover': {
                  backgroundColor: '#E5B0CD'
                }}}>
                Send
              </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
      
    </div>
  )
}
export default AddForm;