import { clone, times } from 'lodash';
import React, { useMemo, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import HeaderImage from './header_image';

const Demo = ({
  entered,
  entryValues,
  optionSets,
  submit,
  submitError,
  submitting,
}) => {
  const [values, setValue] = useState(
    entered
      ? entryValues
      : optionSets.map((optionSet) => ({ optionSetId: optionSet.id }))
  );

  const [gameSpecificOptions, setGameSpecificOptions] = useState([
    { value: 'Header' },
    { value: 'Leadership' },
    { value: 'Defence' },
    { value: 'Speed' },
    { value: 'Left Foot' },
    { value: 'Right Foot' },
  ]);

  const [activePopup, setActivePopup] = useState(null);

  const valid = useMemo(
    () =>
      Array.isArray(optionSets) &&
      Array.isArray(values) &&
      values.length === optionSets.length
        ? times(
            optionSets.length,
            (i) => 'optionId' in values[i] && values[i].optionId.length > 10
          ).reduce((acc, val) => acc && val, true)
        : false,
    [optionSets, values]
  );

  const handleSelect = (event) => {
    const { value } =
      event.target.parentElement.type === 'submit'
        ? event.target.parentElement.attributes.elementindex
        : event.target.attributes.elementindex;

    setActivePopup(parseInt(value));
  };

  const handleUpdatePlayer = (event) => {
    const attr = event.target.closest('li').attributes;

    const currentOptionSetId = attr.optionsetid.value;
    const currentOptionSetIndex = parseInt(attr.optionsetindex.value);
    const selectedOptionId = event.target.attributes.value.value;

    setValue((values) => {
      const newValues = clone(values);

      newValues[currentOptionSetIndex] = {
        optionSetId: currentOptionSetId,
        optionId: selectedOptionId,
      };

      return newValues;
    });

    setActivePopup(null);
  };

  const selectElement = (optionSet, name, i) => {
    const correspondingOptionSet = values[i];
    const optionSetId = correspondingOptionSet.optionSetId;
    const active = typeof correspondingOptionSet.optionId !== 'undefined';

    return (
      <button
        key={name}
        className={`${name.split(' ').join('-')}
          ${active ? 'active' : ''}
          b selectElement btn btn-light`}
        onClick={handleSelect}
        value={optionSetId}
        elementindex={i}
      >
        {active ? (
          <span>
            {
              optionSets[i].options.find(
                (option) => option.id === correspondingOptionSet.optionId
              ).title
            }
            <div>{name}</div>
          </span>
        ) : (
          name
        )}
      </button>
    );
  };

  return (
    <div className={'list-game__container'}>
      <HeaderImage />

      {optionSets.map((optionSet, i) => {
        return selectElement(optionSet, gameSpecificOptions[i].value, i);
      })}

      {optionSets && Array.isArray(optionSets) ? (
        optionSets.map(({ id, options }, i) => (
          <div
            key={i}
            className={`listSelectContainer ${
              activePopup === i ? 'active' : ''
            }`}
          >
            <span>Select player for {gameSpecificOptions[i].value}</span>
            <ul className="listSelect">
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={handleUpdatePlayer}
                  optionsetid={id}
                  optionsetindex={i}
                  value={option.id}
                  className={`listSelectItem ${
                    values[i].optionId === option.id ? 'active' : ''
                  }`}
                >
                  <span className="iconOutline">
                    <span className="iconCentre"></span>
                  </span>
                  {option.title}
                </li>
              ))}
            </ul>
            <div className="dropShadow"></div>
          </div>
        ))
      ) : (
        <div></div>
      )}
      <Button
        onClick={() => (valid ? submit(values) : null)}
        disabled={!valid || entered}
        className="list__enter-button"
      >
        Enter
      </Button>
    </div>
  );
};

export default Demo;
