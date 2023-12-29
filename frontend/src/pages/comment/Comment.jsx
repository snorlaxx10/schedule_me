import React from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import {useLocation} from "react-router-dom"
import { useEffect } from 'react';
import CommentPost from "../../components/commentPost/CommentPost"

const DefaultComponent = () => {
    const {state} = useLocation();
    const {post} = state;
    const {user} = useContext(AuthContext);
    const [commentData, setCommentData] = useState(post.comments);


    //unfinished
    const getPostComment = async () => {
        let result = await axios.get("/posts/" + post._id + "/comment");
        //setCommentData(result.data[0])
    }

    const updatePostComment = async (data) => {
        await axios.put("/posts/" + post._id + "/comment", data);
    }


    useEffect( () => {
        getPostComment();
    }, [])


    //unfinsihed
    const onSubmit = async (data) => {
        console.log(commentData)
        
        setCommentData( (prev) => { 
            return [...prev, data]
        })
        updatePostComment(commentData);
        
    }

    //unfinished
    const onReply = async (data) => {
        console.log(data)
        
        setCommentData( (prev) => { 
            
        })
        updatePostComment(commentData);
        
    }

    //disabled
    /*
    const onReply = async (data) => {
        console.log(data)
        const json = JSON.stringify(data, null, 2);
        const obj = JSON.parse(json)
        const newReply = {
            userId: user._id, 
            text: obj.text,
        }
        alert("Reply successfully created!" + data.text);
        await axios.put("/comments/" + (data.parentOfRepliedCommentId ? data.parentOfRepliedCommentId : data.repliedToCommentId) + "/reply", newReply);
    }
    const onSubmit = async (data) => {
        console.log(data)
        const json = JSON.stringify(data, null, 2);
        const obj = JSON.parse(json)
        const newComment = {
            userId: user._id, 
            text: obj.text,
            postId: post._id,
            comId: data.comId
        }
        try {
            alert("Comment successfully created!");
            await axios.post("/comments", newComment);
        } catch(err) {}
    }
    */

    return (
        <>  
            <div className = "upperContainer">
                <div className = "commentPostContainer">
                    <CommentPost post = {post}></CommentPost> 
                </div>                
            </div>

            <div className = "commentSection">
            <CommentSection
                currentUser={{
                currentUserId: user._id,
                currentUserImg: 'assets/default_pfp.jpeg',
                currentUserFullName: user.name
                }}
                currentData = { (data) => {updatePostComment(data)} }
                commentData={commentData}
                // logIn={{
                // loginLink: 'http://localhost:3001/',
                // signupLink: 'http://localhost:3001/'
                // }}
                //onSubmitAction = {onSubmit}
                //onReplyAction = {onReply}
            />
            </div>
        </>
    )
}

export default DefaultComponent