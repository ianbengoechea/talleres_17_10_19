import React, {Component} from 'react';
import {View, Text} from 'react-native'
import { Drawer, Avatar } from 'react-native-material-ui';

const image =
    {
        "name": "name"
    }
const accounts =
    {
        "name": "name"
    }
const list =
    {
        "name": "name"
    }

const DrawerHeader = Drawer.Header;
const DrawerHeaderAccount = Drawer.Header.Account;
const DrawerSection = Drawer.Section;

export default class CustomDrawer extends Component {
    render() {
        return (
            <Drawer>
                <DrawerHeader >
                    <DrawerHeaderAccount
                        avatar={<Avatar text="A" />}
                        accounts={[
                            { avatar: <Avatar text="B" /> },
                            { avatar: <Avatar text="C" /> },
                        ]}
                        footer={{
                            dense: true,
                            centerElement: {
                                primaryText: 'Reservio',
                                secondaryText: 'business@email.com',
                            },
                        }}
                    />
                </DrawerHeader>
                <DrawerSection
                    divider
                    items={[
                        { value: 'Notifications' },
                        { value: 'Calendar', active: true },
                        { value: 'Clients' },
                    ]}/>
            </Drawer>
        );
    }
}
