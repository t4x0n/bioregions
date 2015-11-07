import React, {Component, PropTypes} from 'react';
import TangleInput from './TangleInput';

class Binning extends Component {

  static propTypes = {
    binnerType: PropTypes.string.isRequired,
    binnerTypes: PropTypes.array.isRequired,
    minNodeSize: PropTypes.number,
    maxNodeSize: PropTypes.number,
    densityThreshold: PropTypes.number,
    changeBinnerType: PropTypes.func.isRequired,
    changeMinBinSize: PropTypes.func.isRequired,
    changeMaxBinSize: PropTypes.func.isRequired,
    changeDensityThreshold: PropTypes.func.isRequired,
  }

  renderTypes() {
    // <select className="ui dropdown min-content">
    //   <option value="">option1</option>
    //   <option value="">option2</option>
    // </select>
    return (
      <span>{this.props.binnerType}</span>
    )
  }

  render() {
    return (
      <div className="ui form">
        <div className="inline field">
          <label>Type</label>
          {this.renderTypes()}
        </div>
        <div className="inline field">
          <label>Max bin size</label>
          <TangleInput className="ui label"
            value={this.props.maxNodeSize}
            min={this.props.minNodeSize}
            max={100}
            step={1}
            onChange={(value) => this.props.changeMaxBinSize(value)} />
        </div>
        <div className="inline field">
          <label>Min bin size</label>
          <TangleInput className="ui label"
            value={this.props.minNodeSize}
            min={0.1}
            max={this.props.maxNodeSize}
            step={0.1}
            onChange={(value) => this.props.changeMinBinSize(value)} />
        </div>
        <div className="inline field">
          <label>Density threshold</label>
          <TangleInput className="ui label"
            value={this.props.densityThreshold}
            min={5}
            max={1000000}
            onChange={(value) => this.props.changeDensityThreshold(value)} />
        </div>
      </div>
    );
  }
}

export default Binning;
