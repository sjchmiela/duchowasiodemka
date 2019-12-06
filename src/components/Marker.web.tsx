import React, { RefObject } from "react";
import { MarkerProps } from "react-native-maps";
import { Marker } from "react-mapbox-gl";
import { MapMarkerPressContext } from "./MapView.web";

export default class MarkerWeb extends React.Component<
  MarkerProps,
  { selected: boolean }
> {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.initialSelected
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      if (this.state.selected) {
        console.log('calling onSelect');
        this.props.onSelect();
      } else {
        console.log('calling onDeselect');
        this.props.onDeselect();
      }
    }
  }

  public hideCallout = () => {
    console.log('called hideCallout');
    this.setState({ selected: false });
  };

  render() {
    const props = this.props;
    return (
      <MapMarkerPressContext.Consumer>
        {({ onPress }) => (
          <Marker
            anchor="bottom"
            onClick={() => {
              onPress(props.identifier)
              this.setState({ selected: true });
            }}
            coordinates={[
              props.coordinate.longitude,
              props.coordinate.latitude
            ]}
          >
            {props.children}
          </Marker>
        )}
      </MapMarkerPressContext.Consumer>
    );
  }
}
