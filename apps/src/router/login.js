import React, { useEffect } from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Splash,Login,Dashboard, Pegawai,AddPegawai, Client,AddClient,
    Project,AddProject,Tab,Pic,Account,DashboardP,DetailProject, 
    ProgressP, TeamP, AccountP, DashboardPM, DataPegawai,Document, 
    Task, ProgressPM, Feedback, AccountPM, DetailProjectAdmin, 
    TeamPM, AddTeam, AddTask, 
    AddFeedback, AddPic, LinkDash, Material, Alat, ListProjectPM, Module, 
    ListProjectP, DetailProjectPM, TaskAdmin,Upload, ListDocAdmin
    } from '../pages';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const AdminDrawer = createDrawerNavigator();
const PegawaiDrawer = createDrawerNavigator();
const PMDrawer = createDrawerNavigator();
const ProjectDrawer = createDrawerNavigator();

 
const AdminDrawerScreen = ({navigation})=>(
    <AdminDrawer.Navigator>
        <AdminDrawer.Screen name="Dashboard" component={Dashboard}
            options={{
                drawerIcon: config => <Icon
                size={23}
                name="home"
                color="#757575"></Icon>
            }}/>
        <AdminDrawer.Screen name="Pegawai" component={Pegawai} 
            options={{
                drawerIcon: config => <Icon
                size={23}
                name="user"
                color="#757575"></Icon>
            }}/>
        <AdminDrawer.Screen name="Client" component={Client}
            options={{
                drawerIcon: config => <Icon
                size={23}
                name="users"
                color="#757575"></Icon>
            }}/>
        <AdminDrawer.Screen name="Project" component={Project}
            options={{
                drawerIcon: config => <Icon
                size={23}
                name="file"
                color="#757575"></Icon>
            }}/>
        <AdminDrawer.Screen name="Pic" component={Pic}
            options={{
                drawerIcon: config => <Icon
                size={23}
                name="clipboard"
                color="#757575"></Icon>
            }}/>
        <AdminDrawer.Screen name="Account" component={Account}
            options={{
                drawerIcon: config => <Icon
                size={23}
                name="cogs"
                color="#757575"></Icon>
            }}/>
        <AdminDrawer.Screen name="Logout" component={Login}
            options={{
                drawerIcon: config => <Icon2
                size={23}
                name="exit-to-app"
                color="#757575"></Icon2>
            }}/>
        
    </AdminDrawer.Navigator>
);

const Router = () =>{
    return(
        
        <Stack.Navigator >
            <Stack.Screen 
                name="Splash" 
                component={Splash} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Dashboard" 
                component={AdminDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            

            
            <Stack.Screen 
                name="AddPegawai" 
                component={AddPegawai} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddClient" 
                component={AddClient} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddProject" 
                component={AddProject} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddTeam" 
                component={AddTeam} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Upload" 
                component={Upload} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddTask" 
                component={AddTask} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddPic" 
                component={AddPic} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="LinkDash" 
                component={AdminDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailProjectAdmin" 
                component={DetailProjectAdmin}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            
            <Stack.Screen 
                name="Material" 
                component={Material} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Alat" 
                component={Alat} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ListDocAdmin" 
                component={ListDocAdmin} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ListProjectP" 
                component={ListProjectP} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailProject" 
                component={DetailProject} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ProgressP" 
                component={ProgressP} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="TeamP" 
                component={TeamP} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ListProjectPM" 
                component={ListProjectPM} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="TeamPM" 
                component={TeamPM} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Document" 
                component={Document} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Task" 
                component={Task} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ProgressPM" 
                component={ProgressPM} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Feedback" 
                component={Feedback} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Module" 
                component={Module} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailProjectPM" 
                component={DetailProjectPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="TaskAdmin" 
                component={TaskAdmin}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
                      
        </Stack.Navigator>
        
        
    );
};

export default Router;