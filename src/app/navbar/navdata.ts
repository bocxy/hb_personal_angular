import { navModel } from "./sidenav/helper";

export const navMenuBar :navModel[] = [

        {
            routeLink: 'office-data/list-head-office',
            icon: 'apartment',
            label: 'Office Data',
            subItems: [
                { routeLink: 'office-data/list-head-office',icon: 'assessment', label: 'Head Office' },
                { routeLink: 'office-data/list-circle-office',icon: 'assessment', label: 'Circle Office' },
                { routeLink: 'office-data/list-division-office',icon: 'assessment', label: 'Division Office' },
    
            ]
        },

    {
        routeLink: 'staff-strength/list',
        icon: 'diversity_3',
        label: 'Staff Strength'
    },

    {
        routeLink: 'employee/list',
        icon: 'person',
        label: 'Staff Data'
    },

    {
        routeLink: 'family-details/list',
        icon: 'diversity_1',
        label: 'Family Members'
    },

    {
        routeLink: 'emp-nomini/list',
        icon: 'how_to_reg',
        label: 'Nomination'
    },
    {
        routeLink: 'leave/list',
        icon: 'exit_to_app',
        label: 'Leave'
    },
    
    {
        routeLink: 'emp-tenure/list',
        icon: 'hourglass_empty',
        label: 'Tenure'
    },
   
    {
        routeLink: 'emp-promotion/list',
        icon: 'campaign',
        label: 'Promotion'
    },

    {
        routeLink: 'emp-pay/list',
        icon: 'attach_money',
        label: 'Pay Fixation'
    },

    {
        routeLink: 'direct-recruitment/list',
        icon: 'person_search',
        label: 'Direct Recruitment'
    },

    {
        routeLink: 'cga-details/list',
        icon: 'calendar_month',
        label: 'Compassionate Ground Appoinments'
    },

    {
        routeLink: 'cga-register/list',
        icon: 'edit_calendar',
        label: 'Compassionate Ground Register'
    },
    {
        routeLink: 'noc-details/list',
        icon: 'support_agent',
        label: 'NOC'
    },
    {
        routeLink: 'exam-history/list',
        icon: 'note_alt',
        label: 'Examination'
    },

   
    {
        routeLink: 'asset-details/list',
        icon: 'location_city',
        label: 'Employee Assets'
    },

    {
        routeLink: 'cell-file/list',
        icon: 'business_center',
        label: 'D Cell File Details'
    },

    {
        routeLink: 'cell-case/list',
        icon: 'work',
        label: 'D Cell Case Details'
    },

    {
        routeLink: 'emp-asset/list',
        icon: 'folder',
        label: 'Employee File'
    },
    {
        routeLink: 'staffreport',
        icon: 'bar_chart',
        label: 'Report'
    },

]