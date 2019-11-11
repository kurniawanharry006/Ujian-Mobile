import React, {Component} from 'react';
import {View, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Header, Input  } from 'react-native-elements';
import { Card, CardItem, Thumbnail, Left, Body, Text} from 'native-base';
import {connect} from 'react-redux'
import {selectEditPostCancel, inputCaptionPostChange, savePost, selectProfilePost} from '../actions'

class EditPost extends Component {

    state = {
        inputCaption: this.props.captionPost 
    }

    componentDidUpdate = () => {
        if(this.props.profileImage === '') {
            this.props.navigation.navigate('PostDetail', {
                onGoBack: () => this.refresh(),
            });
        }
    }

    saveEditPost = () => {
        this.props.savePost({
            caption: this.state.inputCaption,
            imageURL: this.props.postImage,
            userId: this.props.selectedPostDetailProfile.userId
        }, this.props.selectedPostDetailProfile.id)
        this.props.selectProfilePost({...this.props.selectedPostDetailProfile, caption: this.state.inputCaption})
    }

    onGoBackClick = () => {
        this.props.selectEditPostCancel()
    }

    render() {
        return (
            <View>
                <ScrollView>
                 <Header
                    placement='left'
                    centerComponent={{ 
                        text: 'Edit Info', 
                        style: { color: 'black', fontSize: 18, fontWeight: '700' } 
                    }}
                    leftComponent={{ 
                        icon: 'clear', 
                        color: 'black',
                        onPress: this.onGoBackClick
                    }}
                    rightComponent={
                        this.props.editLoading ?
                        <ActivityIndicator size='small' color='#4388d6'/>
                        :
                        {
                            icon: 'done',
                            color: '#4388d6',
                            onPress: this.saveEditPost
                        }
                    }
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        elevation: 2
                    }}
                />
                <Card style={{marginVertical: 10, marginHorizontal: 10}}>
                    <CardItem>
                    <Left style={{flex: 3}}>
                        <Thumbnail source={{uri: this.props.selectedPostDetailProfile.userPhoto}} />
                        <Body>
                        <Text>{this.props.selectedPostDetailProfile.username}</Text>
                        <Text note>Instagrin User</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem cardBody>
                    <Image source={{uri: this.props.postImage}} style={{height: 350, width: null, flex: 1}}/>
                   
                    </CardItem>
                </Card>
                <View>
                    <Input
                        placeholder="Caption"
                        value={this.state.inputCaption}
                        onChangeText={(text) => this.setState({ inputCaption: text })}
                    />
                </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = ({post, editPost}) => {
    return {
        ...post,
        ...editPost
    }
}

export default connect(mapStateToProps, {selectEditPostCancel, inputCaptionPostChange, savePost, selectProfilePost})(EditPost);