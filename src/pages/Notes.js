import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Container } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import {makeStyles} from '@material-ui/core'
import Masonry from 'react-masonry-css'

const useStyles = makeStyles((theme)=>{
  return{
    grid:{
      marginTop:theme.spacing(3)
    }
  }
})

export default function Notes() {
  const [notes,setNotes] = React.useState([])
  const classes = useStyles()

  React.useEffect(()=>{
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  },[])

  const handleDelete = async(id)=>{
    await fetch(`http://localhost:8000/notes/${id}`,{
      method:'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const breakPoints = {
    default:3,
    1100:2,
    700:1
  }

  return (
    <Container>
      <div className={classes.grid}>
        <Masonry
          breakpointCols={breakPoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(note => (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete}/>
            </div>
          ))}
        </Masonry>  
      </div>
    </Container>
  )
}
