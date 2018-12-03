import { filter, includes } from 'lodash';
import * as React from 'react';
import { OverlayTrigger, Placement } from '../core/OverlayTrigger';
import { ICheckboxListingProps } from '../listing/CheckboxListing';
import { GroupedCheckboxListing, IGroupedCheckboxListing } from '../listing/GroupedCheckboxListing';
import { SelectWithTags } from './SelectWithTags';
import {ISelectedValues, ISelectOption} from "../with-multi-select/interfaces";

interface IGroupedCheckboxSelectProps {
  selectedValues?: ISelectedValues;
  placeholder?: string;
  options: ISelectOption[];
  getGroupTitle: IGroupedCheckboxListing['getGroupTitle'];
  onChange: ICheckboxListingProps['onChange'];
}

const pickSelectedOptionsByValue = (options: ISelectOption[], value: ISelectedValues = []) => {
  return filter(options, (option: ISelectOption) => {
    return includes(value, option.value);
  });
};

export class GroupedCheckboxSelect extends React.Component<IGroupedCheckboxSelectProps, any> {
  render() {
    const { placeholder, options, getGroupTitle, onChange } = this.props;
    const { selectedValues } = this.props;
    return (
      <OverlayTrigger
        content={() => (
            <GroupedCheckboxListing
                selectedValues={selectedValues}
                options={options}
                onChange={onChange}
                getGroupTitle={getGroupTitle}
            />
        )}
        placement={Placement.leftBottom}
        closeOnOutSide
      >
        {({ toggle }) => {
          return (
            <SelectWithTags
              selectedValues={selectedValues}
              options={pickSelectedOptionsByValue(options, selectedValues)}
              placeholder={placeholder}
              onClick={toggle}
              onChange={onChange}
            />
          );
        }}
      </OverlayTrigger>
    );
  }
}
