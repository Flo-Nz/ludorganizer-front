// == Import
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

// == Composant
const AddForm = ( { addFormError, addFormErrorMsg, addFormData, handleAddForm, handleInputChange, categories, themes, difficulties} ) => {
  
  return (
    <div className="add">
      <h1 className="add-title">Ajouter un jeu</h1>

      <form className="add-form" onSubmit={(evt) => {
        evt.preventDefault();
        handleAddForm(addFormData);
      }}>
        <div className="add-form--main">
          {addFormError && (
            <div className="add-form--main--error">
              <p>{addFormErrorMsg}</p>
            </div>
          )}
          <h2 className="add-form--main--title">Informations générales</h2>
          <label htmlFor="bgTitle">Titre du jeu
            <input type="text" id="bgTitle" name="bgTitle" placeholder="Catan" onChange={handleInputChange} value={addFormData.bgTitle}></input>
          </label>
          <label htmlFor="bgMinPlayers">Minimum de Joueurs
            <input type="number" id="bgMinPlayers" name="bgMinPlayers" placeholder={1} onChange={handleInputChange} value={addFormData.bgMinPlayers}></input>
          </label>
          <label htmlFor="bgMaxPlayers">Maximum de Joueurs
            <input type="number" id="bgMaxPlayers" name="bgMaxPlayers" placeholder={4} onChange={handleInputChange} value={addFormData.bgMaxPlayers}></input>
          </label>
          <label htmlFor="bgDuration">Durée (minutes)
            <input type="number" id="bgDuration" name="bgDuration" placeholder={15} onChange={handleInputChange} value={addFormData.bgDuration}></input>
          </label>
          <label htmlFor="bgPictureUrl">Lien vers une image
            <input type="text" id="bgPictureUrl" name="bgPictureUrl" placeholder="https://bakaminder.com/images/Default_img.png" onChange={handleInputChange} value={addFormData.bgPictureUrl}></input>
          </label>
        </div>
        <div className="add-form--infos">
          <h2 className="add-form--infos--title">Informations détaillées</h2>
          <label htmlFor="bgCategories">Catégories
            <select name="bgCategories" id="bgCategories" multiple onChange={handleInputChange}>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label htmlFor="bgThemes">Thèmes
            <select name="bgThemes" id="bgThemes" multiple onChange={handleInputChange}>
              {themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
            </select>
          </label>
          <label htmlFor="bgDifficulty">Difficulté
            <select name="bgDifficulty" id="bgDifficulty" onChange={handleInputChange}>
              {difficulties.map((difficulty) => <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>)}
            </select>
          </label>
        </div>
        <button type="submit">Ajouter le jeu</button>

      </form>
    </div>
  )
}

export default AddForm;