import React from 'react'
import PropTypes from 'prop-types'
import { useStoreActions, useStoreState } from '../../store'

function SaveBoardButton(props) {

    const saveBoard = useStoreActions((actions)=>actions.user.saveBoard);
    const boardState = useStoreState(store=>{ return store.board });

    let data =  {
        board:boardState.board,
        columns: boardState.columns
    }
    return (
        <div>
            <button onClick={()=>{saveBoard(data)}}>save board</button>
        </div>
    )
}

SaveBoardButton.propTypes = {

}

export default SaveBoardButton

