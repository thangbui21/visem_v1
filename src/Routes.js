import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

import Dashboard from '@/pages/Dashboard/Dashboard';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
import SettingLayout from '@/components/Layout/SettingLayout';
// import SearchSetting from '@/pages/Settings/SearchPortal/SearchSetting';
// import UserManagement from '@/pages/Settings/User/UserManagement';
// import SystemSetting from '@/pages/Settings/System/SystemSetting'
// import UserSetting from '@/pages/Settings/User/UserSetting'
//Monitoring
import Monitoring from '@/pages/Monitoring/Monitoring';

//Advanced Threat
import AdvancedThreat from '@/pages/AdvancedThreat/AdvancedThreat';

//Investigation
import Investigation from '@/pages/Investigation/Investigation';

//ExecutiveView
import ExecutiveView from '@/pages/ExecutiveView/ExecutiveView';

//Health
import Health from '@/pages/Health/Health';

// More
import Alert from '@/pages/More/Alert/Alert';
import QueryTool from '@/pages/More/QueryTool/QueryTool';
import CorelationRule from '@/pages/More/CorelationRule/CorelationRule';
import NewContent from '@/pages/More/CorelationRule/NewContent';
//Setting
//Knowledge
import AdvancedSearch from '@/pages/Settings/Knowledge/AdvancedSearch/AdvancedSearch'
import AllConfigurations from '@/pages/Settings/Knowledge/AllConfigurations/AllConfigurations'
import DataModels from '@/pages/Settings/Knowledge/DataModels/DataModels'
import EventTypes from '@/pages/Settings/Knowledge/EventTypes/EventTypes'
import Lookups from '@/pages/Settings/Knowledge/Lookups/Lookups'
//import ReportAlerts from '@/pages/Settings/Knowledge/ReportAlerts/ReportAlerts'
import Fields from '@/pages/Settings/Knowledge/Fields/Fields'
import Tags from '@/pages/Settings/Knowledge/Tags/Tags'
import UserInterface from '@/pages/Settings/Knowledge/UserInterface/UserInterface'
import SRA from '@/pages/Settings/Knowledge/ReportAlerts/SRA'
import AlertActions from '@/pages/Settings/Knowledge/AlertActions/AlertActions'


//System Setting
import HealthReportManager from '@/pages/Settings/System/HealthReportManager/HealthReportManager'
import ServerControls from '@/pages/Settings/System/ServerControls/ServerControls'
import ServerSetting from '@/pages/Settings/System/ServerSetting/ServerSetting'

//Data Setting
import Indexes from '@/pages/Settings/Data/Indexes/Indexes'
import ForwardingAndReceiving from '@/pages/Settings/Data/ForwardingAndReceiving/ForwardingAndReceiving'
import SourceTypes from '@/pages/Settings/Data/SourceTypes/SourceTypes'
import DataInput from '@/pages/Settings/Data/DataInputs/DataInput'
import TCP from '@/pages/Settings/Data/DataInputs/TCP/TCP'
import UDP from '@/pages/Settings/Data/DataInputs/UDP/UDP'
import NewTcpUdp from '@/pages/Settings/Data/DataInputs/NewTcpUdp/NewTcpUdp'

