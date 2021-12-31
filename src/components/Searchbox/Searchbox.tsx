import React, { useEffect, useReducer } from 'react';
import { forwardRefTyped } from '../../utils/component';
import {
  activeOptionUpdated,
  changeHandlerUpdated,
  initialSearchboxState,
  reducer,
  selectActiveOption,
  selectOnChange,
  selectValue,
  valueUpdated,
} from './Searchbox.data';
import {
  DEFAULT_OPTIONS_TAG,
  DEFAULT_OPTION_TAG,
  DEFAULT_SEARCHBOX_TAG,
  InputProps,
  OptionProps,
  OptionsProps,
  SearchboxProps,
} from './Searchbox.types';
import { SearchboxProvider, useSearchboxRef } from './Searchbox.utils';

export function Searchbox<
  TTag extends React.ElementType = typeof DEFAULT_SEARCHBOX_TAG,
  TValue = any
>({
  as = DEFAULT_SEARCHBOX_TAG,
  children,
  value,
  onChange,
  ...props
}: SearchboxProps<TTag, TValue>): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialSearchboxState);

  /**
   * Initialise onChange handler.
   */
  useEffect(() => {
    if (!onChange) {
      return;
    }

    dispatch(changeHandlerUpdated(onChange));
  }, [onChange]);

  /**
   * Initialise onChange handler.
   */
  useEffect(() => {
    if (!value) {
      return;
    }

    dispatch(valueUpdated(value));
  }, [value]);

  return React.createElement(
    as,
    { ...props },
    <SearchboxProvider value={[state, dispatch]}>{children}</SearchboxProvider>
  );
}

const Input = React.forwardRef(
  (
    props: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => <input {...props} ref={ref} />
);

const Options = forwardRefTyped(
  <TTag extends React.ElementType = typeof DEFAULT_OPTIONS_TAG>(
    { as = DEFAULT_OPTIONS_TAG as TTag, ...props }: OptionsProps<TTag>,
    ref: React.ForwardedRef<unknown>
  ): JSX.Element => React.createElement(as, { ...props, ref, role: 'listbox' })
);

const Option = forwardRefTyped(
  <TTag extends React.ElementType = typeof DEFAULT_OPTION_TAG, TValue = any>(
    {
      as = DEFAULT_OPTION_TAG as TTag,
      className,
      children,
      value,
      ...props
    }: OptionProps<TTag, TValue>,
    ref: React.ForwardedRef<unknown>
  ): JSX.Element => {
    const searchboxContext = useSearchboxRef();

    if (!searchboxContext) {
      throw new Error(
        '<Searchbox.Option /> component is unable to to find the parent <Searchbox /> component'
      );
    }

    const [state, dispatch] = searchboxContext;

    /**
     * Handler for selecting the option.
     */
    const onClick = (): void => {
      const onChange = selectOnChange(state);

      onChange(value);
    };

    /**
     * Set the current option to the active option on enter.
     */
    const onEnter = (): void => {
      dispatch(activeOptionUpdated(value));
    };

    /**
     * Remove the current active option on leave.
     */
    const onLeave = (): void => {
      dispatch(activeOptionUpdated(undefined));
    };

    /**
     * Returns true if the option is selected, otherwise false.
     */
    const isOptionSelected = (): boolean => selectValue(state) === value;

    /**
     * Returns true if the option is active, otherwise false.
     */
    const isOptionActive = (): boolean => selectActiveOption(state) === value;

    /**
     * Renders the children or pass props into the render function.
     */
    const renderChildren = (): React.ReactNode => {
      if (typeof children !== 'function') {
        return children;
      }

      return children({
        active: isOptionActive(),
        selected: isOptionSelected(),
      });
    };

    /**
     * Returns the classes or pass props into the class name render function.
     */
    const calculateClassName = (): string | undefined => {
      if (typeof className !== 'function') {
        return className;
      }

      return className({
        active: isOptionActive(),
        selected: isOptionSelected(),
      });
    };

    return React.createElement(
      as,
      {
        ...props,
        ref,
        onClick,
        onMouseEnter: onEnter,
        onMouseLeave: onLeave,
        onPointerEnter: onEnter,
        onPointerLeave: onLeave,
        className: calculateClassName(),
        role: 'option',
        'aria-selected': isOptionSelected(),
        tabIndex: 0,
      },
      renderChildren()
    );
  }
);

Searchbox.Input = Input;
Searchbox.Options = Options;
Searchbox.Option = Option;
