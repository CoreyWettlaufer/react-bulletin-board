import React, { Component } from 'react';
// Import icons from react-icons library
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';

class Note extends Component {
   // Creating the constructor to bind the functions
   constructor(props) {
      super(props)
      // Adding state to the constructor
      // Set the state of editing to false. It should only be set to true when the edit button is clicked. See edit function.
      this.state = {
         editing: false
      }

      // Bind this.edit (edit being the edit function) and this.remove (remove being the remove function) to the onClick of specific element
      this.edit = this.edit.bind(this);
      this.remove = this.remove.bind(this);
      this.renderForm = this.renderForm.bind(this);
      this.renderDisplay = this.renderDisplay.bind(this);
      this.save = this.save.bind(this);
   }

   // Edit FUNCTION
   // Sets the editing state to true when the edit button is clicked.
   edit() {
      this.setState({
         editing: true
      })
   }

   // Remove FUNCTION
   remove() {
      this.props.onRemove(this.props.index)
   }

   save(e) {
      e.preventDefault()
      this.props.onChange(this._newText.value, this.props.index)
      this.setState({
         editing: false
      })
   }

   // Setting up a renderForm function
   renderForm() {
      return (
         <div className="note">
            <form onSubmit={this.save}>
               <textarea ref={input => this._newText = input} name="" id="" cols="30" rows="10" />
               <button id="save"><FaFloppyO /></button>
            </form>
         </div>
      )
   }

   // This is the render display
   renderDisplay() {
      return (
         <div className="note">
            {/* This will display the child(ren) of notes which is note.note (note data) */}
            <p>{this.props.children}</p>
            <span>
               {/* onClick={this.edit} binds the edit function to this element. onClick={this.remove} does the same but with the remove function */}
               <button onClick={this.edit} id="edit"><FaPencil /></button>
               <button onClick={this.remove} id="remove"><FaTrash /></button>
            </span>
         </div>
      )
   }

   // Render method which handles conditional logic
   render() {
      // This is the same as the if statement below. This is knows as a ternary if ... else statement.
      return this.state.editing ? this.renderForm() : this.renderDisplay();

      // If this.state.editing is true we will render the edit form
      /*if(this.state.editing) {
         return this.renderForm();
      }
      else {
         return this.renderDisplay();
      }*/
   }
}

export default Note;
