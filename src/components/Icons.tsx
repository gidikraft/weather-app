import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import address_book from '../assets/svg/address_book.svg';
import home from '../assets/svg/home_tab.svg';
import homeInactive from '../assets/svg/home_tab_inactive.svg';
import profilePic from '../assets/svg/profile_pic.svg';
import profilePhoto from '../assets/svg/profile-photo.svg';
import transfer from '../assets/svg/transfer_tab_active.svg';
import transferInactive from '../assets/svg/transfer_tab_inactive.svg';
import user from '../assets/svg/user.svg';
import userInactive from '../assets/svg/user_inactive.svg';

type IconFunction = React.FC<SvgProps>;

export const ICONS = {
  address_book,
  home,
  'home-inactive': homeInactive,
  profile_pic: profilePic,
  'profile-photo': profilePhoto,
  transfer,
  'transfer-inactive': transferInactive,
  user,
  'user-inactive': userInactive,
};

export type IconName = keyof typeof ICONS;
export type IconProps = SvgProps & {
  name: IconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  stroke?: string;
  outerStroke?: string;
};

/**
 * Custom Icon component based on design systems used in the figma
 */
function Icon({ name, size = 24, style, ...props }: IconProps) {
  const IconImpl: IconFunction = ICONS[name as IconName];
  return IconImpl ? (
    <IconImpl height={size} style={style} width={size} {...props} />
  ) : null;
}

export default Icon;
