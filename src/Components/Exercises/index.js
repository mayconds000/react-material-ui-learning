import React, { Fragment } from 'react'
import { Grid, Paper, Typography, List, IconButton } from 'material-ui'
import { 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction 
} from 'material-ui/List'
import { Delete, Edit } from '@material-ui/icons'
import Form from './Form'

const styles = {
  Paper: { 
    padding: 20, 
    marginTop: 10, 
    marginBottom: 10, 
    height: 500, 
    overflowY: 'auto' }
};

export default ({ 
  exercises, 
  category, 
  onSelect,
  onDelete,
  onSelectEdit,
  onEdit,
  editMode,
  muscles, 
  exercise,
  exercise: {
    id,
    title = 'Welcome back!',
    description = 'Please select in exercise from the list on the left!' 
  } 
}) =>
  <Grid container spacing={16}>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {exercises.map(([group, exercises]) => 
          !category || category === group
            ? <Fragment key={group}>
                <Typography variant="headline"
                  style={{ textTransform: 'capitalize' }}>
                  {group}
                </Typography>
                <List component="nav">
                  {exercises.map(({ id, title }) =>
                    <ListItem 
                      button 
                      onClick={() => onSelect(id)}
                      key={id}
                    >
                      <ListItemText primary={title} />
                      <ListItemSecondaryAction>
                      <IconButton onClick={() => onSelectEdit(id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => onDelete(id)}>
                        <Delete />
                      </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </List>
              </Fragment>
            : null
        )}
      </Paper>
    </Grid>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {editMode
          ? <Form 
              exercise={exercise}
              muscles={muscles}
              onSubmit={onEdit}
            /> 
          : <Fragment>
              <Typography
                variant="display1"
              >
                {title}
              </Typography>
              <Typography
                variant="subheading"
                style={{ marginTop: 20, }}
              >
                {description}
              </Typography>
          </Fragment>
        }
      </Paper>
    </Grid>
  </Grid>