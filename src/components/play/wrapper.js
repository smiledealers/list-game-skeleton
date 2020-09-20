import React, { cloneElement, useMemo, useRef } from 'react';
import { Card } from 'react-bootstrap';

import { noop } from 'util';

import CardWrapper from '../card_wrapper';
import HeaderImage from '../header_image';

const NullNav = () => null;

export const Wrapper = ({
  children,
  mutationQuery = '',
  mutationUpdater = noop,
  navigation = NullNav,
}) => {
  const Navigation = navigation;

  const entry = false;
  const mutationLoading = false;
  const wrapperElement = useRef();

  const additionalProps = {
    wrapperElement,
  };

  const element = useMemo(() => cloneElement(children, additionalProps), [
    children,
    additionalProps,
  ]);

  return (
    <div className="h-100 flex flex-column w100 center overflow-y-hidden interactive__wrapper">
      <HeaderImage />

      <CardWrapper>
        <Card.Body>
          <section
            ref={wrapperElement}
            className="card__interaction interaction--type-play"
          >
            {element}
          </section>
        </Card.Body>

        <nav className="flex justify-center pt3 pb3 hidden-sm">
          <Navigation nextDisabled={!entry} nextLoading={mutationLoading} />
        </nav>
      </CardWrapper>

      <nav className="flex justify-between pa3 ph0-ns pb0-ns hidden show-sm">
        <Navigation nextDisabled={!entry} nextLoading={mutationLoading} />
      </nav>
    </div>
  );
};
