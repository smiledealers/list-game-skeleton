import React, { useMemo } from 'react';
import CardLoading from '../card_loading';

import demo_question from '../../data/demo.json';

/*
 *
 * List Game Interface
 *
 * Option {
 *   id: String,
 *   title: String
 * }
 *
 * OptionSet {
 *   id: String,
 *   options: Array<Option>
 * }
 *
 * OptionSetEntry {
 *   optionSetId: String,
 *   optionId: String
 * }
 *
 * ListGameProps {
 *   entered: Boolean,
 *   entryValues?: Array<OptionSetEntry>,
 *   optionSets: Array<OptionSet>,
 *   submit: Function(Array<OptionSetEntry>),
 *   submitting: Boolean,
 *   submitError: Boolean,
 *   wrapperElement: Ref
 * }
 *
 */

export const Interface = ({
  component,
  createEntry,
  entry,
  mutationError,
  mutationLoading,
  question = demo_question,
  quizId,
  wrapperElement,
}) => {
  console.log('demo_question', demo_question);

  const optionSets = useMemo(
    () => question.data.map(({ optionSet }) => optionSet),
    [question.data]
  );

  const listGameInterface = useMemo(
    () => ({
      entered: !!entry,
      entryValues: entry ? entry.data : undefined,
      optionSets,
      submit: (selectedOptions) =>
        createEntry({
          variables: {
            input: {
              quizId,
              questionId: question.id,
              data: selectedOptions,
            },
          },
        }),
      submitError: !!mutationError,
      submitting: mutationLoading,
      wrapperElement,
    }),
    [
      createEntry,
      entry,
      optionSets,
      mutationError,
      mutationLoading,
      question,
      quizId,
      wrapperElement,
    ]
  );

  const Component = component;

  return <Component {...listGameInterface} />;
};
