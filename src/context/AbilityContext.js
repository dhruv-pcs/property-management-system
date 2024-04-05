import React, { createContext, useContext } from 'react';
import { Ability } from '@casl/ability';
import { defineAbilitiesFor } from './abilities';

const AbilityContext = createContext(new Ability());

export const AbilityProvider = ({ children, user }) => {

  const ability = new Ability(defineAbilitiesFor(user));

  return (  
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);