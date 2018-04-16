import React, { Component } from 'react';
import Note from './note';
import FaPlus from 'react-icons/lib/fa/plus';

class Board extends Component {
   constructor(props) {
      super(props)
      this.state = {
         // This is an array of notes
         notes: []
      }

      // Bind the each note function
      this.add = this.add.bind(this)
      this.eachNote = this.eachNote.bind(this)
      this.update = this.update.bind(this)
      this.remove = this.remove.bind(this)
      this.nextId = this.nextId.bind(this)
   }

   // Add method
   add(text) {
      this.setState(prevState => ({
         notes: [
            ...prevState.notes,
            {
               id: this.nextId(),
               note: text
            }
         ]
      }))
   }

   // Generate id function
   nextId() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
   }

   // New update method
   update(newText, i) {
      // newText is going to come from the update form
      console.log('updating item at index', i, newText)
      this.setState(prevState => ({
         notes: prevState.notes.map(
            // If we are not updating the note, return as is. Otherwise update the note with the new text
            note => (note.id !== i) ? note : {...note, note: newText}
         )
      }))
   }

   // Remove note
   remove(id) {
      console.log('removing item at', id)
      this.setState(prevState => ({
         notes: prevState.notes.filter(note => note.id !== id)
      }))
   }

   // eachNote function will Loop through each note and render the dynamic data
   eachNote(note, i) {
      return (
         <Note key={i}
               index={i}
               // get the newText from note
               onChange={this.update}
               onRemove={this.remove}>
               {/*This displays the notes, note data attribute*/}
               {note.note}
            </Note>
      )
   }

   render() {
      return (
         <div className="board">
            {/* Map over all of the notes that are in state */}
            {this.state.notes.map(this.eachNote)} {/* This calls the eachNote function */}
            <button onClick={this.add.bind(null, 'New Note')} id="add">
               <FaPlus />
            </button>
         </div>
      )
   }
}

export default Board;
