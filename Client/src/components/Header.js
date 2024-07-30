import React from "react";
import GroupsIcon from '@mui/icons-material/Groups';

function Header() {
  return (
    <header>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <GroupsIcon fontSize="large"/>
        <h1>
          ShareSpace
        </h1>
      </div>
    </header>
  );
}

export default Header;