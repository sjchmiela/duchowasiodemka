import React, { RefObject } from "react";
import { View, Platform } from "react-native";
import { Transition, Transitioning, TransitioningView } from "react-native-reanimated";

import PlacePin from "../components/PlacePin";
import Marker, { MarkerProps } from './Marker';
import details from "../details";
import { white, spBlue } from "../constants/Colors";
import { withNavigation, NavigationInjectedProps } from "react-navigation";

export interface PlaceMarkerProps extends MarkerProps {
  markerRef: React.RefObject<Marker>;
  initialSelected: boolean;
}

const transition = (
  <Transition.Change durationMs={150} interpolation="easeInOut" />
);

function PlaceMarker(props: PlaceMarkerProps) {
  const { markerRef, initialSelected, ...rest } = props;
  const identifier = rest.identifier;
  const [isSelected, setIsSelected] = React.useState(initialSelected);
  const transitioningViewRef = React.createRef<TransitioningView>();
  const animate = React.useCallback(() => {
    if (transitioningViewRef.current && Platform.OS !== "web") {
      transitioningViewRef.current.animateNextTransition();
    }
  }, [transitioningViewRef]);
  const onSelect = React.useCallback(
    (...args) => {
      animate();
      setIsSelected(true);
      props.onSelect && props.onSelect(...args);
    },
    [props.onSelect, setIsSelected, animate]
  );
  const onDeselect = React.useCallback(
    (...args) => {
      animate();
      setIsSelected(false);
      props.onDeselect && props.onDeselect(...args);
    },
    [props.onDeselect, setIsSelected, animate]
  );
  const size = isSelected ? 64 : 44;
  return (
    <Marker
      centerOffset={{ x: 0, y: -(64 / 2) }}
      identifier={identifier}
      flat
      stopPropagation
      tracksViewChanges={false}
      coordinate={details[identifier].location}
      initialSelected={isSelected}
      {...rest}
      ref={markerRef}
      onSelect={onSelect}
      onDeselect={onDeselect}
    >
      <Transitioning.View
        transition={transition}
        ref={transitioningViewRef}
        style={{ width: 64, height: 64, justifyContent: "flex-end", alignItems: "center" }}
      >
        <PlacePin size={size} {...details[identifier].pin} />
      </Transitioning.View>
    </Marker>
  );
}

export default React.forwardRef((props, ref) => (
  <PlaceMarker {...props} markerRef={ref} />
));

PlacePin.defaultProps = {
  backgroundColor: white,
  pinColor: spBlue,
  graphicColor: spBlue
};
