import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardColumns } from 'react-bootstrap'

function CardBody(game){
    return(
        <Card border="primary">
            <Card.Header>{game.item.title}</Card.Header>
            <Card.Body>
                <Card.Title>Name : {game.item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Platform : {game.item.platform}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Score : {game.item.score}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Genre : {game.item.genre}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Editors Choice : {game.item.editors_choice}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Release Year : {game.item.release_year}</Card.Subtitle>
            </Card.Body>
        </Card>
    ) 
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            items:[],
            isLoaded: false,
            filtered: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.fetchGames()
    }

    fetchGames = () => {
        fetch('http://starlord.hackerearth.com/gamesext')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded:true,
                    items: json
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    handleChange(e) {
        // Variable to hold the original version of the list
    let currentList = [];
        // Variable to hold the filtered list before putting into state
    let newList = [];

        // If the search bar isn't empty
    if (e.target.value !== "") {
            // Assign the original list to currentList
      currentList = this.state.items;
        
            // Use .filter() to determine which items should be displayed
            // based on the search terms
      newList = currentList.filter(item => {
                // change current item to lowercase
        const lc = item.title.toString().toLowerCase();
                // change search term to lowercase
        const filter = e.target.value.toString().toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.state.items;
    }
        // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }

    render(){
        var { isLoaded, items, filtered } = this.state;

        if(!isLoaded){
            return <div>Loading....</div>
        }
        else{
            if(filtered.length !== 0){
                return(
                    <div className="container-fluid">
                    <h1>| Sapient Games Arena — Listing the games developed for different platforms !</h1> <br />
                    <input type="text" className="input" onChange={this.handleChange} placeholder="Search By Game Name..." /> <br />  <br />
                        <CardColumns>
                            {
                                filtered.map((item, index) => (
                                    <CardBody key={index} item={item} />
                                ))
                            }
                        </CardColumns>
                    </div>
                )
            }else{
            return (
                <div className="container-fluid">
                <h1>| Sapient Games Arena — Listing the games developed for different platforms !</h1> <br />
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search By Game Name..." /> <br />  <br />
                    <CardColumns>
                        {
                            items.map((item, index) => (
                                <CardBody key={index} item={item} />
                            ))
                        }
                    </CardColumns>
                </div>
            )
            }
        }
    }
}

export default App
