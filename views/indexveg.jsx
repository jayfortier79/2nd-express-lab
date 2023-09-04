const React = require("react")


class Indexveg extends React.Component {
  render() {
    const { vegtables } = this.props
    return(
      <div>
        <h1> Vegtables Index Page </h1>
        <ul>
          {
            vegtables.map((vegtable, i) => {
              return (
                <li>
                  The{' '}
                    <a href={`/vegtables/${i}`}>
                      {vegtable.name}
                    </a>
                    {' '}
                    is {vegtable.color} <br></br>
                    {
                      vegtable.readyToEat ? 
                        `It is ready to eat`
                      : 
                        `It is not ready to eat`
                    }
                                      <br />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}



module.exports = Indexveg