type NavigatorScreenParams<T> =
  import('@react-navigation/native').NavigatorScreenParams<T>;

type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
};

type BottomTabParamList = {
  Home: undefined;
  Search: NavigatorScreenParams<BottomTabParamList>;
};

type SearchParamList = {
  Search: undefined;
  CampgroundDetails: {campgroundId: Campground['id']};
};
