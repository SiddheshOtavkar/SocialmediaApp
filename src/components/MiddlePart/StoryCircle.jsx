import { Avatar, Card } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          // src='https://tse1.mm.bing.net/th?id=OIP.IB0XUg8PV5FGxOf0WWDdOQHaHa&pid=Api&P=0&h=180'
          src='https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg'
        >
          <AddIcon sx={{ fontSize: "3rem" }} />
        </Avatar>
        <p>codewith...</p>
      </div>
    </div>
  )
}

export default StoryCircle