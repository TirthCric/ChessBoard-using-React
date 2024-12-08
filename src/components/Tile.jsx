// Tile.jsx
import React, { useEffect, useState } from 'react';
import pieceData from '../utils/pieceData';
import useBoardContext from '../context/boardContext';


const Tile = ({ row, col, piece }) => {

    const isDark = (row + col) % 2 === 1; // Determine the tile color based on the row and col indexes
    const chessPiece = piece ? pieceData.find((obj) => obj.type === piece.type && obj.color === piece.color)?.url : null // comparing data which are rendered on board at intial state with pieceData and render Images of pieces

    const { boardState, move, setMove, tileColor, setTileColor, moveTracker, setMoveTracker } = useBoardContext()

    // changing tile color on click (users can understand which square they clicked)
    const changeColor = (e,row,col) => {
        const div = e.target.closest('div') // clicked div 
        const color =  (row + col) % 2 === 1 ? '#769656' : '#eeeed2' // calculating the cliked element color 

        if (move.length === 0) {
            setTileColor([div,color]) // store the first clicked div and their color
            div.style.backgroundColor = '#c2d75c'
            // console.log(tileColor);
            
        } else {
            if(tileColor.length) tileColor[0].style.backgroundColor = tileColor[1]
            // console.log(tileColor[0]);
            
            setTileColor([])
        }
    }
    
    

    // handle clicking functionality
    const handleClick = (row, col) => {
       
       
            setMove((prevMove) => [...prevMove, [row, col]])
    
            if(move.length === 1)
            setMoveTracker((prev) => [...prev, [row, col]])
            
       
    }

    return (
        <div
            onClick={(e) => {
                
                handleClick(row, col)
                changeColor(e,row,col)
                
            }}
            className={`${isDark ? 'bg-[#769656]' : 'bg-[#eeeed2]'} w-[89px] h-[89px] flex items-center justify-center text-2xl`}
        >

            {
                chessPiece ? <img src={chessPiece} alt="image" className='w-full h-full' /> : null
            }

        </div>
    );
};

export default Tile;
