const React = require('react')


class Showveg extends React.Component {
  render () {
    const { name, color ,readyToEat} = this.props.vegtable

    return (
      <div>
        <h1> Veggi Show Page </h1>
        The {name} is {color}.
        And {
          readyToEat ? 
            "It is ready to eat!"
          :
            "It is not ready to eat... Cant touch this"
        }
        </div>
    );
  }
}




module.exports = Showveg;