const React = require("react")

class Newveg extends React.Component {
  render() {
    return (
      <div>
        <h1>New Vegtable Page</h1>
        

        <form action="/vegtables" method="POST">
          Name: <input type="text"  name="name" /> <br />
          Color: <input type="text" name="color" /> <br />
          Is Ready To Eat: <input type="checkbox" name="readyToEat" /> <br />
          Image URL: <input type="text" name="img" />
          <input type="submit" value="Create Vegtable" />
        </form>
        <nav>
          <a href="/vegtables">Back</a>
        </nav>
      </div>
    )
  }
}

module.exports = Newveg