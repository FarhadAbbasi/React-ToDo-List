import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { GlobalContext } from '../Context/GlobalState';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { HiOutlineX } from 'react-icons/hi';
import { Button } from '@mui/material';

export default function MUIList() {
    //  const [checked, setChecked] = React.useState([1]);

    //   const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //       newChecked.push(value);
    //     } else {
    //       newChecked.splice(currentIndex, 1);
    //     }

    //     setChecked(newChecked);
    //   };

    const { todos, deleteTODO } = React.useContext(GlobalContext);
    console.log(todos);


    return (
        <List dense sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
            <Button variant= 'contained' width= {500} style={{ width: "500px"}} > ToDo List </Button> 
            {/* {[0, 1, 2, 3].map((value) => { */}
            {todos.map((todo) => {

                const labelId = `checkbox-list-secondary-label-${todo.id}`;
                const value = todo.id;
                return (
                    <ListItem
                        key={todo.id}
                    // secondaryAction={
                    //   <Checkbox
                    //     edge="end"
                    //     onChange={handleToggle(value)}
                    //     checked={checked.includes(value)}
                    //     // inputProps={{ 'aria-labelledby': labelId }}
                    //   />
                    // }
                    // disablePadding
                    >
                        <ListItemButton style={{borderBottom:"1px solid #ddd"}}>

                            <FaAngleDoubleRight />          <span style={{ padding: "10px" }} />
                           <div className=''> {todo.name} </div>                    <span style={{ padding: "10px" }} />
                            {todo.description}              <span style={{ padding: "10px" }} />
                            {todo.date}                      <span style={{ padding: "10px" }} />
                            <button style={{border:"none", backgroundColor: "#f33", color:"white", borderRadius:"5px", padding:"8px", cursor: "pointer"}}
                            onClick={() => deleteTODO(todo.id)} 
                            >  <span> Delete </span> </button>


                            {/* <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar> */}
                            {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}


                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
