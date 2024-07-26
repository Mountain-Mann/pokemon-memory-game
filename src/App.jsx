import { useState, useEffect } from 'react'
import Header from './Header'
import './App.css'
import './styles.css'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [score, setScore] = useState(0)
  const [tempPickedList, setTempPickedList] = useState([])
  
  const splitUrl = url => url.split('/').slice(-2).shift()


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results);
      })
      .catch(error => console.error(error));
  }, []);


  function displayPokemons() {
    const createSet = new Set(tempPickedList)

    if (createSet.size === tempPickedList.length) {
      return pokemons.map((pokemon) => (
        <div key={splitUrl(pokemon.url)} className="card" onClick={handleClick}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitUrl(pokemon.url)}.png`}
            alt={pokemon.name}
            width={75}
            height={75}
          />
          <p className="pokeName">{pokemon.name}</p>
        </div>
      ));
    } else {
      setTempPickedList([])
      setScore(0)
      return pokemons.map((pokemon) => (
        <div key={splitUrl(pokemon.url)} className="card">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitUrl(pokemon.url)}.png`}
            alt={pokemon.name}
            width={75}
            height={75}
          />
          <p className="pokeName">{pokemon.name}</p>
        </div>
      ));
    }
  }

  function checkForDuplicate(array) {
    console.log('second', tempPickedList)
    const checkSet = new Set(array);
    console.log('checkSet', checkSet)

    return checkSet.size === array.length;
  }

  function handleClick(pokemon) {

    setTempPickedList([...tempPickedList, pokemon.target.alt])

    checkForDuplicate(tempPickedList)

    console.log('card clicked', pokemon.target.alt)
    
    const randomList = [...pokemons]
    randomList.sort(() => Math.random() - 0.5)
    setPokemons(randomList)

    handleScore()
  }

  function handleScore() {

    if (checkForDuplicate(tempPickedList)) {
      setScore(score + 1)
    } else if (!checkForDuplicate(tempPickedList)) {
      setScore(0)
      setTempPickedList([])
      displayPokemons()
      return
    }
  }

  return (
    <>
    <Header score={score} />
      <div className="board">
        {displayPokemons()}
      </div>
    </>
  )
}

export default App
