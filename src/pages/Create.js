import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Container, FormControlLabel } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  },
  page:{
    background:'#f9f9f9',
    width:'100%',
    height:'100vh'
  }
})

export default function Create() {

  const classes = useStyles()
  const [title,setTitle] = React.useState('')
  const [details,setDetails] = React.useState('')
  const [titleError,setTitleError] = React.useState(false)
  const [detailsError,setDetailsError] = React.useState(false)
  const [category,setCategory] = React.useState('todos')
  const history = useHistory()

  function handleSubmit(e){
    e.preventDefault()

    if(title === ''){
      setTitleError(true)
    }else{
      setTitleError(false)
    }

    if(details === ''){
      setDetailsError(true)
    }else{
      setDetailsError(false)
    }

    if(title && details){
      fetch('http://localhost:8000/notes',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,details,category})
      }).then(()=>history.push('/'))
    }
  }

  return (
    <Container className={classes.page}>
      <Typography 
        variant='h6'
        component="h2"
        color="textSecondary"
        gutterBottom
        className={classes.title}
      >
        Create a New Note
      </Typography>

      <form autoComplete='off' noValidate onSubmit={(e)=>handleSubmit(e)}>
        <TextField className={classes.field} label="Note Title" variant="outlined" color="secondary" error={titleError} fullWidth required onChange={(e)=>setTitle(e.target.value)}/>
        <TextField className={classes.field} label="Details" variant="outlined" color="secondary" error={detailsError} multiline rows={4} fullWidth required onChange={(e)=>setDetails(e.target.value)}/>
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio/>} label="Money"/>
            <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
            <FormControlLabel value="reminders" control={<Radio/>} label="Reminders"/>
            <FormControlLabel value="works" control={<Radio/>} label="Works"/>
          </RadioGroup>
        </FormControl>
        <Button
          className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
        >
          Submit
        <KeyboardArrowRightIcon/>
        </Button>
      </form>

    </Container>
  )
}