//Distributed Setting
import ForwarderManagement from '@/pages/Settings/Distributed/ForwarderManagement/ForwarderManagement'
//import IndexingClustering from '@/pages/Settings/Distributed/IndexingClustering/IndexingClustering'
// User
import Roles from '@/pages/Settings/User/Roles/Roles'
import User from '@/pages/Settings/User/User/User'
import UserManagement from '@/pages/Settings/User/UserManagement/UserManagement'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },

        {
            path: '/error',
            name: 'Error',
            component: ErrorPage,
        },
        {
            path: '/app',
            name: 'Layout',
            component: Layout,
            children: [
                {
                    //Dashboard
                    path: 'dashboard',
                    name: 'Dashboard',
                    props: {propId: 'dashboard'},
                    component: Dashboard,
                },

                {
                    path: 'monitoring',
                    name: 'Monitoring',
                    component: Monitoring,
                },

                {
                    path: 'advanced_threat',
                    name: 'AdvancedThreat',
                    component: AdvancedThreat,
                },
                {
                    path: 'investigation',
                    name: 'Investigation',
                    component: Investigation,
                },
                {
                    path: 'executive_view',
                    name: 'ExecutiveView',
                    component: ExecutiveView,
                },
                {
                    path: 'health',
                    name: 'Health',
                    component: Health,
                },

                // Check lại
                //More
                {
                    path: 'rules',
                    name: 'CorelationRule',
                    component: CorelationRule,
                },
                {
                    path: 'alerts',
                    name: 'Alert',
                    component: Alert,
                },
                {
                    path: 'query',
                    name: 'QueryTool',
                    component: QueryTool,
                },
                {
                    path: '/rules/new_content',
                    name: 'QueryTool',
                    component: NewContent,
                },

            ],
        },


        {
            path: '/setting',
            name: 'Setting',
            component: SettingLayout,
            children: [
                {
                    path: 'knowledge',
                    name: 'Knowledge',
                    component: DataModels,
                },

                //Knowledge
                {
                    path: 'knowledge/report_alerts',
                    name: 'ReportAndAlert',
                    component: SRA,
                },
                {
                    path: 'knowledge/data_models',
                    name: 'DataModels',
                    component: DataModels,
                },
                {
                    path: 'knowledge/tags',
                    name: 'Tags',
                    component: Tags,
                },
                {
                    path: 'knowledge/fields',
                    name: 'Fields',
                    component: Fields,
                },
                {
                    path: 'knowledge/lookups',
                    name: 'Lookups',
                    component: Lookups,
                },
                {
                    path: 'knowledge/ui',
                    name: 'UserInterface',
                    component: UserInterface,
                },
                {
                    path: 'knowledge/event_types',
                    name: 'EventTypes',
                    component: EventTypes,
                },
                {
                    path: 'knowledge/alert_actions',
                    name: 'AlertActions',
                    component: AlertActions,
                },
                {
                    path: 'knowledge/advanced_search',
                    name: 'AdvancedSearch',
                    component: AdvancedSearch,
                },
                {
                    path: 'knowledge/all_config',
                    name: 'AllConfigurations',
                    component: AllConfigurations,
                },


                //System
                {
                    path: 'system',
                    name: 'SystemSetting',
                    component: ServerSetting,
                },
                {
                    path: 'system/server_settings',
                    name: 'ServerSetting',
                    component: ServerSetting,
                },
                {
                    path: 'system/server_controls',
                    name: 'ServerControls',
                    component: ServerControls,
                },
                {
                    path: 'system/health',
                    name: 'HealthReportManager',
                    component: HealthReportManager,
                },

        //Data
        // {
        //   path: 'data',
        //   name: 'DataInputs',
        //   component: DataInputs,
        // },
        {
          path: 'data/inputs',
          name: 'DataInput',
          component: DataInput,
        },
        {
          path: 'data/inputs/tcp',
          name: 'TCP',
          component: TCP,
        },
        {
          path: 'data/inputs/udp',
          name: 'UDP',
          component: UDP,
        },
        {
          path: 'data/inputs/new_tcp_udp',
          name: 'NewTcpUdp',
          component: NewTcpUdp,
        },
        {
          path: 'data/indexes',
          name: 'Indexes',
          component: Indexes,
        },
        {
          path: 'data/source_types',
          name: 'SourceTypes',
          component: SourceTypes,
        },
        {
          path: 'data/forward_receive',
          name: 'forward_receive',
          component: ForwardingAndReceiving,
        },


                //Distributed
                {
                    path: 'distributed',
                    name: 'DistributedSetting',
                    component: ForwarderManagement,
                },
                {
                    path: 'forwarder_management',
                    name: 'ForwarderManagement',
                    component: ForwarderManagement,
                },

                //user
                {
                    path: 'user',
                    name: 'UserSetting',
                    component: User,
                },
                {
                    path: 'roles',
                    name: 'UserRoles',
                    component: Roles,
                },
                {
                    path: 'usermanagement',
                    name: 'UserManagement',
                    component: UserManagement,
                },
                {
                    path: '',
                    redirect: '/setting/input',
                }
            ]
        },
        {
            path: '*',
            name: 'Error',
            component: ErrorPage,
        },

    ],
});
