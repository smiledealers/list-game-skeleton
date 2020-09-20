import React, { cloneElement, useMemo, useRef } from 'react';
import { Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { useQuestions, useQuestionEntry, useQuiz } from 'hooks';

import { noop } from '../../util';

const NullNav = () => null;

export const Wrapper = ({
  children,
  mutationQuery,
  mutationUpdater = noop,
  navigation = NullNav,
}) => {
  const Navigation = navigation;

  const wrapperElement = useRef();
  const { id: quizId } = useQuiz();
  const [question] = useQuestions(1);
  const { entry } = useQuestionEntry(question.id);

  const [
    createEntry,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation(mutationQuery, {
    update: (cache, result) => mutationUpdater(quizId, cache, result),
  });

  const additionalProps = {
    createEntry,
    entry,
    mutationError,
    mutationLoading,
    question,
    quizId,
    wrapperElement,
  };

  const element = useMemo(() => cloneElement(children, additionalProps), [
    children,
    additionalProps,
  ]);

  return [
    element,
    <section className="card__error">
      {mutationError ? (
        mutationError.networkError ? (
          <Alert variant="danger" className="error--alert">
            Network error submitting entry. Please try again.
          </Alert>
        ) : (
          <Alert variant="danger" className="error--alert">
            An unknown error occured while submitting your entry.
          </Alert>
        )
      ) : null}
    </section>
  ]
};
