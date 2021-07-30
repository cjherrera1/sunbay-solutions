import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  AdminContainer,
  AdminH1,
  AdminWrapper
} from "./AdminElements";

import {
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
} from "./AdminAddInventoryElements";
import { AdminCard, AdminH2, AdminP, FormButtonDelete } from "./AdminAddInventoryElements";

const Inventory = () => {
  const [message, setMessage] = useState(null);
  const [messageI, setMessageI] = useState(null);
  var Name;
  var Description;
  var Img;

  //Variables
  var Token = Storage.retrieveToken();

  //required files
  var bp = require("../Path.js");

  //Inventory list
  const [Inv, setInv] = useState([]);

  //Config for get account
  var configI = {
    method: "get",
    url: bp.buildPath("api/inventory"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  //UserInfo
  useEffect(async () => {
    setInv([]);
    //Get user info everytime we lode the page
    axios(configI).then(function (response) {

      var ud = response.data;
      for (var i = 0; i < ud.length; i++) {
        setInv(item => [...item, ud[i].name + "#" + ud[i].description + "#" + ud[i].img + "#" + ud[i].item_id]);
      }
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  const AdminCardComponent = (props) => {

    //Delete Inventory Item
    const delInv = async =>{
      var configD = {
        method: "delete",
        url: bp.buildPath("api/inventory/" + props.id),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        }
      };

      axios(configD).then(function (response) {

        var ud = response.data;
        if(ud.err_code){
          setMessageI(' ' + ud.description);
          
          //Makes it look like its working
          if(ud.err_code === 200){
            var Aray = [...Inv];
            var index = Aray.indexOf(props.items + '#' + props.des + '#' + props.img + '#' + props.id);
            if(index > -1){
              Aray.splice(index, 1);
            }
            setInv(Aray);
          }
        }
      }).catch(function (error) {
        setMessageI(' ' + error);
      });

    }

    return (
      <AdminCard style={{backgroundImage:`url(${props.img})`}}>
        {/* <AdminIcon src={Icon1} /> */}
        <AdminH2>{props.items}</AdminH2>
        <AdminP>{props.des}</AdminP>
        <FormButtonDelete type="submit" class="button" onClick={delInv}>
          delete
        </FormButtonDelete>
      </AdminCard>
    );
  };

  const doAddInv = async event => {
    if (Name.value.localeCompare('') === 0 || Description.value.localeCompare('') === 0 || Img.value.localeCompare('') === 0) {
      setMessage('All fields need to be filled');
    }
    else {

      //JSON OBJECT
      var obj = {name: Name.value, description: Description.value, img: Img.value};
      var js = JSON.stringify(obj);

      var config = {
        method: "post",
        url: bp.buildPath("api/inventory"),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        },
        data: js,
      };

      axios(config).then(function (response) {
        var res = response.data;
        if(res.err_Code){
          setMessage('Error' + res.description);
        }else{
          setMessage('New Item Added');
          //window.location.href = "/Inventory";
        }
      }).catch(function (error) {
        setMessage(' ' + error);
      });
    }
  }

  return (
    <AdminContainer>
      <Form action="#">
        <FormH1>Add Inventory</FormH1>
        <FormLabel htmlFor="for">Name</FormLabel>
        <FormInput type="name" ref={(c) => Name = c} />
        <FormLabel htmlFor="for">Description</FormLabel>
        <FormInput type="name" ref={(c) => Description = c} />
        <FormLabel htmlFor="for">Image</FormLabel>
        <FormInput type="name" ref={(c) => Img = c} />
        <FormLabel>{message}</FormLabel>
        <FormButton type="submit" onClick={doAddInv} >Add</FormButton>
      </Form>
      <AdminH1>Inventory</AdminH1>
      <FormLabel>{messageI}</FormLabel>
      <AdminWrapper>
        {
          Inv.map(itm =>
            <AdminCardComponent items={itm.split("#")[0]} des={itm.split("#")[1]} img={itm.split("#")[2]} id={itm.split("#")[3]}/>
          )
        }
      </AdminWrapper>
    </AdminContainer>
  );
};

export default Inventory;
