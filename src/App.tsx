import { MouseEvent, useState, FunctionComponent, ChangeEvent, FormEvent, Key } from 'react'
export {};

function Square(props: { key: Key, colIndex: number, rowIndex: number; }) {
  const [assignedLetter, setAssignedLetter] = useState<string | null>(null)
  const [guessedLetter, setGuessedLetter] = useState<string | null>(null)
  
  function handleOnInput({ e }: { e: FormEvent; }) {
    let nextSquare;
    const target = e.target as HTMLInputElement
    setAssignedLetter(target.value)
    nextSquare = document.querySelector<HTMLInputElement>(`.square[colIndex="${props.colIndex + 1}"][rowIndex="${props.rowIndex}"]`)

    if ((target.value.length <=1) && (nextSquare !== null)) {
      nextSquare.focus()
    }
  }
  
  return (
    <input 
      ref={guessedLetter}
      className='square'
      maxLength={1}
      onInput={(e) => handleOnInput({ e })}
    >
    </input>
  )
}

function App() {
  const [boardSize, setBoardSize] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)

  function handleOnClick(e: MouseEvent) {
    e.preventDefault()
    setBoardSize(5)
  }

  function handleSubmitClick(e: MouseEvent) {
    setIsComplete(true)
  }

  let board = new Array(boardSize).fill(' ').map(row => new Array(boardSize).fill(' '));
  return (
    <div
      className='game'
    >
      <button
        className='submit'
        onClick={(e) => handleSubmitClick(e)}
      >
        Submit
      </button>

      <button
        className='5-button'
        onClick={(e) => handleOnClick(e)}
      >
        5
      </button>
      <div className='board'>
        {board.map((rows, rowIndex): JSX.Element => {
          return (
            <div className='rows'>
              {rows.map((squares, colIndex): JSX.Element => 
                {
                  return <Square key={[rowIndex, colIndex] as unknown as Key}
                                colIndex={colIndex}
                                rowIndex={rowIndex} />
                  }
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
