// ContactItem.jsx
import React from 'react';
import Text from "../atoms/Text";
//Esto es para los contactos
function ContactItem({ label, value }) {
  return (
    <li>
        <Text>{label}: {value}</Text>  
    </li>
  );
}

export default ContactItem;
