import React, { Component, Fragment } from 'react'
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { TextField, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  FormControl: {
    width: 300
  }
})

export default withStyles(styles)(class extends Component {
  state = this.getInitState()

  getInitState() {
    const { exercise } = this.props

    return exercise || {
      title: '',
      description: '',
      muscles: ''
    }
  }

  componentWillReceiveProps({ exercise }) {
    this.setState({
      ...exercise
    })
  }

  handleChange = name => ({ target: { value } }) => 
    this.setState({
      [name]: value
    })

  handleSubmit = () => {

    this.props.onSubmit({
      id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
      ...this.state
    })

    this.setState(this.getInitState())
  }
  render() {
    const { title, description, muscles } = this.state,
          { classes, exercise, muscles: categories } = this.props
    return <Fragment>
      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={this.handleChange('title')}
        margin="normal"
        className={classes.FormControl}
      />
      <br />
      <FormControl className={classes.FormControl}>
        <InputLabel htmlFor="muscles">Muscles</InputLabel>
        <Select
          value={muscles}
          onChange={this.handleChange('muscles')}
        >
          {categories.map(category =>
            <MenuItem key={category} value={category}>{category}</MenuItem>
          )}
        </Select>
      </FormControl>
      <br />
      <TextField
        id="description"
        label="description"
        value={description}
        onChange={this.handleChange('description')}
        margin="normal"
        multiline
        rows="4"
        className={classes.FormControl}
      />
      <br />
      <Button
        color="primary"
        variant="raised"
        onClick={this.handleSubmit}
      >
        {exercise ? 'Edit' : 'Create'}
      </Button>
    </Fragment>
  }
})