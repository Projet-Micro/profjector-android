import {NavigationContainer} from '@react-navigation/native';
import { AppStack } from '../stacks/AppStack';
import { AuthStack } from '../stacks/AuthStack';
import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../store/types';
import { loadProfessor } from '../index';
export const Router = () =>
{
    const professor = useSelector((state: GlobalState) => state.professors.professor.professorInfo);
    useEffect(() =>
    {  
        console.log(professor)
        loadProfessor();
    },[])
  return (
    <NavigationContainer>
      {professor ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};