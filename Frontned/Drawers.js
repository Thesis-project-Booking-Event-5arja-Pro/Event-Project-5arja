import { createDrawerNavigator } from '@react-navigation/drawer';
import Seeallticket from './Screens/Seeallticket';
const Drawer = createDrawerNavigator();


const Drawers = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="Seeallticket" component={Seeallticket} />
  
  </Drawer.Navigator>
  
  )
}

export default  Drawers