import React,{useState, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

let c=0;
        let classes_names=[];let classes_ids=[];

           export default class ClassesPicker extends Component{
                constructor (){
                    super();
                    this.classes_handler();
                    this.state={
                    };
                }

                

          
     classes_handler(){
        
        fetch('http://192.168.1.5/school/app/api/ClassesController.php',{
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
            view: 'count'
            })
            }).then((response)=> response.json()).then((responseJson)=>{
               c=parseInt(responseJson["classes count"][0]["count(*)"]);
               this.setState({
                classes_count: c
                })
            }).catch((error)=>{
              console.log(error);
            })
             
            
      
            fetch('http://192.168.1.5/school/app/api/ClassesController.php',{
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              view: 'all'
            })
            }).then((response)=> response.json()).then((responseJson)=>{
               let str='';let x='';let y='';
               for(let i=0;i<this.state.classes_count;i++){
               classes_names[i]={value: responseJson["classes"][i]["className"]};
               classes_ids[i]={value: parseInt(responseJson["classes"][i]["id"])}
               }
               this.setState({
               classes_names: classes_names,
               classes_ids: classes_ids
               })
            }).catch((error)=>{
              console.log(error);
            })
         };
         set_class(value){
           this.props.set_class(value);
         }
          
          
               render(){
                return(
                    <Dropdown label="Class" data={classes_names} onAccessibilityAction={this.classes_handler} onChangeText={(value)=>{
                        this.setState({
                          class: this.state.classes_names.map(e=>e.value).indexOf(value)+1
                        });
                        this.set_class(this.state.class);
                        console.log(this.props.test);
                    }}/>
                   );
               }
           }