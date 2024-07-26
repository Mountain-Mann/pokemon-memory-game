function Header({ score }) {
  // const [score, setScore] = useState(0)

  return (
    <>
      <div className="header">
        <h1 className="title">Memory Game</h1>
        <div className="scoreboard">
          <p className="score">Score: {score}</p>
          <p className="best">Best: 0</p>
        </div>
      </div>
      <p className="instructions">Click on an image to earn points, but don&#39;t click on one image more than once or your score will reset!</p>
    </>
  )
}

export default Header