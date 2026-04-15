import { ref } from 'vue'

export function createState() {
  const menuGroups = ref([
    {
      title: 'menu.hr',
      icon: 'group',
      prefix: '/hr',
      items: [
        { label: 'menu.org_chart', icon: 'account_tree', path: '/org-chart' },
        { label: 'menu.salary_3p', icon: 'savings', path: '/salary-3p' },
        { label: 'menu.hr_costs', icon: 'analytics', path: '/hr-costs' },
        { label: 'menu.job_description', icon: 'assignment', path: '/job-descriptions' }
      ]
    },
    {
      title: 'menu.settings',
      icon: 'settings',
      prefix: '/settings',
      items: []
    },
    {
      title: 'menu.business',
      icon: 'trending_up',
      prefix: '/business',
      items: []
    }
  ])

  return {
    menuGroups
  }
}
