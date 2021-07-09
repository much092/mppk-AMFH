import React, { useEffect } from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,
            DrawerItemList,
            DrawerItem, } from '@react-navigation/drawer';
import {Splash,Login,Dashboard, Pegawai,AddPegawai, Client,AddClient,
    Project,AddProject,Tab,Pic,Account,DashboardP,DetailProject, 
    ProgressP, TeamP, AccountP, DashboardPM, DataPegawai,Document, 
    Task, ProgressPM, Feedback, AccountPM, DetailProjectAdmin, 
    TeamPM, AddTeam, AddTask, 
    AddFeedback, AddPic, LinkDash, Material, Alat, ListProjectPM, Module, 
    ListProjectP, DetailProjectPM, TaskAdmin,Upload, ListDocAdmin, FotoTask, 
    UploadFoto, FotoTaskAdmin, FotoTaskPM,DetailPegawai, AddAlat, AddMaterial, 
    TeamAdmin, AbsensiPM, Absensi, ListAbsensi, EditClient, EditAlat, EditMaterial, 
    EditPM, EditAdmin, EditP, FeedbackPegawai, DetailClient, DetailMaterial, ListAbsensiPM, MaterialPM, 
    AlatPM,TaskUser, ProgressDetail,
    } from '../pages';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DetailAlat from '../pages/Alat/detail';

const Stack = createStackNavigator();

const AdminDrawer = createDrawerNavigator();
const PegawaiDrawer = createDrawerNavigator();
const PMDrawer = createDrawerNavigator();
const ProjectDrawer = createDrawerNavigator();


function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout"  onPress={() => props.navigation.replace("Login")}
        icon={()=><Icon2
            size={23}
            name="exit-to-app"
        color="#757575"></Icon2>}/>
      </DrawerContentScrollView>
    );
  }

const AdminDrawerScreen = ({navigation})=>(
    <AdminDrawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
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
                name="ListAbsensi" 
                component={ListAbsensi}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="EditClient" 
                component={EditClient}
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
                name="EditAlat" 
                component={EditAlat} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="EditMaterial" 
                component={EditMaterial} 
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
                name="FotoTaskAdmin" 
                component={FotoTaskAdmin} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailPegawai" 
                component={DetailPegawai} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddAlat" 
                component={AddAlat} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AddMaterial" 
                component={AddMaterial} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="TeamAdmin" 
                component={TeamAdmin} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="EditAdmin" 
                component={EditAdmin} 
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
                name="FotoTask" 
                component={FotoTask} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="UploadFoto" 
                component={UploadFoto} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AccountP" 
                component={AccountP} 
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
                name="EditP" 
                component={EditP} 
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
            <Stack.Screen 
                name="AccountPM" 
                component={AccountPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="FotoTaskPM" 
                component={FotoTaskPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AbsensiPM" 
                component={AbsensiPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="EditPM" 
                component={EditPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="FeedbackPegawai" 
                component={FeedbackPegawai}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="Absensi" 
                component={Absensi}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailClient" 
                component={DetailClient}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailAlat" 
                component={DetailAlat}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="DetailMaterial" 
                component={DetailMaterial}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ListAbsensiPM" 
                component={ListAbsensiPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            
            <Stack.Screen 
                name="MaterialPM" 
                component={MaterialPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="AlatPM" 
                component={AlatPM}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="TaskUser" 
                component={TaskUser}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen 
                name="ProgressDetail" 
                component={ProgressDetail}
                //component={ProjectDrawerScreen} 
                options={{
                    headerShown:false,
                }}
            />
                      
        </Stack.Navigator>
        
        
    );
};

export default Router;