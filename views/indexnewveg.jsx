const React = require("react")


class Indexvegnew extends React.Component {
    render() {
    const {vegnew} = this.props
      return(
        <div>
"New Vegtables Page"

<form action="http://localhost:3000/vegtables" method="get">
  <label for="new_vegtable">Enter name: </label>
  <input
    id="new_vegtable"
    type="text"
    name="name_field"
    value="Vegtable Name." />
  <input type="submit" value="OK" />
</form>



        </div>
        



      ) }}

      

module.exports = Indexvegnew                   