import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectExpPost } from '../actions';

class Explore extends Component {

    state = {
        search: '',
    }

    updateSearch = search => {
        this.setState({ search });
    };

    selectPostPress = (selectedPost) => {
        this.props.selectExpPost(selectedPost)
        this.props.navigation.navigate('PostDetailExplore')
    }

    renderListPost = () => {
        return this.props.postList.map((item) => {
            if(this.props.user.uid != item.userId && item.caption.toLowerCase().includes(this.state.search.toLowerCase())) {
                return (
                    <TouchableWithoutFeedback onPress={() => this.selectPostPress(item)}>  
                        <View 
                            style={{ width: '33%', marginVertical: 1 }}
                        >
                            <Image source={{uri: item.imageURL }} style={{height: 125, width: '100%' }}/>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
        })
    }

    render() {
        if(this.props.user) {
            return (
                <View style={{ flex: 1 }}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        containerStyle={{ backgroundColor: '#fff' }}
                        inputContainerStyle={{ backgroundColor: '#fff' }}
                        inputStyle={{ color: 'black'}}
                        lightTheme={true}
                        searchIcon={{ size: 27 }}
                    />
                    <ScrollView>
                        <View 
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                flex: 1
                            }}
                        >
                            {this.renderListPost()}
                        </View>
                    </ScrollView>
                </View>
            )
        }

        return <View />
    }
}

const mapStateToProps = ({ auth, post }) => {
    return { user: auth.user, postList: post.postList }
}

export default connect(mapStateToProps, {selectExpPost})(Explore);