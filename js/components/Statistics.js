import React, {Component, PropTypes} from 'react';
import R from 'ramda';

class Statistics extends Component {

  static propTypes = {
    species: PropTypes.array.isRequired,
    clusters: PropTypes.array,
  }

  state = {
    limit: 1000,
    filter: ""
  }

  componentDidMount() {
    // TODO: tablesort undefined here
    // $('.sortable.table').tablesort();
  }

  handleFilterChange = (e) => {
    this.setState({filter: e.target.value});
  }

  renderShowMore(numLimited) {
    if (numLimited <= 0)
      return (
        <div></div>
      );
    return (
      <div>
        {numLimited} more...
      </div>
    );
  }

  renderSpeciesCounts() {
    let { limit, filter } = this.state;
    let { species } = this.props;
    let regFilter = new RegExp(filter, 'i');
    // let selection = R.pipe(
    //   species,
    //   R.filter(({name}) => regFilter.test(name)),
    //   // R.take(limit)
    // );
    let selection = species.filter(({name}) => regFilter.test(name));
    let numFilteredSpecies = selection.length;
    let numLimited = numFilteredSpecies - limit;
    if (numLimited > 0)
      selection = R.take(limit, selection);
    return (
      <div>
        <table className="ui sortable celled table">
          <thead>
            <tr>
              <th>
                <div className="ui form">
                  <input type="text" placeholder="Filter..." value={filter} onChange={this.handleFilterChange} />
                </div>
              </th>
              <th>{`${numFilteredSpecies} / ${species.length}`}</th>
            </tr>
            <tr>
              <th class="">Name</th>
              <th class="sorted descending">Count</th>
            </tr>
          </thead>
          <tbody>
            {selection.map(({name, count}) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2">
                {this.renderShowMore(numLimited)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

  renderClusters() {
    return (
      <div>Clusters here...</div>
    )
  }

  render() {
    let {species, clusters} = this.props;
    if (species.length === 0)
      return (<div></div>)

    // if (clusters)
    //   return this.renderClusters();

    return this.renderSpeciesCounts();
  }
}

export default Statistics;
