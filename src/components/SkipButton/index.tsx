import React from 'react';

import { SkipButtonContainerProps } from './SkipButton.types';
import { isInInterval } from '../../utils';
import { Button } from './Button';

export const SkipButtonContainer = ({
  skipTimes,
  currentTime,
  videoDuration,
  variant,
  onClickHandlers,
}: SkipButtonContainerProps): JSX.Element => (
  <>
    {skipTimes.map(
      (
        {
          interval,
          episode_length: episodeLength,
          skip_id: skipId,
          skip_type: skipType,
        },
        index
      ) => {
        const { start_time: startTime, end_time: endTime } = interval;
        const offset = videoDuration - episodeLength;

        const inInterval = isInInterval(
          startTime,
          endTime,
          currentTime,
          offset
        );

        return (
          <Button
            key={`skip-button-${skipId}`}
            skipType={skipType}
            variant={variant}
            hidden={!inInterval}
            onClick={onClickHandlers[index]}
          />
        );
      }
    )}
  </>
);
