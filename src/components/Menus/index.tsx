import React from 'react';
import useFullscreen from '../../hooks/use_fullscreen';

import {
  MenuContainerProps,
  MenusProps,
} from '../../types/components/menus_types';
import { getDomainName } from '../../utils/string_utils';
import Buttons from './Buttons';
import SubmitMenu from './SubmitMenu';
import VoteMenu from './VoteMenu';

const MenuContainer = ({ variant, children }: MenuContainerProps) => {
  const { isFullscreen } = useFullscreen();
  const domainName = getDomainName(window.location.hostname);

  return (
    <div
      className={`absolute text-base z-10 left-5 bottom-16 md:left-auto md:right-5 md:bottom-32 pointer-events-none menus--${variant} menus--${domainName} ${
        isFullscreen
          ? `menus--${variant}--fullscreen menus--${domainName}--fullscreen`
          : ''
      }`}
    >
      {children}
    </div>
  );
};

const Menus = ({ variant, submitMenuProps, voteMenuProps }: MenusProps) => (
  <>
    <MenuContainer variant={variant}>
      <SubmitMenu
        variant={submitMenuProps.variant}
        hidden={submitMenuProps.hidden}
        onSubmit={submitMenuProps.onSubmit}
        onClose={submitMenuProps.onClose}
      />
    </MenuContainer>
    <MenuContainer variant={variant}>
      <VoteMenu
        variant={voteMenuProps.variant}
        hidden={voteMenuProps.hidden}
        skipTimes={voteMenuProps.skipTimes}
        onClose={voteMenuProps.onClose}
      />
    </MenuContainer>
  </>
);
Menus.Buttons = Buttons;

export default Menus;
