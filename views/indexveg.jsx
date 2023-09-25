
const React = require("react")



class Indexveg extends React.Component {
  render() {
    const { vegtables } = this.props
    return (
      <div>
{"Vegtables Index Page"}
          <nav>
            <a href="/vegtables/new">Create a New Vegtable</a>
          </nav>
          <ul>
            {
              vegtables.map((vegtable, i) => {
                return (
                  <li key={i}>
                    The{' '}
                    <a href={`/vegtables/${vegtable._id}`}>
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
                    {/* your delete form goes here*/}
                    <form action={`/vegtables/${vegtable._id}?_method=DELETE`} method='POST'>
                      <input type='submit' value='DELETE' />
                    </form>
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