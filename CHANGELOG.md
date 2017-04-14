**Change Log** lists down features that are implemented after every each week sprint and is **visible** from the web page. 

### Week 5
* **Dashboard**
    - Static UI skeleton 
* **DataBase**
    - Added Planner Collection & Schema
    - Added Semester Schema 
    - Added Module  Collection & Schema
### WEEK 6
* **Side Bar**
    - Side Bar planned tabs are set up. Users are able to navigate between tabs 
    - Provided Skeleton UI Component for Graduation Requirement Checker 
* **Database**
    - Server-side DB was set up. Application now could communicate with the database at the server side. 
    - Added Student Schema 
### WEEK 7
* **Log In Page** 
    - New Log In Page for User to Log In and Sign up. Users will be led to log in page if not signed in.
* **User Profile**
    - Application now required Users to sign up to use the complete features.
    - Supportted check if User signed up with NUS email - Only email ending with '@u.nus.edu' can sign up for the application.
* **First Time SetUp** 
    - Application required first time User to set up the following Data: Academic Year, Course Major, and Previous Education
* **Student Planners**
    - Supported Addition and Deletion of Study Planner.
    - Supported Addition and Deletion of new Academic Row in Study Planner.
    - Supported Addition, Deletion and Searching of Module to Study Planner. 
* **DashBoard Sidebar**
    - Profile Tab
        - Profile Tab now display User's email
        - Profile Tab now display User's list of exempted and waived module. Modules can be added or deleted by User
        - Profile Tab now displays other User's important information : Academic Cohort and Previous Education
        - User can edit their respective Academic Cohort and Previous Education
    - Log Out Button 
        - User can Log out using the log out button in the tab list or the Log Out button in the profile tab. 
    - Others
        - SideBar Tab now display its name on mouse hover.
* **Database** 
   - Added Meteor.Users collection from the meteor package. 
   - Connected Meteor.Users with Student Collection. Upon successful creation and set up, User will have their respective Student's document
   - Added Academic Cohort Collection and Schema.
   - Added Focus Area Collection and Schema. 
   - Added Modul Fulfilment Collection and Schema.
   - Populated Server side DB with sample Computer Science Module. 
### WEEK 8
* **General** 
   - Fixed bug where user can be directed to the app page even though they are not logged in 
* **Student Planner**
   - Added Warning when User wants to delete Study Plan
   - Fixed Bug where academic year planner always shows 1 year ahead than it should 
   - Fixed Bug where caret button still appears when editing study plan name
   - Fixed Bug where dropdown on study plan options is out-of-place
   - Updated the Addition and Deletion Academic Year button to be less conspicuous.
   - Updated 'Change' text on Study plan to 'Rename'
* **Dashboard Sidebar**
   - Fixed Bug where side panel disappear when resizing windows 
   - Added react tool tip component to exempted and waived modules to provide explanation
   - Removed Placeholder Tabs
   - Updated Module Searchbar for waived/exempted modules of users.
   - Updated edit of User's Academic Cohort and previous education to Dropdown option (from originally editable fields)
   - Styled Graduation Requirement List 
* **Database**
   - Module Collection Database used Module information from NUSMOD. Thanks Adrian!

### WEEK 9
* **User Profile**
    - Fixed Bug where user profile cannot be verified when user is still signed in and wanted to go to the dashboard directly 
    - Verification email to verify user will now be sent upon Sign Up.
    - Added support for changing forgotten password in both front page and user's dashboard. 
* **Student Planner** 
    - Updated module search bar logic to support searching by module name 
    - Added Cancel Button in the pop up window when deleting planner
    - Added text for addition of Academic Row button at the bottom
    - Updated Dropdown caret on planner tab to be always visible.
    - Fixed Bug where Swap and Rename icon are swapped. 
* **Sidebar** 
    - Updated waived and exempted module explanation. 
* **DataBase** 
    - Populated the database with information about graduation requirement, focus area and module equivalence to prepare for graduation checker   

### WEEK 10
* **General**
   - Fixed Bugs where pressing 'ESC' key caused an error to be displayed
* **User Profile** 
    - Update Password verification to strengthen User's password security. 
* **Student Planner** 
    - Hovering on Module now also displayed module information.
    - Fixed Bug for dropdown caret appearing on top right hand corner.
    - Changing User's Academic Cohort will update planner Academic Year. 
* **Sidebar** 
    - Profile Tab 
        - Supported changing password from profile tab 
    - **Graduation Checker** 
        - Graduation Checker is live!
        - Supported Checking for graduation of cohort 16/17 and 15/16
* **Database** 
   - Updated Focus Area schema to support graduation checker logic 
   - Parsed ULR information for academic cohort from 15/16 onwards and stored it in the module equivalence collection

### WEEK 11
* **Log-In Page** 
    - Refined Email Verifier. 
    - Added warning for unsafe password. 
* **Graduation Checker** 
    - Fixed Bugs where some modules that are able to fulfill module listed under graduation checker is not recognized
* **Student Planner** 
    - Fixed bug where module MCs are displayed wrongly in the module information 
    - Fixed bug where Term offered are displayed wrongly in the module information 
    - Fixed bug where deleting module still display its information 
    - Fixed bug where modules that is not offered at all will display empty terms 
* **Database** 
    - Parsed ULR information for Academic Cohort before 15/16 and stored it in the module equivalence collection
    - Parsed suggested planner for 15/16 cohort and 16/17 cohort based on information provided in the computer science page.

### WEEK 12
* **General** 
    - Implemented Loader for some process that takes awhile to complete
    - Edited Comments on Alerts displayed on various user interaction
* **User Profile** 
    - Fixed bug where email verifier does not work as intended. Thanks Daphne!
    - Updated alert when changing password fails to display reasons for failure.  
* **Student Planner** 
    - Added options to select Suggested Planners based on information provided by the Computer Science faculty. 
    - Added functionality to duplicate Planner.
    - Fixed Bug where Student Planner cannot scroll 
    - Fixed Bug where semester is not shown on module information
    - Fixed Bug where Planner tabs are hidden when any UI dropdown element is partially hidden.
* **Graduation Checker** 
   - Fixed Bug where counting for module level 4000 and above does not take into account modules in other focus area.
   - Updated Calculation for Unrestriced Electives
* **Sidebar** 
    - Profile Tab 
        - Updated Waived/Exempted Module description
        - Renamed heading to be more personalized. 
    - **Graduation Check Tab** 
        - Graduation Check Tab now display total MCs accumulated from the planner 
* **DataBase** 
    - Fixed bug when parsing information for the suggested planners do not immediately delete the previous version of suggested planners in the cohort. 
    - Updated the module parser to manually added missing module from nusmod.
### WEEK 13
* **Graduation Checker** 
    - Fixed bug on graduation checker calculation 
    - Fixed bug where some modules are not recognized to replace the modules listed on graduation requirement
* **User Profile** 
    - Update selection of the Academic Cohort to only display Academic Cohort supported by the application 
