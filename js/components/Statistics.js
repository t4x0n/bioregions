import React, {Component, PropTypes} from 'react';

class Statistics extends Component {

  static propTypes = {
    species: PropTypes.array.isRequired,
  }

  render() {
    let {species} = this.props;
    if (species.length === 0)
      return (<div></div>)

    let maxCount = species[0].count;
    return (
      <div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>
                <div className="ui form">
                  <input type="text" placeholder="Filter..." />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {species.map(({name, count}) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Statistics;
