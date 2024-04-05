import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings'; 
import colors from '../../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import secretkeys from '../../config/secretkeys';

function FeedbackScreen({navigation, route}) {
    const {aptid} = route.params;
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(''); 
  const [loading, setLoading] =useState(false);
  const handleRating = (value) => {
    setRating(value);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmitFeedback = () => {
    setLoading(true);
    
        fetch(`${secretkeys.localhost}/sendfeedback`,{
            method:'POST',
            headers:{
              'Content-Type': "application/json",
            },
            body: JSON.stringify({rating, feedback:comment, aptid})
        }).then(res => res.json()).then( (data) => {
            try{
                alert(data.message)
                navigation.navigate('Summary',{screen:"Summarytab"});
                setLoading(false);
            }catch(err){
                setLoading(false);
                alert("something went wrong");
                
                console.log(err)
            }
            
        })
    
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submit Feedback</Text>
      <AirbnbRating
        count={5}
        reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
        defaultRating={0}
        size={30}
        onFinishRating={handleRating}
      />
      <TextInput
        style={styles.commentInput}
        placeholder="Leave a comment..."
        multiline={true}
        numberOfLines={4}
        onChangeText={handleCommentChange}
        value={comment}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:colors.black
  },
  commentInput: {
    width: '80%',
    height: 100,
    marginTop:20,
    borderWidth: 1,
    backgroundColor:colors.white,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor:colors.blue2,
    padding: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;