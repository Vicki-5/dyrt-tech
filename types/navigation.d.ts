type NavigatorScreenParams<T> =
  import('@react-navigation/native').NavigatorScreenParams<T>;

type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList>;
};

type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
};

type SearchParamList = {
  SearchScreen: undefined;
  CampgroundDetails: {campgroundId: Campground['id']};
};

type HomeParamList = {
  Home: undefined;
  CampgroundDetails: {campgroundId: Campground['id']};
}
