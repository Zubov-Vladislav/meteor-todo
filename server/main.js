import { Meteor } from 'meteor/meteor';
import { startUpTasks } from "./tasks";
import { startUpCreateUser } from "./user";
import '/imports/api/methods/tasksMethods';
import '/imports/api/publications/tasksPublications';

startUpTasks(Meteor)
startUpCreateUser(Meteor)
