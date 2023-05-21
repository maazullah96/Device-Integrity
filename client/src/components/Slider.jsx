import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useRanger } from "react-ranger";

const GlobalStyles = createGlobalStyle`
  body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
   font-weight: 300;
  }
`;

export const Track = styled("div")`
  display: inline-block;
  height: 8px;
  width: 90%;
  margin: 0 5%;
`;

export const Tick = styled("div")`
  :before {
    content: "";
    position: absolute;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    height: 5px;
    width: 2px;
    transform: translate(-50%, 0.7rem);
  }
`;

export const TickLabel = styled("div")`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

export const Segment = styled("div")`
  background: ${props =>
    props.index === 0
      ? "#ff6050"
      : props.index === 1
      ? "#0b5ed7"
      : props.index === 2
      ? "#0b5ed7"
      : "#ff6050"};
  height: 100%;
`;

export const Handle = styled("div")`
  background: #ff1a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${props => (props.active ? "bold" : "normal")};
  transform: ${props =>
    props.active ? "translateY(-100%) scale(1.3)" : "translateY(0) scale(0.9)"};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  margin-right: 5px;
`;

export function Slider() {
  // const [values, setValues] = React.useState([15, 50, 80]);
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(100);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min: minValue,
    max: maxValue,
    stepSize: 1,
    values,
    onChange: setValues
  });

  const handleMinInputChange = event => {
    setMinValue(Number(event.target.value));
  };

  const handleMaxInputChange = event => {
    setMaxValue(Number(event.target.value));
  };

  return (
    <div className="App">
      <GlobalStyles />
      <SliderContainer>
        <InputContainer>
          <InputLabel>Min Value:</InputLabel>
          <input
            type="number"
            value={minValue}
            onChange={handleMinInputChange}
          />
        </InputContainer>
        <Track {...getTrackProps()}>
          {ticks.map(({ value, getTickProps }) => (
            <Tick {...getTickProps()}>
              <TickLabel>{value}</TickLabel>
            </Tick>
          ))}
          {segments.map(({ getSegmentProps }, i) => (
            <Segment {...getSegmentProps()} index={i} />
          ))}
          {handles.map(({ value, active, getHandleProps }) => (
            <button
              {...getHandleProps({
                style: {
                  appearance: "none",
                  border: "none",
                  background: "transparent",
                  outline: "none"
                }
              })}
            >
              <Handle active={active}>{value}</Handle>
            </button>
          ))}
        </Track>
        <InputContainer>
          <InputLabel>Max Value:</InputLabel>
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxInputChange}
          />
        </InputContainer>
      </SliderContainer>
      <br />
      <br />
      <pre
        style={{
          display: "inline-block",
          textAlign: "left"
        }}
      >
        <code>
          {JSON.stringify({
            values
          })}
        </code>
      </pre>
    </div>
  );
}