import React from 'react'
import { Fade } from '@material-ui/core';
import { Clear as DeleteIcon } from '@material-ui/icons';


function DeleteButton(props:any ) {
    const {visable,ondDelete} = props;
    return (
             <Fade in={visable}>
              <DeleteIcon
                style={{ float: 'right' }}
                onClick={() => {
                  ondDelete();
                }}></DeleteIcon>
            </Fade>
        
    )
}

export default DeleteButton
