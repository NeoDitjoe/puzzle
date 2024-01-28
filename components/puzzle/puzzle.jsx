import { Fragment, useEffect, useState } from 'react'
import style from './puzzle.module.css'
import Image from 'next/image'
import { imgBlocks } from './imgBlocks'

// export default function Puzzle() {

//   const [t, sett] = useState([null])
//   const pieces = 10
//   const collectPieces = []
//   const a = [6, 3, 8, 5, 2, 7, 1, 10, 4, 9]

//   for (let i = 0; i < pieces; i++) {
//     collectPieces.push(i)
//   }

//   function drop() {
//     sett([null])
//     setTimeout(() => {
//       sett((prev) => {
//         const y = [...prev]
//         y[2] = 2
//         return y
//       })
//     }, 200);
//   }

//   return (
//     <div
//       onDrop={drop}
//     >
//       {collectPieces}
//       <div>
//         {
//           collectPieces.map((index) => {
//             return (
//               <div
//                 draggable
//                 id={a[index]}
//                 className={style.piece}
//                 style={{
//                   backgroundColor: `rgb(0, 38, ${index}0)`
//                 }}
//               >
//                 {index}{a[index]}
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//   )
// }

export default function Puzzle() {

  const [turn, setTurn] = useState(0)

  const img = imgBlocks()
  const images = [img.a, img.b, img.c, img.d, img.e, img.f, img.g, img.h, img.i]
  const blocks = [1, 2, 3]
  const imgNum = []
  let num = 0

  let currentBlock;
  let dropOnBlock;
  
  const dragStart = function(e){
    currentBlock = e.target
  }
  const dragDrop = function(e){
    dropOnBlock = e.target
  }

  const dragEnd = function(e){
    if(!dropOnBlock.src.includes('7.d5b36443.JPG')){
      return
    }

    const currentCoordinates = currentBlock.id.split('-') 
    const currentColumn = Number(currentCoordinates[0])
    const currentRow = Number(currentCoordinates[1])

    const dropOnCoordinates = dropOnBlock.id.split('-') 
    const dropOnColumn = Number(dropOnCoordinates[0])
    const dropOnRow = Number(dropOnCoordinates[1])

    const moveLeft = currentColumn === dropOnColumn && currentRow === dropOnRow -1
    const moveRight = currentColumn === dropOnColumn && currentRow === dropOnRow +1
    const moveUp = currentRow === dropOnRow && currentColumn === dropOnColumn -1
    const moveDown = currentRow === dropOnRow && currentColumn === dropOnColumn +1

    const moveBlock = moveLeft || moveRight || moveUp || moveDown

    if(moveBlock){
      const thisBlock = currentBlock.src
      const dropOn = dropOnBlock.src
  
      currentBlock.src = dropOn
      dropOnBlock.src = thisBlock
      currentBlock.srcset = ''
      dropOnBlock.srcset = ''
      setTurn(turn + 1)
    }
  }

  return(
    <main className={style.main}>
      <div className={style.board}>
        {
          blocks.map((i) => (
            blocks.map((c) => {
              imgNum.push(num += 1)
              return <Image 
                src={images[imgNum.shift() - 1]}
                width='100px'
                height='100px'
                id = {i + '-' + c}
                className={style.img}

                draggable
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                // onDragLeave={}
                onDrop={dragDrop}
                onDragEnd={dragEnd}

              />
            })
          ))
        }
      </div>
      <h1>Turns:{turn}</h1>
    </main>
  )
}

// PuzzleGame.js
// import { useEffect, useRef, useState } from 'react';

// const PuzzleGame = () => {
//   const canvasRef = useRef(null);
//   const [image, setImage] = useState(null);
//   const pieces = 4; // Change this to the number of pieces you want

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     // Load image and draw it on the canvas
//     const img = new Image();
//     img.src = '/your-image.jpg'; // Replace with your image path
//     img.onload = () => {
//       context.drawImage(img, 0, 0, canvas.width, canvas.height);
//       setImage(img);
//     };
//   }, []);

//   const handlePieceClick = (row, col) => {
//     // Implement puzzle piece click logic
//     console.log(`Clicked on piece ${row}-${col}`);
//   };

//   return (
//     <div>
//       {image && (
//         <canvas ref={canvasRef} width={image.width} height={image.height}>
//           Your browser does not support the canvas element.
//         </canvas>
//       )}

//       <div>
//         {/* Render puzzle pieces */}
//         {Array.from({ length: pieces }, (_, row) => (
//           <div key={row}>
//             {Array.from({ length: pieces }, (_, col) => (
//               <div
//                 key={col}
//                 onClick={() => handlePieceClick(row, col)}
//                 style={{
//                   border: '1px solid black',
//                   width: `${image.width / pieces}px`,
//                   height: `${image.height / pieces}px`,
//                   backgroundImage: `url(${image.src})`,
//                   backgroundPosition: `-${(image.width / pieces) * col}px -${(image.height / pieces) * row}px`,
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PuzzleGame;
    