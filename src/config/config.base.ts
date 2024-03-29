export interface ConfigBaseProps {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
  exitRoutes: string[];
}

export type PersistNavigationConfig = ConfigBaseProps['persistNavigation'];

const BaseConfig: ConfigBaseProps = {
  persistNavigation: 'dev',

  catchErrors: 'always',

  /**
   * This is a list of all the route names that will exit the app if the back button
   * is pressed while in that screen. Only affects Android.
   */
  exitRoutes: ['Welcome'],
};

export default BaseConfig;
