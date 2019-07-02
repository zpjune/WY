export default {
  route: {
    dashboard: 'Dashboard',
    introduction: 'Introduction',
    documentation: 'Documentation',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createForm: 'Create Form',
    editForm: 'Edit Form',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    userManager: 'User Manager',
    userPasswordManager: 'User Password Manager',
    roleManager: 'Role Manager',
    roleUserManager: 'RoleUser Manager',
    userinfoViews: 'UserinfoViews',
    roleViews: 'RoleViews',
    uidpConfigManager: 'Uidp Config Manager',
    uidpConfigViews: 'Uidp Config Views',
    uidpSysInfoManager: 'Uidp Sys Info Manager',
    orgViews: 'Org Views',
    orgManager: 'Org Manager',
    orgUserManager: 'Org User Manager',
    logInfoViews: 'LogInfo Views',
    logInfoManager: 'LogInfo Manager'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/frame_src/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export selected items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  userTable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    USER_ID: 'UserId',
    REG_TIME: 'RegTime',
    USER_CODE: 'UserCode',
    USER_NAME: 'UserName',
    ORG_NAME: 'ORG_NAME',
    USER_ALIAS: 'UserAlias',
    USER_PASS: 'UserPass',
    PHONE_MOBILE: 'PhoneMobile',
    PHONE_OFFICE: 'PhoneOffice',
    PHONE_ORG: 'PhoneOrg',
    USER_EMAIL: 'UserEmail',
    EMAIL_OFFICE: 'EmailOffice',
    USER_IP: 'UserIp',
    USER_SEX: 'UserSex',
    FLAG: 'Flag',
    USER_DOMAIN: 'UserDomain',
    REMARK: 'Remark',
    importance: 'Importance',
    type: 'Type',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    author: 'author',
    groupName: 'GroupName',
    orgName: 'OrgName'
  }, roleTable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    id: 'Id',
    groupCode: 'GroupCode',
    groupName: 'GroupName',
    parentId: 'ParentId',
    parent: 'parent',
    sysCode: 'SysCode',
    remark: 'Remark',
    add: 'Add',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    author: 'Author',
    mount: 'Mount'
  }, configTable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    CONF_CODE: 'CONF_CODE',
    CONF_NAME: 'CONF_NAME',
    CONF_VALUE: 'CONF_VALUE',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    author: 'Author',
    mount: 'Mount'
  },
  orgTable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    id: 'Id',
    orgCode: 'orgCode',
    orgName: 'orgName',
    parentId: 'ParentId',
    orgNameFull: 'orgNameFull',
    phone: 'phone',
    phoneS: 'phoneS',
    phoneFax: 'phoneFax',
    orgAddr: 'orgAddr',
    remark: 'Remark',
    add: 'Add',
    search: 'Search',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    author: 'Author',
    mount: 'Mount'
  },
  logInfoTable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    ACCESS_TIME: 'AccessTime',
    USER_ID: 'UserId',
    USER_NAME: 'UserName',
    IP_ADDR: 'IpAddr',
    LOG_TYPE: 'LogType',
    LOG_CONTENT: 'LogContent',
    REMARK: 'Remark',
    add: 'Add',
    search: 'Search',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    author: 'Author',
    mount: 'Mount'
  },
  sysInfoTable: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    sysCode: 'SysCode',
    sysName: 'SysName',
    sysStyle: 'SysStyle',
    sysLogo: 'SysLogo',
    sysUrl: 'SysUrl',
    sysOrder: 'SysOrder',
    sysAdmin: 'SysAdmin',
    add: 'Add',
    search: 'Search',
    export: 'Export',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    author: 'Author',
    mount: 'Mount'
  }
}