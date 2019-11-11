import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Explore from './Explore';
import PostDetailExplore from './PostDetailExplore';

const ExploreStack = createAppContainer(createStackNavigator(
    {
        Explore: {
            screen: Explore
        },
        PostDetailExplore: {
            screen: PostDetailExplore
        }
    },
    {
        initialRouteName: 'Explore',
        headerMode: 'none'
    }
));

export default ExploreStack;