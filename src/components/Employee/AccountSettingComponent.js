import React from "react";
import {
  AccountSettingCard,
  AccountSettingH2,
  AccountP,
} from "./EmployeeElements";

const AccountSettingComponent = (props) => {
  
  return (
    <AccountSettingCard>
      <AccountSettingH2>{props.settingTitle}</AccountSettingH2>
      <AccountP>{props.description}</AccountP>
      <AccountSettingH2>
      </AccountSettingH2>
    </AccountSettingCard>
  );
};

export default AccountSettingComponent;
